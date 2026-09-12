import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exportDatasetAsJson, exportTimelineAsCsv } from '../src/utils/exporter';
import type { RepositoryDataset } from '../src/types';

const mockDataset = {
  metadata: {
    name: 'Test-Repo',
    description: 'Test',
    defaultBranch: 'main',
    branches: ['main'],
    isDemo: true,
    totalCommits: 1,
    totalContributors: 1,
    createdAt: '2020-01-01',
    updatedAt: '2024-01-01',
  },
  snapshots: [
    {
      id: 's0',
      index: 0,
      date: '2020-01-01',
      timestamp: 1577836800000,
      commitHash: 'abc123',
      author: 'tester',
      authorEmail: 't@example.com',
      commitMessage: 'init',
      isMajorMilestone: true,
      milestoneTitle: 'Initial',
      stats: {
        filesCount: 5,
        linesOfCode: 100,
        directoriesCount: 1,
        modulesCount: 1,
        contributorsCount: 1,
        dependenciesCount: 0,
        additions: 100,
        deletions: 0,
      },
      activeFileIds: [],
      changedFileIds: [],
      addedFileIds: [],
      removedFileIds: [],
      dependencies: [],
      architecture: {
        pattern: 'Embedded Prototype',
        description: 'test',
        layers: [],
      },
    },
  ],
  nodes: [],
  links: [],
  contributors: [],
  events: [],
  fileEvolution: [],
} as unknown as RepositoryDataset;

describe('exporter', () => {
  let createElementSpy: ReturnType<typeof vi.spyOn>;
  let clickSpy: ReturnType<typeof vi.fn>;
  let removeSpy: ReturnType<typeof vi.fn>;
  let setAttributeSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    clickSpy = vi.fn();
    removeSpy = vi.fn();
    setAttributeSpy = vi.fn();
    const mockAnchor = {
      setAttribute: setAttributeSpy,
      click: clickSpy,
      remove: removeSpy,
    };
    createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor as any);
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockAnchor as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exportDatasetAsJson creates download link and triggers click', () => {
    exportDatasetAsJson(mockDataset);
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('exportTimelineAsCsv creates download link and triggers click', () => {
    exportTimelineAsCsv(mockDataset);
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('sanitizes repo name for filename', () => {
    const ds = {
      ...mockDataset,
      metadata: { ...mockDataset.metadata, name: 'My Repo!@#' },
    } as unknown as RepositoryDataset;
    exportDatasetAsJson(ds);
    const downloadCall = setAttributeSpy.mock.calls.find((c: string[]) => c[0] === 'download');
    expect(downloadCall?.[1]).toBe('My_Repo____genome.json');
  });
});
