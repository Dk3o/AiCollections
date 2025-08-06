import styles from "../styles/components/CategoryList.module.scss";
import * as Icons from "lucide-react";
import { tagIcons } from "../data/tagIcons";

export default function CategoryList({ categories, selectedTags, handleTagClick, isExpanded }) {
  return (
    <div className={styles.categoryList}>
      <ul className={isExpanded ? styles.expandedCategories : styles.minimizedCategories}>
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
                className={`${styles.linkCategory} ${isActive ? styles.active : ""}`}
              >
                <Icon className={styles.icon} style={{ color }} />
                <span>{category}</span>
                <span className={styles.counter}>{category.length}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
