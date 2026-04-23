export function WicketMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="2" height="22" rx="1" fill="currentColor" />
      <rect x="11" y="6" width="2" height="22" rx="1" fill="currentColor" />
      <rect x="19" y="6" width="2" height="22" rx="1" fill="currentColor" />
      <rect x="2" y="3" width="9" height="2" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="13" y="3" width="9" height="2" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="0" y="29" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
