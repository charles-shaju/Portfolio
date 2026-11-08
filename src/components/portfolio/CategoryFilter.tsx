import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * Category filter component with smooth transitions
 * Shows active state and animates category changes
 */
export function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {categories.map((category, index) => {
        const isActive = activeCategory === category.id;
        
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Button
              type="button"
              variant={isActive ? 'default' : 'outline'}
              aria-pressed={isActive}
              onClick={() => onCategoryChange(category.id)}
              className={cn('rounded-sm font-mono uppercase tracking-widest', !isActive && 'text-muted-foreground')}
            >
              {category.label}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
