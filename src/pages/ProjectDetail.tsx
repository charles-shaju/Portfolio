import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Cpu, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import { ImageWithLightbox } from '@/components/portfolio/ImageWithLightbox';
import { Lightbox } from '@/components/portfolio/Lightbox';

/**
 * Project detail page with hero image, tech badges, gallery, and navigation
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const adjacent = slug ? getAdjacentProjects(slug) : { prev: null, next: null };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        image={project.coverImage}
        type="article"
      />
      
      <div className="min-h-screen">
        {/* Hero Image - 70vh */}
        <motion.div
          className="relative w-full h-[70vh] overflow-hidden bg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </motion.div>

        {/* Project Info Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-light">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <span>•</span>
                  <span>{project.category}</span>
                </div>
                {project.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      <span>{project.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Badges */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-light tracking-wide uppercase text-muted-foreground">
                  <Cpu className="size-4" />
                  <span>Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-light border border-border rounded-sm bg-accent/30 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* Image Gallery */}
        <section className="py-12 md:py-16 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
            {project.images.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 0.1}>
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

        {/* Project Navigation */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between">
              {adjacent.prev ? (
                <Link
                  to={`/project/${adjacent.prev.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  <div className="text-left">
                    <p className="text-xs font-light tracking-widest uppercase">Previous</p>
                    <p className="text-sm font-light">{adjacent.prev.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {adjacent.next ? (
                <Link
                  to={`/project/${adjacent.next.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="text-right">
                    <p className="text-xs font-light tracking-widest uppercase">Next</p>
                    <p className="text-sm font-light">{adjacent.next.title}</p>
                  </div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <Lightbox
          images={project.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNavigate={setCurrentImageIndex}
        />
      </div>
    </>
  );
}
