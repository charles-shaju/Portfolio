import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Technical specification rows shown in the drafting-sheet side panel
 */
const heroSpecs = [
  { label: 'Experience', value: '3+ YRS' },
  { label: 'Projects Built', value: '05' },
  { label: 'Patents', value: '01' },
  { label: 'Certifications', value: '02' },
  { label: 'Base', value: 'KOCHI, IN' },
  { label: 'Status', value: 'OPEN TO ROLES' },
];

/**
 * Homepage — drafting-document hero with charcoal & ember theme
 * Framed technical drawing sheet: name + introduction on the left,
 * specification table on the right, document metadata below.
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />

      <div className="min-h-screen">
        {/* Hero Section — technical drafting sheet */}
        <section className="relative min-h-screen w-full overflow-hidden">
          {/* Drafting grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          {/* Ember ambient glows */}
          <div className="absolute -top-40 right-0 size-[480px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 -left-40 size-[420px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

          {/* Document frame */}
          <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              className="relative w-full max-w-6xl border border-border bg-card/70 backdrop-blur-sm shadow-[0_30px_80px_-30px_hsl(0_0%_0%/0.35)]"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* Corner registration marks */}
              <span className="absolute -top-px -left-px size-7 border-t-2 border-l-2 border-primary/80" />
              <span className="absolute -top-px -right-px size-7 border-t-2 border-r-2 border-primary/80" />
              <span className="absolute -bottom-px -left-px size-7 border-b-2 border-l-2 border-primary/80" />
              <span className="absolute -bottom-px -right-px size-7 border-b-2 border-r-2 border-primary/80" />

              <div className="grid lg:grid-cols-[1.25fr_1fr]">
                {/* Left — identity */}
                <div className="p-8 sm:p-12 lg:p-14 space-y-8">
                  <motion.p
                    className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-muted-foreground"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {photographerInfo.tagline}
                  </motion.p>

                  <motion.h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-widest text-foreground uppercase leading-tight"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {photographerInfo.name}
                  </motion.h1>

                  <motion.div
                    className="w-16 h-px bg-primary"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                  />

                  <motion.p
                    className="max-w-xl text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.85 }}
                  >
                    {photographerInfo.heroIntroduction}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap items-center gap-4 pt-2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.05 }}
                  >
                    <Link
                      to="/portfolio"
                      className="group inline-flex items-center gap-3 border border-primary/60 bg-primary/10 px-7 py-3.5 text-xs font-medium tracking-[0.25em] uppercase text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      View Projects
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center border border-border px-7 py-3.5 text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                    >
                      Get in Touch
                    </Link>
                  </motion.div>
                </div>

                {/* Right — technical specifications */}
                <div className="border-t lg:border-t-0 lg:border-l border-border">
                  <div className="p-8 sm:p-12 lg:p-14 lg:pl-10">
                    <motion.p
                      className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      Technical Specifications
                    </motion.p>
                    <div>
                      {heroSpecs.map((spec, index) => (
                        <motion.div
                          key={spec.label}
                          className="flex items-center justify-between border-b border-border/70 py-3.5 last:border-0"
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 + index * 0.08 }}
                        >
                          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                            {spec.label}
                          </span>
                          <span className="text-sm tracking-wider text-foreground">
                            {spec.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Document metadata footer */}
              <div className="flex items-center justify-between border-t border-border px-6 sm:px-10 py-4 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
                <span>DOC — CS/EMB/2026</span>
                <span className="hidden sm:block">Kalamassery · Cochin · Kerala</span>
                <span>REV 2.4</span>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <ScrollIndicator />
          </motion.div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                  About My Work
                </h2>
                <div className="space-y-4 text-lg font-light leading-relaxed text-muted-foreground">
                  <p>
                    {photographerInfo.biography.split('\n\n')[0]}
                  </p>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors group">
                  <span>Learn More About Me</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground font-light tracking-wide">
                A selection of recent work
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-6 lg:px-8 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) =>
            <ProjectCard
              key={project.id}
              project={project}
              aspectRatio="landscape"
              showCategory={true}
              index={index} />

            )}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors">

                <span>View All Projects</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>);
}
