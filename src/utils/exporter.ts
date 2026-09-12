import { RepositoryDataset } from '../types';

export function exportDatasetAsJson(dataset: RepositoryDataset) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataset, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${dataset.metadata.name.replace(/[^a-z0-9_-]/gi, '_')}_genome.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportTimelineAsCsv(dataset: RepositoryDataset) {
  const headers = ['Index', 'Date', 'CommitHash', 'Author', 'MilestoneTitle', 'FilesCount', 'LOC', 'Additions', 'Deletions', 'Architecture'];
  const rows = dataset.snapshots.map(s => [
    s.index,
    `"${s.date}"`,
    `"${s.commitHash}"`,
    `"${s.author}"`,
    `"${(s.milestoneTitle || s.commitMessage).replace(/"/g, '""')}"`,
    s.stats.filesCount,
    s.stats.linesOfCode,
    s.stats.additions,
    s.stats.deletions,
    `"${s.architecture.pattern}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${dataset.metadata.name.replace(/[^a-z0-9_-]/gi, '_')}_timeline.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
