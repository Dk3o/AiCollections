import React from 'react'
import { X } from "lucide-react";

export default function RequestAiTool({ onClose }) {
  return (
    <>
      <div className="request-ai-tool-container">
        <div className="request-ai-tool">
          <button 
            className="btn btn-cross" 
            onClick={onClose}>
            <X size={20}/>
          </button>
          <h2>Request tool</h2>
          <form className="form">
            <div>
            <span>Tool name</span>
            <input type='text'/>
            </div>
            <div>
            <span>Tags</span>
            <input type='text'/>
            </div>
            <div>
              <div className='title'>
                <span>Description</span>
                <span className="character-count">(225 characters)</span>
              </div>
            <textarea></textarea>
            </div>
          </form>
          <div className='test'>
            <button className="btn btn-send">Send</button>
            <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}
