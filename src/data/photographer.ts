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
  skills: {
    languages: ['Python', 'C / C++', 'Java', 'SQL', 'Bash / Shell scripting'],
    frameworks: ['TensorFlow', 'Node.js', 'OpenCV', 'MAVSDK / DroneKit'],
    tools: ['Git & GitHub', 'VS Code', 'QGroundControl', 'KiCad', 'Linux', 'Serial/UART/I2C/SPI debugging'],
    hardware: [
      'ESP32 / ESP8266', 'Raspberry Pi', 'Pixhawk (MAVLink, ArduPilot)',
      'LoRa modules (SX1276/SX1278)', 'Sonar systems', 'IMU, GPS, Barometer sensors',
      'BLDC motors + ESCs', 'Underwater cameras', 'Custom ROVs & ASVs'
    ]
  },
  certifications: [
    { title: 'ASAP AI-Machine Learning Developer', issuer: 'Kerala ASAP', year: '2024' },
    { title: 'Geodata Processing using Python & ML', issuer: 'ISRO', year: '2025' }
  ],
  patent: {
    title: 'AN UNDERWATER REMOTELY OPERATED VEHICLE FOR STRUCTURAL HEALTH MONITORING (UROV-SHM)',
    description: 'UROV-SHM executes detailed underwater inspections of dams, tunnels, ship hulls, and bridge piers. Swappable batteries, fiber tethered telemetry, and AI-enhanced sonar/video analytics give real-time crack measurement, precise positioning, and mission resilience in turbulent conditions.',
    applicationNo: '202241040473 A',
    date: '12 Jul 2024'
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
