import { useMemo, useState } from 'react';
import { getProjectsByCategory, projectCategories } from '@/data/projects';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { CategoryFilter } from '@/components/portfolio/CategoryFilter';
import { motion } from 'framer-motion';

/**
 * Portfolio page with masonry grid
 * Features smooth animations and responsive layout
 */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const visibleProjects = useMemo(() => getProjectsByCategory(activeCategory), [activeCategory]);

  return (
    <>
      
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
               Projects
             </h1>
             <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
               Marine robotics, autonomous systems and embedded hardware
             </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid - Edge to edge */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <div className="mb-8">
          <CategoryFilter
            categories={projectCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
        <PortfolioGrid projects={visibleProjects} />
      </section>

        {/* Bottom spacing */}
        <div className="h-24" />
      </div>
    </>
  );
}
