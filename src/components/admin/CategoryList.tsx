import React from 'react';
import { LinkCategories } from '../../types/links';
import { AdminState } from '../../types/admin';
import { Folder, MoveUp, MoveDown } from 'lucide-react';

interface CategoryListProps {
  categories: LinkCategories;
  adminState: AdminState;
  setAdminState: React.Dispatch<React.SetStateAction<AdminState>>;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  adminState,
  setAdminState,
  onMove,
}) => {
  return (
    <div className="bg-[#2a2a2a] rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Folder className="w-5 h-5" />
        Categories
      </h2>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <div key={category.id || index} className="flex items-center gap-2">
            <button
              onClick={() => setAdminState(prev => ({ ...prev, selectedCategory: index }))}
              className={`flex-1 text-left p-3 rounded-lg transition-colors ${
                adminState.selectedCategory === index
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-[#3a3a3a]'
              }`}
            >
              {category.name}
              {category.tags && category.tags.length > 0 && (
                <div className="flex gap-2 mt-1">
                  {category.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-gray-700 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </button>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => onMove(index, 'up')}
                disabled={index === 0}
                className={`p-1 rounded hover:bg-gray-700 ${
                  index === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <MoveUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => onMove(index, 'down')}
                disabled={index === categories.length - 1}
                className={`p-1 rounded hover:bg-gray-700 ${
                  index === categories.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <MoveDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;