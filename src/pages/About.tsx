import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { Linkedin, Download, FileText, MapPin, GraduationCap, Award, ExternalLink } from 'lucide-react';
import SkillsBadges from '@/components/skills/SkillsBadges';
import { DocFrame } from '@/components/ui/DocFrame';

import { photographerInfo } from '@/data/photographer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

const aboutSubtitle = 'Robotics & Embedded Systems Engineer | Marine Robotics';

const aboutParagraphs = [
  "I'm an MCA student at Rajagiri College of Social Science and a part-time embedded systems engineer at i4 Marine Technologies, a marine robotics company where I was one of the first employees.",
  'In my first two years full-time, I did whatever the company needed: setting up our first office and workshop, sourcing tools and equipment, wiring and configuring our autonomous vessels and underwater ROVs, and testing and debugging them until they worked in the field. That included tuning PID control on an 80 kg catamaran and supporting surveys at 4 dams.',
  "I started in software, and I'm now moving toward robot software. I'm building a ROS 2 robot with its own scanning lidar and sensor fusion, and I'm adding camera-based navigation to it. I've also built a vision system, using Roboflow, that detects and counts nuts and bolts in video. I want to work on perception, control and simulation in a team that tests and ships its work.",
];


const timeline = [
  {
    year: '2023',
    title: 'Completed B.Voc in IT',
    org: 'University Graduation',
    description: 'Graduated with a Bachelor of Vocation in Information Technology, building a strong foundation in software and hardware systems.',
  },
  {
    year: '2023',
    title: 'Robotics Intern (8 Months)',
    org: 'Srishti Robotics',
    description: 'Completed an 8-month internship working on robotics systems, gaining hands-on experience in embedded development.',
  },
  {
    year: '2023',
    title: 'Embedded Systems Engineer',
    org: 'i4 Marine Technologies',
    description: 'Joined as a full-time Embedded Systems Engineer, building autonomous marine vehicles, ROV systems, and IoT platforms.',
  },
  {
    year: '2025',
    title: 'Part-time Embedded Systems Engineer',
    org: 'i4 Marine Technologies',
    description: 'Resigned from full-time role and continuing part-time, contributing to marine robotics and IoT telemetry systems.',
  },
  {
    year: '2025',
    title: 'Started MCA',
    org: 'Rajagiri College of Social Sciences',
    description: 'Pursuing Master of Computer Applications with focus on embedded systems and robotics research.',
  },
];

function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 40%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Track which items the line has reached
  const [revealedItems, setRevealedItems] = useState<number[]>([]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalItems = timeline.length;
    const revealed: number[] = [];
    for (let i = 0; i < totalItems; i++) {
      // Each item triggers when the line reaches its proportional position
      const threshold = (i + 0.5) / totalItems;
      if (latest >= threshold) {
        revealed.push(i);
      }
    }
    setRevealedItems(revealed);
  });

  return (
    <section className="py-16 md:py-24 px-6 lg:px-8 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="space-y-10"
          initial={{ opacity: 0.8, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide">
              Journey
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Key milestones and career highlights
            </p>
          </div>

          <div className="relative" ref={containerRef}>
            {/* Static faint background line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10 md:-translate-x-px" />

            {/* Animated growing line */}
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 w-px bg-foreground md:-translate-x-px origin-top z-[1]"
              style={{ height: lineHeight }}
            >
              {/* Glowing tip */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-foreground/40 blur-sm rounded-full" />
            </motion.div>

            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isRevealed = revealedItems.includes(index);
              return (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10"
                    initial={{ scale: 0 }}
                    animate={isRevealed ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                  />

                  {/* Horizontal connector */}
                  <motion.div
                    className={`hidden md:block absolute top-[0.65rem] h-px bg-foreground/20 ${
                      isLeft ? 'right-1/2 left-auto w-8 mr-[0.35rem]' : 'left-1/2 w-8 ml-[0.35rem]'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={isRevealed ? { scaleX: 1 } : { scaleX: 0 }}
                    style={{ transformOrigin: isLeft ? 'right' : 'left' }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />

                  {/* Pulse ring */}
                  {isRevealed && (
                    <motion.div
                      className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full border border-foreground/30 -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-[9]"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  )}

                  {/* Content - slides in from left or right, only when line reaches it */}
                  <motion.div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}
                    initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                    animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 30 : -30 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                  >
                    <span className="text-xs font-light tracking-widest uppercase text-muted-foreground">{item.year}</span>
                    <h3 className="text-lg font-light tracking-wide text-foreground mt-1">{item.title}</h3>
                    <p className="text-sm font-light text-muted-foreground mt-0.5">{item.org}</p>
                    <p className="text-sm font-light text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
/**
 * About page with photographer biography and professional information
 * Features split layout with portrait video and comprehensive biography
 */
export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${photographerInfo.name}, ${aboutSubtitle}. ${aboutParagraphs[0]}`}
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
              <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted max-w-sm mx-auto">
                <img
                  src={photographerInfo.portraitImage}
                  alt={`Portrait of ${photographerInfo.name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 max-w-sm mx-auto">
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
                  {aboutSubtitle}
                </p>
              </div>

              <Separator />

              {/* Biography */}
              <div className="space-y-4">
                {aboutParagraphs.map((paragraph, index) => (
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

      {/* Timeline Section */}
      <TimelineSection />

      {/* Patent & Certifications Section */}
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
                Patent &amp; Certifications
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Patent application and verified credentials
              </p>
            </div>

            {/* Patent */}
            {photographerInfo.patent && (
              <motion.div
                initial={{ opacity: 0.8, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <DocFrame bodyClassName="p-8 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-sm bg-primary text-primary-foreground">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">Patent Application (Published, Under Examination)</p>
                    <p className="text-sm text-muted-foreground">Indian Application No. {photographerInfo.patent.applicationNo} · Filed {photographerInfo.patent.filedDate} · Published {photographerInfo.patent.publishedDate} · {photographerInfo.patent.role}</p>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground">
                  {photographerInfo.patent.title}
                </h3>
                <p className="text-base font-light leading-relaxed text-muted-foreground">
                  {photographerInfo.patent.description}
                </p>
                <div>
                  <span className="inline-flex items-center border border-border bg-muted/40 px-3 py-1 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                    {photographerInfo.patent.status}
                  </span>
                </div>
                </DocFrame>
              </motion.div>

            )}

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-light tracking-wide mb-6">Certifications</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {photographerInfo.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="h-full"
                    initial={{ opacity: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <DocFrame
                      cornerClassName="size-4"
                      className="h-full group transition-colors hover:border-primary/50"
                      bodyClassName="flex h-full flex-col p-5 space-y-3"
                    >

                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-sm bg-accent">
                        <Award className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <span className="text-sm font-light text-muted-foreground">{cert.year}</span>
                    </div>
                    <h4 className="text-base font-light tracking-wide text-foreground">
                      {cert.title}
                    </h4>
                    {cert.issuer && (
                      <p className="text-xs font-light text-muted-foreground">
                        Issued by {cert.issuer}
                      </p>
                    )}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="size-3" />
                        Verify
                      </a>
                    )}
                    </DocFrame>
                  </motion.div>
                ))}

              </div>
            </div>

            {/* Skills Bubbles */}
            <SkillsBadges />
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
            <DocFrame
              cornerClassName="size-7"
              bodyClassName="grid md:grid-cols-2 gap-8 p-8 sm:p-10"
              footer={
                <>
                  <span>Résumé</span>
                  <span className="hidden sm:block">Kalamassery · Cochin · Kerala</span>
                  <span>{photographerInfo.email}</span>
                </>
              }
            >

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
                      <p className="text-sm font-light tracking-wide text-muted-foreground">Patent Application — {photographerInfo.patent.role}</p>
                      <p className="font-light text-foreground text-sm">{photographerInfo.patent.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">Application No. {photographerInfo.patent.applicationNo} · Filed {photographerInfo.patent.filedDate} · Published {photographerInfo.patent.publishedDate} · Under Examination</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right - Availability + Download */}
              <div className="space-y-6">
                <div className="p-6 bg-accent/30 space-y-4">
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
                      href="/Charles_Shaju_Resume.pdf"
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
            </DocFrame>

          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
