export function OutlinedText({ children }: { children: React.ReactNode }) {
    return (
      <span className="relative inline-block">
        <span
          aria-hidden
          className="absolute inset-0 text-transparent stroke-text"
        >
          {children}
        </span>
        <span className="relative text-white">{children}</span>
      </span>
    );
}