import React from 'react';

export default function RequestButton({ onClick }) {
  return (
    <div className="request">
      <a href="#" onClick={onClick}>
        <span>Did we miss any tool?</span>
      </a>
    </div>
  );
}
