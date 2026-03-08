

## Plan: Add Video Background to Landing Page Hero

The user uploaded a video (`Video_Generation_with_Multiple_Elements.mp4`) to use as the hero section background on the homepage.

### Changes

**1. Copy video to project**
- Copy `user-uploads://Video_Generation_with_Multiple_Elements.mp4` → `public/videos/hero-bg.mp4`
- Using `public/` since video elements use direct URL references, not ES6 imports.

**2. Update `src/pages/Home.tsx` hero section**
- Replace the `<CircuitBackground />` component with a `<video>` element as the background:
  - Autoplay, muted, loop, playsInline attributes
  - `object-cover` to fill the hero section
  - Absolutely positioned behind all content
- Keep the gradient overlay on top of the video for text readability
- Keep all existing hero text content and animations unchanged

### Result
The hero will display the uploaded video as a full-screen looping background behind the name, tagline, and CTA content.

