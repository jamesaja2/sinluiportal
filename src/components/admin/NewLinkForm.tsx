import React, { useState } from 'react';
import { LinkCategories, Link } from '../../types/links';
import { incrementLexorank } from '../../utils/lexorank';

interface NewLinkFormProps {
  categoryIndex: number;
  links: LinkCategories;
  onClose: () => void;
  onSave: (updatedLinks: LinkCategories) => void;
}

const NewLinkForm: React.FC<NewLinkFormProps> = ({
  categoryIndex,
  links,
  onClose,
  onSave
}) => {
  const [newLink, setNewLink] = useState<Omit<Link, 'id'>>({
    title: '',
    description: '',
    url: '',
    iconUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedLinks = [...links];
    const category = { ...updatedLinks[categoryIndex] };
    
    // Calculate new lexorank for the link
    const lastLink = category.links[category.links.length - 1];
    const newLexorank = lastLink ? incrementLexorank(lastLink.lexorank || 'a') : 'a';
    
    category.links = [...category.links, {
      ...newLink,
      id: undefined,
      lexorank: newLexorank
    }];
    updatedLinks[categoryIndex] = category;

    onSave(updatedLinks);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#2a2a2a] rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">New Link</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={newLink.title}
              onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-[#3a3a3a] rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              value={newLink.description}
              onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-[#3a3a3a] rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
              className="w-full bg-[#3a3a3a] rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icon URL</label>
            <input
              type="url"
              value={newLink.iconUrl}
              onChange={(e) => setNewLink(prev => ({ ...prev, iconUrl: e.target.value }))}
              className="w-full bg-[#3a3a3a] rounded-lg p-2"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLinkForm;