import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { photographerInfo } from '@/data/photographer';

interface SkillBubble {
  name: string;
  category: string;
  combinedX: number;
  combinedY: number;
  clusteredX: number;
  clusteredY: number;
  explodedX: number;
  explodedY: number;
}

type Phase = 'combined' | 'clustered' | 'exploded';

const CATEGORY_COLORS: Record<string, { h: number; s: number; l: number }> = {
  languages: { h: 250, s: 50, l: 75 },
  frameworks: { h: 220, s: 50, l: 73 },
  tools: { h: 160, s: 40, l: 70 },
  hardware: { h: 30, s: 55, l: 73 },
};

const CATEGORY_LABELS: Record<string, string> = {
  languages: 'Languages',
  frameworks: 'Frameworks',
  tools: 'Tools',
  hardware: 'Hardware',
};

function arrangeCombined(
  allSkills: { name: string; category: string }[],
  cx: number,
  cy: number
) {
  // Interleave categories so colors are mixed in the spiral
  const byCategory: Record<string, number[]> = {};
  allSkills.forEach((s, i) => {
    if (!byCategory[s.category]) byCategory[s.category] = [];
    byCategory[s.category].push(i);
  });
  const cats = Object.keys(byCategory).sort(() => Math.random() - 0.5);
  const interleaved: number[] = [];
  const maxLen = Math.max(...cats.map(c => byCategory[c].length));
  for (let j = 0; j < maxLen; j++) {
    for (const cat of cats) {
      if (j < byCategory[cat].length) interleaved.push(byCategory[cat][j]);
    }
  }

  const positions: { x: number; y: number }[] = new Array(allSkills.length);
  interleaved.forEach((originalIdx, spiralIdx) => {
    const angle = 2.4 * spiralIdx;
    const r = 12 * Math.sqrt(spiralIdx + 1);
    positions[originalIdx] = { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  });
  return positions;
}

function arrangeCluster(
  skills: string[],
  centerX: number,
  centerY: number
) {
  const count = skills.length;
  const radius = Math.min(18 + count * 5, 55);
  return skills.map((_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    const r = i === 0 ? 0 : radius * (0.5 + (i / count) * 0.5);
    return { x: centerX + Math.cos(angle) * r, y: centerY + Math.sin(angle) * r };
  });
}

function arrangeExploded(
  skills: string[],
  centerX: number,
  centerY: number
) {
  const count = skills.length;
  const radius = Math.min(40 + count * 12, 120);
  return skills.map((_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    const r = radius * (0.6 + (i / count) * 0.4);
    return { x: centerX + Math.cos(angle) * r, y: centerY + Math.sin(angle) * r };
  });
}

function getClusterCenters(w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const spreadX = Math.min(w * 0.28, 200);
  const spreadY = Math.min(h * 0.28, 140);
  return {
    languages: { x: cx - spreadX, y: cy - spreadY },
    frameworks: { x: cx + spreadX, y: cy - spreadY },
    tools: { x: cx - spreadX, y: cy + spreadY },
    hardware: { x: cx + spreadX, y: cy + spreadY },
  };
}

function getTargetPosition(
  bubble: SkillBubble,
  phase: Phase,
  explodedCategory: string | null
) {
  if (phase === 'combined') {
    return { x: bubble.combinedX, y: bubble.combinedY };
  }
  if (phase === 'clustered') {
    return { x: bubble.clusteredX, y: bubble.clusteredY };
  }
  // exploded: only the clicked category explodes, others stay clustered
  if (bubble.category === explodedCategory) {
    return { x: bubble.explodedX, y: bubble.explodedY };
  }
  return { x: bubble.clusteredX, y: bubble.clusteredY };
}

function Bubble({
  bubble,
  index,
  phase,
  explodedCategory,
  onCategoryClick,
}: {
  bubble: SkillBubble;
  index: number;
  phase: Phase;
  explodedCategory: string | null;
  onCategoryClick: (category: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const size = bubble.name.length > 15 ? 78 : bubble.name.length > 10 ? 68 : 58;
  const catColor = CATEGORY_COLORS[bubble.category];
  const target = getTargetPosition(bubble, phase, explodedCategory);

  const floatDelay = (index * 0.7) % 3;
  const floatDuration = 3 + (index % 3);

  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{ x: bubble.combinedX, y: bubble.combinedY, scale: 0 }}
      animate={{ x: target.x, y: target.y, scale: 1 }}
      transition={{
        x: { type: 'spring', stiffness: 40, damping: 20, mass: 1.5 },
        y: { type: 'spring', stiffness: 40, damping: 20, mass: 1.5 },
        scale: { type: 'spring', stiffness: 200, damping: 15 },
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center rounded-full cursor-pointer select-none"
        style={{
          background: isHovered
            ? isDark
              ? `radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.85), hsl(${catColor.h} ${catColor.s}% 90%) 70%)`
              : `radial-gradient(circle at 30% 25%, hsl(${catColor.h} ${catColor.s}% 15% / 0.9), hsl(${catColor.h} ${catColor.s}% 25%) 70%)`
            : `radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.7), hsl(${catColor.h} ${catColor.s}% ${catColor.l}%) 70%)`,
          boxShadow: `0 4px 15px hsl(${catColor.h} ${catColor.s}% ${catColor.l}% / 0.25), inset 0 -3px 8px hsl(${catColor.h} ${catColor.s}% ${catColor.l + 10}% / 0.2), inset 0 2px 4px hsl(0 0% 100% / 0.4)`,
          animation: `bubble-float-${index % 4} ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onCategoryClick(bubble.category);
        }}
        title={bubble.name}
      >
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size * 0.35,
            height: size * 0.25,
            top: '15%',
            left: '20%',
            background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.6) 0%, hsl(0 0% 100% / 0) 100%)',
            borderRadius: '50%',
          }}
        />
        <span
          className="text-center font-medium leading-tight pointer-events-none z-10"
          style={{
            fontSize: bubble.name.length > 15 ? '7px' : bubble.name.length > 10 ? '8px' : '9px',
            padding: '4px',
            color: isHovered
              ? isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'
              : `hsl(${catColor.h} ${catColor.s}% 20%)`,
          }}
        >
          {bubble.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function SkillsBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [bubbles, setBubbles] = useState<SkillBubble[]>([]);
  const [phase, setPhase] = useState<Phase>('combined');
  const [explodedCategory, setExplodedCategory] = useState<string | null>(null);
  const mergeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (mergeTimerRef.current) {
      clearTimeout(mergeTimerRef.current);
      mergeTimerRef.current = null;
    }
  };

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

  useEffect(() => {
    if (!containerRect) return;
    const w = containerRect.width;
    const h = containerRect.height;
    const cx = w / 2;
    const cy = h / 2;
    const centers = getClusterCenters(w, h);
    const categories = ['languages', 'frameworks', 'tools', 'hardware'] as const;

    const allSkills: { name: string; category: string }[] = [];
    categories.forEach((cat) => {
      (photographerInfo.skills[cat] as string[]).forEach((name) => {
        allSkills.push({ name, category: cat });
      });
    });

    const combinedPositions = arrangeCombined(allSkills, cx, cy);

    const clusteredMap: Record<string, { x: number; y: number }[]> = {};
    const explodedMap: Record<string, { x: number; y: number }[]> = {};
    categories.forEach((cat) => {
      const skills = photographerInfo.skills[cat] as string[];
      clusteredMap[cat] = arrangeCluster(skills, centers[cat].x, centers[cat].y);
      explodedMap[cat] = arrangeExploded(skills, centers[cat].x, centers[cat].y);
    });

    const catCounters: Record<string, number> = { languages: 0, frameworks: 0, tools: 0, hardware: 0 };
    const bubblesData: SkillBubble[] = allSkills.map((skill, i) => {
      const catIdx = catCounters[skill.category]++;
      const cl = clusteredMap[skill.category][catIdx];
      const ex = explodedMap[skill.category][catIdx];
      return {
        name: skill.name,
        category: skill.category,
        combinedX: combinedPositions[i].x,
        combinedY: combinedPositions[i].y,
        clusteredX: cl.x,
        clusteredY: cl.y,
        explodedX: ex.x,
        explodedY: ex.y,
      };
    });

    setBubbles(bubblesData);
  }, [containerRect]);

  const schedulemergeBack = useCallback(() => {
    clearTimer();
    mergeTimerRef.current = setTimeout(() => {
      setPhase('combined');
      setExplodedCategory(null);
    }, 6000);
  }, []);

  // Click on the container (background) when combined → separate into clusters
  const handleContainerClick = useCallback(() => {
    if (phase === 'combined') {
      clearTimer();
      setPhase('clustered');
      schedulemergeBack();
    } else {
      // clicking background resets
      clearTimer();
      setPhase('combined');
      setExplodedCategory(null);
    }
  }, [phase, schedulemergeBack]);

  // Click on a bubble → if clustered, explode that category
  const handleCategoryClick = useCallback((category: string) => {
    if (phase === 'combined') {
      // First click separates into clusters
      clearTimer();
      setPhase('clustered');
      schedulemergeBack();
    } else if (phase === 'clustered') {
      // Second click on a cluster explodes it
      clearTimer();
      setExplodedCategory(category);
      setPhase('exploded');
      schedulemergeBack();
    } else if (phase === 'exploded') {
      if (explodedCategory === category) {
        // Clicking same exploded category → back to clustered
        clearTimer();
        setExplodedCategory(null);
        setPhase('clustered');
        schedulemergeBack();
      } else {
        // Clicking different category → explode that one instead
        clearTimer();
        setExplodedCategory(category);
        schedulemergeBack();
      }
    }
  }, [phase, explodedCategory, schedulemergeBack]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes bubble-float-0 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, -5px); }
        }
        @keyframes bubble-float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-4px, 3px); }
        }
        @keyframes bubble-float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(5px, 4px); }
        }
        @keyframes bubble-float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-3px, -4px); }
        }
      `}</style>

      <h3 className="text-2xl font-light tracking-wide text-center">Technical Skills</h3>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const c = CATEGORY_COLORS[key];
          return (
            <div
              key={key}
              className="flex items-center gap-2 text-sm font-light text-muted-foreground"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.6), hsl(${c.h} ${c.s}% ${c.l}%) 70%)`,
                }}
              />
              {label}
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground font-light">
        Click to separate · Click a cluster to expand · Auto-merges after 3s
      </p>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-sm border border-border bg-background cursor-pointer"
        style={{ height: '500px' }}
        onClick={handleContainerClick}
      >
        {bubbles.map((bubble, i) => (
          <Bubble
            key={`${bubble.category}-${bubble.name}`}
            bubble={bubble}
            index={i}
            phase={phase}
            explodedCategory={explodedCategory}
            onCategoryClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  );
}
