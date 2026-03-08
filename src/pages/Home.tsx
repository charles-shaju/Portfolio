import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { CircuitBackground } from '@/components/ui/CircuitBackground';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Homepage with immersive hero section and featured projects grid
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen">
        {/* Hero Section - Animated circuit board background */}
        <section className="relative h-screen w-full overflow-hidden bg-[hsl(210,30%,8%)]">
          {/* Circuit Animation */}
          <CircuitBackground />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(210,30%,8%)]" />

          {/* Hero Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-6">
            <motion.div
              className="text-center space-y-6 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}>
              
              






              

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-widest text-white uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}>
                
                {photographerInfo.name.toUpperCase()}
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl font-light tracking-wide text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}>
                
                {photographerInfo.tagline}
              </motion.p>

              <motion.p
                className="text-base md:text-lg font-light leading-relaxed text-white/60 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}>
                
                {photographerInfo.heroIntroduction}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}>
                
                <Link
                  to="/portfolio"
                  className="px-6 py-2.5 border border-[rgba(0,210,211,0.5)] text-[rgb(0,210,211)] text-sm font-light tracking-wide rounded-sm hover:bg-[rgba(0,210,211,0.1)] transition-colors">
                  
                  View Projects
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-2.5 text-white/70 text-sm font-light tracking-wide hover:text-white transition-colors">
                  
                  Get in Touch →
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}>
              
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
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