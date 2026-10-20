import type { ReactNode } from 'react';

/**
 * DocFrame — a plain bordered content tile.
 * A sharp-edged card on the theme's card surface with an optional
 * metadata footer strip. No grid texture, no corner marks.
 */
interface DocFrameProps {
  children: ReactNode;
  /** classes on the frame itself (sizing, hover, span behaviour) */
  className?: string;
  /** classes on the content wrapper inside the frame (padding, layout) */
  bodyClassName?: string;
  /** small uppercase metadata strip along the bottom edge */
  footer?: ReactNode;
}

export function DocFrame({
  children,
  className = '',
  bodyClassName = '',
  footer,
}: DocFrameProps) {
  return (
    <div
      className={`relative border border-border bg-card/70 backdrop-blur-sm shadow-[0_30px_80px_-30px_hsl(0_0%_0%/0.35)] ${className}`}
    >
      <div className={`relative ${bodyClassName}`}>{children}</div>

      {footer && (
        <div className="relative flex items-center justify-between gap-3 border-t border-border px-6 py-3.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
          {footer}
        </div>
      )}
    </div>
  );
}
