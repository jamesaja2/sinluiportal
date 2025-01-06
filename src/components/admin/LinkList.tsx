import React from 'react';
import { LinkCategory } from '../../types/links';
import { AdminState } from '../../types/admin';
import { Link as LinkIcon, MoveUp, MoveDown } from 'lucide-react';

interface LinkListProps {
  category: LinkCategory;
  adminState: AdminState;
  setAdminState: React.Dispatch<React.SetStateAction<AdminState>>;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

const LinkList: React.FC<LinkListProps> = ({
  category,
  adminState,
  setAdminState,
  onMove,
}) => {
  return (
    <div className="bg-[#2a2a2a] rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <LinkIcon className="w-5 h-5" />
        Links in {category.name}
      </h2>
      <div className="space-y-2">
        {category.links.map((link, index) => (
          <div key={link.id || index} className="flex items-center gap-2">
            <button
              onClick={() => setAdminState(prev => ({ ...prev, selectedLink: index }))}
              className={`flex-1 text-left p-3 rounded-lg transition-colors ${
                adminState.selectedLink === index
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-[#3a3a3a]'
              }`}
            >
              <div className="font-medium">{link.title}</div>
              <div className="text-sm text-gray-400">{link.description}</div>
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
                disabled={index === category.links.length - 1}
                className={`p-1 rounded hover:bg-gray-700 ${
                  index === category.links.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
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

export default LinkList;