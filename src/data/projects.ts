import type { Project, ProjectCategory } from '@/types';
import ros2RobotSide from '@/assets/ros2-robot-side.jpeg.asset.json';
import ros2RobotFront from '@/assets/ros2-robot-front.jpeg.asset.json';
import cncPlotterFull from '@/assets/cnc-plotter-full.jpeg.asset.json';
import cncPlotterController from '@/assets/cnc-plotter-controller.jpeg.asset.json';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Underwater ROV (UROV-SHM)',
    category: 'marine',
    year: '2024',
    status: 'Field-tested',
    role: 'Wiring, calibration and testing.',
    problem: 'Inspect dam walls, bridge pilings and submerged structures for cracks.',
    whatBuilt: 'A Pixhawk-based ROV with multi-camera vision for submerged-structure inspection.',
    result: 'Used for a dam inspection. Indian patent application No. 202421040473, published and under examination (co-inventor).',
    slug: 'underwater-rov',
    coverImage: 'https://charles-shaju.github.io/assets/media/UROV.jpeg',
    description: 'Pixhawk-based ROV that inspects dam walls, bridge pilings and submerged structures for cracks using multi-camera vision.',
    techStack: ['Pixhawk', 'ArduPilot', 'MAVLink', 'Python', 'ESP32'],
    location: 'Kerala, India',
    images: [
      {
        id: '1-1',
        src: 'https://charles-shaju.github.io/assets/media/UROV.jpeg',
        alt: 'Underwater ROV inspecting a submerged structure',
        aspectRatio: 'landscape',
      },
      {
        id: '1-2',
        src: 'https://charles-shaju.github.io/assets/media/ROV%20team.jpeg',
        alt: 'ROV team coordinating hardware, software and mission timelines',
        aspectRatio: 'landscape',
      },
      {
        id: '1-3',
        src: 'https://charles-shaju.github.io/assets/media/Guiding.jpeg',
        alt: 'Guiding an underwater vehicle during a field trial',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '2',
    title: 'ROS2 Mobile Robot',
    category: 'robotics',
    year: '2026',
    status: 'In progress',
    role: 'Hardware, firmware, ROS 2 packages and sensor fusion (solo).',
    problem: 'Build a land testbed for autonomous navigation development before ASV integration.',
    whatBuilt: 'A wheeled ROS 2 Humble robot with IMU and wheel-encoder fusion, swept lidar and a USB camera.',
    statusDetail: 'Odometry and live lidar scan working in RViz. Camera depth-based navigation in progress. Next: SLAM map, then boat integration.',
    slug: 'ros2-mobile-robot',
    description: 'Wheeled ROS 2 Humble robot fusing IMU and wheel encoders with a Kalman filter, swept lidar and USB camera for obstacle detection.',
    techStack: ['ROS 2', 'Raspberry Pi', 'ESP32', 'BNO085', 'TFmini lidar', 'Python'],
    links: [{ label: 'GitHub', url: 'https://github.com/charles-shaju/ROS' }],
    coverImage: ros2RobotSide.url,
    coverAspect: 'portrait',
    images: [
      {
        id: '2-1',
        src: ros2RobotSide.url,
        alt: 'Side view of the three-tier ROS 2 robot with a Raspberry Pi, depth camera and differential-drive wheels held above a workbench',
        caption: 'Side view: Raspberry Pi with active cooling, depth camera and differential-drive wheels.',
        aspectRatio: 'portrait',
      },
      {
        id: '2-2',
        src: ros2RobotFront.url,
        alt: 'Front view of the ROS 2 robot showing its stereo depth camera, upper pan-tilt sensor and dual drive motors',
        caption: 'Front view: stereo depth camera, upper pan-tilt sensor and dual drive motors.',
        aspectRatio: 'portrait',
      },
    ],
  },
  {
    id: '3',
    title: 'AquaScanner Bathymetry Catamaran',
    category: 'marine',
    year: '2024',
    status: 'Field-tested',
    role: 'Configuration, PID tuning, sensor data UI, UDP communications and testing.',
    problem: 'Chart dam bathymetry and sample water quality with an autonomous survey vessel.',
    whatBuilt: 'An autonomous twin-hull vessel with an 80 kg payload for bathymetry and water-quality sampling.',
    result: 'Waypoint tracking tuned to under 1 m path drift. Used at 4 dam surveys.',
    slug: 'aquascanner-catamaran',
    coverImage: 'https://charles-shaju.github.io/assets/media/Catamaran.jpeg',
    description: 'Autonomous twin-hull vessel with an 80 kg payload for dam bathymetry mapping and water-quality sampling.',
    techStack: ['ArduPilot', 'Pixhawk', 'ESP32', 'Raspberry Pi', 'Echosounder'],
    location: 'Kerala, India',
    images: [
      {
        id: '3-1',
        src: 'https://charles-shaju.github.io/assets/media/Catamaran.jpeg',
        alt: 'Autonomous AquaScanner catamaran performing a bathymetry scan',
        aspectRatio: 'landscape',
      },
      {
        id: '3-2',
        src: 'https://charles-shaju.github.io/assets/media/Working.jpeg',
        alt: 'Field work at a dam using an echosounder for bathymetry mapping',
        aspectRatio: 'landscape',
      },
      {
        id: '3-3',
        src: 'https://charles-shaju.github.io/assets/media/Working2.jpeg',
        alt: 'Groundwork and sensor testing at the dam before a mission',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '4',
    title: 'CNC Pen Plotter',
    category: 'embedded',
    status: 'Completed',
    role: 'Mechanical assembly, 3D-printed parts, hand-soldered electronics and firmware setup.',
    problem: 'A client needed a low-cost A3 XY pen plotter.',
    whatBuilt: 'An A3 XY plotter with 3D-printed parts, hand-soldered electronics and servo pen-lift, running FluidNC/GRBL on ESP32.',
    slug: 'cnc-pen-plotter',
    description: 'Low-cost A3 XY pen plotter built to a client’s requirements, using ESP32, FluidNC (GRBL) and a servo pen-lift.',
    techStack: ['ESP32', 'FluidNC', 'GRBL', '3D printing'],
    links: [{ label: 'GitHub', url: 'https://github.com/charles-shaju/CNC-Plotter' }],
    coverImage: cncPlotterFull.url,
    coverAspect: 'portrait',
    images: [
      {
        id: '4-1',
        src: cncPlotterFull.url,
        alt: 'Top view of the XY pen plotter with aluminium rails, 3D-printed carriages and a pen-drawn portrait on the bed',
        caption: 'Full plotter: aluminium-rail XY frame, 3D-printed carriages and servo pen-lift, with a finished pen drawing.',
        aspectRatio: 'portrait',
      },
      {
        id: '4-2',
        src: cncPlotterController.url,
        alt: 'Hand-soldered controller board with an ESP32, two stepper drivers, an OLED display and a power module',
        caption: 'Controller board: ESP32, two stepper drivers, OLED display and power module on hand-soldered perfboard.',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '5',
    title: 'Smart Altimeter Module',
    category: 'embedded',
    year: '2024',
    status: 'Prototype',
    problem: 'Provide a high-precision barometric altitude reading with auto/manual calibration.',
    whatBuilt: 'A BMP390 and ESP32 altimeter module with calibration options and an OLED readout.',
    slug: 'smart-altimeter',
    coverImage: 'https://charles-shaju.github.io/assets/media/Altimeter.jpeg',
    description: 'High-precision BMP390 barometric altimeter with auto/manual calibration and an OLED readout, built on ESP32.',
    techStack: ['BMP390', 'ESP32', 'I2C'],
    location: 'Kerala, India',
    images: [
      {
        id: '5-1',
        src: 'https://charles-shaju.github.io/assets/media/Altimeter.jpeg',
        alt: 'Smart altimeter module prototype on a workbench',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '6',
    title: 'GPS Module for Outboard Motor (OBM)',
    category: 'embedded',
    status: 'In progress',
    problem: 'Fishermen need to share their boat’s location with shore in an emergency.',
    whatBuilt: 'A GPS module for boat-location tracking; reporting details are not specified.',
    statusDetail: 'Currently building GPS IoT modules for outboard motors.',
    slug: 'gps-module-obm',
    description: 'Tracks a boat’s location so fishermen can share it with shore in an emergency.',
    techStack: ['ESP32', 'GPS', 'IoT'],
    images: [],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? (projects[currentIndex - 1] ?? null) : null,
    next: currentIndex < projects.length - 1 ? (projects[currentIndex + 1] ?? null) : null,
  };
};

export const projectCategories: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'marine', label: 'Marine' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'embedded', label: 'Embedded' },
];