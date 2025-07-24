import React, { useState, useEffect } from 'react';
import { X, Info } from "lucide-react";

export default function RequestAiTool({ onClose }) {
  const tagMaxChar = 20;
  const descriptionMaxChars = 420;

  const initialToolState = {
    name: '',
    categories: [],
    description: '',
    icon: '',
  };

  const [tagsInput, setTagsInput] = useState('');
  const [requestTool, setRequestTool] = useState(initialToolState);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    categories: false,
    description: false,
  });
  
  const [errors, setErrors] = useState({
    name: false,
    categories: false,
    description: false,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleRequestToolName = (e) => {
    const value = e.target.value;
    setRequestTool({
      ...requestTool,
      name: value
    });

    if (touched.name) {
      setErrors(
        (prev) => (
          { ...prev, name: value.trim() === '' }
        )
      );
    }
  }
  

  const handleRequestToolTagsChange = (e) => {
    const value = e.target.value;
    const inputSegments = value.split(";").filter(Boolean);
  
    const existingTagCount = requestTool.categories.length;
  
    if (existingTagCount + inputSegments.length > 5) return;
  
    const isValid = inputSegments.every((category) => category.length <= tagMaxChar);
    if (!isValid) return;
  
    setTagsInput(value);
  };

  const handleRequestTagsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
  
      const newTags = tagsInput
        .split(";")
        .map((category) => category.trim())
        .filter((category) => category && category.length <= 16);
  
      const combinedTags = [...requestTool.categories, ...newTags];
      const limitedTags = combinedTags.slice(0, 5);
  
      setRequestTool((prev) => ({
        ...prev,
        categories: limitedTags,
      }));

      setTagsInput("");
      if (touched.categories) {
        setErrors((prev) => ({
          ...prev,
          categories: limitedTags.length === 0,
        }));
      }
    }
  };
  
  const handleRemoveTag = (indexToRemove) => {
    setRequestTool((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleRequestToolDescription = (e) => {
    const value = e.target.value;
    if (value.length <= descriptionMaxChars) {
      setRequestTool({
        ...requestTool,
        description: value
      })
      if (touched.description) {
        setErrors(
          (prev) => (
            { ...prev, description: value.trim() === '' }
          )
        );
      }
    }
  };

  const handleRequestToolIcon = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const allowedTypes = ['image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PNG and SVG files are allowed.');
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setRequestTool((prev) => ({
        ...prev,
        icon: reader.result, // base64 string
      }));
    };
  
    reader.readAsDataURL(file);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: requestTool.name.trim() === '',
      categories: requestTool.categories.length === 0,
      description: requestTool.description.trim() === '',
    };
  
    setErrors(newErrors);
    setTouched({ name: true, categories: true, description: true });
  
    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;
  
    setIsSending(true);
    setIsSent(false);
  
    console.log("Sending:", requestTool);
  
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setRequestTool(initialToolState);
      setTagsInput('');
      setTouched({ name: false, categories: false, description: false });
      setErrors({ name: false, categories: false, description: false });
    }, 1500);
  }

  return (
    <div className="request-ai-tool-container">
      <div className="request-ai-tool">
        <button className="btn btn-cross" onClick={onClose}>
          <X size={20} />
        </button>
        <h2>Request tool</h2>
        <form 
          onSubmit={handleSubmit}
          className="form"
        >
          <div>
            <label htmlFor="tool-name">
              {touched.name && errors.name && <span className="error">*</span>}
              Tool name 
            </label>
            <input 
              type="text" 
              id="tool-name" 
              name="toolName"
              className='input-text'
              value={requestTool.name}
              onChange={handleRequestToolName}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            />
          </div>

          <div>
          <div className='title'>
            <label htmlFor="categories">
              {touched.categories && errors.categories && <span className="error">*</span>}
              Categories
            </label>
            
            <div className="counter">
              <span className='count'>
                {(() => {
                  const segments = tagsInput.split(";");
                  const currentTag = segments[segments.length - 1] || "";
                  const charsLeft = tagMaxChar - currentTag.length;
                  return `(${charsLeft >= 0 ? charsLeft : 0} characters)`;
                })()}
              </span>
              <span className="count">({requestTool.categories.length}/5)</span>
            </div>
          </div>
          <div className="group">
            <input 
              type="text" 
              id="categories" 
              name="categories"
              className='input-text'
              value={tagsInput}
              onChange={handleRequestToolTagsChange}
              onKeyDown={handleRequestTagsKeyDown}
              onBlur={() => setTouched((prev) => ({ ...prev, categories: true }))}
            />
            <div className="tooltip">
              <Info size={18} absoluteStrokeWidth />
              <span className="tooltiptext">Tooltip text</span>
            </div>
          </div>
          {requestTool.categories.length > 0 ?
            <div className='banner-container'>
              {requestTool.categories.map((category, idx) => (
                <div
                  key={idx}
                  className='banner'
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(idx)}>
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
              <label htmlFor="description">
                {touched.description && errors.description && <span className="error">*</span>}
                Description
              </label>
              <span className="count">
                ({descriptionMaxChars - requestTool.description.length} characters)
              </span>
            </div>
            <textarea
              id="description"
              name="description"
              value={requestTool.description}
              onChange={handleRequestToolDescription}
              onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
            />
          </div>

          <div>
            <label htmlFor="icon" className='custom-file-label'>Upload icon (PNG or SVG)</label>
            <div className='file-upload-holder'>
              <input 
                type="file" 
                id="icon" 
                name="icon" 
                accept="image/png, image/svg+xml" 
                className='file-input' 
                onChange={handleRequestToolIcon}
              />
              {requestTool.icon && (
                <div className="icon-preview">
                  <img src={requestTool.icon} alt="Preview" style={{ width: "48px", height: "48px" }} />
                </div>
              )}
            </div>
          </div>
          <div className='test'>
          <button 
            type="submit" 
            className="btn btn-send"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
          <button 
            className="btn btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        </form>
        {isSent && (
            <div className="success-message">
              ✅ Tool request sent successfully!
            </div>
          )}
      </div>
    </div>
  );
}
