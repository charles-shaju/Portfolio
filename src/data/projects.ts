import type { Project, ProjectCategory } from '@/types';
import ros2RobotSide from '@/assets/ros2-robot-side.jpeg.asset.json';
import ros2RobotFront from '@/assets/ros2-robot-front.jpeg.asset.json';
import cncPlotterFull from '@/assets/cnc-plotter-full.jpeg.asset.json';
import cncPlotterController from '@/assets/cnc-plotter-controller.jpeg.asset.json';
import bomSupplyChainInterface from '@/assets/bom-supply-chain-interface.png.asset.json';
import workbenchBuild from '@/assets/gps-altimeter-workbench.jpeg.asset.json';
import urovMain from '@/assets/underwater-rov-main.jpeg.asset.json';
import urovTeam from '@/assets/underwater-rov-team.jpeg.asset.json';
import urovGuiding from '@/assets/underwater-rov-guiding.jpeg.asset.json';
import aquascannerMain from '@/assets/aquascanner-catamaran.jpeg.asset.json';
import aquascannerFieldwork from '@/assets/aquascanner-dam-fieldwork.jpeg.asset.json';
import aquascannerTesting from '@/assets/aquascanner-sensor-testing.jpeg.asset.json';
import altimeterModule from '@/assets/smart-altimeter-module.jpeg.asset.json';
import primevuCalibration from '@/assets/primevu-servo-calibration.png.asset.json';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Underwater ROV (UROV-SHM)',
    category: 'marine',
    year: '2024',
    status: 'Field-tested',
    problem: 'Inspect dam walls, bridge pilings and submerged structures for cracks.',
    whatBuilt: 'A Pixhawk-based ROV with multi-camera vision for submerged-structure inspection.',
    result: 'Used for a dam inspection. Indian patent application No. 202421040473, published and under examination (co-inventor).',
    slug: 'underwater-rov',
    coverImage: urovMain.url,
    description: 'Pixhawk-based ROV that inspects dam walls, bridge pilings and submerged structures for cracks using multi-camera vision.',
    techStack: ['Pixhawk', 'ArduPilot', 'MAVLink', 'Python', 'ESP32'],
    location: 'Kerala, India',
    images: [
      {
        id: '1-1',
        src: urovMain.url,
        alt: 'Underwater ROV inspecting a submerged structure',
        aspectRatio: 'landscape',
      },
      {
        id: '1-2',
        src: urovTeam.url,
        alt: 'ROV team coordinating hardware, software and mission timelines',
        aspectRatio: 'landscape',
      },
      {
        id: '1-3',
        src: urovGuiding.url,
        alt: 'Guiding an underwater vehicle during a field trial',
        aspectRatio: 'portrait',
      },
    ],
  },
  {
    id: '2',
    title: 'ROS2 Mobile Robot',
    category: 'robotics',
    year: '2026',
    status: 'In progress',
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
    problem: 'Chart dam bathymetry and sample water quality with an autonomous survey vessel.',
    whatBuilt: 'An autonomous twin-hull vessel with an 80 kg payload for bathymetry and water-quality sampling.',
    result: 'Waypoint tracking tuned to under 1 m path drift. Used at 4 dam surveys.',
    slug: 'aquascanner-catamaran',
    coverImage: aquascannerMain.url,
    description: 'Autonomous twin-hull vessel with an 80 kg payload for dam bathymetry mapping and water-quality sampling.',
    techStack: ['ArduPilot', 'Pixhawk', 'ESP32', 'Raspberry Pi', 'Echosounder'],
    location: 'Kerala, India',
    images: [
      {
        id: '3-1',
        src: aquascannerMain.url,
        alt: 'Autonomous AquaScanner catamaran performing a bathymetry scan',
        aspectRatio: 'landscape',
      },
      {
        id: '3-2',
        src: aquascannerFieldwork.url,
        alt: 'Field work at a dam using an echosounder for bathymetry mapping',
        aspectRatio: 'landscape',
      },
      {
        id: '3-3',
        src: aquascannerTesting.url,
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
    coverImage: altimeterModule.url,
    description: 'High-precision BMP390 barometric altimeter with auto/manual calibration and an OLED readout, built on ESP32.',
    techStack: ['BMP390', 'ESP32', 'I2C'],
    links: [{ label: 'GitHub', url: 'https://github.com/charles-shaju/Smart_Altimeter' }],
    location: 'Kerala, India',
    images: [
      {
        id: '5-1',
        src: altimeterModule.url,
        alt: 'Smart altimeter module prototype on a workbench',
        aspectRatio: 'landscape',
      },
      {
        id: '5-2',
        src: workbenchBuild.url,
        alt: 'Workbench with two perfboard builds: an ESP32 board with an LCD, rotary knob and battery, and a board with a Quectel cellular module, beside a multimeter and soldering supplies',
        caption: 'Bench build: ESP32 boards with LCD, rotary knob and battery, checked with a multimeter.',
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
    links: [{ label: 'GitHub', url: 'https://github.com/charles-shaju/OBM-IoT' }],
    coverImage: workbenchBuild.url,
    images: [
      {
        id: '6-1',
        src: workbenchBuild.url,
        alt: 'Workbench with two perfboard builds: one with a Quectel cellular module and a small microcontroller board, one with an ESP32, LCD, rotary knob and battery, beside a multimeter and soldering supplies',
        caption: 'Bench build: Quectel EC200U cellular module and ESP32 boards with LCD, knob and battery.',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '7',
    title: 'BOM Supply Chain Agent',
    category: 'software',
    status: 'Prototype',
    problem: 'Pricing a bill of materials means searching several electronics vendors by hand and comparing mismatched listings.',
    whatBuilt: 'A Flask web app that reads a CSV or Excel BOM, runs live product searches across Robu.in, Robocraze, ET Store, Amazon India, Flyrobo and Sunrom, uses Groq to normalise products and match specifications, and compares component-only purchase costs in an interactive dashboard. Deterministic safeguards reject common mismatches such as breakout boards for an ESP32, heat sinks for a motor driver, and wrong numeric variants, sizes or model numbers. Purchase calculations are pack-aware and exclude shipping; it selects high-confidence vendors by purchase cost, shows expandable alternatives, flags out-of-stock items and asks for manual confirmation on specification-review items. Results export to Excel.',
    statusDetail: 'Upload a BOM, follow progress as each item is processed, review selected products and alternatives, then download the results. Upload size, BOM row count, concurrency and result expiry are limited.',
    slug: 'bom-supply-chain-agent',
    description: 'Flask web app that reads a bill of materials, searches electronics vendors and compares component-only purchase costs in an interactive dashboard.',
    techStack: ['Python', 'Flask', 'Groq', 'CSV / Excel'],
    links: [{ label: 'GitHub', url: 'https://github.com/charles-shaju/supply_chain_agent' }],
    coverImage: bomSupplyChainInterface.url,
    coverFit: 'contain',
    images: [
      {
        id: '7-1',
        src: bomSupplyChainInterface.url,
        alt: 'BOM Supply Chain Agent interface showing component sourcing, a BOM upload form and an example component table',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '8',
    title: 'PrimeVU: Blockly Platform for Otto Robot',
    category: 'robotics',
    status: 'Prototype',
    problem: 'Students need a simple way to drive and program an ESP32 Otto robot without writing code by hand.',
    whatBuilt: 'A browser-based block-programming platform built with Google Blockly and JavaScript that connects over Bluetooth to an ESP32 Otto robot. Students can drive the robot with an on-screen joystick, trigger quick actions such as dance, wave and moonwalker, and program it with blocks while the generated commands are shown alongside. A calibration page adjusts the trim of each leg and foot servo from the browser, and a virtual serial monitor shows messages from the robot.',
    statusDetail: 'Drive the robot with the joystick, program it with blocks, calibrate its servos and simulate movements from the browser.',
    slug: 'primevu-otto-blockly',
    description: 'Browser-based Blockly platform that connects over Bluetooth to an ESP32 Otto robot so students can drive, calibrate and program it with blocks.',
    techStack: ['Google Blockly', 'JavaScript', 'ESP32', 'Bluetooth', 'Otto robot'],
    links: [{ label: 'Live site', url: 'https://charles-shaju.github.io/PrimeVU/' }],
    coverImage: primevuCalibration.url,
    coverFit: 'contain',
    images: [
      {
        id: '8-1',
        src: primevuCalibration.url,
        alt: 'PrimeVU wireless servo calibration page with up and down trim controls for the Otto robot legs and feet, and a virtual serial monitor',
        aspectRatio: 'landscape',
        caption: 'Servo calibration page with the virtual serial monitor',
      },
    ],
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
  { id: 'software', label: 'Software' },
];