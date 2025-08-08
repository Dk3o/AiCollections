import styles from "../styles/components/CategoryList.module.scss";
import * as Icons from "lucide-react";
import { tagIcons } from "../data/tagIcons";
import { aiData } from "../data/AiData";

export default function CategoryList({ categories, selectedTags, handleTagClick, isExpanded }) {

  const categoryCounts = {};

  aiData.forEach(item => {
    item.categories.forEach(cat => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });

  return (
    <div className={styles.categoryList}>
      <div className={`${styles.categoryListContainer} ${isExpanded ? styles.border : ""}`}>
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
                  <span className={styles.counter}>
                    ({categoryCounts[category] || 0})
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
