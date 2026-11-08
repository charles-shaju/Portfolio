import { describe, expect, it } from 'vitest';
import { getProjectsByCategory, projects } from './projects';

describe('portfolio project records', () => {
  it('keeps the six project cards in the requested order', () => {
    expect(projects.map((project) => project.slug)).toEqual([
      'underwater-rov',
      'ros2-mobile-robot',
      'aquascanner-catamaran',
      'cnc-pen-plotter',
      'smart-altimeter',
      'gps-module-obm',
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
    ]);
  });

  it('filters projects into All, Marine, Robotics and Embedded groups', () => {
    expect(getProjectsByCategory('all')).toHaveLength(6);
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
});