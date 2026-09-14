import { Wheat } from "lucide-react";
import "./MandiTrackLogo.css";

export default function MandiTrackLogo({ dark = false, compact = false, subtitle = "Apala Mandi Saathi" }) {
  return <div className={`manditrack-logo ${dark ? "logo-dark" : ""} ${compact ? "logo-compact" : ""}`} aria-label="MandiTrack">
    <span className="logo-mark"><Wheat aria-hidden="true" strokeWidth={2.3} /></span>
    <span className="logo-copy"><strong>MandiTrack</strong>{!compact && <small>{subtitle}</small>}</span>
  </div>;
}
