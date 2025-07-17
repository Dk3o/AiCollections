import React, { useState, useEffect } from 'react';
import { X } from "lucide-react";

export default function RequestAiTool({ onClose }) {
  const maxChars = 420;
  const [requestTool, setRequestTool] = useState({
    name: '',
    tags: [],
    tagsInput: '',
    description: '',
    icon: '',
    });

  // ✅ Lock scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleRequestToolName = (e) => {
    const value = e.target.value;
console.log(value);
    setRequestTool({
      ...requestTool,
      name: value
    });
  
    console.log(value);
  }

  const handleRequestToolTagsChange = (e) => {
    const value = e.target.value;
    const inputSegments = value.split(";").filter(Boolean); // only real tag segments
  
    // How many tags are already added
    const existingTagCount = requestTool.tags.length;
  
    // If total would exceed 5, block input
    if (existingTagCount + inputSegments.length > 5) return;
  
    // All segments must be <= 16 characters
    const isValid = inputSegments.every((tag) => tag.length <= 16);
    if (!isValid) return;
  
    // Allow input update
    setRequestTool((prev) => ({
      ...prev,
      tagsInput: value,
    }));
  };

  const handleRequestTagsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
  
      const newTags = requestTool.tagsInput
        .split(";")
        .map((tag) => tag.trim())
        .filter((tag) => tag && tag.length <= 16);
  
      const combinedTags = [...requestTool.tags, ...newTags];
      
      // Keep only the first 5 items
      const limitedTags = combinedTags.slice(0, 5);
  
      console.log("Updated (limited) tags list:", limitedTags);
  
      setRequestTool((prev) => ({
        ...prev,
        tags: limitedTags,
        tagsInput: "",
      }));
    }
  };
  
  const handleRemoveTag = (indexToRemove) => {
    setRequestTool((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleRequestToolDescription = (e) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setText(input);
    }
  };

  const handleRequestToolIcon = () => {
    
  }

  return (
    <div className="request-ai-tool-container">
      <div className="request-ai-tool">
        <button className="btn btn-cross" onClick={onClose}>
          <X size={20} />
        </button>
        <h2>Request tool</h2>
        <form className="form">
          <div>
            <label htmlFor="tool-name">Tool name</label>
            <input 
              type="text" 
              id="tool-name" 
              name="toolName"
              className='input-text'
              value={requestTool.name}
              onChange={handleRequestToolName}
            />
          </div>

          <div>
            <div className='title'>
            <label htmlFor="tags">Tags</label>
            <div className="counter">
              <span className='count'>
                {(() => {
                  const segments = requestTool.tagsInput.split(";");
                  const currentTag = segments[segments.length - 1] || "";
                  const charsLeft = 16 - currentTag.length;
                  return `(${charsLeft >= 0 ? charsLeft : 0} characters)`;
                })()}
              </span>
              <span className="count">({requestTool.tags.length}/5)</span>
            </div>
          </div>
          <input 
            type="text" 
            id="tags" 
            name="tags"
            className='input-text'
            value={requestTool.tagsInput}
            onChange={handleRequestToolTagsChange}
            onKeyDown={handleRequestTagsKeyDown}
            disabled={requestTool.tags.length >= 5}
          />
          {requestTool.tags.length > 0 ?
            <div className='banner-container'>
              {requestTool.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className='banner'
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(idx)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            :
            ""
            }
          </div>

          <div>
            <div className="title">
              <label htmlFor="description">Description</label>
              <span className="count">
                ({maxChars - requestTool.description.length} characters)
              </span>
            </div>
            <textarea
              id="description"
              name="description"
              value={requestTool.description}
              onChange={handleRequestToolDescription}
            />
          </div>

          <div>
            <label htmlFor="icon" className='custom-file-label'>Upload icon (PNG or SVG)</label>
            <input 
              type="file" 
              id="icon" 
              name="icon" 
              accept="image/png, image/svg+xml" 
              className='file-input' 
            />
          </div>
        </form>
        <div className='test'>
          <button className="btn btn-send">Send</button>
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
