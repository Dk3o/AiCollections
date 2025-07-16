import React, { useState } from "react";
import { aiData } from "../data/AiData";

export default function AiToolList({ searchTerm, activeTags }) {
  const [list, setIsList] = useState(true);

    const handleList = () => { setIsList(true); }

    const handleCard = () => { setIsList(false); }

    const filteredTools = aiData.filter(tool => {
      const nameMatch = tool.name.toLowerCase().includes(searchTerm);
      const tags = Array.isArray(tool.tags)
        ? tool.tags
        : tool.tags.split(',').map(t => t.trim());
    
      const searchTagMatch = tags.some(tag =>
        tag.toLowerCase().includes(searchTerm)
      );
    
      const selectedTagMatch =
        activeTags.length === 0 || activeTags.every(tag => tags.includes(tag));
    
      return (searchTerm ? nameMatch || searchTagMatch : true) && selectedTagMatch;
    });
    
  return (
    <>
      <div className='sort'>
        {/* List View Button */}
        <button
          className="btn-primary"
          onClick={handleList}
          aria-label="Switch to list view"
        >
          {list ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <rect width="36" height="36" rx="6" fill="white" />
              <path d="M9 13H27" stroke="#3279FE" strokeLinecap="round" />
              <path d="M9 18H27" stroke="#3279FE" strokeLinecap="round" />
              <path d="M9 23H27" stroke="#3279FE" strokeLinecap="round" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <rect width="36" height="36" rx="6" fill="white" />
              <path d="M9 13H27" stroke="#9A9A9A" strokeLinecap="round" />
              <path d="M9 18H27" stroke="#9A9A9A" strokeLinecap="round" />
              <path d="M9 23H27" stroke="#9A9A9A" strokeLinecap="round" />
            </svg>
          )}
        </button>

        {/* Card/Grid View Button */}
        <button
          className="btn-primary"
          onClick={handleCard}
          aria-label="Switch to card view"
        >
          {!list ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <rect width="36" height="36" rx="6" fill="white" />
              <rect x="9.5" y="9.5" width="7" height="7" rx="1.5" stroke="#3279FE" />
              <rect x="9.5" y="19.5" width="7" height="7" rx="1.5" stroke="#3279FE" />
              <rect x="19.5" y="9.5" width="7" height="7" rx="1.5" stroke="#3279FE" />
              <rect x="19.5" y="19.5" width="7" height="7" rx="1.5" stroke="#3279FE" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <rect width="36" height="36" rx="6" fill="white" />
              <rect x="9.5" y="9.5" width="7" height="7" rx="1.5" stroke="#9A9A9A" />
              <rect x="9.5" y="19.5" width="7" height="7" rx="1.5" stroke="#9A9A9A" />
              <rect x="19.5" y="9.5" width="7" height="7" rx="1.5" stroke="#9A9A9A" />
              <rect x="19.5" y="19.5" width="7" height="7" rx="1.5" stroke="#9A9A9A" />
            </svg>
          )}
        </button>
      </div>
        <div className={list ? "list" : "card"}>
        {filteredTools.map(tool => (
          <div key={tool.name} className="tool">
            <div className="tool-top">
              <a
                target={`_blank_${tool.name.replace(/\s+/g, "_")}_${tool.url.length}`}
                href={tool.url}
                rel="noopener noreferrer"
              >
                {/* <img src={tool.icon} /> */}
                <h2>{tool.name}</h2>
              </a>
              <div className="tags">
                {tool.tags.map((tag, i) => (
                  <React.Fragment key={i}>
                    <span>{tag}</span>
                    {i < tool.tags.length - 1 && <span className="dot">•</span>}
                  </React.Fragment>
                ))}
              </div> 
              </div>    
              {/* {list && 
                <div className="tags"> {
                  tool.tags.map((tag, i) => (
                    <React.Fragment key={i}>
                      <span>{tag}</span>
                      {i < tool.tags.length - 1 && <span className="dot">•</span>}
                    </React.Fragment>
                  ))}
                </div>             
              } */}
            {!list && <p>{tool.description}</p>}
          </div>
        ))}
      </div>
    </>
  );
}
