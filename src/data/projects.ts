import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Underwater ROV (UROV-SHM)',
    category: 'marine',
    year: '2024',
    slug: 'underwater-rov',
    coverImage: 'https://charles-shaju.github.io/assets/media/UROV.jpeg',
    description: 'ROV platform that surveys dam walls, bridge pilings, and submerged infrastructure for cracks using Pixhawk guidance, embedded control loops, and multi-camera vision. Published as Indian Patent Application No. 202241040473 A.',
    techStack: ['Pixhawk', 'ArduPilot', 'MAVLink', 'OpenCV', 'Python', 'ESP32'],
    location: 'Kerala, India',
    images: [
      {
        id: '1-1',
        src: 'https://charles-shaju.github.io/assets/media/UROV.jpeg',
        alt: 'Underwater ROV inspecting submerged structure',
        aspectRatio: 'landscape'
      },
      {
        id: '1-2',
        src: 'https://charles-shaju.github.io/assets/media/ROV%20team.jpeg',
        alt: 'ROV team coordinating hardware, software, and mission timelines',
        aspectRatio: 'landscape'
      },
      {
        id: '1-3',
        src: 'https://charles-shaju.github.io/assets/media/Guiding.jpeg',
        alt: 'Guiding an underwater vehicle during field trial',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '2',
    title: 'AquaScanner Bathymetry Catamaran',
    category: 'marine',
    year: '2024',
    slug: 'aquascanner-catamaran',
    coverImage: 'https://charles-shaju.github.io/assets/media/Catamaran.jpeg',
    description: 'Autonomous twin-hull vessel that deploys an embedded echosounder suite to chart dam reservoirs and inland waterways for structural assessment and sediment mapping.',
    techStack: ['ESP32', 'Echosounder', 'GPS', 'Autonomous Navigation', 'Python'],
    location: 'Kerala, India',
    images: [
      {
        id: '2-1',
        src: 'https://charles-shaju.github.io/assets/media/Catamaran.jpeg',
        alt: 'Autonomous AquaScanner catamaran performing bathymetry scan',
        aspectRatio: 'landscape'
      },
      {
        id: '2-2',
        src: 'https://charles-shaju.github.io/assets/media/Working.jpeg',
        alt: 'Field work at the dam using an echosounder for bathymetry mapping',
        aspectRatio: 'landscape'
      },
      {
        id: '2-3',
        src: 'https://charles-shaju.github.io/assets/media/Working2.jpeg',
        alt: 'Groundwork and sensor testing at the dam before the mission starts',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '3',
    title: 'Smart Altimeter Module',
    category: 'embedded',
    year: '2024',
    slug: 'smart-altimeter',
    coverImage: 'https://charles-shaju.github.io/assets/media/Altimeter.jpeg',
    description: 'Prototype high-precision barometric altimeter with auto/manual calibration routines, onboard data logging, and telemetry streaming for UAV telemetry stacks.',
    techStack: ['BMP390', 'ESP32', 'I2C', 'Telemetry', 'C++'],
    location: 'Kerala, India',
    images: [
      {
        id: '3-1',
        src: 'https://charles-shaju.github.io/assets/media/Altimeter.jpeg',
        alt: 'Smart altimeter module prototype on workbench',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '4',
    title: 'Realtime GPS Tracker with Firebase',
    category: 'iot',
    year: '2023',
    slug: 'gps-tracker',
    coverImage: 'https://charles-shaju.github.io/assets/media/GPS%20tracking.png',
    description: 'Portable tracker that streams GNSS fixes from an ESP32-based board to Firebase for live fleet monitoring, push alerts, and historical route analytics.',
    techStack: ['ESP32', 'Firebase', 'GPS/GNSS', 'Real-time Database', 'JavaScript'],
    location: 'Kerala, India',
    images: [
      {
        id: '4-1',
        src: 'https://charles-shaju.github.io/assets/media/GPS%20tracking.png',
        alt: 'Realtime GPS tracker dashboard view',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '5',
    title: 'Voice Assistant with NeuralIntents',
    category: 'ai',
    year: '2023',
    slug: 'voice-assistant',
    coverImage: 'https://charles-shaju.github.io/assets/media/AI%20assistant.png',
    description: 'Hands-free assistant that parses wake words, routes intents through a NeuralIntents flow, and speaks responses for home automation and productivity prompts.',
    techStack: ['Python', 'NeuralIntents', 'TensorFlow', 'Speech Recognition'],
    location: 'Kerala, India',
    images: [
      {
        id: '5-1',
        src: 'https://charles-shaju.github.io/assets/media/AI%20assistant.png',
        alt: 'AI assistant interface preview',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '6',
    title: 'LoRa Mesh Communications on ESP32',
    category: 'iot',
    year: '2023',
    slug: 'lora-mesh',
    coverImage: 'https://charles-shaju.github.io/assets/media/Lora.png',
    description: 'Long-range telemetry network using dual ESP32 boards, LoRa radios, and adaptive spreading factors to relay sensor data across remote marine deployments.',
    techStack: ['ESP32', 'LoRa SX1276', 'Mesh Networking', 'C++', 'Arduino'],
    location: 'Kerala, India',
    images: [
      {
        id: '6-1',
        src: 'https://charles-shaju.github.io/assets/media/Lora.png',
        alt: 'LoRa based ESP32 communication test rig',
        aspectRatio: 'landscape'
      }
    ]
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
