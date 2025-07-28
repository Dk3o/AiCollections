import * as Icons from "lucide-react";

export default function ClearTagsButton({ onClick }) {
  return (
    <button
      className="btn-clear-categories"
      onClick={onClick}
      aria-label="Clear categories"
    >
      <Icons.X className="clear-icon" size={20} />
    </button>
  );
}
