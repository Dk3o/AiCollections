import * as Icons from "lucide-react";
import { aiData } from "../data/AiData";
import { tagIcons } from "../data/tagIcons";
import { useState } from "react";

export default function Search({ onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
    onSearch(e.target.value.toLowerCase());
  }

  const toggleSearchTags = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div class="container">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
        />
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
        <button onClick={toggleSearchTags} className={`btn-primary ${isExpanded ? 'minimize': 'expand'}`}>
          {isExpanded ? <Icons.ChevronUp size={32} />: <Icons.ChevronDown size={32} />}
        </button>
      </div>
    </div>
  );
}
