import { useState } from "react";
import * as Icons from "lucide-react";
import { aiData } from "../data/AiData";

export default function SearchInput({ searchValue, searchCount, handleChange, handleClear }) {
  return (
    <div className="input-with-icon">
      <input
        type="text"
        placeholder={`Search among ${aiData.length} tools...`}
        value={searchValue}
        onChange={handleChange}
      />
      {searchCount > 0 ? (
        <button className="btn-clear" onClick={handleClear}>
          <Icons.X className="clear-icon" size={20} />
        </button>
      ) : (
        <Icons.Search className="search-icon" size={24} />
      )}
    </div>
  );
}
