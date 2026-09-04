export default function AfricaIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11.2 2.2c.6 1 1.8 1.3 2.6 2 .9.8 1 2 1.8 2.7.6.6 1.7.6 2.1 1.3.5.8 0 1.9.3 2.8.3.9 1.4 1.4 1.4 2.4 0 1.1-1.2 1.5-1.8 2.3-.5.7-.4 1.7-1 2.3-.7.7-1.9.5-2.6 1.1-.6.5-.7 1.5-1.4 1.9-.9.6-2.2.1-3.1.6-.6.3-.8 1.1-1.5 1.2-1 .2-1.7-.9-1.6-1.9.1-.8.9-1.3.9-2.1 0-.9-1-1.4-1.1-2.3-.1-.8.6-1.4.6-2.2 0-.9-.8-1.5-.7-2.4.1-.8 1-1.2 1.2-2 .2-.9-.4-1.8-.1-2.6.3-.8 1.3-1 1.7-1.7.4-.7.1-1.7.7-2.3.6-.6 1.7-.4 2.4-.9.5-.4.6-1.1 1.2-1.3Z" />
    </svg>
  )
}
