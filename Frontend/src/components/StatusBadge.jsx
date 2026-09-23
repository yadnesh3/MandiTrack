import React from "react";

function StatusBadge({ status }) {
  const s = (status || "pending").toLowerCase();

  switch (s) {
    case "approved":
      return (
        <span className="inline-flex items-center rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-2.5 py-1 text-[11px] font-semibold text-[#285C3A]">
          Approved
        </span>
      );

    case "rejected":
      return (
        <span className="inline-flex items-center rounded-full border border-[#E8CCCC] bg-[#FAEEEE] px-2.5 py-1 text-[11px] font-semibold text-[#A64B4B]">
          Rejected
        </span>
      );

    case "sold":
      return (
        <span className="inline-flex items-center rounded-full border border-[#D5DDE0] bg-[#EEF2F3] px-2.5 py-1 text-[11px] font-semibold text-[#477A7A]">
          Sold
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-2.5 py-1 text-[11px] font-semibold text-[#80672C]">
          Pending
        </span>
      );
  }
}

export default StatusBadge;