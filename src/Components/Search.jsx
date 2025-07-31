import styles from "../styles/components/Search.module.scss";
import { useState } from "react";
import { aiData } from "../data/AiData";
import { SearchInput } from "./Inputs";
import CategoryList from "./CategoryList";
import { ClearTagsButton, ExpandButton } from "./Buttons";

export default function Search({ onSearch, onTagFilterChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  const categories = [
    ...new Set(
      aiData.flatMap((tool) =>
        Array.isArray(tool.categories)
          ? tool.categories
          : tool.categories.split(",").map((c) => c.trim())
      ),
    ),
  ];

  function handleChange(e) {
    const value = e.target.value;
    setSearchValue(value);
    setSearchCount(value.length);
    onSearch(value.toLowerCase());
  }

  function handleClear() {
    setSearchValue("");
    setSearchCount(0);
    onSearch("");
  }

  function toggleSearchTags() {
    setIsExpanded((prev) => !prev);
  }

  function handleTagClick(category) {
    const isSelected = selectedTags.includes(category);
    const updatedTags = isSelected
      ? selectedTags.filter((t) => t !== category)
      : selectedTags.length < 5
        ? [...selectedTags, category]
        : selectedTags;

    setSelectedTags(updatedTags);
    onTagFilterChange(updatedTags);
  }

  function handleClearTags() {
    setSelectedTags([]);
    onTagFilterChange([]);
  }

  return (
    <div className="container">
      <div className={styles.search}>
        <SearchInput
          searchValue={searchValue}
          searchCount={searchCount}
          handleChange={handleChange}
          handleClear={handleClear}
        />
        <CategoryList
          categories={categories}
          selectedTags={selectedTags}
          handleTagClick={handleTagClick}
          isExpanded={isExpanded}
        />
        {selectedTags.length > 0 && <ClearTagsButton onClick={handleClearTags} />}
        <ExpandButton isExpanded={isExpanded} toggle={toggleSearchTags} />
      </div>
    </div>
  );
}
