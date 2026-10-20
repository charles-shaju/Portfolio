import type { ReactNode } from 'react';

/**
 * DocFrame — the drafting-document tile used by the hero sheet.
 * A sharp bordered frame with ember corner registration marks,
 * a faint drafting-grid texture and an optional metadata footer strip.
 */
interface DocFrameProps {
  children: ReactNode;
  /** classes on the frame itself (sizing, hover, span behaviour) */
  className?: string;
  /** classes on the content wrapper inside the frame (padding, layout) */
  bodyClassName?: string;
  /** size utility for the corner marks, e.g. "size-4" or "size-7" */
  cornerClassName?: string;
  /** show the drafting-grid texture behind the content */
  grid?: boolean;
  /** small uppercase metadata strip along the bottom edge */
  footer?: ReactNode;
}

export function DocFrame({
  children,
  className = '',
  bodyClassName = '',
  cornerClassName = 'size-6',
  grid = true,
  footer,
}: DocFrameProps) {
  return (
    <div
      className={`relative border border-border bg-card/70 backdrop-blur-sm shadow-[0_30px_80px_-30px_hsl(0_0%_0%/0.35)] ${className}`}
    >
      {grid && <div className="page-grid pointer-events-none absolute inset-0" />}

      {/* Corner registration marks */}
      <span className={`pointer-events-none absolute -top-px -left-px ${cornerClassName} border-t-2 border-l-2 border-primary/80`} />
      <span className={`pointer-events-none absolute -top-px -right-px ${cornerClassName} border-t-2 border-r-2 border-primary/80`} />
      <span className={`pointer-events-none absolute -bottom-px -left-px ${cornerClassName} border-b-2 border-l-2 border-primary/80`} />
      <span className={`pointer-events-none absolute -bottom-px -right-px ${cornerClassName} border-b-2 border-r-2 border-primary/80`} />

      <div className={`relative ${bodyClassName}`}>{children}</div>

      {footer && (
        <div className="relative flex items-center justify-between gap-3 border-t border-border px-6 py-3.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
          {footer}
        </div>
      )}
    </div>
  );
}
