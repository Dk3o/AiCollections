import React, { useState, useEffect, useRef, useMemo } from "react";
import { aiData } from "../data/AiData";

export default function AiToolList({ searchTerm, activeTags }) {
  const paginationSize = 48;

  const [visibleCount, setVisibleCount] = useState(paginationSize);
  const [list, setIsList] = useState(true);
  const containerRefs = useRef([]);
  const [containerHeights, setContainerHeights] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleList = () => { setIsList(true); }

    const handleCard = () => { setIsList(false); }

    const filteredTools = useMemo(() => {
      return aiData.filter(tool => {
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
    }, [searchTerm, activeTags]);

    const ToolItems = ({ tools, containerHeights, searchTerm, activeTags }) => {
      containerRefs.current = [];
      const chunked = [];
      for (let i = 0; i < tools.length; i += paginationSize) {
        chunked.push(tools.slice(i, i + paginationSize));
      }
    
      const isFiltered = searchTerm || activeTags.length > 0;
    
      return (
        <>
          {chunked.map((group, groupIndex, i) => (
            list ? (
                <div key={groupIndex} className="list-group">
                  <div className="list-group-container" ref={el => (containerRefs.current[groupIndex] = el)}>
                  {group.map(tool => (
                    <div key={tool[i]} className="tool">
                      <div className="tool-top">
                        <img src={tool.icon} />
                        <a
                          target={`_blank_${tool.name.replace(/\s+/g, "_")}_${tool.url.length}`}
                          href={tool.url}
                          rel="noopener noreferrer"
                        >
                          <h2>{tool.name}</h2>
                        </a>
                      </div>
                      <div className="tags">
                          {tool.tags.map((tag, i) => (
                            <React.Fragment key={i}>
                              <span>{tag}</span>
                              {i < tool.tags.length - 1 && <span className="dot">•</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      {!list && <p>{tool.description}</p>}
                    </div>
                  ))}
                  </div>
                  {!isFiltered && (
                  <div className="pagination-divider">
                    <div className="pagination-divider-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                        <path d="M1 1.5C0.723858 1.5 0.5 1.27614 0.5 1C0.5 0.723858 0.723858 0.5 1 0.5L1 1.5ZM1 1L1 0.5L11 0.500001L11 1L11 1.5L1 1.5L1 1Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div className="pagination-divider-range">
                    {containerHeights[groupIndex] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1"
                        height={containerHeights[groupIndex]}
                        viewBox={`0 0 1 ${containerHeights[groupIndex]}`}
                        fill="none"
                      >
                        <line
                          x1="0.5"
                          y1="2"
                          x2="0.5"
                          y2={containerHeights[groupIndex]}
                          stroke="currentColor"
                        />
                      </svg>
                    )}
                    </div>
                    <div className="pagination-divider-end">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                        <path d="M1 0.5C0.723858 0.5 0.5 0.723858 0.5 1C0.5 1.27614 0.723858 1.5 1 1.5L1 0.5ZM1 1L1 1.5L11 1.5L11 1L11 0.500001L1 0.5L1 1Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <span className="pagination-page">P.{groupIndex+1}</span>
                  </div>
                )}  
                </div>
            ) : (
              group.map(tool => (
                <div key={tool.name} className="tool">
                  <div className="tool-top">
                    <img src={tool.icon} />
                    <a
                      target={`_blank_${tool.name.replace(/\s+/g, "_")}_${tool.url.length}`}
                      href={tool.url}
                      rel="noopener noreferrer"
                    >
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
                  {!list && <p>{tool.description}</p>}
                </div>
              ))
            )
          ))}
        </>
      );
    };

    useEffect(() => {
      const heights = containerRefs.current.map(ref =>
        ref ? ref.getBoundingClientRect().height : 0
      );
      setContainerHeights(heights);
    }, [list, visibleCount]);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
    
        if (scrollY + viewportHeight >= fullHeight - 200 && !isLoadingMore) {
          if (visibleCount < filteredTools.length) {
            setIsLoadingMore(true);
            // Simulate load time (e.g., fetching or layout update)
            setTimeout(() => {
              setVisibleCount(prev => prev + paginationSize);
              setIsLoadingMore(false);
            }, 500); // You can remove this timeout if everything is local
          }
        }
      };
    
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleCount, filteredTools.length, isLoadingMore]);

    useEffect(() => {
      setVisibleCount(paginationSize);
    }, [searchTerm, activeTags]);
    
    
  return (
    <>
      <div className="panel-main">
        <div className="panel-container">
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
          <div className="paging">
            <button className="btn-primary active" aria-label="Switch to list view">Infinity scrolling</button>
            <button className="btn-primary" aria-label="Switch to card view">Pagination</button>
          </div>
        </div>
      </div>
      {list ? (
        <div className="list">
          <ToolItems
            tools={filteredTools.slice(0, visibleCount)}
            containerHeights={containerHeights}
            searchTerm={searchTerm}
            activeTags={activeTags}
          />
          {isLoadingMore && (
            <div className="loader">
              <svg className="spinner" viewBox="0 0 50 50">
                <circle
                  className="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="5"
                />
              </svg>
              <span>Loading more tools...</span>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <ToolItems
            tools={filteredTools.slice(0, visibleCount)}
            containerHeights={containerHeights}
            searchTerm={searchTerm}
            activeTags={activeTags}
          />
        </div>
      )}
    </>
  );
}
