import React from 'react';
import { LinkCategories } from '../../types/links';
import { AdminState } from '../../types/admin';
import TagSelector from './TagSelector';

interface EditFormProps {
  links: LinkCategories;
  adminState: AdminState;
  setAdminState: React.Dispatch<React.SetStateAction<AdminState>>;
}

const EditForm: React.FC<EditFormProps> = ({
  links,
  adminState,
  setAdminState,
}) => {
  const category = links[adminState.selectedCategory!];
  const link = category.links[adminState.selectedLink!];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newLinks = [...links];
    newLinks[adminState.selectedCategory!].links[adminState.selectedLink!] = {
      ...link,
      [name]: value,
    };
    setAdminState(prev => ({ ...prev, links: newLinks }));
  };

  const handleTagsChange = (newTags: { name: string }[]) => {
    const newLinks = [...links];
    newLinks[adminState.selectedCategory!].tags = newTags;
    setAdminState(prev => ({ ...prev, links: newLinks }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#2a2a2a] rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Link</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={link.title}
              onChange={handleChange}
              className="w-full bg-[#3a3a3a] rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={link.description}
              onChange={handleChange}
              className="w-full bg-[#3a3a3a] rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              name="url"
              value={link.url}
              onChange={handleChange}
              className="w-full bg-[#3a3a3a] rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icon URL</label>
            <input
              type="text"
              name="iconUrl"
              value={link.iconUrl}
              onChange={handleChange}
              className="w-full bg-[#3a3a3a] rounded-lg p-2"
            />
          </div>
          <TagSelector
            selectedTags={category.tags || []}
            onChange={handleTagsChange}
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => setAdminState(prev => ({ ...prev, selectedLink: null }))}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setAdminState(prev => ({ ...prev, selectedLink: null }))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;