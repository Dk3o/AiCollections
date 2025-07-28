import React from 'react';

export default function SubmitButtons({ onCancel, isSending }) {
  return (
    <div className='test'>
      <button
        type="submit"
        className="btn btn-send"
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Send"}
      </button>
      <button
        type="button"
        className="btn btn-cancel"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
}
