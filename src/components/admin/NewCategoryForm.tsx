import React, { useState } from 'react';
import { LinkCategory } from '../../types/links';
import TagSelector from './TagSelector';
import { Tag } from '../../types/tags';
import { incrementLexorank } from '../../utils/lexorank';

interface NewCategoryFormProps {
  onClose: () => void;
  onSave: (category: LinkCategory) => void;
  categories: LinkCategory[];
}

const NewCategoryForm: React.FC<NewCategoryFormProps> = ({ onClose, onSave, categories }) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate new lexorank
    const lastCategory = categories[categories.length - 1];
    const newLexorank = lastCategory ? incrementLexorank(lastCategory.lexorank) : 'a';
    
    const newCategory: LinkCategory = {
      name,
      lexorank: newLexorank,
      links: [],
      tags
    };

    onSave(newCategory);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#2a2a2a] rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">New Category</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#3a3a3a] rounded-lg p-2"
              required
            />
          </div>
          
          <TagSelector
            selectedTags={tags}
            onChange={setTags}
          />

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

export default NewCategoryForm;