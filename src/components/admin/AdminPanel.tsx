import React, { useState } from 'react';
import { Settings, Plus, Save, MoveUp, MoveDown } from 'lucide-react';
import { useLinks } from '../../hooks/useLinks';
import CategoryList from './CategoryList';
import LinkList from './LinkList';
import EditForm from './EditForm';
import NewCategoryForm from './NewCategoryForm';
import NewLinkForm from './NewLinkForm';
import { AdminState } from '../../types/admin';
import { LinkCategory } from '../../types/links';

const AdminPanel = () => {
  const { links, isLoading, error, updateLinks } = useLinks();
  const [adminState, setAdminState] = useState<AdminState>({
    isEditing: false,
    selectedCategory: null,
    selectedLink: null,
    isAddingCategory: false,
    isAddingLink: false
  });
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setSaveError(null);
      await updateLinks(links);
      setAdminState(prev => ({ ...prev, isEditing: false }));
    } catch (err) {
      console.error('Failed to save changes:', err);
      setSaveError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleAddCategory = () => {
    setAdminState(prev => ({ ...prev, isAddingCategory: true }));
  };

  const handleAddLink = () => {
    if (adminState.selectedCategory === null) {
      setSaveError('Please select a category first');
      return;
    }
    setAdminState(prev => ({ ...prev, isAddingLink: true }));
  };

  const handleMoveCategory = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === links.length - 1)
    ) {
      return;
    }

    const newLinks = [...links];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap lexoranks
    const tempLexorank = newLinks[index].lexorank;
    newLinks[index].lexorank = newLinks[targetIndex].lexorank;
    newLinks[targetIndex].lexorank = tempLexorank;
    
    // Swap positions
    [newLinks[index], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[index]];
    
    try {
      await updateLinks(newLinks);
    } catch (err) {
      console.error('Failed to reorder categories:', err);
      setSaveError('Failed to reorder categories');
    }
  };

  const handleMoveLink = async (categoryIndex: number, linkIndex: number, direction: 'up' | 'down') => {
    const category = links[categoryIndex];
    if (
      (direction === 'up' && linkIndex === 0) ||
      (direction === 'down' && linkIndex === category.links.length - 1)
    ) {
      return;
    }

    const newLinks = [...links];
    const targetIndex = direction === 'up' ? linkIndex - 1 : linkIndex + 1;
    
    // Swap lexoranks
    const tempLexorank = category.links[linkIndex].lexorank;
    category.links[linkIndex].lexorank = category.links[targetIndex].lexorank;
    category.links[targetIndex].lexorank = tempLexorank;
    
    // Swap positions
    [category.links[linkIndex], category.links[targetIndex]] = [
      category.links[targetIndex],
      category.links[linkIndex]
    ];
    
    newLinks[categoryIndex] = { ...category };

    try {
      await updateLinks(newLinks);
    } catch (err) {
      console.error('Failed to reorder links:', err);
      setSaveError('Failed to reorder links');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Admin Panel
        </h1>
        <div className="flex gap-2">
          {!adminState.isEditing ? (
            <>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Category
              </button>
              <button
                onClick={handleAddLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Link
              </button>
              <button
                onClick={() => setAdminState(prev => ({ ...prev, isEditing: true }))}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Edit
              </button>
            </>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      {(error || saveError) && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
          {saveError || error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryList
          categories={links}
          adminState={adminState}
          setAdminState={setAdminState}
          onMove={handleMoveCategory}
        />
        {adminState.selectedCategory !== null && (
          <LinkList
            category={links[adminState.selectedCategory]}
            adminState={adminState}
            setAdminState={setAdminState}
            onMove={(linkIndex, direction) => 
              handleMoveLink(adminState.selectedCategory!, linkIndex, direction)
            }
          />
        )}
      </div>

      {adminState.isEditing && adminState.selectedLink !== null && (
        <EditForm
          links={links}
          adminState={adminState}
          setAdminState={setAdminState}
        />
      )}

      {adminState.isAddingCategory && (
        <NewCategoryForm
          categories={links}
          onClose={() => setAdminState(prev => ({ ...prev, isAddingCategory: false }))}
          onSave={(newCategory: LinkCategory) => {
            const newLinks = [...links, newCategory];
            updateLinks(newLinks);
            setAdminState(prev => ({ ...prev, isAddingCategory: false }));
          }}
        />
      )}

      {adminState.isAddingLink && (
        <NewLinkForm
          categoryIndex={adminState.selectedCategory!}
          links={links}
          onClose={() => setAdminState(prev => ({ ...prev, isAddingLink: false }))}
          onSave={async (updatedLinks) => {
            await updateLinks(updatedLinks);
            setAdminState(prev => ({ ...prev, isAddingLink: false }));
          }}
        />
      )}
    </div>
  );
};

export default AdminPanel;