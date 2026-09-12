import { HistoricalSnapshot, DetectedEvent, EventDetectionType } from '../../types';

/**
 * Client-Side Heuristic Event Detection Engine
 * Analyzes repository snapshots and detects structural milestones using transparent, reproducible rules.
 */
export function detectRepositoryEvents(snapshots: HistoricalSnapshot[]): DetectedEvent[] {
  const events: DetectedEvent[] = [];

  snapshots.forEach((snap, idx) => {
    const prevSnap = idx > 0 ? snapshots[idx - 1] : null;

    // 1. Initial Commit Heuristic
    if (idx === 0) {
      events.push({
        id: `evt-init-${snap.commitHash}`,
        type: 'initial_commit',
        title: 'Repository Genesis',
        description: snap.milestoneTitle || 'Repository initialized with initial codebase scaffold.',
        date: snap.date,
        commitHash: snap.commitHash,
        author: snap.author,
        snapshotIndex: idx,
        impactScore: 'critical',
        affectedModules: ['root', 'core'],
        filesCountChanged: snap.stats.filesCount,
        additions: snap.stats.additions,
        deletions: 0,
        heuristicRationale: 'Identified commit index 0 with baseline file structure allocation.'
      });
      return;
    }

    if (!prevSnap) return;

    // 2. Large Addition (> 5,000 lines or > 10 files added)
    if (snap.stats.additions >= 5000 || snap.addedFileIds.length >= 6) {
      events.push({
        id: `evt-add-${snap.commitHash}`,
        type: 'large_addition',
        title: `High-Volume Code Ingestion (+${snap.stats.additions.toLocaleString()} lines)`,
        description: `Rapid expansion adding ${snap.addedFileIds.length} new files into the active tree.`,
        date: snap.date,
        commitHash: snap.commitHash,
        author: snap.author,
        snapshotIndex: idx,
        impactScore: 'high',
        affectedModules: extractAffectedModules(snap.addedFileIds),
        filesCountChanged: snap.addedFileIds.length,
        additions: snap.stats.additions,
        deletions: snap.stats.deletions,
        heuristicRationale: `Additions (${snap.stats.additions}) exceeded high-churn threshold (>= 5,000 LOC or >= 6 new files).`
      });
    }

    // 3. Large Deletion (> 1,500 lines deleted or >= 1 core file removed)
    if (snap.stats.deletions >= 1500 || snap.removedFileIds.length > 0) {
      events.push({
        id: `evt-del-${snap.commitHash}`,
        type: 'large_deletion',
        title: `Technical Debt Purge (-${snap.stats.deletions.toLocaleString()} lines)`,
        description: `Substantial pruning removing ${snap.removedFileIds.length} files (${snap.removedFileIds.join(', ') || 'pruned components'}).`,
        date: snap.date,
        commitHash: snap.commitHash,
        author: snap.author,
        snapshotIndex: idx,
        impactScore: snap.stats.deletions > 2000 ? 'critical' : 'high',
        affectedModules: extractAffectedModules(snap.removedFileIds),
        filesCountChanged: snap.removedFileIds.length,
        additions: snap.stats.additions,
        deletions: snap.stats.deletions,
        heuristicRationale: `Deletions (${snap.stats.deletions}) exceeded pruning threshold (>= 1,500 LOC or file removal).`
      });
    }

    // 4. Refactor-like Structural Change (High churn while net files change is minimal)
    const netFiles = snap.stats.filesCount - prevSnap.stats.filesCount;
    if (snap.changedFileIds.length >= 3 && Math.abs(netFiles) <= 2 && snap.stats.additions > 1500 && snap.stats.deletions > 500) {
      events.push({
        id: `evt-refact-${snap.commitHash}`,
        type: 'refactor_structural',
        title: 'Core Engine Refactor',
        description: `Internal rewriting across ${snap.changedFileIds.length} files without significant file-count expansion.`,
        date: snap.date,
        commitHash: snap.commitHash,
        author: snap.author,
        snapshotIndex: idx,
        impactScore: 'high',
        affectedModules: extractAffectedModules(snap.changedFileIds),
        filesCountChanged: snap.changedFileIds.length,
        additions: snap.stats.additions,
        deletions: snap.stats.deletions,
        heuristicRationale: 'Detected concurrent high additions and deletions with steady file count (typical refactoring signature).'
      });
    }

    // 5. Major Architecture Change (Pattern change)
    if (snap.architecture.pattern !== prevSnap.architecture.pattern) {
      events.push({
        id: `evt-arch-${snap.commitHash}`,
        type: 'architecture_change',
        title: `Paradigm Shift: ${prevSnap.architecture.pattern} → ${snap.architecture.pattern}`,
        description: snap.architecture.description,
        date: snap.date,
        commitHash: snap.commitHash,
        author: snap.author,
        snapshotIndex: idx,
        impactScore: 'critical',
        affectedModules: snap.architecture.layers.map(l => l.name),
        filesCountChanged: snap.changedFileIds.length + snap.addedFileIds.length,
        additions: snap.stats.additions,
        deletions: snap.stats.deletions,
        heuristicRationale: `Architectural topology definition transition from '${prevSnap.architecture.pattern}' to '${snap.architecture.pattern}'.`
      });
    }

    // 6. New Module or Directory Introduction
    if (snap.stats.modulesCount > prevSnap.stats.modulesCount) {
      const newModules = snap.addedFileIds.filter(id => !id.includes('.')).map(id => id.split('/')[1] || id);
      events.push({
        id: `evt-mod-${snap.commitHash}`,
        type: 'directory_introduction',
        title: `Module Subsystem Expansion (+${snap.stats.modulesCount - prevSnap.stats.modulesCount} modules)`,
        description: `Introduced new top-level architectural subsystem: ${newModules.join(', ') || 'new subsystem'}.`,
        date: snap.date,
        commitHash: snap.commitHash,
        author: snap.author,
        snapshotIndex: idx,
        impactScore: 'medium',
        affectedModules: newModules,
        filesCountChanged: snap.addedFileIds.length,
        additions: snap.stats.additions,
        deletions: snap.stats.deletions,
        heuristicRationale: `Repository module count elevated from ${prevSnap.stats.modulesCount} to ${snap.stats.modulesCount}.`
      });
    }

    // 7. Dependency Changes
    const addedDeps = snap.dependencies.filter(d => d.status === 'added');
    const removedDeps = snap.dependencies.filter(d => d.status === 'removed');
    if (addedDeps.length > 0 || removedDeps.length > 0) {
      events.push({
        id: `evt-dep-${snap.commitHash}`,
        type: 'dependency_change',
        title: `Dependency Manifest Alteration`,
        description: `${addedDeps.length > 0 ? `Integrated ${addedDeps.map(d => `${d.name}@${d.version}`).join(', ')}. ` : ''}${removedDeps.length > 0 ? `Pruned ${removedDeps.map(d => d.name).join(', ')}.` : ''}`,
        date: snap.date,
        commitHash: snap.commitHash,
        author: snap.author,
        snapshotIndex: idx,
        impactScore: addedDeps.some(d => ['tonic', 'arrow', 'sqlparser', 'simd-json'].includes(d.name)) ? 'high' : 'medium',
        affectedModules: Array.from(new Set(addedDeps.flatMap(d => d.usedByModules))),
        filesCountChanged: 1,
        additions: snap.stats.additions,
        deletions: snap.stats.deletions,
        heuristicRationale: `Detected ${addedDeps.length} dependency additions and ${removedDeps.length} dependency deprecations.`
      });
    }

    // 8. Contributor Milestones
    if (snap.stats.contributorsCount > prevSnap.stats.contributorsCount) {
      events.push({
        id: `evt-contrib-${snap.commitHash}`,
        type: 'contributor_milestone',
        title: `Contributor Base Expansion (${snap.stats.contributorsCount} active maintainers)`,
        description: `New core contributor (${snap.author}) committed code to the repository.`,
        date: snap.date,
        commitHash: snap.commitHash,
        author: snap.author,
        snapshotIndex: idx,
        impactScore: 'low',
        affectedModules: extractAffectedModules(snap.changedFileIds),
        filesCountChanged: snap.changedFileIds.length,
        additions: snap.stats.additions,
        deletions: snap.stats.deletions,
        heuristicRationale: `Distinct author signature count reached milestone of ${snap.stats.contributorsCount}.`
      });
    }

    // 9. Release Tag
    if (snap.tag) {
      events.push({
        id: `evt-tag-${snap.commitHash}`,
        type: 'release_tag',
        title: `Release Milestone ${snap.tag}`,
        description: snap.commitMessage,
        date: snap.date,
        commitHash: snap.commitHash,
        author: snap.author,
        snapshotIndex: idx,
        impactScore: snap.isMajorMilestone ? 'critical' : 'high',
        affectedModules: ['all'],
        filesCountChanged: snap.stats.filesCount,
        additions: snap.stats.additions,
        deletions: snap.stats.deletions,
        heuristicRationale: `Semantic version git tag '${snap.tag}' encountered on snapshot.`
      });
    }
  });

  return events;
}

function extractAffectedModules(filePaths: string[]): string[] {
  const modules = new Set<string>();
  filePaths.forEach(p => {
    const parts = p.split('/');
    if (parts.length > 1) {
      modules.add(parts[1]);
    } else {
      modules.add(parts[0]);
    }
  });
  return Array.from(modules);
}
