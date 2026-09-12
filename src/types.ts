/**
 * GitGenome Core Types & Interfaces
 */

export type NodeType = 'repository' | 'directory' | 'module' | 'file' | 'service';
export type NodeStatus = 'created' | 'modified' | 'deleted' | 'renamed' | 'stable';
export type ChangeFrequency = 'low' | 'medium' | 'high' | 'critical';

export interface GenomeNode {
  id: string;
  name: string;
  path: string;
  type: NodeType;
  lines: number;
  commitsCount: number;
  firstSeenDate: string;
  lastChangedDate: string;
  firstSeenCommit: string;
  contributors: string[];
  changeFrequency: ChangeFrequency;
  complexity: number; // 1-100
  status: NodeStatus;
  dependencies: string[];
  module: string;
  parentId?: string;
  // Physics & layout simulation properties
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius?: number;
}

export interface GenomeLink {
  source: string;
  target: string;
  type: 'hierarchy' | 'import' | 'data-flow' | 'dependency';
  strength?: number;
}

export type MilestoneCategory =
  | 'initial'
  | 'feature'
  | 'refactor'
  | 'architecture'
  | 'dependency'
  | 'deletion'
  | 'release';

export interface DependencyItem {
  name: string;
  version: string;
  type: 'direct' | 'indirect';
  category: 'production' | 'development';
  addedInCommit: string;
  status: 'added' | 'updated' | 'removed' | 'active';
  usedByModules: string[];
  description?: string;
}

export interface ArchitectureModule {
  name: string;
  path: string;
  filesCount: number;
  lines: number;
  status: 'added' | 'stable' | 'refactored' | 'deprecated';
  responsibility: string;
}

export interface ArchitectureLayer {
  name: string;
  type: 'frontend' | 'api' | 'core' | 'storage' | 'consensus' | 'query' | 'extensions';
  description: string;
  modules: ArchitectureModule[];
}

export interface ArchitectureSnapshot {
  pattern: 'Embedded Prototype' | 'Clustered Core' | 'LSM Modular Engine' | 'Service-Oriented Engine' | 'Pluggable Multi-Engine' | 'Modern Distributed Engine';
  description: string;
  layers: ArchitectureLayer[];
}

export interface SnapshotStats {
  filesCount: number;
  linesOfCode: number;
  directoriesCount: number;
  modulesCount: number;
  contributorsCount: number;
  dependenciesCount: number;
  additions: number;
  deletions: number;
}

export interface HistoricalSnapshot {
  id: string;
  index: number;
  date: string;
  timestamp: number;
  commitHash: string;
  commitMessage: string;
  author: string;
  authorEmail: string;
  tag?: string;
  isMajorMilestone: boolean;
  milestoneTitle?: string;
  milestoneDescription?: string;
  milestoneCategory?: MilestoneCategory;
  stats: SnapshotStats;
  activeFileIds: string[];
  changedFileIds: string[];
  addedFileIds: string[];
  removedFileIds: string[];
  dependencies: DependencyItem[];
  architecture: ArchitectureSnapshot;
}

export interface ContributorProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  totalCommits: number;
  linesAdded: number;
  linesDeleted: number;
  filesTouched: number;
  percentage: number;
  firstCommit: string;
  lastCommit: string;
  primaryModules: string[];
  role: string;
  timelineActivity: { date: string; commits: number }[];
}

export interface RepositoryMetadata {
  name: string;
  description: string;
  defaultBranch: string;
  branches: string[];
  isDemo: boolean;
  sourceUrl?: string;
  totalCommits: number;
  totalContributors: number;
  createdAt: string;
  updatedAt: string;
}

export interface FileEvolutionEvent {
  date: string;
  commitHash: string;
  type: 'created' | 'modified' | 'refactored' | 'moved' | 'deleted';
  author: string;
  message: string;
  additions: number;
  deletions: number;
}

export interface FileEvolutionRecord {
  path: string;
  firstAppearance: string;
  lastModification: string;
  totalCommits: number;
  contributors: string[];
  totalAdditions: number;
  totalDeletions: number;
  changeFrequency: ChangeFrequency;
  events: FileEvolutionEvent[];
}

export type EventDetectionType =
  | 'initial_commit'
  | 'large_commit'
  | 'large_deletion'
  | 'large_addition'
  | 'file_introduction'
  | 'file_removal'
  | 'directory_introduction'
  | 'directory_removal'
  | 'dependency_change'
  | 'contributor_milestone'
  | 'refactor_structural'
  | 'architecture_change'
  | 'release_tag';

export interface DetectedEvent {
  id: string;
  type: EventDetectionType;
  title: string;
  description: string;
  date: string;
  commitHash: string;
  author: string;
  snapshotIndex: number;
  impactScore: 'critical' | 'high' | 'medium' | 'low';
  affectedModules: string[];
  filesCountChanged: number;
  additions: number;
  deletions: number;
  heuristicRationale: string;
}

export interface RepositoryDataset {
  metadata: RepositoryMetadata;
  allNodes: Record<string, GenomeNode>;
  links: GenomeLink[];
  snapshots: HistoricalSnapshot[];
  contributors: ContributorProfile[];
  fileEvolutions: Record<string, FileEvolutionRecord>;
}
