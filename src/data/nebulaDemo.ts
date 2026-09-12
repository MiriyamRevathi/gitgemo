import {
  RepositoryDataset,
  GenomeNode,
  GenomeLink,
  HistoricalSnapshot,
  ContributorProfile,
  FileEvolutionRecord,
  ArchitectureSnapshot,
  DependencyItem
} from '../types';

/**
 * NebulaDB: 5-Year High-Performance Distributed Database Dataset (2021 - 2026)
 * Deterministic, richly populated dataset representing realistic codebase evolution.
 */

export const NEBULA_CONTRIBUTORS: ContributorProfile[] = [
  {
    name: 'Elena Rostova',
    email: 'elena@nebuladb.io',
    role: 'Co-Founder & Lead Architect',
    totalCommits: 482,
    linesAdded: 48200,
    linesDeleted: 14200,
    filesTouched: 98,
    percentage: 34.2,
    firstCommit: '2021-03-12',
    lastCommit: '2026-02-18',
    primaryModules: ['src/core', 'src/storage', 'src/consensus'],
    timelineActivity: [
      { date: '2021', commits: 140 },
      { date: '2022', commits: 110 },
      { date: '2023', commits: 85 },
      { date: '2024', commits: 72 },
      { date: '2025', commits: 45 },
      { date: '2026', commits: 30 }
    ]
  },
  {
    name: 'Marcus Chen',
    email: 'marcus@nebuladb.io',
    role: 'Principal Systems Engineer',
    totalCommits: 364,
    linesAdded: 39500,
    linesDeleted: 16800,
    filesTouched: 84,
    percentage: 25.8,
    firstCommit: '2021-08-20',
    lastCommit: '2026-02-14',
    primaryModules: ['src/storage', 'src/vector', 'src/core'],
    timelineActivity: [
      { date: '2021', commits: 40 },
      { date: '2022', commits: 95 },
      { date: '2023', commits: 80 },
      { date: '2024', commits: 68 },
      { date: '2025', commits: 55 },
      { date: '2026', commits: 26 }
    ]
  },
  {
    name: 'Sarah Jenkins',
    email: 'sarah.j@nebuladb.io',
    role: 'Staff Query Optimizer Engineer',
    totalCommits: 228,
    linesAdded: 28400,
    linesDeleted: 7200,
    filesTouched: 52,
    percentage: 16.2,
    firstCommit: '2022-04-11',
    lastCommit: '2026-02-10',
    primaryModules: ['src/query', 'src/api', 'tests'],
    timelineActivity: [
      { date: '2022', commits: 62 },
      { date: '2023', commits: 74 },
      { date: '2024', commits: 48 },
      { date: '2025', commits: 32 },
      { date: '2026', commits: 12 }
    ]
  },
  {
    name: 'Priya Nair',
    email: 'priya@nebuladb.io',
    role: 'Distributed Consensus Specialist',
    totalCommits: 164,
    linesAdded: 19800,
    linesDeleted: 6400,
    filesTouched: 41,
    percentage: 11.6,
    firstCommit: '2021-08-22',
    lastCommit: '2025-11-19',
    primaryModules: ['src/consensus', 'src/core', 'tests/chaos'],
    timelineActivity: [
      { date: '2021', commits: 35 },
      { date: '2022', commits: 48 },
      { date: '2023', commits: 38 },
      { date: '2024', commits: 27 },
      { date: '2025', commits: 16 },
      { date: '2026', commits: 0 }
    ]
  },
  {
    name: 'Alex Vance',
    email: 'alex.v@nebuladb.io',
    role: 'Networking & Protocol Engineer',
    totalCommits: 102,
    linesAdded: 14200,
    linesDeleted: 4900,
    filesTouched: 36,
    percentage: 7.2,
    firstCommit: '2023-01-15',
    lastCommit: '2026-01-28',
    primaryModules: ['src/api', 'src/common', 'benchmarks'],
    timelineActivity: [
      { date: '2023', commits: 46 },
      { date: '2024', commits: 32 },
      { date: '2025', commits: 18 },
      { date: '2026', commits: 6 }
    ]
  },
  {
    name: 'Mia Lindqvist',
    email: 'mia@nebuladb.io',
    role: 'Nebula Studio Lead / UI Engineer',
    totalCommits: 71,
    linesAdded: 12100,
    linesDeleted: 1800,
    filesTouched: 28,
    percentage: 5.0,
    firstCommit: '2023-10-04',
    lastCommit: '2025-12-05',
    primaryModules: ['src/frontend', 'src/api'],
    timelineActivity: [
      { date: '2023', commits: 22 },
      { date: '2024', commits: 34 },
      { date: '2025', commits: 15 },
      { date: '2026', commits: 0 }
    ]
  }
];

// Master catalog of all files ever seen in NebulaDB across 5 years
export const MASTER_NODES: Record<string, GenomeNode> = {
  // Directories & Modules (Hierarchy containers)
  'src': {
    id: 'src',
    name: 'src',
    path: 'src',
    type: 'directory',
    lines: 0,
    commitsCount: 680,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2026-02-18',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova', 'Marcus Chen', 'Sarah Jenkins'],
    changeFrequency: 'critical',
    complexity: 85,
    status: 'stable',
    dependencies: [],
    module: 'root'
  },
  'src/core': {
    id: 'src/core',
    name: 'core',
    path: 'src/core',
    type: 'module',
    lines: 0,
    commitsCount: 340,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2026-02-18',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova', 'Marcus Chen'],
    changeFrequency: 'high',
    complexity: 92,
    status: 'stable',
    dependencies: ['src/common'],
    module: 'core',
    parentId: 'src'
  },
  'src/storage': {
    id: 'src/storage',
    name: 'storage',
    path: 'src/storage',
    type: 'module',
    lines: 0,
    commitsCount: 410,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2026-01-20',
    firstSeenCommit: 'a100001',
    contributors: ['Marcus Chen', 'Elena Rostova', 'David Kim'],
    changeFrequency: 'critical',
    complexity: 95,
    status: 'modified',
    dependencies: ['src/core', 'src/common'],
    module: 'storage',
    parentId: 'src'
  },
  'src/consensus': {
    id: 'src/consensus',
    name: 'consensus',
    path: 'src/consensus',
    type: 'module',
    lines: 0,
    commitsCount: 160,
    firstSeenDate: '2021-08-20',
    lastChangedDate: '2025-11-19',
    firstSeenCommit: 'b200002',
    contributors: ['Priya Nair', 'Elena Rostova'],
    changeFrequency: 'medium',
    complexity: 88,
    status: 'stable',
    dependencies: ['src/core', 'src/storage'],
    module: 'consensus',
    parentId: 'src'
  },
  'src/query': {
    id: 'src/query',
    name: 'query',
    path: 'src/query',
    type: 'module',
    lines: 0,
    commitsCount: 220,
    firstSeenDate: '2022-10-04',
    lastChangedDate: '2026-02-10',
    firstSeenCommit: 'd400004',
    contributors: ['Sarah Jenkins', 'Elena Rostova'],
    changeFrequency: 'high',
    complexity: 84,
    status: 'stable',
    dependencies: ['src/core', 'src/storage'],
    module: 'query',
    parentId: 'src'
  },
  'src/api': {
    id: 'src/api',
    name: 'api',
    path: 'src/api',
    type: 'module',
    lines: 0,
    commitsCount: 190,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2026-01-28',
    firstSeenCommit: 'a100001',
    contributors: ['Alex Vance', 'Elena Rostova', 'Mia Lindqvist'],
    changeFrequency: 'medium',
    complexity: 72,
    status: 'modified',
    dependencies: ['src/query', 'src/core'],
    module: 'api',
    parentId: 'src'
  },
  'src/frontend': {
    id: 'src/frontend',
    name: 'frontend',
    path: 'src/frontend',
    type: 'module',
    lines: 0,
    commitsCount: 75,
    firstSeenDate: '2023-11-29',
    lastChangedDate: '2025-12-05',
    firstSeenCommit: 'f600006',
    contributors: ['Mia Lindqvist'],
    changeFrequency: 'medium',
    complexity: 65,
    status: 'stable',
    dependencies: ['src/api'],
    module: 'frontend',
    parentId: 'src'
  },
  'src/vector': {
    id: 'src/vector',
    name: 'vector',
    path: 'src/vector',
    type: 'module',
    lines: 0,
    commitsCount: 95,
    firstSeenDate: '2025-02-10',
    lastChangedDate: '2026-02-12',
    firstSeenCommit: 'h800008',
    contributors: ['Marcus Chen', 'Elena Rostova'],
    changeFrequency: 'high',
    complexity: 90,
    status: 'created',
    dependencies: ['src/storage', 'src/query'],
    module: 'vector',
    parentId: 'src'
  },
  'src/common': {
    id: 'src/common',
    name: 'common',
    path: 'src/common',
    type: 'module',
    lines: 0,
    commitsCount: 140,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2025-10-15',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova', 'Marcus Chen'],
    changeFrequency: 'low',
    complexity: 58,
    status: 'stable',
    dependencies: [],
    module: 'common',
    parentId: 'src'
  },
  'tests': {
    id: 'tests',
    name: 'tests',
    path: 'tests',
    type: 'directory',
    lines: 0,
    commitsCount: 310,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2026-02-18',
    firstSeenCommit: 'a100001',
    contributors: ['Sarah Jenkins', 'Elena Rostova', 'Priya Nair'],
    changeFrequency: 'high',
    complexity: 60,
    status: 'stable',
    dependencies: ['src/core', 'src/storage'],
    module: 'tests'
  },
  'config': {
    id: 'config',
    name: 'config',
    path: 'config',
    type: 'directory',
    lines: 0,
    commitsCount: 45,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2025-08-11',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova', 'Alex Vance'],
    changeFrequency: 'low',
    complexity: 40,
    status: 'stable',
    dependencies: [],
    module: 'config'
  },

  // Files in src/core
  'src/core/engine.rs': {
    id: 'src/core/engine.rs',
    name: 'engine.rs',
    path: 'src/core/engine.rs',
    type: 'file',
    lines: 1840,
    commitsCount: 78,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2026-02-18',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova', 'Marcus Chen'],
    changeFrequency: 'critical',
    complexity: 94,
    status: 'modified',
    dependencies: ['src/storage/lsm_tree.rs', 'src/consensus/raft_node.rs'],
    module: 'core',
    parentId: 'src/core'
  },
  'src/core/types.rs': {
    id: 'src/core/types.rs',
    name: 'types.rs',
    path: 'src/core/types.rs',
    type: 'file',
    lines: 480,
    commitsCount: 34,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2025-06-14',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova'],
    changeFrequency: 'medium',
    complexity: 62,
    status: 'stable',
    dependencies: ['src/common/errors.rs'],
    module: 'core',
    parentId: 'src/core'
  },
  'src/core/transactions.rs': {
    id: 'src/core/transactions.rs',
    name: 'transactions.rs',
    path: 'src/core/transactions.rs',
    type: 'file',
    lines: 1420,
    commitsCount: 46,
    firstSeenDate: '2022-10-04',
    lastChangedDate: '2026-02-18',
    firstSeenCommit: 'd400004',
    contributors: ['Elena Rostova', 'Marcus Chen'],
    changeFrequency: 'high',
    complexity: 89,
    status: 'modified',
    dependencies: ['src/storage/wal.rs', 'src/core/engine.rs'],
    module: 'core',
    parentId: 'src/core'
  },
  'src/core/memory_pool.rs': {
    id: 'src/core/memory_pool.rs',
    name: 'memory_pool.rs',
    path: 'src/core/memory_pool.rs',
    type: 'file',
    lines: 860,
    commitsCount: 29,
    firstSeenDate: '2024-07-14',
    lastChangedDate: '2025-09-22',
    firstSeenCommit: 'g700007',
    contributors: ['Marcus Chen'],
    changeFrequency: 'medium',
    complexity: 78,
    status: 'stable',
    dependencies: [],
    module: 'core',
    parentId: 'src/core'
  },

  // Files in src/storage (including legacy btree that got removed in era 9)
  'src/storage/btree_store.rs': {
    id: 'src/storage/btree_store.rs',
    name: 'btree_store.rs',
    path: 'src/storage/btree_store.rs',
    type: 'file',
    lines: 2450,
    commitsCount: 38,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2025-09-22',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova', 'Marcus Chen'],
    changeFrequency: 'low',
    complexity: 82,
    status: 'deleted',
    dependencies: ['src/storage/wal.rs'],
    module: 'storage',
    parentId: 'src/storage'
  },
  'src/storage/lsm_tree.rs': {
    id: 'src/storage/lsm_tree.rs',
    name: 'lsm_tree.rs',
    path: 'src/storage/lsm_tree.rs',
    type: 'file',
    lines: 3120,
    commitsCount: 88,
    firstSeenDate: '2022-03-15',
    lastChangedDate: '2026-01-20',
    firstSeenCommit: 'c300003',
    contributors: ['Marcus Chen', 'Elena Rostova'],
    changeFrequency: 'critical',
    complexity: 96,
    status: 'modified',
    dependencies: ['src/storage/memtable.rs', 'src/storage/sstable.rs', 'src/storage/compaction.rs'],
    module: 'storage',
    parentId: 'src/storage'
  },
  'src/storage/memtable.rs': {
    id: 'src/storage/memtable.rs',
    name: 'memtable.rs',
    path: 'src/storage/memtable.rs',
    type: 'file',
    lines: 940,
    commitsCount: 42,
    firstSeenDate: '2022-03-15',
    lastChangedDate: '2025-08-14',
    firstSeenCommit: 'c300003',
    contributors: ['Marcus Chen'],
    changeFrequency: 'high',
    complexity: 84,
    status: 'stable',
    dependencies: ['src/storage/wal.rs'],
    module: 'storage',
    parentId: 'src/storage'
  },
  'src/storage/sstable.rs': {
    id: 'src/storage/sstable.rs',
    name: 'sstable.rs',
    path: 'src/storage/sstable.rs',
    type: 'file',
    lines: 1480,
    commitsCount: 51,
    firstSeenDate: '2022-03-15',
    lastChangedDate: '2025-11-02',
    firstSeenCommit: 'c300003',
    contributors: ['Marcus Chen', 'David Kim'],
    changeFrequency: 'high',
    complexity: 88,
    status: 'stable',
    dependencies: ['src/storage/bloom_filter.rs'],
    module: 'storage',
    parentId: 'src/storage'
  },
  'src/storage/compaction.rs': {
    id: 'src/storage/compaction.rs',
    name: 'compaction.rs',
    path: 'src/storage/compaction.rs',
    type: 'file',
    lines: 1650,
    commitsCount: 47,
    firstSeenDate: '2022-03-15',
    lastChangedDate: '2026-01-15',
    firstSeenCommit: 'c300003',
    contributors: ['Marcus Chen'],
    changeFrequency: 'high',
    complexity: 92,
    status: 'modified',
    dependencies: ['src/storage/sstable.rs'],
    module: 'storage',
    parentId: 'src/storage'
  },
  'src/storage/wal.rs': {
    id: 'src/storage/wal.rs',
    name: 'wal.rs',
    path: 'src/storage/wal.rs',
    type: 'file',
    lines: 1120,
    commitsCount: 64,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2025-10-18',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova', 'Marcus Chen'],
    changeFrequency: 'medium',
    complexity: 86,
    status: 'stable',
    dependencies: ['src/common/fs_util.rs'],
    module: 'storage',
    parentId: 'src/storage'
  },
  'src/storage/bloom_filter.rs': {
    id: 'src/storage/bloom_filter.rs',
    name: 'bloom_filter.rs',
    path: 'src/storage/bloom_filter.rs',
    type: 'file',
    lines: 420,
    commitsCount: 18,
    firstSeenDate: '2022-03-15',
    lastChangedDate: '2024-04-10',
    firstSeenCommit: 'c300003',
    contributors: ['David Kim'],
    changeFrequency: 'low',
    complexity: 65,
    status: 'stable',
    dependencies: [],
    module: 'storage',
    parentId: 'src/storage'
  },

  // Files in src/consensus
  'src/consensus/raft_node.rs': {
    id: 'src/consensus/raft_node.rs',
    name: 'raft_node.rs',
    path: 'src/consensus/raft_node.rs',
    type: 'file',
    lines: 2240,
    commitsCount: 72,
    firstSeenDate: '2021-08-20',
    lastChangedDate: '2025-11-19',
    firstSeenCommit: 'b200002',
    contributors: ['Priya Nair', 'Elena Rostova'],
    changeFrequency: 'high',
    complexity: 95,
    status: 'stable',
    dependencies: ['src/consensus/log.rs', 'src/consensus/rpc.rs'],
    module: 'consensus',
    parentId: 'src/consensus'
  },
  'src/consensus/log.rs': {
    id: 'src/consensus/log.rs',
    name: 'log.rs',
    path: 'src/consensus/log.rs',
    type: 'file',
    lines: 890,
    commitsCount: 38,
    firstSeenDate: '2021-08-20',
    lastChangedDate: '2024-08-12',
    firstSeenCommit: 'b200002',
    contributors: ['Priya Nair'],
    changeFrequency: 'medium',
    complexity: 80,
    status: 'stable',
    dependencies: ['src/storage/wal.rs'],
    module: 'consensus',
    parentId: 'src/consensus'
  },
  'src/consensus/rpc.rs': {
    id: 'src/consensus/rpc.rs',
    name: 'rpc.rs',
    path: 'src/consensus/rpc.rs',
    type: 'file',
    lines: 620,
    commitsCount: 26,
    firstSeenDate: '2021-08-20',
    lastChangedDate: '2023-05-18',
    firstSeenCommit: 'b200002',
    contributors: ['Priya Nair', 'Alex Vance'],
    changeFrequency: 'medium',
    complexity: 74,
    status: 'stable',
    dependencies: ['src/api/protocol.rs'],
    module: 'consensus',
    parentId: 'src/consensus'
  },
  'src/consensus/multi_raft.rs': {
    id: 'src/consensus/multi_raft.rs',
    name: 'multi_raft.rs',
    path: 'src/consensus/multi_raft.rs',
    type: 'file',
    lines: 1780,
    commitsCount: 41,
    firstSeenDate: '2024-07-14',
    lastChangedDate: '2025-11-19',
    firstSeenCommit: 'g700007',
    contributors: ['Priya Nair', 'Elena Rostova'],
    changeFrequency: 'high',
    complexity: 93,
    status: 'stable',
    dependencies: ['src/consensus/raft_node.rs'],
    module: 'consensus',
    parentId: 'src/consensus'
  },

  // Files in src/query
  'src/query/planner.rs': {
    id: 'src/query/planner.rs',
    name: 'planner.rs',
    path: 'src/query/planner.rs',
    type: 'file',
    lines: 2150,
    commitsCount: 68,
    firstSeenDate: '2022-10-04',
    lastChangedDate: '2026-02-10',
    firstSeenCommit: 'd400004',
    contributors: ['Sarah Jenkins', 'Elena Rostova'],
    changeFrequency: 'critical',
    complexity: 92,
    status: 'modified',
    dependencies: ['src/query/parser.rs', 'src/query/optimizer.rs'],
    module: 'query',
    parentId: 'src/query'
  },
  'src/query/parser.rs': {
    id: 'src/query/parser.rs',
    name: 'parser.rs',
    path: 'src/query/parser.rs',
    type: 'file',
    lines: 1340,
    commitsCount: 45,
    firstSeenDate: '2022-10-04',
    lastChangedDate: '2025-05-12',
    firstSeenCommit: 'd400004',
    contributors: ['Sarah Jenkins'],
    changeFrequency: 'medium',
    complexity: 82,
    status: 'stable',
    dependencies: ['src/core/types.rs'],
    module: 'query',
    parentId: 'src/query'
  },
  'src/query/optimizer.rs': {
    id: 'src/query/optimizer.rs',
    name: 'optimizer.rs',
    path: 'src/query/optimizer.rs',
    type: 'file',
    lines: 1820,
    commitsCount: 54,
    firstSeenDate: '2022-10-04',
    lastChangedDate: '2026-01-14',
    firstSeenCommit: 'd400004',
    contributors: ['Sarah Jenkins'],
    changeFrequency: 'high',
    complexity: 91,
    status: 'modified',
    dependencies: ['src/query/statistics.rs'],
    module: 'query',
    parentId: 'src/query'
  },
  'src/query/executor.rs': {
    id: 'src/query/executor.rs',
    name: 'executor.rs',
    path: 'src/query/executor.rs',
    type: 'file',
    lines: 1960,
    commitsCount: 62,
    firstSeenDate: '2022-10-04',
    lastChangedDate: '2026-02-08',
    firstSeenCommit: 'd400004',
    contributors: ['Sarah Jenkins', 'Elena Rostova'],
    changeFrequency: 'high',
    complexity: 89,
    status: 'modified',
    dependencies: ['src/storage/lsm_tree.rs', 'src/core/transactions.rs'],
    module: 'query',
    parentId: 'src/query'
  },
  'src/query/statistics.rs': {
    id: 'src/query/statistics.rs',
    name: 'statistics.rs',
    path: 'src/query/statistics.rs',
    type: 'file',
    lines: 680,
    commitsCount: 22,
    firstSeenDate: '2023-08-19',
    lastChangedDate: '2025-03-24',
    firstSeenCommit: 'e500005',
    contributors: ['Sarah Jenkins'],
    changeFrequency: 'low',
    complexity: 68,
    status: 'stable',
    dependencies: [],
    module: 'query',
    parentId: 'src/query'
  },

  // Files in src/api
  'src/api/tcp_server.rs': {
    id: 'src/api/tcp_server.rs',
    name: 'tcp_server.rs',
    path: 'src/api/tcp_server.rs',
    type: 'file',
    lines: 1100,
    commitsCount: 31,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2023-05-18',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova', 'Alex Vance'],
    changeFrequency: 'low',
    complexity: 75,
    status: 'deleted',
    dependencies: ['src/core/engine.rs'],
    module: 'api',
    parentId: 'src/api'
  },
  'src/api/grpc_service.rs': {
    id: 'src/api/grpc_service.rs',
    name: 'grpc_service.rs',
    path: 'src/api/grpc_service.rs',
    type: 'file',
    lines: 2310,
    commitsCount: 65,
    firstSeenDate: '2023-05-18',
    lastChangedDate: '2026-01-28',
    firstSeenCommit: 'e500005',
    contributors: ['Alex Vance', 'Sarah Jenkins'],
    changeFrequency: 'high',
    complexity: 86,
    status: 'modified',
    dependencies: ['src/query/executor.rs', 'src/api/protocol.rs'],
    module: 'api',
    parentId: 'src/api'
  },
  'src/api/protocol.rs': {
    id: 'src/api/protocol.rs',
    name: 'protocol.rs',
    path: 'src/api/protocol.rs',
    type: 'file',
    lines: 980,
    commitsCount: 44,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2025-08-30',
    firstSeenCommit: 'a100001',
    contributors: ['Alex Vance', 'Elena Rostova'],
    changeFrequency: 'medium',
    complexity: 70,
    status: 'stable',
    dependencies: [],
    module: 'api',
    parentId: 'src/api'
  },
  'src/api/auth.rs': {
    id: 'src/api/auth.rs',
    name: 'auth.rs',
    path: 'src/api/auth.rs',
    type: 'file',
    lines: 720,
    commitsCount: 28,
    firstSeenDate: '2023-05-18',
    lastChangedDate: '2025-11-12',
    firstSeenCommit: 'e500005',
    contributors: ['Alex Vance'],
    changeFrequency: 'medium',
    complexity: 72,
    status: 'stable',
    dependencies: [],
    module: 'api',
    parentId: 'src/api'
  },

  // Files in src/frontend (Nebula Studio web UI added in era 6)
  'src/frontend/App.tsx': {
    id: 'src/frontend/App.tsx',
    name: 'App.tsx',
    path: 'src/frontend/App.tsx',
    type: 'file',
    lines: 540,
    commitsCount: 35,
    firstSeenDate: '2023-11-29',
    lastChangedDate: '2025-12-05',
    firstSeenCommit: 'f600006',
    contributors: ['Mia Lindqvist'],
    changeFrequency: 'medium',
    complexity: 60,
    status: 'stable',
    dependencies: ['src/frontend/QueryConsole.tsx', 'src/frontend/ClusterMetrics.tsx'],
    module: 'frontend',
    parentId: 'src/frontend'
  },
  'src/frontend/QueryConsole.tsx': {
    id: 'src/frontend/QueryConsole.tsx',
    name: 'QueryConsole.tsx',
    path: 'src/frontend/QueryConsole.tsx',
    type: 'file',
    lines: 840,
    commitsCount: 28,
    firstSeenDate: '2023-11-29',
    lastChangedDate: '2025-11-04',
    firstSeenCommit: 'f600006',
    contributors: ['Mia Lindqvist'],
    changeFrequency: 'medium',
    complexity: 68,
    status: 'stable',
    dependencies: [],
    module: 'frontend',
    parentId: 'src/frontend'
  },
  'src/frontend/ClusterMetrics.tsx': {
    id: 'src/frontend/ClusterMetrics.tsx',
    name: 'ClusterMetrics.tsx',
    path: 'src/frontend/ClusterMetrics.tsx',
    type: 'file',
    lines: 670,
    commitsCount: 24,
    firstSeenDate: '2023-11-29',
    lastChangedDate: '2025-10-18',
    firstSeenCommit: 'f600006',
    contributors: ['Mia Lindqvist'],
    changeFrequency: 'medium',
    complexity: 62,
    status: 'stable',
    dependencies: [],
    module: 'frontend',
    parentId: 'src/frontend'
  },

  // Files in src/vector (HNSW vector indexing added in era 8)
  'src/vector/hnsw.rs': {
    id: 'src/vector/hnsw.rs',
    name: 'hnsw.rs',
    path: 'src/vector/hnsw.rs',
    type: 'file',
    lines: 2420,
    commitsCount: 42,
    firstSeenDate: '2025-02-10',
    lastChangedDate: '2026-02-12',
    firstSeenCommit: 'h800008',
    contributors: ['Marcus Chen', 'Elena Rostova'],
    changeFrequency: 'critical',
    complexity: 95,
    status: 'modified',
    dependencies: ['src/vector/distance.rs', 'src/storage/lsm_tree.rs'],
    module: 'vector',
    parentId: 'src/vector'
  },
  'src/vector/distance.rs': {
    id: 'src/vector/distance.rs',
    name: 'distance.rs',
    path: 'src/vector/distance.rs',
    type: 'file',
    lines: 780,
    commitsCount: 21,
    firstSeenDate: '2025-02-10',
    lastChangedDate: '2025-12-08',
    firstSeenCommit: 'h800008',
    contributors: ['Marcus Chen'],
    changeFrequency: 'high',
    complexity: 84,
    status: 'stable',
    dependencies: [],
    module: 'vector',
    parentId: 'src/vector'
  },
  'src/vector/embeddings_store.rs': {
    id: 'src/vector/embeddings_store.rs',
    name: 'embeddings_store.rs',
    path: 'src/vector/embeddings_store.rs',
    type: 'file',
    lines: 1390,
    commitsCount: 32,
    firstSeenDate: '2025-02-10',
    lastChangedDate: '2026-02-04',
    firstSeenCommit: 'h800008',
    contributors: ['Marcus Chen', 'Sarah Jenkins'],
    changeFrequency: 'high',
    complexity: 88,
    status: 'modified',
    dependencies: ['src/vector/hnsw.rs', 'src/storage/lsm_tree.rs'],
    module: 'vector',
    parentId: 'src/vector'
  },

  // Files in src/common
  'src/common/errors.rs': {
    id: 'src/common/errors.rs',
    name: 'errors.rs',
    path: 'src/common/errors.rs',
    type: 'file',
    lines: 390,
    commitsCount: 35,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2025-06-20',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova'],
    changeFrequency: 'low',
    complexity: 45,
    status: 'stable',
    dependencies: [],
    module: 'common',
    parentId: 'src/common'
  },
  'src/common/fs_util.rs': {
    id: 'src/common/fs_util.rs',
    name: 'fs_util.rs',
    path: 'src/common/fs_util.rs',
    type: 'file',
    lines: 480,
    commitsCount: 25,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2024-03-15',
    firstSeenCommit: 'a100001',
    contributors: ['Marcus Chen'],
    changeFrequency: 'low',
    complexity: 50,
    status: 'stable',
    dependencies: [],
    module: 'common',
    parentId: 'src/common'
  },

  // Files in tests & config
  'tests/integration_tests.rs': {
    id: 'tests/integration_tests.rs',
    name: 'integration_tests.rs',
    path: 'tests/integration_tests.rs',
    type: 'file',
    lines: 2980,
    commitsCount: 92,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2026-02-18',
    firstSeenCommit: 'a100001',
    contributors: ['Sarah Jenkins', 'Elena Rostova', 'Marcus Chen'],
    changeFrequency: 'critical',
    complexity: 70,
    status: 'modified',
    dependencies: ['src/core/engine.rs', 'src/query/planner.rs'],
    module: 'tests',
    parentId: 'tests'
  },
  'tests/chaos_raft.rs': {
    id: 'tests/chaos_raft.rs',
    name: 'chaos_raft.rs',
    path: 'tests/chaos_raft.rs',
    type: 'file',
    lines: 1450,
    commitsCount: 44,
    firstSeenDate: '2021-08-20',
    lastChangedDate: '2025-08-29',
    firstSeenCommit: 'b200002',
    contributors: ['Priya Nair'],
    changeFrequency: 'medium',
    complexity: 84,
    status: 'stable',
    dependencies: ['src/consensus/raft_node.rs'],
    module: 'tests',
    parentId: 'tests'
  },
  'tests/benchmark_storage.rs': {
    id: 'tests/benchmark_storage.rs',
    name: 'benchmark_storage.rs',
    path: 'tests/benchmark_storage.rs',
    type: 'file',
    lines: 1120,
    commitsCount: 38,
    firstSeenDate: '2022-03-15',
    lastChangedDate: '2025-11-20',
    firstSeenCommit: 'c300003',
    contributors: ['Marcus Chen', 'Alex Vance'],
    changeFrequency: 'medium',
    complexity: 65,
    status: 'stable',
    dependencies: ['src/storage/lsm_tree.rs'],
    module: 'tests',
    parentId: 'tests'
  },
  'config/nebuladb.toml': {
    id: 'config/nebuladb.toml',
    name: 'nebuladb.toml',
    path: 'config/nebuladb.toml',
    type: 'file',
    lines: 280,
    commitsCount: 22,
    firstSeenDate: '2021-03-12',
    lastChangedDate: '2025-08-11',
    firstSeenCommit: 'a100001',
    contributors: ['Elena Rostova', 'Alex Vance'],
    changeFrequency: 'low',
    complexity: 30,
    status: 'stable',
    dependencies: [],
    module: 'config',
    parentId: 'config'
  }
};

// Explicit graph links for relationship visualization
export const MASTER_LINKS: GenomeLink[] = [
  // Hierarchy links
  { source: 'src', target: 'src/core', type: 'hierarchy', strength: 1.0 },
  { source: 'src', target: 'src/storage', type: 'hierarchy', strength: 1.0 },
  { source: 'src', target: 'src/consensus', type: 'hierarchy', strength: 1.0 },
  { source: 'src', target: 'src/query', type: 'hierarchy', strength: 1.0 },
  { source: 'src', target: 'src/api', type: 'hierarchy', strength: 1.0 },
  { source: 'src', target: 'src/frontend', type: 'hierarchy', strength: 1.0 },
  { source: 'src', target: 'src/vector', type: 'hierarchy', strength: 1.0 },
  { source: 'src', target: 'src/common', type: 'hierarchy', strength: 1.0 },

  // Core file links
  { source: 'src/core', target: 'src/core/engine.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/core', target: 'src/core/types.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/core', target: 'src/core/transactions.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/core', target: 'src/core/memory_pool.rs', type: 'hierarchy', strength: 0.9 },

  // Storage file links
  { source: 'src/storage', target: 'src/storage/lsm_tree.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/storage', target: 'src/storage/memtable.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/storage', target: 'src/storage/sstable.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/storage', target: 'src/storage/compaction.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/storage', target: 'src/storage/wal.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/storage', target: 'src/storage/bloom_filter.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/storage', target: 'src/storage/btree_store.rs', type: 'hierarchy', strength: 0.9 },

  // Consensus links
  { source: 'src/consensus', target: 'src/consensus/raft_node.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/consensus', target: 'src/consensus/log.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/consensus', target: 'src/consensus/rpc.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/consensus', target: 'src/consensus/multi_raft.rs', type: 'hierarchy', strength: 0.9 },

  // Query links
  { source: 'src/query', target: 'src/query/planner.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/query', target: 'src/query/parser.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/query', target: 'src/query/optimizer.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/query', target: 'src/query/executor.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/query', target: 'src/query/statistics.rs', type: 'hierarchy', strength: 0.9 },

  // API links
  { source: 'src/api', target: 'src/api/grpc_service.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/api', target: 'src/api/tcp_server.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/api', target: 'src/api/protocol.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/api', target: 'src/api/auth.rs', type: 'hierarchy', strength: 0.9 },

  // Vector links
  { source: 'src/vector', target: 'src/vector/hnsw.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/vector', target: 'src/vector/distance.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'src/vector', target: 'src/vector/embeddings_store.rs', type: 'hierarchy', strength: 0.9 },

  // Frontend links
  { source: 'src/frontend', target: 'src/frontend/App.tsx', type: 'hierarchy', strength: 0.9 },
  { source: 'src/frontend', target: 'src/frontend/QueryConsole.tsx', type: 'hierarchy', strength: 0.9 },
  { source: 'src/frontend', target: 'src/frontend/ClusterMetrics.tsx', type: 'hierarchy', strength: 0.9 },

  // Tests & config
  { source: 'tests', target: 'tests/integration_tests.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'tests', target: 'tests/chaos_raft.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'tests', target: 'tests/benchmark_storage.rs', type: 'hierarchy', strength: 0.9 },
  { source: 'config', target: 'config/nebuladb.toml', type: 'hierarchy', strength: 0.9 },

  // Cross-module architectural data flows
  { source: 'src/core/engine.rs', target: 'src/storage/lsm_tree.rs', type: 'data-flow', strength: 0.7 },
  { source: 'src/core/engine.rs', target: 'src/consensus/raft_node.rs', type: 'data-flow', strength: 0.7 },
  { source: 'src/query/executor.rs', target: 'src/storage/lsm_tree.rs', type: 'data-flow', strength: 0.6 },
  { source: 'src/query/planner.rs', target: 'src/query/optimizer.rs', type: 'import', strength: 0.8 },
  { source: 'src/api/grpc_service.rs', target: 'src/query/planner.rs', type: 'data-flow', strength: 0.7 },
  { source: 'src/vector/hnsw.rs', target: 'src/storage/lsm_tree.rs', type: 'data-flow', strength: 0.65 },
  { source: 'src/frontend/QueryConsole.tsx', target: 'src/api/grpc_service.rs', type: 'data-flow', strength: 0.5 }
];

// 10 Deterministic Historical Snapshots (2021 - 2026)
export const NEBULA_SNAPSHOTS: HistoricalSnapshot[] = [
  {
    id: 'snap-01',
    index: 0,
    date: '2021-03-12',
    timestamp: new Date('2021-03-12T10:00:00Z').getTime(),
    commitHash: 'a100001',
    commitMessage: 'feat: Initial commit v0.1.0 prototype embedded KV engine',
    author: 'Elena Rostova',
    authorEmail: 'elena@nebuladb.io',
    tag: 'v0.1.0-alpha',
    isMajorMilestone: true,
    milestoneTitle: 'Initial Commit: KV Genesis',
    milestoneDescription: 'First release of NebulaDB as an embedded single-node key-value store with B-Tree storage and TCP listener.',
    milestoneCategory: 'initial',
    stats: {
      filesCount: 11,
      linesOfCode: 7240,
      directoriesCount: 5,
      modulesCount: 4,
      contributorsCount: 1,
      dependenciesCount: 5,
      additions: 7240,
      deletions: 0
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/api', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/storage/btree_store.rs', 'src/storage/wal.rs',
      'src/api/tcp_server.rs', 'src/api/protocol.rs', 'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: [
      'src/core/engine.rs', 'src/core/types.rs', 'src/storage/btree_store.rs', 'src/storage/wal.rs',
      'src/api/tcp_server.rs', 'src/api/protocol.rs', 'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'config/nebuladb.toml'
    ],
    addedFileIds: [
      'src/core/engine.rs', 'src/core/types.rs', 'src/storage/btree_store.rs', 'src/storage/wal.rs',
      'src/api/tcp_server.rs', 'src/api/protocol.rs', 'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'config/nebuladb.toml'
    ],
    removedFileIds: [],
    dependencies: [
      { name: 'tokio', version: '1.2.0', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'added', usedByModules: ['src/core', 'src/api'] },
      { name: 'serde', version: '1.0.126', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'added', usedByModules: ['src/common', 'src/api'] },
      { name: 'byteorder', version: '1.4.3', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'added', usedByModules: ['src/storage'] },
      { name: 'thiserror', version: '1.0.26', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'added', usedByModules: ['src/common'] },
      { name: 'criterion', version: '0.3.5', type: 'direct', category: 'development', addedInCommit: 'a100001', status: 'added', usedByModules: ['tests'] }
    ],
    architecture: {
      pattern: 'Embedded Prototype',
      description: 'Single-binary embedded database prototype with monolithic B-Tree file storage and raw TCP command loop.',
      layers: [
        {
          name: 'Networking',
          type: 'api',
          description: 'Basic asynchronous TCP socket parser handling GET/SET/DEL byte protocols.',
          modules: [{ name: 'tcp_server', path: 'src/api/tcp_server.rs', filesCount: 1, lines: 1100, status: 'added', responsibility: 'Socket loop & connection pooling' }]
        },
        {
          name: 'Core Engine',
          type: 'core',
          description: 'Memory coordinate dispatch and basic key-value operations.',
          modules: [{ name: 'engine', path: 'src/core/engine.rs', filesCount: 2, lines: 2320, status: 'added', responsibility: 'Command routing & life-cycle management' }]
        },
        {
          name: 'Storage Layer',
          type: 'storage',
          description: 'Synchronous B-Tree disk index with basic write-ahead logging.',
          modules: [{ name: 'btree_store', path: 'src/storage/btree_store.rs', filesCount: 2, lines: 3570, status: 'added', responsibility: 'On-disk page indexing' }]
        }
      ]
    }
  },
  {
    id: 'snap-02',
    index: 1,
    date: '2021-08-20',
    timestamp: new Date('2021-08-20T14:30:00Z').getTime(),
    commitHash: 'b200002',
    commitMessage: 'feat(consensus): implement Raft distributed consensus protocol',
    author: 'Priya Nair',
    authorEmail: 'priya@nebuladb.io',
    tag: 'v0.4.0-beta',
    isMajorMilestone: true,
    milestoneTitle: 'First Major Feature: Distributed Raft',
    milestoneDescription: 'Introduced consensus module with Raft state machine, leader election, log replication, and Jepsen-style chaos testing.',
    milestoneCategory: 'feature',
    stats: {
      filesCount: 16,
      linesOfCode: 12450,
      directoriesCount: 6,
      modulesCount: 5,
      contributorsCount: 3,
      dependenciesCount: 7,
      additions: 5210,
      deletions: 0
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/consensus', 'src/api', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/storage/btree_store.rs', 'src/storage/wal.rs',
      'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs',
      'src/api/tcp_server.rs', 'src/api/protocol.rs', 'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'tests/chaos_raft.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: ['src/core/engine.rs', 'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs', 'tests/chaos_raft.rs'],
    addedFileIds: ['src/consensus', 'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs', 'tests/chaos_raft.rs'],
    removedFileIds: [],
    dependencies: [
      { name: 'tokio', version: '1.5.0', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'updated', usedByModules: ['src/core', 'src/api', 'src/consensus'] },
      { name: 'serde', version: '1.0.130', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'updated', usedByModules: ['src/common', 'src/api'] },
      { name: 'byteorder', version: '1.4.3', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'active', usedByModules: ['src/storage'] },
      { name: 'thiserror', version: '1.0.26', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'active', usedByModules: ['src/common'] },
      { name: 'bincode', version: '1.3.3', type: 'direct', category: 'production', addedInCommit: 'b200002', status: 'added', usedByModules: ['src/consensus'] },
      { name: 'rand', version: '0.8.4', type: 'direct', category: 'production', addedInCommit: 'b200002', status: 'added', usedByModules: ['src/consensus'] },
      { name: 'criterion', version: '0.3.5', type: 'direct', category: 'development', addedInCommit: 'a100001', status: 'active', usedByModules: ['tests'] }
    ],
    architecture: {
      pattern: 'Clustered Core',
      description: 'Distributed 3-node cluster architecture with dedicated Raft consensus quorum coordinating writes.',
      layers: [
        {
          name: 'Networking & Transport',
          type: 'api',
          description: 'Client TCP commands and inter-node peer replication channels.',
          modules: [
            { name: 'tcp_server', path: 'src/api/tcp_server.rs', filesCount: 1, lines: 1100, status: 'stable', responsibility: 'Client connection router' },
            { name: 'peer_rpc', path: 'src/consensus/rpc.rs', filesCount: 1, lines: 620, status: 'added', responsibility: 'Inter-node heartbeat & vote RPC' }
          ]
        },
        {
          name: 'Consensus Quorum',
          type: 'consensus',
          description: 'Leader election, distributed commit log, and heartbeats.',
          modules: [{ name: 'raft_node', path: 'src/consensus/raft_node.rs', filesCount: 2, lines: 3130, status: 'added', responsibility: 'Raft state machine & log sync' }]
        },
        {
          name: 'Storage Node',
          type: 'storage',
          description: 'Replicated state machine storage backing.',
          modules: [{ name: 'btree_store', path: 'src/storage/btree_store.rs', filesCount: 2, lines: 3570, status: 'stable', responsibility: 'Committed state persistence' }]
        }
      ]
    }
  },
  {
    id: 'snap-03',
    index: 2,
    date: '2022-03-15',
    timestamp: new Date('2022-03-15T16:00:00Z').getTime(),
    commitHash: 'c300003',
    commitMessage: 'refactor(storage): introduce Log-Structured Merge Tree engine with SSTables & WAL',
    author: 'Marcus Chen',
    authorEmail: 'marcus@nebuladb.io',
    tag: 'v0.8.0',
    isMajorMilestone: true,
    milestoneTitle: 'Major Refactor: LSM-Tree Storage Engine',
    milestoneDescription: 'Replaced write-bottlenecked B-Tree with high-throughput LSM Tree featuring SkipList MemTable, SSTables, Bloom filters, and tiered compaction.',
    milestoneCategory: 'refactor',
    stats: {
      filesCount: 21,
      linesOfCode: 19820,
      directoriesCount: 6,
      modulesCount: 5,
      contributorsCount: 4,
      dependenciesCount: 9,
      additions: 8940,
      deletions: 1570
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/consensus', 'src/api', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/storage/btree_store.rs', 'src/storage/lsm_tree.rs',
      'src/storage/memtable.rs', 'src/storage/sstable.rs', 'src/storage/compaction.rs', 'src/storage/wal.rs', 'src/storage/bloom_filter.rs',
      'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs',
      'src/api/tcp_server.rs', 'src/api/protocol.rs', 'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'tests/chaos_raft.rs', 'tests/benchmark_storage.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: ['src/core/engine.rs', 'src/storage/wal.rs', 'src/storage/btree_store.rs'],
    addedFileIds: [
      'src/storage/lsm_tree.rs', 'src/storage/memtable.rs', 'src/storage/sstable.rs',
      'src/storage/compaction.rs', 'src/storage/bloom_filter.rs', 'tests/benchmark_storage.rs'
    ],
    removedFileIds: [],
    dependencies: [
      { name: 'tokio', version: '1.14.0', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'updated', usedByModules: ['src/core', 'src/api', 'src/consensus'] },
      { name: 'crossbeam-skiplist', version: '0.1.1', type: 'direct', category: 'production', addedInCommit: 'c300003', status: 'added', usedByModules: ['src/storage'] },
      { name: 'parking_lot', version: '0.12.0', type: 'direct', category: 'production', addedInCommit: 'c300003', status: 'added', usedByModules: ['src/storage', 'src/core'] },
      { name: 'crc32fast', version: '1.3.2', type: 'direct', category: 'production', addedInCommit: 'c300003', status: 'added', usedByModules: ['src/storage'] },
      { name: 'bincode', version: '1.3.3', type: 'direct', category: 'production', addedInCommit: 'b200002', status: 'active', usedByModules: ['src/consensus'] },
      { name: 'serde', version: '1.0.140', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'updated', usedByModules: ['src/common'] }
    ],
    architecture: {
      pattern: 'LSM Modular Engine',
      description: 'Log-Structured Merge architecture prioritizing 10x write amplification reduction and sequential I/O flushing.',
      layers: [
        {
          name: 'Networking Layer',
          type: 'api',
          description: 'TCP command handler.',
          modules: [{ name: 'tcp_server', path: 'src/api/tcp_server.rs', filesCount: 1, lines: 1100, status: 'stable', responsibility: 'Command reception' }]
        },
        {
          name: 'Consensus Layer',
          type: 'consensus',
          description: 'Raft replication log.',
          modules: [{ name: 'raft_node', path: 'src/consensus/raft_node.rs', filesCount: 3, lines: 3750, status: 'stable', responsibility: 'Consensus sync' }]
        },
        {
          name: 'LSM Engine',
          type: 'storage',
          description: 'Concurrent lock-free SkipList MemTable, SSTables, Bloom filters, and background compaction daemon.',
          modules: [
            { name: 'lsm_tree', path: 'src/storage/lsm_tree.rs', filesCount: 6, lines: 8730, status: 'added', responsibility: 'Tiered SSTable compaction & lookup' }
          ]
        }
      ]
    }
  },
  {
    id: 'snap-04',
    index: 3,
    date: '2022-10-04',
    timestamp: new Date('2022-10-04T11:15:00Z').getTime(),
    commitHash: 'd400004',
    commitMessage: 'feat(query): NebulaDB v1.0 Release with SQL dialect & Cost-Based Optimizer',
    author: 'Sarah Jenkins',
    authorEmail: 'sarah.j@nebuladb.io',
    tag: 'v1.0.0',
    isMajorMilestone: true,
    milestoneTitle: 'NebulaDB v1.0.0 Release & SQL Planner',
    milestoneDescription: 'Promoted NebulaDB from simple KV to an ACID relational document database with AST parsing, cost-based query optimization, and snapshot isolation.',
    milestoneCategory: 'release',
    stats: {
      filesCount: 26,
      linesOfCode: 27430,
      directoriesCount: 7,
      modulesCount: 6,
      contributorsCount: 4,
      dependenciesCount: 12,
      additions: 9240,
      deletions: 1630
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/consensus', 'src/query', 'src/api', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/core/transactions.rs',
      'src/storage/btree_store.rs', 'src/storage/lsm_tree.rs', 'src/storage/memtable.rs', 'src/storage/sstable.rs',
      'src/storage/compaction.rs', 'src/storage/wal.rs', 'src/storage/bloom_filter.rs',
      'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs',
      'src/query/planner.rs', 'src/query/parser.rs', 'src/query/optimizer.rs', 'src/query/executor.rs',
      'src/api/tcp_server.rs', 'src/api/protocol.rs', 'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'tests/chaos_raft.rs', 'tests/benchmark_storage.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: ['src/core/engine.rs', 'src/api/protocol.rs', 'tests/integration_tests.rs'],
    addedFileIds: [
      'src/core/transactions.rs', 'src/query', 'src/query/planner.rs', 'src/query/parser.rs',
      'src/query/optimizer.rs', 'src/query/executor.rs'
    ],
    removedFileIds: [],
    dependencies: [
      { name: 'sqlparser', version: '0.24.0', type: 'direct', category: 'production', addedInCommit: 'd400004', status: 'added', usedByModules: ['src/query'] },
      { name: 'arrow', version: '26.0.0', type: 'direct', category: 'production', addedInCommit: 'd400004', status: 'added', usedByModules: ['src/query'] },
      { name: 'tokio', version: '1.20.0', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'updated', usedByModules: ['src/core', 'src/api'] },
      { name: 'parking_lot', version: '0.12.1', type: 'direct', category: 'production', addedInCommit: 'c300003', status: 'active', usedByModules: ['src/storage', 'src/core'] }
    ],
    architecture: {
      pattern: 'LSM Modular Engine',
      description: 'v1.0 General Availability architecture: SQL parsing pipeline feeding into cost-based execution over the distributed LSM engine.',
      layers: [
        {
          name: 'Query Pipeline',
          type: 'query',
          description: 'SQL Parser -> AST -> Logical Plan -> Cost Optimizer -> Physical Plan Execution.',
          modules: [
            { name: 'planner', path: 'src/query/planner.rs', filesCount: 4, lines: 7270, status: 'added', responsibility: 'Cost-based query compilation' }
          ]
        },
        {
          name: 'ACID Transaction Manager',
          type: 'core',
          description: 'Multi-version concurrency control (MVCC) and snapshot isolation.',
          modules: [
            { name: 'transactions', path: 'src/core/transactions.rs', filesCount: 1, lines: 1420, status: 'added', responsibility: 'Snapshot read and 2PC write locks' }
          ]
        },
        {
          name: 'Distributed Storage & Raft',
          type: 'storage',
          description: 'Clustered LSM storage nodes.',
          modules: [
            { name: 'lsm_tree', path: 'src/storage/lsm_tree.rs', filesCount: 6, lines: 8730, status: 'stable', responsibility: 'Data storage' }
          ]
        }
      ]
    }
  },
  {
    id: 'snap-05',
    index: 4,
    date: '2023-05-18',
    timestamp: new Date('2023-05-18T09:40:00Z').getTime(),
    commitHash: 'e500005',
    commitMessage: 'feat(api): migrate from custom TCP protocol to high-performance gRPC & Protobuf',
    author: 'Alex Vance',
    authorEmail: 'alex.v@nebuladb.io',
    tag: 'v1.4.0',
    isMajorMilestone: true,
    milestoneTitle: 'Dependency Migration: gRPC & Protobuf',
    milestoneDescription: 'Deprecated legacy raw TCP server in favor of typed Protobuf contracts with streaming gRPC, JWT token auth, and client SDK generation.',
    milestoneCategory: 'dependency',
    stats: {
      filesCount: 28,
      linesOfCode: 31200,
      directoriesCount: 7,
      modulesCount: 6,
      contributorsCount: 5,
      dependenciesCount: 15,
      additions: 5120,
      deletions: 1350
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/consensus', 'src/query', 'src/api', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/core/transactions.rs',
      'src/storage/btree_store.rs', 'src/storage/lsm_tree.rs', 'src/storage/memtable.rs', 'src/storage/sstable.rs',
      'src/storage/compaction.rs', 'src/storage/wal.rs', 'src/storage/bloom_filter.rs',
      'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs',
      'src/query/planner.rs', 'src/query/parser.rs', 'src/query/optimizer.rs', 'src/query/executor.rs',
      'src/api/grpc_service.rs', 'src/api/protocol.rs', 'src/api/auth.rs', 'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'tests/chaos_raft.rs', 'tests/benchmark_storage.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: ['src/api/protocol.rs', 'src/consensus/rpc.rs'],
    addedFileIds: ['src/api/grpc_service.rs', 'src/api/auth.rs'],
    removedFileIds: ['src/api/tcp_server.rs'],
    dependencies: [
      { name: 'tonic', version: '0.9.2', type: 'direct', category: 'production', addedInCommit: 'e500005', status: 'added', usedByModules: ['src/api', 'src/consensus'] },
      { name: 'prost', version: '0.11.9', type: 'direct', category: 'production', addedInCommit: 'e500005', status: 'added', usedByModules: ['src/api'] },
      { name: 'jsonwebtoken', version: '8.3.0', type: 'direct', category: 'production', addedInCommit: 'e500005', status: 'added', usedByModules: ['src/api'] },
      { name: 'sqlparser', version: '0.30.0', type: 'direct', category: 'production', addedInCommit: 'd400004', status: 'updated', usedByModules: ['src/query'] }
    ],
    architecture: {
      pattern: 'Service-Oriented Engine',
      description: 'Micro-RPC service boundary exposing zero-copy HTTP/2 streaming endpoints to client SDKs.',
      layers: [
        {
          name: 'gRPC Transport & Auth',
          type: 'api',
          description: 'Protobuf service contracts with TLS encryption and token validation.',
          modules: [
            { name: 'grpc_service', path: 'src/api/grpc_service.rs', filesCount: 3, lines: 4010, status: 'added', responsibility: 'HTTP/2 Protobuf request dispatch' }
          ]
        },
        {
          name: 'Query & Storage Core',
          type: 'core',
          description: 'Decoupled relational execution pipeline.',
          modules: [
            { name: 'planner', path: 'src/query/planner.rs', filesCount: 4, lines: 7270, status: 'stable', responsibility: 'Query compilation' },
            { name: 'lsm_tree', path: 'src/storage/lsm_tree.rs', filesCount: 6, lines: 8730, status: 'stable', responsibility: 'State persistence' }
          ]
        }
      ]
    }
  },
  {
    id: 'snap-06',
    index: 5,
    date: '2023-11-29',
    timestamp: new Date('2023-11-29T15:20:00Z').getTime(),
    commitHash: 'f600006',
    commitMessage: 'feat(frontend): introduce Nebula Studio developer observability console',
    author: 'Mia Lindqvist',
    authorEmail: 'mia@nebuladb.io',
    tag: 'v1.8.0',
    isMajorMilestone: true,
    milestoneTitle: 'New Module: Nebula Studio Web Console',
    milestoneDescription: 'Added built-in browser-based management UI with real-time cluster health, query EXPLAIN plan visualizer, and live metrics.',
    milestoneCategory: 'feature',
    stats: {
      filesCount: 32,
      linesOfCode: 35150,
      directoriesCount: 8,
      modulesCount: 7,
      contributorsCount: 6,
      dependenciesCount: 18,
      additions: 4320,
      deletions: 370
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/consensus', 'src/query', 'src/api', 'src/frontend', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/core/transactions.rs',
      'src/storage/btree_store.rs', 'src/storage/lsm_tree.rs', 'src/storage/memtable.rs', 'src/storage/sstable.rs',
      'src/storage/compaction.rs', 'src/storage/wal.rs', 'src/storage/bloom_filter.rs',
      'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs',
      'src/query/planner.rs', 'src/query/parser.rs', 'src/query/optimizer.rs', 'src/query/executor.rs', 'src/query/statistics.rs',
      'src/api/grpc_service.rs', 'src/api/protocol.rs', 'src/api/auth.rs',
      'src/frontend/App.tsx', 'src/frontend/QueryConsole.tsx', 'src/frontend/ClusterMetrics.tsx',
      'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'tests/chaos_raft.rs', 'tests/benchmark_storage.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: ['src/api/grpc_service.rs', 'config/nebuladb.toml'],
    addedFileIds: ['src/frontend', 'src/frontend/App.tsx', 'src/frontend/QueryConsole.tsx', 'src/frontend/ClusterMetrics.tsx', 'src/query/statistics.rs'],
    removedFileIds: [],
    dependencies: [
      { name: 'tonic', version: '0.10.0', type: 'direct', category: 'production', addedInCommit: 'e500005', status: 'updated', usedByModules: ['src/api'] },
      { name: 'react', version: '18.2.0', type: 'direct', category: 'production', addedInCommit: 'f600006', status: 'added', usedByModules: ['src/frontend'] },
      { name: 'lucide-react', version: '0.290.0', type: 'direct', category: 'production', addedInCommit: 'f600006', status: 'added', usedByModules: ['src/frontend'] }
    ],
    architecture: {
      pattern: 'Service-Oriented Engine',
      description: 'Integrated developer console layer communicating via gRPC-Web proxy to internal metrics endpoints.',
      layers: [
        {
          name: 'Developer Experience & UI',
          type: 'frontend',
          description: 'Single-page browser application embedded into the NebulaDB binary.',
          modules: [
            { name: 'studio_ui', path: 'src/frontend/App.tsx', filesCount: 3, lines: 2050, status: 'added', responsibility: 'Observability & query playground' }
          ]
        },
        {
          name: 'API Gateway',
          type: 'api',
          description: 'Dual gRPC and gRPC-Web endpoint routing.',
          modules: [{ name: 'grpc_service', path: 'src/api/grpc_service.rs', filesCount: 3, lines: 4010, status: 'stable', responsibility: 'Multi-protocol proxy' }]
        },
        {
          name: 'Engine Core',
          type: 'core',
          description: 'Consensus and query execution.',
          modules: [{ name: 'lsm_tree', path: 'src/storage/lsm_tree.rs', filesCount: 6, lines: 8730, status: 'stable', responsibility: 'State persistence' }]
        }
      ]
    }
  },
  {
    id: 'snap-07',
    index: 6,
    date: '2024-07-14',
    timestamp: new Date('2024-07-14T13:45:00Z').getTime(),
    commitHash: 'g700007',
    commitMessage: 'refactor(arch): architecture decoupling into Multi-Raft & pluggable memory pools',
    author: 'Elena Rostova',
    authorEmail: 'elena@nebuladb.io',
    tag: 'v2.0.0',
    isMajorMilestone: true,
    milestoneTitle: 'Major Architecture Transition: Multi-Raft',
    milestoneDescription: 'Transitioned from single-Raft cluster to Multi-Raft horizontal partitioning across shard ranges with zero-allocation memory pools.',
    milestoneCategory: 'architecture',
    stats: {
      filesCount: 34,
      linesOfCode: 38920,
      directoriesCount: 8,
      modulesCount: 7,
      contributorsCount: 6,
      dependenciesCount: 19,
      additions: 5890,
      deletions: 2120
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/consensus', 'src/query', 'src/api', 'src/frontend', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/core/transactions.rs', 'src/core/memory_pool.rs',
      'src/storage/btree_store.rs', 'src/storage/lsm_tree.rs', 'src/storage/memtable.rs', 'src/storage/sstable.rs',
      'src/storage/compaction.rs', 'src/storage/wal.rs', 'src/storage/bloom_filter.rs',
      'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs', 'src/consensus/multi_raft.rs',
      'src/query/planner.rs', 'src/query/parser.rs', 'src/query/optimizer.rs', 'src/query/executor.rs', 'src/query/statistics.rs',
      'src/api/grpc_service.rs', 'src/api/protocol.rs', 'src/api/auth.rs',
      'src/frontend/App.tsx', 'src/frontend/QueryConsole.tsx', 'src/frontend/ClusterMetrics.tsx',
      'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'tests/chaos_raft.rs', 'tests/benchmark_storage.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: ['src/core/engine.rs', 'src/consensus/raft_node.rs', 'src/core/transactions.rs'],
    addedFileIds: ['src/core/memory_pool.rs', 'src/consensus/multi_raft.rs'],
    removedFileIds: [],
    dependencies: [
      { name: 'bumpalo', version: '3.13.0', type: 'direct', category: 'production', addedInCommit: 'g700007', status: 'added', usedByModules: ['src/core'] },
      { name: 'arrow-flight', version: '42.0.0', type: 'direct', category: 'production', addedInCommit: 'g700007', status: 'added', usedByModules: ['src/query', 'src/api'] }
    ],
    architecture: {
      pattern: 'Pluggable Multi-Engine',
      description: 'Distributed shard orchestration separating routing coordinators from Multi-Raft storage groups.',
      layers: [
        {
          name: 'Frontend Console',
          type: 'frontend',
          description: 'Management & cluster visualization.',
          modules: [{ name: 'studio_ui', path: 'src/frontend/App.tsx', filesCount: 3, lines: 2050, status: 'stable', responsibility: 'Cluster visualization' }]
        },
        {
          name: 'Multi-Raft Sharding',
          type: 'consensus',
          description: 'Independent consensus state machines running per key-range slice.',
          modules: [
            { name: 'multi_raft', path: 'src/consensus/multi_raft.rs', filesCount: 4, lines: 5530, status: 'added', responsibility: 'Partition routing & shard balance' }
          ]
        },
        {
          name: 'Memory Pool & Storage',
          type: 'storage',
          description: 'Zero-copy arena allocators back-pressuring LSM memtable flushes.',
          modules: [
            { name: 'memory_pool', path: 'src/core/memory_pool.rs', filesCount: 1, lines: 860, status: 'added', responsibility: 'Arena allocation' },
            { name: 'lsm_tree', path: 'src/storage/lsm_tree.rs', filesCount: 6, lines: 8730, status: 'stable', responsibility: 'SSTable management' }
          ]
        }
      ]
    }
  },
  {
    id: 'snap-08',
    index: 7,
    date: '2025-02-10',
    timestamp: new Date('2025-02-10T11:00:00Z').getTime(),
    commitHash: 'h800008',
    commitMessage: 'feat(vector): introduce native HNSW vector index & semantic similarity engine',
    author: 'Marcus Chen',
    authorEmail: 'marcus@nebuladb.io',
    tag: 'v2.6.0',
    isMajorMilestone: true,
    milestoneTitle: 'Major Extension: HNSW Vector Search',
    milestoneDescription: 'Integrated native hierarchical navigable small world (HNSW) vector indexing with SIMD cosine/dot-product acceleration for AI embedding queries.',
    milestoneCategory: 'feature',
    stats: {
      filesCount: 37,
      linesOfCode: 43510,
      directoriesCount: 9,
      modulesCount: 8,
      contributorsCount: 6,
      dependenciesCount: 22,
      additions: 6140,
      deletions: 1550
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/consensus', 'src/query', 'src/vector', 'src/api', 'src/frontend', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/core/transactions.rs', 'src/core/memory_pool.rs',
      'src/storage/btree_store.rs', 'src/storage/lsm_tree.rs', 'src/storage/memtable.rs', 'src/storage/sstable.rs',
      'src/storage/compaction.rs', 'src/storage/wal.rs', 'src/storage/bloom_filter.rs',
      'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs', 'src/consensus/multi_raft.rs',
      'src/query/planner.rs', 'src/query/parser.rs', 'src/query/optimizer.rs', 'src/query/executor.rs', 'src/query/statistics.rs',
      'src/vector/hnsw.rs', 'src/vector/distance.rs', 'src/vector/embeddings_store.rs',
      'src/api/grpc_service.rs', 'src/api/protocol.rs', 'src/api/auth.rs',
      'src/frontend/App.tsx', 'src/frontend/QueryConsole.tsx', 'src/frontend/ClusterMetrics.tsx',
      'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'tests/chaos_raft.rs', 'tests/benchmark_storage.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: ['src/query/planner.rs', 'src/query/executor.rs', 'src/storage/lsm_tree.rs'],
    addedFileIds: ['src/vector', 'src/vector/hnsw.rs', 'src/vector/distance.rs', 'src/vector/embeddings_store.rs'],
    removedFileIds: [],
    dependencies: [
      { name: 'simd-json', version: '0.10.1', type: 'direct', category: 'production', addedInCommit: 'h800008', status: 'added', usedByModules: ['src/vector'] },
      { name: 'wide', version: '0.7.11', type: 'direct', category: 'production', addedInCommit: 'h800008', status: 'added', usedByModules: ['src/vector'] },
      { name: 'qdrant-hnsw', version: '0.1.2', type: 'indirect', category: 'production', addedInCommit: 'h800008', status: 'added', usedByModules: ['src/vector'] }
    ],
    architecture: {
      pattern: 'Pluggable Multi-Engine',
      description: 'Hybrid relational + vector engine executing unified SQL queries with distance-ranked similarity filters.',
      layers: [
        {
          name: 'Vector Index Layer',
          type: 'extensions',
          description: 'HNSW graph with AVX-512 SIMD vector distance computations.',
          modules: [
            { name: 'hnsw_index', path: 'src/vector/hnsw.rs', filesCount: 3, lines: 4590, status: 'added', responsibility: 'Approximate nearest neighbor graph' }
          ]
        },
        {
          name: 'Unified Query Optimizer',
          type: 'query',
          description: 'Pushdown predicate optimizer combining B-Tree/LSM filters with vector radius bounds.',
          modules: [{ name: 'planner', path: 'src/query/planner.rs', filesCount: 5, lines: 7950, status: 'refactored', responsibility: 'Hybrid query compilation' }]
        },
        {
          name: 'Storage Subsystem',
          type: 'storage',
          description: 'Decoupled relational SSTables and vector embedding graphs.',
          modules: [{ name: 'lsm_tree', path: 'src/storage/lsm_tree.rs', filesCount: 6, lines: 8730, status: 'stable', responsibility: 'Storage engine' }]
        }
      ]
    }
  },
  {
    id: 'snap-09',
    index: 8,
    date: '2025-09-22',
    timestamp: new Date('2025-09-22T17:30:00Z').getTime(),
    commitHash: 'i900009',
    commitMessage: 'refactor(cleanup): deprecate and remove legacy v1 B-Tree engine & dead code purge',
    author: 'Elena Rostova',
    authorEmail: 'elena@nebuladb.io',
    tag: 'v2.9.0',
    isMajorMilestone: true,
    milestoneTitle: 'Large Deletion: Legacy Storage Purge',
    milestoneDescription: 'Completed 2-year deprecation cycle: removed 2,450 lines of legacy B-Tree storage code and cleaned up obsolete backward-compatibility shims.',
    milestoneCategory: 'deletion',
    stats: {
      filesCount: 36,
      linesOfCode: 41060,
      directoriesCount: 9,
      modulesCount: 8,
      contributorsCount: 6,
      dependenciesCount: 22,
      additions: 420,
      deletions: 2870
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/consensus', 'src/query', 'src/vector', 'src/api', 'src/frontend', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/core/transactions.rs', 'src/core/memory_pool.rs',
      'src/storage/lsm_tree.rs', 'src/storage/memtable.rs', 'src/storage/sstable.rs',
      'src/storage/compaction.rs', 'src/storage/wal.rs', 'src/storage/bloom_filter.rs',
      'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs', 'src/consensus/multi_raft.rs',
      'src/query/planner.rs', 'src/query/parser.rs', 'src/query/optimizer.rs', 'src/query/executor.rs', 'src/query/statistics.rs',
      'src/vector/hnsw.rs', 'src/vector/distance.rs', 'src/vector/embeddings_store.rs',
      'src/api/grpc_service.rs', 'src/api/protocol.rs', 'src/api/auth.rs',
      'src/frontend/App.tsx', 'src/frontend/QueryConsole.tsx', 'src/frontend/ClusterMetrics.tsx',
      'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'tests/chaos_raft.rs', 'tests/benchmark_storage.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: ['src/core/engine.rs', 'src/storage/wal.rs'],
    addedFileIds: [],
    removedFileIds: ['src/storage/btree_store.rs'],
    dependencies: [
      { name: 'byteorder', version: '1.4.3', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'removed', usedByModules: [] }
    ],
    architecture: {
      pattern: 'Modern Distributed Engine',
      description: 'Streamlined pure-LSM storage layer with simplified abstractions and zero legacy debt.',
      layers: [
        {
          name: 'Multi-Modal Queries',
          type: 'query',
          description: 'SQL + Vector query execution pipeline.',
          modules: [{ name: 'planner', path: 'src/query/planner.rs', filesCount: 5, lines: 7950, status: 'stable', responsibility: 'Planner' }]
        },
        {
          name: 'Storage Layer',
          type: 'storage',
          description: 'Unified LSM storage engine without legacy B-Tree fallbacks.',
          modules: [{ name: 'lsm_tree', path: 'src/storage/lsm_tree.rs', filesCount: 5, lines: 7610, status: 'refactored', responsibility: 'Pure LSM persistence' }]
        }
      ]
    }
  },
  {
    id: 'snap-10',
    index: 9,
    date: '2026-02-18',
    timestamp: new Date('2026-02-18T14:10:00Z').getTime(),
    commitHash: 'j000010',
    commitMessage: 'feat(core): NebulaDB v3.0 Distributed Transactions & Active Replication',
    author: 'Elena Rostova',
    authorEmail: 'elena@nebuladb.io',
    tag: 'v3.0.0-final',
    isMajorMilestone: true,
    milestoneTitle: 'Current State: NebulaDB v3.0 Distributed Engine',
    milestoneDescription: 'Modern distributed database flagship release with Percolator-style cross-shard 2PC distributed transactions, SIMD vector search, and unified console.',
    milestoneCategory: 'release',
    stats: {
      filesCount: 36,
      linesOfCode: 42800,
      directoriesCount: 9,
      modulesCount: 8,
      contributorsCount: 6,
      dependenciesCount: 23,
      additions: 2160,
      deletions: 420
    },
    activeFileIds: [
      'src', 'src/core', 'src/storage', 'src/consensus', 'src/query', 'src/vector', 'src/api', 'src/frontend', 'src/common', 'tests', 'config',
      'src/core/engine.rs', 'src/core/types.rs', 'src/core/transactions.rs', 'src/core/memory_pool.rs',
      'src/storage/lsm_tree.rs', 'src/storage/memtable.rs', 'src/storage/sstable.rs',
      'src/storage/compaction.rs', 'src/storage/wal.rs', 'src/storage/bloom_filter.rs',
      'src/consensus/raft_node.rs', 'src/consensus/log.rs', 'src/consensus/rpc.rs', 'src/consensus/multi_raft.rs',
      'src/query/planner.rs', 'src/query/parser.rs', 'src/query/optimizer.rs', 'src/query/executor.rs', 'src/query/statistics.rs',
      'src/vector/hnsw.rs', 'src/vector/distance.rs', 'src/vector/embeddings_store.rs',
      'src/api/grpc_service.rs', 'src/api/protocol.rs', 'src/api/auth.rs',
      'src/frontend/App.tsx', 'src/frontend/QueryConsole.tsx', 'src/frontend/ClusterMetrics.tsx',
      'src/common/errors.rs', 'src/common/fs_util.rs',
      'tests/integration_tests.rs', 'tests/chaos_raft.rs', 'tests/benchmark_storage.rs', 'config/nebuladb.toml'
    ],
    changedFileIds: ['src/core/engine.rs', 'src/core/transactions.rs', 'src/query/planner.rs', 'tests/integration_tests.rs'],
    addedFileIds: [],
    removedFileIds: [],
    dependencies: [
      { name: 'tokio', version: '1.36.0', type: 'direct', category: 'production', addedInCommit: 'a100001', status: 'updated', usedByModules: ['src/core', 'src/api'] },
      { name: 'tonic', version: '0.11.0', type: 'direct', category: 'production', addedInCommit: 'e500005', status: 'updated', usedByModules: ['src/api'] },
      { name: 'sqlparser', version: '0.44.0', type: 'direct', category: 'production', addedInCommit: 'd400004', status: 'updated', usedByModules: ['src/query'] },
      { name: 'simd-json', version: '0.13.0', type: 'direct', category: 'production', addedInCommit: 'h800008', status: 'updated', usedByModules: ['src/vector'] },
      { name: 'arrow', version: '50.0.0', type: 'direct', category: 'production', addedInCommit: 'd400004', status: 'updated', usedByModules: ['src/query'] }
    ],
    architecture: {
      pattern: 'Modern Distributed Engine',
      description: 'NebulaDB v3.0 flagship topology: Autonomous shard groups coordinated by Percolator timestamp oracles with hybrid vector search.',
      layers: [
        {
          name: 'Client Applications & Console',
          type: 'frontend',
          description: 'Nebula Studio, Grafana integration, and language drivers (Rust, Go, Python, Node).',
          modules: [
            { name: 'studio_ui', path: 'src/frontend/App.tsx', filesCount: 3, lines: 2050, status: 'stable', responsibility: 'Web dashboard' }
          ]
        },
        {
          name: 'High-Performance API Gateway',
          type: 'api',
          description: 'gRPC streaming with Arrow Flight tabular bulk transit and JWT RBAC.',
          modules: [
            { name: 'grpc_service', path: 'src/api/grpc_service.rs', filesCount: 3, lines: 4010, status: 'stable', responsibility: 'Protobuf & Arrow transport' }
          ]
        },
        {
          name: 'Relational & Vector Query Engine',
          type: 'query',
          description: 'Cascades-style cost-based query optimizer executing hybrid vector-relational plans.',
          modules: [
            { name: 'planner', path: 'src/query/planner.rs', filesCount: 5, lines: 7950, status: 'stable', responsibility: 'Hybrid query compilation' },
            { name: 'hnsw_index', path: 'src/vector/hnsw.rs', filesCount: 3, lines: 4590, status: 'stable', responsibility: 'SIMD approximate nearest neighbor' }
          ]
        },
        {
          name: 'Multi-Raft Consensus Subsystem',
          type: 'consensus',
          description: 'Dynamic range leases with geo-replicated quorum.',
          modules: [
            { name: 'multi_raft', path: 'src/consensus/multi_raft.rs', filesCount: 4, lines: 5530, status: 'stable', responsibility: 'Range partitions' }
          ]
        },
        {
          name: 'LSM Engine & Memory Pools',
          type: 'storage',
          description: 'Zero-copy write buffers, tiered block-based SSTables, and lock-free compaction.',
          modules: [
            { name: 'lsm_tree', path: 'src/storage/lsm_tree.rs', filesCount: 5, lines: 7610, status: 'stable', responsibility: 'High throughput persistent storage' },
            { name: 'memory_pool', path: 'src/core/memory_pool.rs', filesCount: 1, lines: 860, status: 'stable', responsibility: 'Zero-alloc arena' }
          ]
        }
      ]
    }
  }
];

// Rich file evolution tracking for key files
export const NEBULA_FILE_EVOLUTIONS: Record<string, FileEvolutionRecord> = {
  'src/storage/lsm_tree.rs': {
    path: 'src/storage/lsm_tree.rs',
    firstAppearance: '2022-03-15',
    lastModification: '2026-01-20',
    totalCommits: 88,
    contributors: ['Marcus Chen', 'Elena Rostova', 'David Kim'],
    totalAdditions: 4920,
    totalDeletions: 1800,
    changeFrequency: 'critical',
    events: [
      { date: '2022-03-15', commitHash: 'c300003', type: 'created', author: 'Marcus Chen', message: 'Initial implementation of concurrent LSM Tree engine', additions: 1840, deletions: 0 },
      { date: '2022-08-11', commitHash: 'c9120a1', type: 'modified', author: 'Marcus Chen', message: 'Optimize block cache hit ratio using 2Q eviction policy', additions: 320, deletions: 80 },
      { date: '2023-02-19', commitHash: 'd8821bc', type: 'refactored', author: 'Elena Rostova', message: 'Thread-safe lock-free SSTable reader with epoch-based reclamation', additions: 640, deletions: 410 },
      { date: '2024-07-14', commitHash: 'g700007', type: 'modified', author: 'Marcus Chen', message: 'Integrate memory pool allocator into LSM memtable flusher', additions: 480, deletions: 210 },
      { date: '2025-02-10', commitHash: 'h800008', type: 'modified', author: 'Marcus Chen', message: 'Add SSTable secondary vector index pointers', additions: 590, deletions: 120 },
      { date: '2026-01-20', commitHash: 'j921890', type: 'modified', author: 'Elena Rostova', message: 'Prepare v3.0 zero-copy transaction read paths', additions: 1050, deletions: 980 }
    ]
  },
  'src/storage/btree_store.rs': {
    path: 'src/storage/btree_store.rs',
    firstAppearance: '2021-03-12',
    lastModification: '2025-09-22',
    totalCommits: 38,
    contributors: ['Elena Rostova', 'Marcus Chen'],
    totalAdditions: 2450,
    totalDeletions: 2450,
    changeFrequency: 'low',
    events: [
      { date: '2021-03-12', commitHash: 'a100001', type: 'created', author: 'Elena Rostova', message: 'Create initial prototype on-disk B-Tree store', additions: 2450, deletions: 0 },
      { date: '2022-03-15', commitHash: 'c300003', type: 'modified', author: 'Marcus Chen', message: 'Demote B-Tree to secondary fallback as LSM becomes default', additions: 120, deletions: 80 },
      { date: '2024-01-10', commitHash: 'f102938', type: 'refactored', author: 'Elena Rostova', message: 'Mark B-Tree engine as deprecated for v2 release', additions: 40, deletions: 120 },
      { date: '2025-09-22', commitHash: 'i900009', type: 'deleted', author: 'Elena Rostova', message: 'Purge deprecated B-Tree store and references', additions: 0, deletions: 2450 }
    ]
  },
  'src/query/planner.rs': {
    path: 'src/query/planner.rs',
    firstAppearance: '2022-10-04',
    lastModification: '2026-02-10',
    totalCommits: 68,
    contributors: ['Sarah Jenkins', 'Elena Rostova'],
    totalAdditions: 3890,
    totalDeletions: 1740,
    changeFrequency: 'critical',
    events: [
      { date: '2022-10-04', commitHash: 'd400004', type: 'created', author: 'Sarah Jenkins', message: 'Implement cost-based logical planner for v1.0', additions: 2150, deletions: 0 },
      { date: '2023-04-12', commitHash: 'd998231', type: 'modified', author: 'Sarah Jenkins', message: 'Add hash join predicate pushdown optimization', additions: 420, deletions: 110 },
      { date: '2024-07-14', commitHash: 'g700007', type: 'refactored', author: 'Sarah Jenkins', message: 'Adapt planner for Multi-Raft distributed query routing', additions: 680, deletions: 490 },
      { date: '2025-02-10', commitHash: 'h800008', type: 'modified', author: 'Sarah Jenkins', message: 'Support hybrid vector distance filter pushdown in SQL AST', additions: 640, deletions: 140 }
    ]
  },
  'src/consensus/raft_node.rs': {
    path: 'src/consensus/raft_node.rs',
    firstAppearance: '2021-08-20',
    lastModification: '2025-11-19',
    totalCommits: 72,
    contributors: ['Priya Nair', 'Elena Rostova'],
    totalAdditions: 3120,
    totalDeletions: 880,
    changeFrequency: 'high',
    events: [
      { date: '2021-08-20', commitHash: 'b200002', type: 'created', author: 'Priya Nair', message: 'Core Raft state machine, elections, and replication', additions: 2240, deletions: 0 },
      { date: '2022-05-14', commitHash: 'c772819', type: 'modified', author: 'Priya Nair', message: 'Joint consensus configuration membership changes', additions: 380, deletions: 120 },
      { date: '2024-07-14', commitHash: 'g700007', type: 'refactored', author: 'Elena Rostova', message: 'Extract single-raft into modular RaftGroup handle for Multi-Raft', additions: 500, deletions: 760 }
    ]
  },
  'src/vector/hnsw.rs': {
    path: 'src/vector/hnsw.rs',
    firstAppearance: '2025-02-10',
    lastModification: '2026-02-12',
    totalCommits: 42,
    contributors: ['Marcus Chen', 'Elena Rostova'],
    totalAdditions: 2420,
    totalDeletions: 310,
    changeFrequency: 'critical',
    events: [
      { date: '2025-02-10', commitHash: 'h800008', type: 'created', author: 'Marcus Chen', message: 'Implement HNSW vector graph algorithm with SIMD distance', additions: 2420, deletions: 0 },
      { date: '2025-06-18', commitHash: 'h991823', type: 'modified', author: 'Marcus Chen', message: 'AVX-512 cosine distance fast-path optimizations', additions: 340, deletions: 90 },
      { date: '2026-02-12', commitHash: 'j112849', type: 'modified', author: 'Elena Rostova', message: 'Lock-free dynamic link updating during concurrent query execution', additions: 410, deletions: 220 }
    ]
  }
};

export const NEBULA_DATASET: RepositoryDataset = {
  metadata: {
    name: 'nebuladb/nebuladb',
    description: 'High-performance distributed hybrid relational and vector database with Multi-Raft consensus.',
    defaultBranch: 'main',
    branches: ['main', 'release/v3.0', 'release/v2.0', 'release/v1.0', 'feature/hnsw-vector'],
    isDemo: true,
    sourceUrl: 'https://github.com/nebuladb/nebuladb',
    totalCommits: 1420,
    totalContributors: 6,
    createdAt: '2021-03-12',
    updatedAt: '2026-02-18'
  },
  allNodes: MASTER_NODES,
  links: MASTER_LINKS,
  snapshots: NEBULA_SNAPSHOTS,
  contributors: NEBULA_CONTRIBUTORS,
  fileEvolutions: NEBULA_FILE_EVOLUTIONS
};
