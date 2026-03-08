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

      {/* Achievements Section */}
      <section id="achievements" className="py-16 md:py-24 px-6 lg:px-8 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0.8, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                Achievements
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Credentials, certifications, and published work
              </p>
            </div>

            {/* Patent */}
            {photographerInfo.patent && (
              <motion.div
                className="p-8 border border-border rounded-sm bg-accent/20 space-y-4"
                initial={{ opacity: 0.8, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-sm bg-primary text-primary-foreground">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">Published Patent</p>
                    <p className="text-sm text-muted-foreground">Indian Application No. {photographerInfo.patent.applicationNo} · {photographerInfo.patent.date}</p>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground">
                  {photographerInfo.patent.title}
                </h3>
                <p className="text-base font-light leading-relaxed text-muted-foreground">
                  {photographerInfo.patent.description}
                </p>
              </motion.div>
            )}

            {/* Certifications Grid */}
            <div>
              <h3 className="text-2xl font-light tracking-wide mb-6">Certifications</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {photographerInfo.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="group p-6 border border-border rounded-sm hover:bg-accent/30 transition-colors space-y-3"
                    initial={{ opacity: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="p-2.5 rounded-sm bg-accent">
                        <Award className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <span className="text-sm font-light text-muted-foreground">{cert.year}</span>
                    </div>
                    <h4 className="text-lg font-light tracking-wide text-foreground">
                      {cert.title}
                    </h4>
                    <p className="text-sm font-light text-muted-foreground">
                      Issued by {cert.issuer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Overview */}
            <div>
              <h3 className="text-2xl font-light tracking-wide mb-6">Technical Skills</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-light tracking-widest uppercase text-muted-foreground">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {photographerInfo.skills.languages.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-sm font-light border border-border rounded-sm bg-accent/20 text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-light tracking-widest uppercase text-muted-foreground">Frameworks & Libraries</h4>
                  <div className="flex flex-wrap gap-2">
                    {photographerInfo.skills.frameworks.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-sm font-light border border-border rounded-sm bg-accent/20 text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-light tracking-widest uppercase text-muted-foreground">Tools & Software</h4>
                  <div className="flex flex-wrap gap-2">
                    {photographerInfo.skills.tools.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-sm font-light border border-border rounded-sm bg-accent/20 text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-light tracking-widest uppercase text-muted-foreground">Hardware & Embedded</h4>
                  <div className="flex flex-wrap gap-2">
                    {photographerInfo.skills.hardware.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-sm font-light border border-border rounded-sm bg-accent/20 text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="resume" className="py-16 md:py-24 px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0.8, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                Résumé
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                A snapshot of my experience, skills, and credentials
              </p>
            </div>

            <Separator />

            {/* Resume Summary Card */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left - Quick Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <GraduationCap className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-light tracking-wide text-muted-foreground">Education</p>
                    <p className="font-light text-foreground">{photographerInfo.education}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-light tracking-wide text-muted-foreground">Location</p>
                    <p className="font-light text-foreground">{photographerInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-light tracking-wide text-muted-foreground">Certifications</p>
                    <ul className="space-y-1">
                      {photographerInfo.certifications.map((cert, i) => (
                        <li key={i} className="font-light text-foreground text-sm">
                          {cert.title} — <span className="text-muted-foreground">{cert.issuer}, {cert.year}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {photographerInfo.patent && (
                  <div className="flex items-start gap-3">
                    <FileText className="size-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-light tracking-wide text-muted-foreground">Patent</p>
                      <p className="font-light text-foreground text-sm">{photographerInfo.patent.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">Application No. {photographerInfo.patent.applicationNo} · {photographerInfo.patent.date}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right - Availability + Download */}
              <div className="space-y-6">
                <div className="p-6 border border-border rounded-sm bg-accent/30 space-y-4">
                  <h3 className="text-lg font-light tracking-wide">Current Status</h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {photographerInfo.availability}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full gap-2"
                  >
                    <a
                      href="https://charles-shaju.github.io/assets/media/Charles%20Shjau%20Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Download className="size-4" />
                      Download Résumé (PDF)
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
