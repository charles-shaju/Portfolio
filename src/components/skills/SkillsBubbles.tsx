import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from 'next-themes';
import { photographerInfo } from '@/data/photographer';

interface SkillBubble {
  name: string;
  category: string;
  baseX: number;
  baseY: number;
  icon: string;
}

// Simple text-based icons/abbreviations for tech stacks
const TECH_ICONS: Record<string, string> = {
  'Python': '🐍',
  'C / C++': '⚙️',
  'Java': '☕',
  'SQL': '🗃️',
  'Bash / Shell scripting': '💻',
  'TensorFlow': '🧠',
  'OpenCV': '👁️',
  'Django': '🌐',
  'MATLAB': '📊',
  'Git & GitHub': '🔀',
  'VS Code': '📝',
  'QGroundControl': '🛩️',
  'KiCad': '🔧',
  'Linux': '🐧',
  'Serial/UART/I2C/SPI debugging': '🔌',
  'ESP32 / ESP8266': '📡',
  'Raspberry Pi': '🍓',
  'Pixhawk (MAVLink, ArduPilot)': '✈️',
  'LoRa modules (SX1276/SX1278)': '📻',
  'Sonar systems': '🔊',
  'IMU, GPS, Barometer sensors': '🧭',
  'BLDC motors + ESCs': '⚡',
  'Underwater cameras': '📸',
  'Custom ROVs & ASVs': '🤖',
};

const CATEGORY_COLORS: Record<string, { h: number; s: number; l: number }> = {
  languages: { h: 250, s: 50, l: 70 },
  frameworks: { h: 220, s: 50, l: 68 },
  tools: { h: 160, s: 40, l: 65 },
  hardware: { h: 30, s: 55, l: 68 },
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
      icon: TECH_ICONS[skill] || '💡',
    });
  });

  return bubbles;
}

function Bubble({
  bubble,
  index,
  isExploded,
  explodeOffset,
  onCategoryClick,
}: {
  bubble: SkillBubble;
  index: number;
  isExploded: boolean;
  explodeOffset: { x: number; y: number };
  onCategoryClick: (cat: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const size = bubble.name.length > 15 ? 78 : bubble.name.length > 10 ? 68 : 58;

  const targetX = isExploded ? bubble.baseX + explodeOffset.x : bubble.baseX;
  const targetY = isExploded ? bubble.baseY + explodeOffset.y : bubble.baseY;

  const catColor = CATEGORY_COLORS[bubble.category];

  // Idle floating offset using CSS animation
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
      initial={{ x: bubble.baseX, y: bubble.baseY, scale: 0 }}
      animate={{
        x: targetX,
        y: targetY,
        scale: 1,
      }}
      transition={{
        x: { type: 'spring', stiffness: isExploded ? 40 : 8, damping: isExploded ? 12 : 6, mass: 1.5 },
        y: { type: 'spring', stiffness: isExploded ? 40 : 8, damping: isExploded ? 12 : 6, mass: 1.5 },
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
        onClick={() => onCategoryClick(bubble.category)}
        title={bubble.name}
      >
      {/* Bubble shine highlight */}
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

      {/* Always show text */}
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
  const [explodedCategory, setExplodedCategory] = useState<string | null>(null);
  const [explodeOffsets, setExplodeOffsets] = useState<Record<string, { x: number; y: number }[]>>({});

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
      const categoryBubbles = bubbles.filter((b) => b.category === category);
      const offsets = categoryBubbles.map(() => ({
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
      }));

      setExplodeOffsets((prev) => ({ ...prev, [category]: offsets }));
      setExplodedCategory(category);

      // Slowly reduce offsets over time for gradual reform
      let step = 0;
      const totalSteps = 20;
      const interval = setInterval(() => {
        step++;
        const factor = 1 - step / totalSteps;
        setExplodeOffsets((prev) => ({
          ...prev,
          [category]: offsets.map((o) => ({
            x: o.x * factor,
            y: o.y * factor,
          })),
        }));
        if (step >= totalSteps) {
          clearInterval(interval);
          setExplodedCategory(null);
        }
      }, 250); // 250ms * 20 steps = 5 seconds to fully reform
    },
    [bubbles]
  );

  const getExplodeOffset = (bubble: SkillBubble) => {
    if (explodedCategory !== bubble.category) return { x: 0, y: 0 };
    const categoryBubbles = bubbles.filter((b) => b.category === bubble.category);
    const catIndex = categoryBubbles.indexOf(bubble);
    return explodeOffsets[bubble.category]?.[catIndex] || { x: 0, y: 0 };
  };

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

      {/* Category Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const c = CATEGORY_COLORS[key];
          return (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className="flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.6), hsl(${c.h} ${c.s}% ${c.l}%) 70%)`,
                }}
              />
              {label}
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground font-light">
        Hover to see names · Click a cluster to scatter
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
            index={i}
            isExploded={explodedCategory === bubble.category}
            explodeOffset={getExplodeOffset(bubble)}
            onCategoryClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  );
}
