import * as Icons from "lucide-react";
import { aiData } from "../data/AiData";
import { tagIcons } from "../data/tagIcons";
import { useState } from "react";

export default function Search({ onSearch, onTagFilterChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    ...new Set(
      aiData.flatMap(tool =>
        Array.isArray(tool.tags)
          ? tool.tags
          : tool.tags.split(',').map(tag => tag.trim())
      )
    )
  ];

  function handleChange(e) {
    const value = e.target.value;
    setSearchValue(value);
    setSearchCount(value.length);
    onSearch(value.toLowerCase());
  }

  const handleClear = () => {
    setSearchCount(0);
    setSearchValue("");
    onSearch("");
  };

  const toggleSearchTags = () => {
    setIsExpanded(prev => !prev);
  };

  const handleTagClick = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    onTagFilterChange(newSelectedTags);
  };

  const handleClearTags = () => {
    setSelectedTags([]);
    onTagFilterChange([]);
  }

  return (
    <div className="container">
      <div className="search">
        <div className="input-with-icon">
          <input
            type="text"
            placeholder="Search tool..."
            value={searchValue}
            onChange={handleChange}
          />
          {
            searchCount > 0 ?
              <button className="btn-clear" onClick={handleClear}>
                <Icons.X className="clear-icon" size={20} />
              </button>
              : <Icons.Search className="search-icon" size={24} />
          }
        </div>
        <ul className={isExpanded ? 'expanded-tags' : 'minimized-tags'}>
          {tags.map((tag, index) => {
            const iconData = tagIcons[tag] || {};
            const Icon = Icons[iconData.icon] || Icons.Circle;
            const color = iconData.color || "#9CA3AF";
            const isActive = selectedTags.includes(tag);
            return (
              <li key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTagClick(tag);
                  }}
                  className={`link-tag ${isActive ? 'active' : ''}`}
                >
                  <Icon className="icon" style={{ color }} />
                  <span>{tag}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <button 
          onClick={toggleSearchTags} 
          className={`btn-primary-${isExpanded ? 'minimize' : 'expand'}`}
          aria-label={isExpanded ? 'Collapse search tags' : 'Expand search tags'}
        >
          {isExpanded ? <Icons.ChevronUp size={32} /> : <Icons.ChevronDown size={32} />}
        </button>
        {selectedTags.length > 0 && (
          <button 
            className="btn-clear-tags" 
            onClick={handleClearTags}
            aria-label="Clear tags"
          >
            <Icons.X className="clear-icon" size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
