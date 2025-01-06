import React from 'react';
import { Tag, TagType, AVAILABLE_TAGS } from '../../types/tags';

interface TagSelectorProps {
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, onChange }) => {
  const handleTagChange = (tagName: TagType) => {
    const isSelected = selectedTags.some(tag => tag.name === tagName);
    let newTags: Tag[];
    
    if (isSelected) {
      newTags = selectedTags.filter(tag => tag.name !== tagName);
    } else {
      newTags = [...selectedTags, { name: tagName }];
    }
    
    onChange(newTags);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-1">Visibility</label>
      <div className="flex flex-wrap gap-3">
        {AVAILABLE_TAGS.map(tagName => (
          <label
            key={tagName}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedTags.some(tag => tag.name === tagName)}
              onChange={() => handleTagChange(tagName)}
              className="w-4 h-4 rounded border-gray-600 bg-[#3a3a3a] text-blue-600 focus:ring-blue-500"
            />
            <span className="capitalize">{tagName}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default TagSelector;