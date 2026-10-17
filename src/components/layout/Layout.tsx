import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout wrapper: shared header/footer, drafting-grid page background
 * and a soft ember glow that follows the cursor on every page.
 */
export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = glowRef.current;
      if (!el) return;
      el.style.setProperty('--mx', `${e.clientX}px`);
      el.style.setProperty('--my', `${e.clientY}px`);
      el.style.opacity = '1';
    };
    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <div aria-hidden className="fixed inset-0 z-0 page-grid pointer-events-none" />
      <div aria-hidden ref={glowRef} className="fixed inset-0 z-0 cursor-glow pointer-events-none opacity-0" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main
          id="main-content"
          className={`flex-1 ${isHomepage ? '' : 'pt-16'}`}
          tabIndex={-1}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
