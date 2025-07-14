import * as Icons from "lucide-react";
import { aiData } from "../data/AiData";
import { tagIcons } from "../data/tagIcons";
import { useState } from "react";

export default function Search({ onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchCount, setSearchCount] = useState(0);

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
    setSearchCount(value.length)
    onSearch(value.toLowerCase());
  }

  const handleClear = () => {
    setSearchCount(0);
    setSearchValue("");
    onSearch("");
  }

  const toggleSearchTags = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="container">
      <div className="search">
        <div className="input-with-icon">
          {
            searchCount > 0 ?
            <button className="btn-clear" onClick={handleClear}>
              <Icons.X className="clear-icon" size={20} />
            </button>
            : <Icons.Search className="search-icon" size={20} />
          }
          <input
            type="text"
            placeholder="Search tool..."
            value={searchValue}
            onChange={handleChange}
          />
        </div>
        <ul className={isExpanded ? 'expanded-tags' : 'minimized-tags'}>
          {tags.map((tag, index) => {
            const iconData = tagIcons[tag] || {};
            const Icon = Icons[iconData.icon] || Icons.Circle;
            const color = iconData.color || "#9CA3AF";
            return (
              <li key={index}>
                <a href="#" className="link-tag">
                  <Icon className="icon" style={{ color }} />
                  <span>{tag}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <button onClick={toggleSearchTags} className={`btn-primary-${isExpanded ? 'minimize': 'expand'}`}>
          {isExpanded ? <Icons.ChevronUp size={32} />: <Icons.ChevronDown size={32} />}
        </button>
      </div>
    </div>
  );
}
