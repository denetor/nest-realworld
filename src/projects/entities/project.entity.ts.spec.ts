import { Project } from './project.entity';

describe('Project', () => {
  it('should be defined', () => {
    expect(new Project(null)).toBeDefined();
  });
});
