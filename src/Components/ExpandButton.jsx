import * as Icons from "lucide-react";

export default function ExpandButton({ isExpanded, toggle }) {
  return (
    <button
      onClick={toggle}
      className={`btn-primary-${isExpanded ? "minimize" : "expand"}`}
      aria-label={isExpanded ? "Collapse search categories" : "Expand search categories"}
    >
      {isExpanded ? <Icons.Minus size={36} /> : <Icons.Plus size={36} />}
    </button>
  );
}
