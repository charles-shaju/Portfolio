import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';

export default function SkillsBadges() {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <h3 className="text-2xl md:text-3xl font-light tracking-wide">Technical Skills</h3>
        <p className="text-sm md:text-base font-mono text-muted-foreground">
          Grouped by how I use them
        </p>
      </div>

      <div className="space-y-8">
        {photographerInfo.skills.map((group, gi) => (
          <motion.div
            key={group.tier}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: gi * 0.08 }}
            className="space-y-3"
          >
            <div className="border-l border-border pl-4 space-y-1.5">
              <h4 className="text-sm md:text-base uppercase tracking-[0.2em] font-mono text-foreground">
                {group.tier}
              </h4>
              <p className="text-sm font-light text-muted-foreground">{group.description}</p>
            </div>


            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="skill-keycap"
                >

                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
