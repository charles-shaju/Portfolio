import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';

// Map skill name -> { logo slug (simpleicons), color (brand hex without #), logoColor }
const SKILL_META: Record<string, { logo: string; color: string; logoColor?: string }> = {
  // Languages
  'Python': { logo: 'python', color: '3776AB', logoColor: 'white' },
  'C / C++': { logo: 'cplusplus', color: '00599C', logoColor: 'white' },
  'Java': { logo: 'openjdk', color: 'ED8B00', logoColor: 'white' },
  'SQL': { logo: 'mysql', color: '4479A1', logoColor: 'white' },
  'Bash / Shell scripting': { logo: 'gnubash', color: '4EAA25', logoColor: 'white' },

  // Frameworks
  'TensorFlow': { logo: 'tensorflow', color: 'FF6F00', logoColor: 'white' },
  'OpenCV': { logo: 'opencv', color: '5C3EE8', logoColor: 'white' },
  'Django': { logo: 'django', color: '092E20', logoColor: 'white' },
  'MATLAB': { logo: 'mathworks', color: '0076A8', logoColor: 'white' },

  // Tools
  'Git & GitHub': { logo: 'github', color: '181717', logoColor: 'white' },
  'VS Code': { logo: 'visualstudiocode', color: '007ACC', logoColor: 'white' },
  'QGroundControl': { logo: 'dronedeploy', color: '00B4FF', logoColor: 'white' },
  'KiCad': { logo: 'kicad', color: '314CB0', logoColor: 'white' },
  'Linux': { logo: 'linux', color: 'FCC624', logoColor: 'black' },
  'Serial/UART/I2C/SPI debugging': { logo: 'rasberrypi', color: '8B5CF6', logoColor: 'white' },

  // Hardware
  'ESP32 / ESP8266': { logo: 'espressif', color: 'E7352C', logoColor: 'white' },
  'Raspberry Pi': { logo: 'raspberrypi', color: 'A22846', logoColor: 'white' },
  'Pixhawk (MAVLink, ArduPilot)': { logo: 'dronedeploy', color: '2E7D32', logoColor: 'white' },
  'LoRa modules (SX1276/SX1278)': { logo: 'semanticscholar', color: '00897B', logoColor: 'white' },
  'Sonar systems': { logo: 'soundcharts', color: '0277BD', logoColor: 'white' },
  'IMU, GPS, Barometer sensors': { logo: 'googleearth', color: '4285F4', logoColor: 'white' },
  'BLDC motors + ESCs': { logo: 'rotaryinternational', color: 'D32F2F', logoColor: 'white' },
  'Underwater cameras': { logo: 'gopro', color: '212121', logoColor: 'white' },
  'Custom ROVs & ASVs': { logo: 'arduino', color: '00979D', logoColor: 'white' },
};

const CATEGORY_LABELS: Record<string, string> = {
  languages: 'Languages',
  frameworks: 'Frameworks',
  tools: 'Tools',
  hardware: 'Hardware',
};

function badgeUrl(name: string) {
  const meta = SKILL_META[name] ?? { logo: 'codeforces', color: '64748B', logoColor: 'white' };
  const label = encodeURIComponent(name).replace(/-/g, '--').replace(/_/g, '__');
  return `https://img.shields.io/badge/${label}-${meta.color}?style=for-the-badge&logo=${meta.logo}&logoColor=${meta.logoColor ?? 'white'}`;
}

export default function SkillsBadges() {
  const categories = Object.keys(CATEGORY_LABELS) as Array<keyof typeof photographerInfo.skills>;

  return (
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <h3 className="text-2xl md:text-3xl font-light tracking-wide">Technical Skills</h3>
        <p className="text-sm md:text-base font-mono text-muted-foreground">
          Self-Learner <span className="text-primary">|</span> ML Enthusiast{' '}
          <span className="text-primary">|</span> Python
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: ci * 0.08 }}
            className="space-y-3"
          >
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
              {CATEGORY_LABELS[cat]}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {(photographerInfo.skills[cat] as string[]).map((skill) => (
                <img
                  key={skill}
                  src={badgeUrl(skill)}
                  alt={skill}
                  loading="lazy"
                  className="h-7 md:h-8 transition-transform duration-200 hover:-translate-y-0.5 hover:drop-shadow-[0_4px_12px_hsl(var(--primary)/0.4)]"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
