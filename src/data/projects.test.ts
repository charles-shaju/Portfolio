import { describe, expect, it } from 'vitest';
import { getProjectsByCategory, projects } from './projects';

describe('portfolio project records', () => {
  it('keeps the project cards in the requested order', () => {
    expect(projects.map((project) => project.slug)).toEqual([
      'underwater-rov',
      'ros2-mobile-robot',
      'aquascanner-catamaran',
      'cnc-pen-plotter',
      'smart-altimeter',
      'gps-module-obm',
      'bom-supply-chain-agent',
    ]);
  });

  it('uses only the four requested project statuses', () => {
    expect(projects.map((project) => project.status)).toEqual([
      'Field-tested',
      'In progress',
      'Field-tested',
      'Completed',
      'Prototype',
      'In progress',
      'Prototype',
    ]);
  });

  it('filters projects into All, Marine, Robotics, Embedded and Software groups', () => {
    expect(getProjectsByCategory('all')).toHaveLength(7);
    expect(getProjectsByCategory('marine').map((project) => project.slug)).toEqual([
      'underwater-rov',
      'aquascanner-catamaran',
    ]);
    expect(getProjectsByCategory('robotics').map((project) => project.slug)).toEqual([
      'ros2-mobile-robot',
    ]);
    expect(getProjectsByCategory('embedded').map((project) => project.slug)).toEqual([
      'cnc-pen-plotter',
      'smart-altimeter',
      'gps-module-obm',
    ]);
    expect(getProjectsByCategory('software').map((project) => project.slug)).toEqual([
      'bom-supply-chain-agent',
    ]);
  });

  it('keeps the GPS module description accurate without adding a year or reporting method', () => {
    const gpsModule = projects.find((project) => project.slug === 'gps-module-obm');

    expect(gpsModule?.description).toBe('Tracks a boat’s location so fishermen can share it with shore in an emergency.');
    expect(gpsModule?.year).toBeUndefined();
    expect(gpsModule?.techStack).toEqual(['ESP32', 'GPS', 'IoT']);
  });

  it('leaves the CNC year unspecified until the owner provides it', () => {
    const plotter = projects.find((project) => project.slug === 'cnc-pen-plotter');

    expect(plotter?.year).toBeUndefined();
    expect(plotter?.status).toBe('Completed');
  });

  it('preserves the ROV application number and examination status', () => {
    const rov = projects.find((project) => project.slug === 'underwater-rov');

    expect(rov?.result).toContain('202421040473');
    expect(rov?.result).toContain('published and under examination');
    expect(rov?.result).toContain('co-inventor');
  });

  it('attaches the two supplied ROS 2 robot photos to that project', () => {
    const ros2 = projects.find((project) => project.slug === 'ros2-mobile-robot');

    expect(ros2?.images).toHaveLength(2);
    expect(ros2?.images.map((image) => image.src)).toEqual([
      '/__l5e/assets-v1/dbf179eb-f0f1-47cd-9599-b2b5e15e74ed/ros2-robot-side.jpeg',
      '/__l5e/assets-v1/4a3b2093-0bb1-46e4-acc3-8b027470b0cb/ros2-robot-front.jpeg',
    ]);
    expect(ros2?.images.every((image) => image.aspectRatio === 'portrait')).toBe(true);
    expect(ros2?.coverImage).toBe('/__l5e/assets-v1/dbf179eb-f0f1-47cd-9599-b2b5e15e74ed/ros2-robot-side.jpeg');
    expect(ros2?.coverAspect).toBe('portrait');
  });

  it('attaches the CNC plotter GitHub link and two supplied photos', () => {
    const plotter = projects.find((project) => project.slug === 'cnc-pen-plotter');

    expect(plotter?.links).toEqual([{ label: 'GitHub', url: 'https://github.com/charles-shaju/CNC-Plotter' }]);
    expect(plotter?.images.map((image) => image.src)).toEqual([
      '/__l5e/assets-v1/9f1da3a8-b784-47d2-a231-0a775863a8b0/cnc-plotter-full.jpeg',
      '/__l5e/assets-v1/18a94ced-8839-47fb-b9fb-82e1526a8274/cnc-plotter-controller.jpeg',
    ]);
    expect(plotter?.coverImage).toBe('/__l5e/assets-v1/9f1da3a8-b784-47d2-a231-0a775863a8b0/cnc-plotter-full.jpeg');
  });

  it('links the Smart Altimeter and OBM GPS projects to their GitHub repos', () => {
    const altimeter = projects.find((project) => project.slug === 'smart-altimeter');
    const gps = projects.find((project) => project.slug === 'gps-module-obm');

    expect(altimeter?.links).toEqual([{ label: 'GitHub', url: 'https://github.com/charles-shaju/Smart_Altimeter' }]);
    expect(gps?.links).toEqual([{ label: 'GitHub', url: 'https://github.com/charles-shaju/OBM-IoT' }]);
  });

  it('adds the BOM supply chain agent as a Software prototype with its GitHub link', () => {
    const agent = projects.find((project) => project.slug === 'bom-supply-chain-agent');

    expect(agent?.category).toBe('software');
    expect(agent?.status).toBe('Prototype');
    expect(agent?.year).toBeUndefined();
    expect(agent?.links).toEqual([{ label: 'GitHub', url: 'https://github.com/charles-shaju/supply_chain_agent' }]);
  });

  it('attaches the supplied supply chain screenshot as a contained cover and gallery image', () => {
    const agent = projects.find((project) => project.slug === 'bom-supply-chain-agent');
    expect(agent?.images).toHaveLength(1);
    expect(agent?.images[0]?.src).toMatch(/\/bom-supply-chain-interface\.png$/);
    expect(agent?.coverImage).toBe(agent?.images[0]?.src);
    expect(agent?.coverFit).toBe('contain');
  });
});
