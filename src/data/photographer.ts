import type { PersonInfo } from '@/types';

export const photographerInfo: PersonInfo = {
  name: 'Charles Shaju',
  tagline: 'Embedded Systems Engineer | IoT & Robotics',
  heroIntroduction: 'Building intelligent embedded systems, autonomous marine vehicles, and AI-driven hardware solutions.',
  biography: `I'm Charles Shaju, an MCA student and part-time Embedded Systems Engineer at i4 Marine Technologies. With two years of hands-on experience, I focus on intelligent embedded systems, IoT devices, and autonomous marine technologies.

Coming from a software background, I grew a passion for AI and robotics and enjoy integrating both into practical hardware solutions. That curiosity led me into designing sensors, microcontroller platforms, and embedded solutions that bridge software intelligence with physical hardware.

I thrive on projects involving real-time systems, robotics, automation, underwater technologies, and AI-driven innovation. My goal is to advance intelligent hardware design while blending software, electronics, and machine learning to deliver smarter, more efficient systems.`,
  approach: `My engineering is guided by three principles: robust embedded design, intelligent automation, and field-tested reliability. I believe the best systems emerge when hardware and software work in harmony, when sensor fusion provides actionable data, and when autonomous platforms perform reliably in challenging real-world conditions.

Whether working on underwater ROVs, autonomous surface vehicles, or IoT telemetry systems, I strive to build solutions that solve real problems and push the boundaries of what embedded systems can achieve.`,
  skills: [
    {
      tier: 'Used on real projects',
      description: 'Wired, tuned, flown or debugged on vessels and surveys.',
      items: [
        'Python',
        'Embedded C/C++ (Arduino, PlatformIO)',
        'ESP32',
        'Raspberry Pi',
        'Pixhawk',
        'ArduPilot',
        'ArduSub',
        'MAVLink',
        'PID tuning',
        'IMU / GPS / depth / pressure sensors',
        'sonar / echosounder integration',
        'BLDC motors + ESCs',
        'UDP telemetry',
        'LoRa (SX1276/78)',
        'UART / I2C / SPI debugging',
        'Git & GitHub',
        'Linux',
        'Bash',
      ],
    },
    {
      tier: 'Working knowledge',
      description: 'Used in builds and study; productive with a bit of guidance.',
      items: [
        'ROS 2',
        'RViz',
        'EKF sensor fusion (robot_localization)',
        'RF-DETR + ByteTrack (via Roboflow)',
        'MATLAB (computer vision, not Simulink)',
        'JavaScript (Blockly)',
        'FluidNC / GRBL',
        'KiCad',
        'STM32',
        'Onshape (basic)',
        'SQL',
        'Java',
      ],
    },
    {
      tier: 'Coursework basics',
      description: 'From courses and certifications; used in small projects.',
      items: ['TensorFlow', 'Django'],
    },
    {
      tier: 'Learning now',
      description: 'Currently studying and building with.',
      items: ['MiDaS monocular depth'],
    },


  ],

  certifications: [
    { title: 'Computer Vision Engineer', issuer: 'MathWorks', year: '2026', url: 'https://www.coursera.org/account/accomplishments/specialization/H4G7QUDF59UG' },
    { title: 'Geodata Processing using Python & ML', issuer: 'ISRO', year: '2025', url: 'https://isrolms.iirs.gov.in/mod/customcert/verify_certificate.php?contextid=1049408' },
    { title: 'AI-Machine Learning Developer', issuer: 'Kerala ASAP', year: '2024', url: 'https://asapkerala.gov.in/aiml/' }
  ],
  patent: {
    title: 'An Underwater Remotely Operated Vehicle for Structural Health Monitoring (UROV-SHM)',
    role: 'Co-inventor',
    description: 'The application describes an underwater ROV for inspecting dams, tunnels, ship hulls and bridge piers, with swappable batteries, fibre-tethered telemetry and sonar/video analytics for crack measurement. I built and tested a 6-thruster Pixhawk/ArduSub ROV, which was deployed for inspection at one dam.',
    applicationNo: '202421040473',
    filedDate: '24 May 2024',
    publishedDate: '12 Jul 2024',
    status: 'Under Examination — Indian Patent Office'
  },
  education: 'MCA (Pursuing), Rajagiri College of Social Science',
  location: 'Kalamassery, Cochin, Kerala',
  email: 'charlesshaju00@gmail.com',
  availability: 'Open to robotics/IoT roles from July 2025 onward, remote-friendly with willingness to travel for marine test campaigns.',
  socialLinks: {
    instagram: 'https://instagram.com/charles_shaju',
    linkedin: 'https://linkedin.com/in/charles-shaju',
    github: 'https://github.com/charles-shaju',
    twitter: 'https://x.com/Mr__CS',
    medium: 'https://medium.com/@charles-shaju'
  },
  portraitImage: 'https://charles-shaju.github.io/assets/media/Charles-Shaju.jpeg'
};
