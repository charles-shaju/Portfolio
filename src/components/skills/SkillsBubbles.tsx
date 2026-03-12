import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from 'next-themes';
import { photographerInfo } from '@/data/photographer';

interface SkillBubble {
  name: string;
  category: string;
  baseX: number;
  baseY: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  languages: 'hsl(var(--primary))',
  frameworks: 'hsl(220, 60%, 50%)',
  tools: 'hsl(160, 50%, 45%)',
  hardware: 'hsl(30, 70%, 50%)',
};

const CATEGORY_LABELS: Record<string, string> = {
  languages: 'Languages',
  frameworks: 'Frameworks',
  tools: 'Tools',
  hardware: 'Hardware',
};

function getClusterCenters(containerWidth: number, containerHeight: number) {
  const cx = containerWidth / 2;
  const cy = containerHeight / 2;
  const spreadX = Math.min(containerWidth * 0.28, 200);
  const spreadY = Math.min(containerHeight * 0.28, 140);
  return {
    languages: { x: cx - spreadX, y: cy - spreadY },
    frameworks: { x: cx + spreadX, y: cy - spreadY },
    tools: { x: cx - spreadX, y: cy + spreadY },
    hardware: { x: cx + spreadX, y: cy + spreadY },
  };
}

function arrangeBubblesInCluster(
  skills: string[],
  category: string,
  centerX: number,
  centerY: number
): SkillBubble[] {
  const bubbles: SkillBubble[] = [];
  const count = skills.length;
  const radius = Math.min(30 + count * 8, 80);

  skills.forEach((skill, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    const r = i === 0 ? 0 : radius * (0.5 + (i / count) * 0.5);
    bubbles.push({
      name: skill,
      category,
      baseX: centerX + Math.cos(angle) * r,
      baseY: centerY + Math.sin(angle) * r,
    });
  });

  return bubbles;
}

function Bubble({
  bubble,
  isExploded,
  explodeOffset,
  onCategoryClick,
  containerRect,
}: {
  bubble: SkillBubble;
  isExploded: boolean;
  explodeOffset: { x: number; y: number };
  onCategoryClick: (cat: string) => void;
  containerRect: DOMRect | null;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();

  const size = bubble.name.length > 15 ? 70 : bubble.name.length > 10 ? 60 : 50;

  const targetX = isExploded ? bubble.baseX + explodeOffset.x : bubble.baseX;
  const targetY = isExploded ? bubble.baseY + explodeOffset.y : bubble.baseY;

  const bgColor = isHovered
    ? resolvedTheme === 'dark'
      ? 'hsl(0, 0%, 100%)'
      : 'hsl(0, 0%, 0%)'
    : CATEGORY_COLORS[bubble.category];

  const textColor = isHovered
    ? resolvedTheme === 'dark'
      ? 'hsl(0, 0%, 0%)'
      : 'hsl(0, 0%, 100%)'
    : 'hsl(0, 0%, 100%)';

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full cursor-pointer select-none shadow-md"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{ x: bubble.baseX, y: bubble.baseY, scale: 0 }}
      animate={{
        x: targetX,
        y: targetY,
        scale: 1,
        backgroundColor: bgColor,
        color: textColor,
      }}
      transition={{
        x: { type: 'spring', stiffness: 40, damping: 12, mass: 1.5 },
        y: { type: 'spring', stiffness: 40, damping: 12, mass: 1.5 },
        scale: { type: 'spring', stiffness: 200, damping: 15 },
        backgroundColor: { duration: 0.2 },
        color: { duration: 0.2 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onCategoryClick(bubble.category)}
      whileHover={{ scale: 1.15, zIndex: 20 }}
      title={bubble.name}
    >
      <span
        className="text-center font-light leading-tight pointer-events-none"
        style={{
          fontSize: bubble.name.length > 15 ? '7px' : bubble.name.length > 10 ? '8px' : '9px',
          padding: '4px',
        }}
      >
        {bubble.name}
      </span>
    </motion.div>
  );
}

export default function SkillsBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [bubbles, setBubbles] = useState<SkillBubble[]>([]);
  const [explodedCategory, setExplodedCategory] = useState<string | null>(null);
  const [explodeOffsets, setExplodeOffsets] = useState<Record<string, { x: number; y: number }[]>>({});
  const reformTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Build bubbles when container is measured
  useEffect(() => {
    if (!containerRect) return;
    const w = containerRect.width;
    const h = containerRect.height;
    const centers = getClusterCenters(w, h);

    const allBubbles: SkillBubble[] = [
      ...arrangeBubblesInCluster(photographerInfo.skills.languages, 'languages', centers.languages.x, centers.languages.y),
      ...arrangeBubblesInCluster(photographerInfo.skills.frameworks, 'frameworks', centers.frameworks.x, centers.frameworks.y),
      ...arrangeBubblesInCluster(photographerInfo.skills.tools, 'tools', centers.tools.x, centers.tools.y),
      ...arrangeBubblesInCluster(photographerInfo.skills.hardware, 'hardware', centers.hardware.x, centers.hardware.y),
    ];

    setBubbles(allBubbles);
  }, [containerRect]);

  const handleCategoryClick = useCallback(
    (category: string) => {
      // Generate random explode offsets for the clicked category
      const categoryBubbles = bubbles.filter((b) => b.category === category);
      const offsets = categoryBubbles.map(() => ({
        x: (Math.random() - 0.5) * 250,
        y: (Math.random() - 0.5) * 250,
      }));

      setExplodeOffsets((prev) => ({ ...prev, [category]: offsets }));
      setExplodedCategory(category);

      // Clear any previous reform timer
      if (reformTimerRef.current) clearTimeout(reformTimerRef.current);

      // Reform after 2.5 seconds
      reformTimerRef.current = setTimeout(() => {
        setExplodedCategory(null);
      }, 2500);
    },
    [bubbles]
  );

  const getExplodeOffset = (bubble: SkillBubble, index: number) => {
    if (explodedCategory !== bubble.category) return { x: 0, y: 0 };
    const categoryBubbles = bubbles.filter((b) => b.category === bubble.category);
    const catIndex = categoryBubbles.indexOf(bubble);
    return explodeOffsets[bubble.category]?.[catIndex] || { x: 0, y: 0 };
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-light tracking-wide text-center">Technical Skills</h3>

      {/* Category Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleCategoryClick(key)}
            className="flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[key] }}
            />
            {label}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground font-light">
        Click a cluster or label to explode it
      </p>

      {/* Bubble Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-sm border border-border bg-background"
        style={{ height: '500px' }}
      >
        {bubbles.map((bubble, i) => (
          <Bubble
            key={`${bubble.category}-${bubble.name}`}
            bubble={bubble}
            isExploded={explodedCategory === bubble.category}
            explodeOffset={getExplodeOffset(bubble, i)}
            onCategoryClick={handleCategoryClick}
            containerRect={containerRect}
          />
        ))}
      </div>
    </div>
  );
}
