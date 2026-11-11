import { useState } from 'react';
import { useParams, Navigate, Link } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import { ImageWithLightbox } from '@/components/portfolio/ImageWithLightbox';
import { Lightbox } from '@/components/portfolio/Lightbox';
import { Button } from '@/components/ui/button';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const adjacent = slug ? getAdjacentProjects(slug) : { prev: null, next: null };
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return <Navigate to="/404" replace />;

  const detailSections = [
    { label: 'Overview', content: project.description },
    { label: 'Problem', content: project.problem },
    { label: 'What I built', content: project.whatBuilt },
    ...(project.role ? [{ label: 'My role', content: project.role }] : []),
    {
      label: 'Result / Status',
      content: [project.result, project.slug === 'cnc-pen-plotter' ? project.status : `Status: ${project.status}`, project.statusDetail].filter(Boolean).join('\n'),
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-5 py-4 md:px-8">
        <Button asChild variant="outline" size="sm" className="font-mono">
          <Link to="/portfolio"><ArrowLeft />Back to Portfolio</Link>
        </Button>
      </div>
      <motion.div
        className="relative h-[min(48vh,34rem)] min-h-64 overflow-hidden border-b border-border bg-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {project.coverImage ? (
          project.coverAspect === 'portrait' || project.coverFit === 'contain' ? (
            <>
              <img
                src={project.coverImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 size-full scale-110 object-cover opacity-40 blur-2xl"
                loading="eager"
              />
              <img
                src={project.coverImage}
                alt={project.title}
                className="absolute inset-0 size-full object-contain"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </>
          ) : (
            <>
              <img
                src={project.coverImage}
                alt={project.title}
                className="size-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </>
          )
        ) : (
          <div className="page-grid flex size-full items-center justify-center font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Project images pending
          </div>
        )}
      </motion.div>

      <section className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="mb-8 space-y-5">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {project.year && (
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-4" /> {project.year}
                </span>
              )}
              <span>{project.category}</span>
              {project.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" /> {project.location}
                </span>
              )}
              <span className="border border-border px-2 py-1 text-muted-foreground">{project.status}</span>
            </div>
          </div>

          <div className="border-t border-border">
            {detailSections.map((section) => (
              <div
                key={section.label}
                className="grid gap-2 border-b border-border py-5 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
              >
                <h2 className="font-mono text-xs uppercase tracking-widest text-primary">{section.label}</h2>
                <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">{section.content}</p>
              </div>
            ))}

            <div className="grid gap-3 border-b border-border py-5 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">Tech stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech) => (
                  <span key={tech} className="rounded-sm border border-border bg-muted px-3 py-1.5 font-mono text-xs text-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 border-b border-border py-5 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">Links</h2>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {project.links?.length ? project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  >
                    {link.label}<ExternalLink className="size-4" />
                  </a>
                )) : <span className="text-sm text-muted-foreground">No public links listed.</span>}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {project.images.length > 0 && (
        <section className="px-5 py-8 md:px-8 md:py-12">
          <div className="mx-auto max-w-5xl space-y-8">
            {project.images.map((image, index) => (
              <ScrollReveal
                key={image.id}
                delay={index * 0.08}
                className={image.aspectRatio === 'portrait' ? 'mx-auto w-full max-w-lg' : 'w-full'}
              >
                <ImageWithLightbox
                  image={image}
                  onClick={() => openLightbox(index)}
                  priority={index === 0}
                  index={0}
                  className="w-full"
                />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-10 md:px-8">
          {adjacent.prev ? (
            <Link to={`/project/${adjacent.prev.slug}`} className="group flex min-w-0 items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
              <span className="min-w-0 text-left">
                <span className="block font-mono text-[10px] uppercase tracking-widest">Previous</span>
                <span className="block truncate text-sm">{adjacent.prev.title}</span>
              </span>
            </Link>
          ) : <span />}
          {adjacent.next ? (
            <Link to={`/project/${adjacent.next.slug}`} className="group flex min-w-0 items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
              <span className="min-w-0 text-right">
                <span className="block font-mono text-[10px] uppercase tracking-widest">Next</span>
                <span className="block truncate text-sm">{adjacent.next.title}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : <span />}
        </div>
      </section>

      {project.images.length > 0 && (
        <Lightbox
          images={project.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      )}
    </div>
  );
}