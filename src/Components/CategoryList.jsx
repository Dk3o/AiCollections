import * as Icons from "lucide-react";
import { tagIcons } from "../data/tagIcons";

export default function CategoryList({ categories, selectedTags, handleTagClick, isExpanded }) {
  return (
    <ul className={isExpanded ? "expanded-categories" : "minimized-categories"}>
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
              className={`link-category ${isActive ? "active" : ""}`}
            >
              <Icon className="icon" style={{ color }} />
              <span>{category}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
