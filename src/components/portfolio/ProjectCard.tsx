import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
  variant?: 'default' | 'terminal';
}

/**
 * Project card component with image, hover overlay, and smooth animations
 * Used in homepage featured projects and portfolio grid
 */
export function ProjectCard({ 
  project, 
  aspectRatio, 
  showCategory = true,
  index = 0,
  variant = 'default'
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const ratio = aspectRatio || 'landscape';
  
  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square'
  };

  if (variant === 'terminal') {
    return <TerminalProjectCard project={project} index={index} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block relative overflow-hidden rounded-sm"
      >
        {/* Image Container */}
        <div className={cn('relative overflow-hidden bg-muted', aspectRatioClasses[ratio])}>
          {/* Loading placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-muted" />
          )}
          
          <motion.img
            src={project.coverImage}
            alt={project.title}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700',
              isLoaded ? 'opacity-100' : 'opacity-0',
              'group-hover:scale-110'
            )}
            loading={index < 6 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Overlay with gradient and text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
              <h3 className="text-white text-xl md:text-2xl font-light tracking-wide">
                {project.title}
              </h3>
              {showCategory && (
                <div className="flex items-center gap-3 text-sm text-white/80 font-light tracking-wide">
                  <span className="capitalize">{project.category}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
              )}
            </div>
          </div>

          {/* Subtle hover border effect */}
          <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Terminal schematic project card with time-based view cycling.
 * Primary view shows project image and overview;
 * secondary view reveals technical diagnostics and stack details.
 */
function TerminalProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const delay = (index % 6) * 1.5;
  const serial = `${project.category.toUpperCase()} // ${project.year}`;
  const stackLabel = ['ai', 'embedded', 'iot'].includes(project.category)
    ? 'SOFTWARE_STACK'
    : 'HARDWARE_STACK';
  const primaryTech = project.techStack?.slice(0, 3) ?? [];
  const progress = deriveProgress(project.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block relative h-96 overflow-hidden rounded-sm border border-accent-cyan/20 bg-slate-900 transition-colors hover:border-accent-cyan/50"
      >
        {/* Decorative HUD corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-cyan/40 z-20" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-cyan/40 z-20" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-cyan/40 z-20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-cyan/40 z-20" />

        {/* Scanline overlay */}
        <div className="pointer-events-none absolute inset-0 scanline z-10" />

        {/* Primary view: project visuals and overview */}
        <div
          className="absolute inset-0 p-5 flex flex-col animate-card-cycle group-hover:[animation-play-state:paused]"
          style={{ animationDelay: `${delay}s` }}
        >
          <div className="relative aspect-video mb-4 overflow-hidden rounded-sm border border-white/10 bg-muted">
            {!isLoaded && <div className="absolute inset-0 bg-muted" />}
            <img
              src={project.coverImage}
              alt={project.title}
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
                isLoaded ? 'opacity-100' : 'opacity-0'
              )}
              loading={index < 6 ? 'eager' : 'lazy'}
              onLoad={() => setIsLoaded(true)}
            />
            <div className="absolute inset-0 bg-accent-cyan/10 mix-blend-multiply" />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent-cyan/80">
              {serial}
            </span>
            <h3 className="font-mono text-lg font-bold text-slate-100 line-clamp-2">
              {project.title}
            </h3>
          </div>

          <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {primaryTech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-medium uppercase tracking-tighter rounded-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Secondary view: technical diagnostics */}
        <div
          className="absolute inset-0 p-6 flex flex-col bg-slate-900/90 opacity-0 animate-data-cycle group-hover:[animation-play-state:paused]"
          style={{ animationDelay: `${delay}s` }}
        >
          <div className="font-mono text-xs text-accent-cyan mb-6 flex justify-between">
            <span>SYSTEM_DIAGNOSTICS</span>
            <span className="animate-pulse">● ONLINE</span>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1 uppercase tracking-widest">
                <span>Project Readiness</span>
                <span className="text-accent-cyan">{progress}%</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-cyan/50 transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border-l border-accent-cyan/30 pl-3">
                <span className="block font-mono text-[10px] text-slate-500 uppercase">Category</span>
                <span className="font-mono text-sm text-slate-200 capitalize">{project.category}</span>
              </div>
              <div className="border-l border-accent-cyan/30 pl-3">
                <span className="block font-mono text-[10px] text-slate-500 uppercase">Year</span>
                <span className="font-mono text-sm text-slate-200">{project.year}</span>
              </div>
            </div>

            <div className="p-3 bg-accent-cyan/5 rounded-sm border border-accent-cyan/10">
              <span className="block font-mono text-[10px] text-accent-cyan/70 mb-2 tracking-tighter">
                {stackLabel}
              </span>
              <p className="font-mono text-[11px] text-slate-300 leading-tight">
                {project.techStack?.join(', ') ?? 'N/A'}
              </p>
            </div>
          </div>

          <div className="mt-auto w-full py-2 border border-accent-cyan/40 text-accent-cyan text-[10px] font-mono uppercase tracking-widest text-center group-hover:bg-accent-cyan/10 transition-colors">
            View Project _
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Derive a deterministic readiness percentage from a project title.
 */
function deriveProgress(title: string): number {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  return 80 + (Math.abs(hash) % 19);
}
