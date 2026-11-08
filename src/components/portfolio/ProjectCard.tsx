import React from 'react';
import { Link } from '@/lib/router-compat';
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

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const serial = `${project.category.toUpperCase()}${project.year ? ` // ${project.year}` : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        to={`/project/${project.slug}`}
        className="group relative flex h-full min-h-[29rem] flex-col overflow-hidden rounded-sm border border-border bg-card p-4 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="pointer-events-none absolute inset-0 page-grid opacity-30" />
        <div className="relative mb-4 h-36 shrink-0 overflow-hidden rounded-sm border border-border bg-muted">
          {project.coverImage ? (
            <>
              {!isLoaded && <div className="absolute inset-0 bg-muted" />}
              <motion.img
                src={project.coverImage}
                alt={project.title}
                className={cn(
                  'absolute inset-0 size-full object-cover transition-opacity duration-500 group-hover:scale-[1.03]',
                  isLoaded ? 'opacity-100' : 'opacity-0',
                )}
                loading={index < 6 ? 'eager' : 'lazy'}
                onLoad={() => setIsLoaded(true)}
              />
            </>
          ) : (
            <div className="flex size-full items-center justify-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Image pending
            </div>
          )}
          <div className="absolute left-2 top-2 border border-border bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {serial}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="min-w-0 font-mono text-lg font-bold leading-snug text-foreground line-clamp-2">
              {project.title}
            </h3>
            <span className="shrink-0 border border-border px-2 py-1 font-mono text-[10px] leading-tight text-muted-foreground">
              {project.status}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>

          <p className="mt-2 text-xs leading-relaxed text-foreground/80">
            <span className="font-mono text-muted-foreground">Role:</span>{' '}
            {project.role ?? 'Not specified.'}
          </p>

          <div className="mt-auto pt-4">
            <div className="mb-4 flex max-h-[3.5rem] flex-wrap gap-2 overflow-hidden">
              {project.techStack?.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xs border border-border bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="border-t border-border pt-3 font-mono text-xs uppercase tracking-widest text-primary group-hover:text-foreground">
              View project <span aria-hidden="true">↗</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}