import React, { useState, useEffect, useRef, useMemo } from "react";
import { aiData } from "../data/AiData";
import styles from "../styles/components/AiToolList.module.scss";
import{ List } from "lucide-react";

export default function AiToolList({ searchTerm, activeTags }) {
  const getPaginationSize = (isList) => (isList ? 32 : 24);

  const [scrollMode, setScrollMode] = useState("infinite"); // or "pagination"
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(getPaginationSize(true));
  const [list, setIsList] = useState(true);
  const containerRefs = useRef([]);
  const [containerHeights, setContainerHeights] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleList = () => { setIsList(true); }

    const handleCard = () => { setIsList(false); }

    const filteredTools = useMemo(() => {
      return aiData.filter(tool => {
        const nameMatch = tool.name.toLowerCase().includes(searchTerm);
        const categories = Array.isArray(tool.categories)
          ? tool.categories
          : tool.categories.split(',').map(t => t.trim());
    
        const searchTagMatch = categories.some(category =>
          category.toLowerCase().includes(searchTerm)
        );
    
        const selectedTagMatch =
          activeTags.length === 0 || activeTags.every(category => categories.includes(category));
    
        return (searchTerm ? nameMatch || searchTagMatch : true) && selectedTagMatch;
      })
      .map(tool => ({
        ...tool,
        uuid: crypto.randomUUID() // assign a persistent UUID here
      }));
    }, [searchTerm, activeTags]);

    const totalPages = Math.ceil(filteredTools.length / getPaginationSize(list));
    let toolsToRender = filteredTools;

    if (scrollMode === "infinite") {
      toolsToRender = filteredTools.slice(0, visibleCount);
    } else if (scrollMode === "pagination") {
      const start = (currentPage - 1) * getPaginationSize(list);
      const end = start + getPaginationSize(list);
      toolsToRender = filteredTools.slice(start, end);
    }
    
    const ToolItems = ({ tools, containerHeights, searchTerm, activeTags }) => {
      containerRefs.current = [];
      const chunked = [];
      for (let i = 0; i < tools.length; i += getPaginationSize(list)) {
        chunked.push(tools.slice(i, i + getPaginationSize(list)));
      }
    
      const isFiltered = searchTerm || activeTags.length > 0;
    
      return (
        <>
          {chunked.map((group, groupIndex) => (
            <div key={groupIndex} className={list ? styles.listGroup : styles.cardGroup}>
              <div
                className={list ? styles.listGroupContainer : styles.cardGroupContainer}
                ref={el => (containerRefs.current[groupIndex] = el)}
              >
                {group.map(tool => (
                  <div key={tool.uuid} className={styles.tool}>
                    <div className={styles.toolTop}>
                      <a
                        target={`_blank_${tool.name.replace(/\s+/g, "_")}_${tool.url.length}`}
                        href={tool.url}
                        rel="noopener noreferrer"
                      >
                        <img src={tool.icon} />
                        <h2>{tool.name}</h2>
                      </a>
                      {!list &&(
                        <div className={styles.categories}>
                          {tool.categories.map((category, i) => (
                            <React.Fragment key={i}>
                              <span>{category}</span>
                              {i < tool.categories.length - 1 && <span className={styles.dot}>•</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>
                    {list && (
                      <div className={styles.categories}>
                        {tool.categories.map((category, i) => (
                          <React.Fragment key={i}>
                            <span>{category}</span>
                            {i < tool.categories.length - 1 && <span className={styles.dot}>•</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {!list && <p>{tool.description}</p>}
                  </div>
                ))}
              </div>

              {/* Show pagination-divider for both views */}
              {scrollMode === "infinite" && !isFiltered && (
                <div className={styles.paginationDivider}>
                  <div className={styles.paginationDividerStart}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                      <path d="M1 1.5C0.723858 1.5 0.5 1.27614 0.5 1C0.5 0.723858 0.723858 0.5 1 0.5L1 1.5ZM1 1L1 0.5L11 0.500001L11 1L11 1.5L1 1.5L1 1Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className={styles.paginationDividerLine}>
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
                  <div className={styles.paginationDividerEnd}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                      <path d="M1 0.5C0.723858 0.5 0.5 0.723858 0.5 1C0.5 1.27614 0.723858 1.5 1 1.5L1 0.5ZM1 1L1 1.5L11 1.5L11 1L11 0.500001L1 0.5L1 1Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <span className={styles.paginationPage}>
                    <span>page</span>
                    <span className="dot">•</span>
                    <span>{groupIndex + 1}</span>
                  </span>
                </div>
              )}
            </div>
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
      if (scrollMode !== "infinite") return;
    
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
    
        if (scrollY + viewportHeight >= fullHeight - 200) {
          if (visibleCount < filteredTools.length) {
            setVisibleCount(prev => prev + getPaginationSize(list));
          }
        }
      };
    
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollMode, visibleCount, filteredTools.length]);

    useEffect(() => {
      setVisibleCount(getPaginationSize(list));
    }, [searchTerm, activeTags, list]);
    
    function getPaginationRange(current, total) {
      const delta = 2; // How many pages to show around current
      const range = [];
      const rangeWithDots = [];
    
      let start = Math.max(2, current - delta);
      let end = Math.min(total - 1, current + delta);
    
      range.push(1); // Always show first page
    
      if (start > 2) {
        rangeWithDots.push('...');
      }
    
      for (let i = start; i <= end; i++) {
        rangeWithDots.push(i);
      }
    
      if (end < total - 1) {
        rangeWithDots.push('...');
      }
    
      if (total > 1) {
        rangeWithDots.push(total); // Always show last page
      }
    
      return [...range, ...rangeWithDots];
    }
    
    
  return (
    <>
      <div className={styles.container}>
        <div className={styles.panelMain}>
          <div className={styles.panelContainer}>
            <div className={styles.sort}>
              {/* List View Button */}
              <button
                className="btn-primary"
                onClick={handleList}
                aria-label="Switch to list view"
              >
                <List color={list ? "#3279FE" : "#9A9A9A"} size={24} />
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
            <div className={styles.paging}>
              <button
                className={`btn btn-primary ${scrollMode === "infinite" ? "active" : ""}`}
                aria-label={scrollMode === "infinite" ? "Infinite scrolling is activated" : "Switch to infinite scrolling"}
                onClick={() => {
                  setScrollMode("infinite");
                  setVisibleCount(getPaginationSize(list));
                }}
              >
                Infinite scrolling
              </button>
              <button
                className={`btn-primary ${scrollMode === "pagination" ? "active" : ""}`}
                aria-label={scrollMode === "pagination" ? "Pagination is activated" : "Switch to pagination"}
                onClick={() => {
                  setScrollMode("pagination");
                  setCurrentPage(1);
                }}
              >
                Pagination
              </button>
              {/* <button className="btn-primary active" aria-label="Switch to list view">Infinity scrolling</button>
              <button className="btn-primary" aria-label="Switch to card view">Pagination</button> */}
            </div>
          </div>
        </div>
        {list ? (
          <div className={styles.list}>
            <ToolItems
              tools={toolsToRender}
              containerHeights={containerHeights}
              searchTerm={searchTerm}
              activeTags={activeTags}
            />
            {isLoadingMore && (
              <div className={styles.loader}>
                <svg className={styles.spinner} viewBox="0 0 50 50">
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
          <div className={styles.card}>
            <ToolItems
              tools={toolsToRender}
              containerHeights={containerHeights}
              searchTerm={searchTerm}
              activeTags={activeTags}
            />
          </div>
        )}

        {scrollMode === "pagination" && totalPages > 1 && (
          <div className={styles.paginationNumbers}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              First
            </button>

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Prev
            </button>

            {getPaginationRange(currentPage, totalPages).map((item, index) => (
              item === '...' ? (
                <span key={`dots-${index}`} className="dots">…</span>
              ) : (
                <button
                  key={item}
                  className={`${styles.pageBtn} ${item === currentPage ? styles.active : ""}`}
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </button>
              )
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              Last
            </button>
          </div>
        )}
      </div>
    </>
  );
}
