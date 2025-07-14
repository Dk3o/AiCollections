import React, { useState, useEffect } from 'react';
import { X } from "lucide-react";

export default function RequestAiTool({ onClose }) {
  const maxChars = 420;
  const [text, setText] = useState("");

  // ✅ Lock scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setText(input);
    }
  };

  return (
    <div className="request-ai-tool-container">
      <div className="request-ai-tool">
        <button className="btn btn-cross" onClick={onClose}>
          <X size={20} />
        </button>
        <h2>Request tool</h2>
        <form className="form">
          <div>
            <span>Tool name</span>
            <input type='text' />
          </div>
          <div>
            <span>Tags</span>
            <input type='text' />
          </div>
          <div>
            <div className='title'>
              <span>Description</span>
              <span className="character-count">
                ({maxChars - text.length} characters)
              </span>
            </div>
            <textarea
              value={text}
              onChange={handleChange}
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
