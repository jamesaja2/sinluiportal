import React, { useState, useEffect } from 'react';
import { Settings, Plus, Save, Edit2, Trash2, X, Check } from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';
import { LinkCategory, Link } from '../../types/links';
import { Tag, TagType, AVAILABLE_TAGS } from '../../types/tags';
import axios from 'axios';

interface EditingState {
  type: 'category' | 'link' | null;
  categoryIndex: number | null;
  linkIndex: number | null;
}

const AdminPanel = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<LinkCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EditingState>({ type: null, categoryIndex: null, linkIndex: null });
  const [editForm, setEditForm] = useState<any>({});

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/links`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.isAdmin) {
      fetchData();
    }
  }, [user]);

  // Generate next lexorank
  const getNextLexorank = (items: any[]) => {
    if (items.length === 0) return 'a';
    const lastItem = items[items.length - 1];
    return lastItem.lexorank + 'a';
  };

  // Add new category
  const addCategory = () => {
    const newCategory: LinkCategory = {
      name: 'New Category',
      lexorank: getNextLexorank(categories),
      links: [],
      tags: []
    };
    
    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
    
    // Start editing the new category
    setEditing({ type: 'category', categoryIndex: newCategories.length - 1, linkIndex: null });
    setEditForm({ name: 'New Category', tags: [] });
  };

  // Add new link to category
  const addLink = (categoryIndex: number) => {
    const newLink: Link = {
      title: 'New Link',
      description: 'Description',
      url: 'https://example.com',
      iconUrl: 'https://via.placeholder.com/32',
      lexorank: getNextLexorank(categories[categoryIndex].links)
    };

    const newCategories = [...categories];
    newCategories[categoryIndex].links.push(newLink);
    setCategories(newCategories);

    // Start editing the new link
    setEditing({ type: 'link', categoryIndex, linkIndex: newCategories[categoryIndex].links.length - 1 });
    setEditForm({
      title: 'New Link',
      description: 'Description',
      url: 'https://example.com',
      iconUrl: 'https://via.placeholder.com/32'
    });
  };

  // Start editing
  const startEdit = (type: 'category' | 'link', categoryIndex: number, linkIndex?: number) => {
    if (type === 'category') {
      const category = categories[categoryIndex];
      setEditForm({
        name: category.name,
        tags: category.tags || []
      });
      setEditing({ type: 'category', categoryIndex, linkIndex: null });
    } else if (type === 'link' && linkIndex !== undefined) {
      const link = categories[categoryIndex].links[linkIndex];
      setEditForm({
        title: link.title,
        description: link.description,
        url: link.url,
        iconUrl: link.iconUrl
      });
      setEditing({ type: 'link', categoryIndex, linkIndex });
    }
  };

  // Save edit
  const saveEdit = () => {
    if (!editing.type || editing.categoryIndex === null) return;

    const newCategories = [...categories];

    if (editing.type === 'category') {
      newCategories[editing.categoryIndex] = {
        ...newCategories[editing.categoryIndex],
        name: editForm.name,
        tags: editForm.tags
      };
    } else if (editing.type === 'link' && editing.linkIndex !== null) {
      newCategories[editing.categoryIndex].links[editing.linkIndex] = {
        ...newCategories[editing.categoryIndex].links[editing.linkIndex],
        title: editForm.title,
        description: editForm.description,
        url: editForm.url,
        iconUrl: editForm.iconUrl
      };
    }

    setCategories(newCategories);
    cancelEdit();
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditing({ type: null, categoryIndex: null, linkIndex: null });
    setEditForm({});
  };

  // Delete category
  const deleteCategory = (categoryIndex: number) => {
    if (confirm('Are you sure you want to delete this category and all its links?')) {
      const newCategories = categories.filter((_, index) => index !== categoryIndex);
      setCategories(newCategories);
    }
  };

  // Delete link
  const deleteLink = (categoryIndex: number, linkIndex: number) => {
    if (confirm('Are you sure you want to delete this link?')) {
      const newCategories = [...categories];
      newCategories[categoryIndex].links = newCategories[categoryIndex].links.filter((_, index) => index !== linkIndex);
      setCategories(newCategories);
    }
  };

  // Handle tag change
  const handleTagChange = (tagName: TagType) => {
    const currentTags = editForm.tags || [];
    const isSelected = currentTags.some((tag: Tag) => tag.name === tagName);
    
    let newTags: Tag[];
    if (isSelected) {
      newTags = currentTags.filter((tag: Tag) => tag.name !== tagName);
    } else {
      newTags = [...currentTags, { name: tagName }];
    }
    
    setEditForm({ ...editForm, tags: newTags });
  };

  // Save all changes to backend
  const saveAllChanges = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Prepare data for API - remove any extra fields
      const dataToSend = categories.map(category => ({
        id: category.id,
        name: category.name,
        lexorank: category.lexorank,
        tags: category.tags || [],
        links: category.links.map(link => ({
          id: link.id,
          title: link.title,
          description: link.description,
          url: link.url,
          iconUrl: link.iconUrl,
          lexorank: link.lexorank || 'a'
        }))
      }));

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/links`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setCategories(response.data);
        alert('Changes saved successfully!');
      }
    } catch (err) {
      console.error('Failed to save changes:', err);
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error.message || 'Failed to save changes');
      } else {
        setError('Failed to save changes');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Access denied. Admin privileges required.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Admin Panel
        </h1>
        <div className="flex gap-2">
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={saveAllChanges}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-6">
        {categories.map((category, categoryIndex) => (
          <div key={category.id || categoryIndex} className="bg-[#2a2a2a] rounded-lg p-6">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 flex-1">
                {editing.type === 'category' && editing.categoryIndex === categoryIndex ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="bg-[#3a3a3a] rounded-lg p-2 flex-1"
                      placeholder="Category name"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{category.name}</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit('category', categoryIndex)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCategory(categoryIndex)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tags for Category (when editing) */}
            {editing.type === 'category' && editing.categoryIndex === categoryIndex && (
              <div className="mb-4 p-4 bg-[#3a3a3a] rounded-lg">
                <label className="block text-sm font-medium mb-2">Visibility Tags</label>
                <div className="flex flex-wrap gap-3">
                  {AVAILABLE_TAGS.map(tagName => (
                    <label key={tagName} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.tags?.some((tag: Tag) => tag.name === tagName) || false}
                        onChange={() => handleTagChange(tagName)}
                        className="w-4 h-4 rounded border-gray-600 bg-[#3a3a3a] text-blue-600 focus:ring-blue-500"
                      />
                      <span className="capitalize">{tagName}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Current Tags Display */}
            {category.tags && category.tags.length > 0 && editing.categoryIndex !== categoryIndex && (
              <div className="mb-4">
                <div className="flex gap-2">
                  {category.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-gray-700 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="space-y-3">
              {category.links.map((link, linkIndex) => (
                <div key={link.id || linkIndex} className="bg-[#3a3a3a] rounded-lg p-4">
                  {editing.type === 'link' && editing.categoryIndex === categoryIndex && editing.linkIndex === linkIndex ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <input
                            type="text"
                            value={editForm.title || ''}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="w-full bg-[#4a4a4a] rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <input
                            type="text"
                            value={editForm.description || ''}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            className="w-full bg-[#4a4a4a] rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">URL</label>
                          <input
                            type="url"
                            value={editForm.url || ''}
                            onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                            className="w-full bg-[#4a4a4a] rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Icon URL</label>
                          <input
                            type="url"
                            value={editForm.iconUrl || ''}
                            onChange={(e) => setEditForm({ ...editForm, iconUrl: e.target.value })}
                            className="w-full bg-[#4a4a4a] rounded-lg p-2"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <img src={link.iconUrl} alt={link.title} className="w-8 h-8 rounded" />
                      <div className="flex-1">
                        <h3 className="font-medium">{link.title}</h3>
                        <p className="text-sm text-gray-400">{link.description}</p>
                        <p className="text-xs text-gray-500">{link.url}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit('link', categoryIndex, linkIndex)}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLink(categoryIndex, linkIndex)}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Link Button */}
              <button
                onClick={() => addLink(categoryIndex)}
                className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-500 transition-colors flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300"
              >
                <Plus className="w-4 h-4" />
                Add Link
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No categories found. Create your first category to get started.</p>
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add First Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;