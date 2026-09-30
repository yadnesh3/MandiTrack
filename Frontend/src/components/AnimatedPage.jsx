import React, { useEffect, useRef } from "react";

export default function AnimatedPage({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const revealEls = ref.current.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.06 }
    );
    revealEls.forEach((el) => observer.observe(el));

    const rows = ref.current.querySelectorAll("tbody tr");
    rows.forEach((row, i) => {
      row.classList.add("anim-row");
      row.style.animationDelay = i * 45 + "ms";
    });

    return () => observer.disconnect();
  }, [children]);

  return (
    <div ref={ref} className={"page-enter " + className}>
      {children}
    </div>
  );
}
