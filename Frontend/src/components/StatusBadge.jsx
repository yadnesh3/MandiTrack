import React from "react";

function StatusBadge({ status }) {
  const s = (status || "pending").toLowerCase();

  switch (s) {
    case "approved":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-[#dcfce7] text-[#15803d] border border-[#86efac]">
          Approved
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5]">
          Rejected
        </span>
      );
    case "sold":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-[#dbeafe] text-[#1d4ed8] border border-[#93c5fd]">
          Sold
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-[#fef9c3] text-[#a16207] border border-[#fde047]">
          Pending
        </span>
      );
  }
}

export default StatusBadge;
