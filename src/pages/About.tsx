import { motion } from 'framer-motion';
import { Instagram, Linkedin, Download, FileText, MapPin, GraduationCap, Award } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

/**
 * About page with photographer biography and professional information
 * Features split layout with portrait video and comprehensive biography
 */
export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${photographerInfo.name}, ${photographerInfo.tagline}. ${photographerInfo.biography.split('\n\n')[0]}`}
        image={photographerInfo.portraitImage}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0.8, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
              About
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
              Embedded Systems Engineer & Robotics Enthusiast
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portrait and Biography - Split Layout */}
      <section className="py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Portrait Image */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0.8, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted">
                <img
                  src={photographerInfo.portraitImage}
                  alt={`Portrait of ${photographerInfo.name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {photographerInfo.socialLinks.instagram && (
                  <a
                    href={photographerInfo.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="size-5" />
                  </a>
                )}
                {photographerInfo.socialLinks.linkedin && (
                  <a
                    href={photographerInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="size-5" />
                  </a>
                )}
                {photographerInfo.socialLinks.github && (
                  <a
                    href={photographerInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                    aria-label="GitHub"
                  >
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Biography and Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0.8, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Name and Tagline */}
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                  {photographerInfo.name}
                </h2>
                <p className="text-xl text-muted-foreground font-light tracking-wide">
                  {photographerInfo.tagline}
                </p>
              </div>

              <Separator />

              {/* Biography */}
              <div className="space-y-4">
                {photographerInfo.biography.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Contact Info */}
              <div className="pt-4 space-y-2">
                <div className="text-sm font-light tracking-wide">
                  <span className="text-muted-foreground">Email: </span>
                  <a
                    href={`mailto:${photographerInfo.email}`}
                    className="text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {photographerInfo.email}
                  </a>
                </div>
                <div className="text-sm font-light tracking-wide">
                  <span className="text-muted-foreground">Location: </span>
                  <span className="text-foreground">{photographerInfo.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
