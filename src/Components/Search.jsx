import * as Icons from "lucide-react";
import { aiData } from "../data/AiData";
import { tagIcons } from "../data/tagIcons";
import { useState } from "react";

export default function Search({ onSearch, onTagFilterChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  const categories = [
    ...new Set(
      aiData.flatMap(tool =>
        Array.isArray(tool.categories)
          ? tool.categories
          : tool.categories.split(',').map(category => category.trim())
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

  const handleTagClick = (category) => {
  const isSelected = selectedTags.includes(category);

  if (isSelected) {
    // Remove category
    const newSelectedTags = selectedTags.filter(t => t !== category);
    setSelectedTags(newSelectedTags);
    onTagFilterChange(newSelectedTags);
  } else {
    // Prevent adding more than 5 categories
    if (selectedTags.length >= 5) return;

    const newSelectedTags = [...selectedTags, category];
    setSelectedTags(newSelectedTags);
    onTagFilterChange(newSelectedTags);
  }
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
            placeholder={`Search among ${aiData.length} tools...`}
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
        <ul className={isExpanded ? 'expanded-categories' : 'minimized-categories'}>
          {categories.map((category, index) => {
            const iconData = tagIcons[category] || {};
            const Icon = Icons[iconData.icon] || Icons.Circle;
            const color = iconData.color || "#9CA3AF";
            const isActive = selectedTags.includes(category);
            return (
              <li key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTagClick(category);
                  }}
                  className={`link-category ${isActive ? 'active' : ''}`}
                >
                  <Icon className="icon" style={{ color }} />
                  <span>{category}</span>
                </a>
              </li>
            );
          })}
        </ul>
        {selectedTags.length > 0 && (
          <button 
            className="btn-clear-categories" 
            onClick={handleClearTags}
            aria-label="Clear categories"
          >
            <Icons.X className="clear-icon" size={20} />
          </button>
        )}
        <button 
          onClick={toggleSearchTags} 
          className={`btn-primary-${isExpanded ? 'minimize' : 'expand'}`}
          aria-label={isExpanded ? 'Collapse search categories' : 'Expand search categories'}
        >
          {isExpanded ? <Icons.Minus size={36} /> : <Icons.Plus size={36} />}
        </button>
      </div>
    </div>
  );
}
