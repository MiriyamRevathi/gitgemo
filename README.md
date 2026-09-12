# GitGenome 

> **See how software evolves.** An interactive visual genome and time machine for software repositories.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8.svg)](https://tailwindcss.com/)
[![Production LOC](https://img.shields.io/badge/Production%20LOC-600K%2B-emerald.svg)](./LOC-VERIFICATION.md)

---

## Overview

Modern software engineering tools offer fine-grained file diffs and commit histories, but lack an intuitive, macro-level perspective on how software architecture changes over months and years. 

**GitGenome** bridges this gap. It analyzes git commit histories, dependency graphs, and subsystem structures to construct an interactive, force-directed **visual genome** of your repository. With its built-in **Temporal Time Machine**, engineering teams, architects, and stakeholders can scrub backward and forward through repository history, replay codebase evolution like a film, track architectural drift, and identify hotspot risks before they become technical debt.

---

## Key Features

###  Interactive Force-Directed Genome Graph
- **Subsystem & Node Visualization**: Renders files, directories, modules, and services as an interactive physics simulation.
- **Dynamic Node Sizing & Metrics**: Node radius reflects lines of code (LOC); color-coding reflects architectural module, modification status (created, modified, stable, deleted), and churn frequency.
- **Deep Node Inspector**: Click any node to inspect cyclomatic complexity, historical commit count, author attribution, first-seen/last-modified timestamps, and inbound/outbound dependency connections.

### Temporal Time Machine & Repository Replay
- **Interactive Scrubber**: Scrub across commits, snapshots, and releases with precision timeline controls.
- **Cinematic Repository Replay**: Press play to watch the codebase organically grow, refactor, split, and prune over time at adjustable speeds (0.5× to 4×).
- **Snapshot Diff Indicators**: Real-time indicators of files added, modified, or removed at each historical milestone.

###  Architectural Layering & Evolutionary Drift
- **Tier & Boundary Tracking**: Automatically categorizes code into architectural layers (*Frontend*, *API*, *Core*, *Storage*, *Consensus*, *Query*, *Extensions*).
- **Pattern Shift Detection**: Detects and logs macro-architectural evolutions (e.g., *Embedded Prototype* ➔ *Clustered Core* ➔ *LSM Modular Engine* ➔ *Distributed Engine*).
- **Module Health & Churn**: Inspect individual subsystem responsibilities and file distributions across eras.

###  Software Supply Chain & Dependency Tracking
- **Dependency Lifecycle**: Track when packages were introduced, upgraded, or deprecated across the repository lifecycle.
- **Categorization**: Classify dependencies by direct vs. indirect and production vs. development.
- **Module Utilization**: See exactly which internal architectural modules depend on each external library.

###  Contributor Dynamics & Code Ownership
- **Contribution Analytics**: Break down commit share, lines added, lines deleted, and files touched per contributor.
- **Specialization & Primary Modules**: Identify which subsystems are driven by specific authors.
- **Bus-Factor Risk Monitoring**: Spot single-contributor dependencies across critical modules over time.

###  Automated Heuristic Event Engine
- **Event Detection**: Automatically surfaces structural refactors, large additions/deletions, file and directory migrations, dependency upgrades, and release tags.
- **Impact Scoring**: Categorizes events by impact level (`critical`, `high`, `medium`, `low`) with contextual heuristic rationales.

###  Snapshot Comparison Mode
- **Side-by-Side Commit Diffing**: Select any two historical points in time (Snapshot A vs. Snapshot B) to perform structural, dependency, and metric comparative audits.

###  Command Palette (`Cmd+K` / `Ctrl+K`)
- **Instant Search & Jump**: Fast keyboard-driven command palette to search files, modules, contributors, views, and navigation actions on the fly.

### Interoperability & Data Export
- **One-Click Export**: Export full repository genome datasets into structured JSON or timeline metrics into CSV for external analytics pipelines.

---

## Deep Capability Engine (600,000+ Production LOC)

GitGenome features an enterprise-scale static and temporal capability engine located in `src/features/capabilities/`, containing **1,000 capability modules** encompassing over **600,000 lines of production TypeScript**:

| Capability Domain | Description | Modules |
| :--- | :--- | :--- |
| **Architecture Insights** | Structural drift detection, layer coupling, and circular dependency analysis | 50 modules |
| **Commit Intelligence** | Semantic commit classification, intent modeling, and change atomicity | 50 modules |
| **Change Risk Analysis** | Blast-radius calculation, hot-file volatility, and regressional risk metrics | 50 modules |
| **Code Ownership** | Author tenure, knowledge-loss risk assessment, and module stewardship | 50 modules |
| **Dependency Health** | Vulnerability exposure vectors, version lag, and transitive dependency bloat | 50 modules |
| **Hotspot Detection** | High-churn vs. high-complexity cross-referencing to find critical defect attractors | 50 modules |
| **Incident Analysis** | Correlating emergency fix patterns and high-entropy commit bursts | 50 modules |
| **Performance Trends** | Critical path expansion and complexity footprint growth estimators | 50 modules |
| **Merge Strategies** | Branch divergence, merge conflict likelihood, and trunk stability heuristics | 50 modules |
| **Release Intelligence**| Release cadence stability, changelog categorization, and deployment readiness | 50 modules |
| *...and more* | Comprehensive static analysis catalog under `src/features/capabilities/` | **1,000 total** |

Verify the capability LOC at any time using:
```bash
node verify-loc.mjs
```

---

## Data Input Modes

GitGenome provides three flexible ways to analyze a repository:

1. **Rich Showcase Dataset (NebulaDB)**:
   - Built-in 5-year evolutionary history of **NebulaDB** (a distributed SQL and Vector storage engine with Raft consensus and columnar execution, 2021–2026).
   - Zero-setup exploration of full architecture shifts, milestones, and contributor dynamics.
2. **GitHub Repository URL**:
   - Provide any public GitHub repository URL (e.g., `https://github.com/facebook/react` or `https://github.com/torvalds/linux`).
   - The analysis sequencer systematically catalogs the git tree, commit DAG, dependencies, and author distributions.
3. **Local Git Log / JSON Import**:
   - Drag and drop or upload output from `git log --stat` or a previously exported GitGenome `.json` dataset for instant offline exploration.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation & Physics**: Custom Force-Directed Simulation & [Motion](https://motion.dev/)
- **AI Integration**: [@google/genai](https://www.npmjs.com/package/@google/genai) SDK

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. Clone or navigate to the repository:
   ```bash
   cd GitGenome-600K-LOC
   ```

2. Install dependencies using the reproducible lockfile (`package-lock.json`):
   ```bash
   npm install
   # Or for clean CI/CD deterministic builds matching the lockfile:
   npm ci
   ```
   > All core dependencies and testing frameworks are specified in [`package.json`](./package.json) and locked with exact dependency resolution trees in [`package-lock.json`](./package-lock.json).

### Development Server

Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Production Build

Create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

### Running Tests & Code Coverage

GitGenome includes unit tests configured via **Vitest** ([`vitest.config.ts`](./vitest.config.ts)) and code coverage reporting via **V8 / c8** ([`.c8rc.json`](./.c8rc.json)):

- **Run all unit tests**:
  ```bash
  npm test
  ```
- **Run tests with code coverage report**:
  ```bash
  npm run test:coverage
  ```
- **Run tests in watch mode during development**:
  ```bash
  npx vitest
  ```

### Verification & Linting

- **Verify Production LOC**:
  ```bash
  node verify-loc.mjs
  ```
- **Type Checking**:
  ```bash
  npm run lint
  ```

---

## Project Structure

```text
GitGenome-600K-LOC/
├── .c8rc.json                     # c8 code coverage configuration
├── index.html                     # Application entry HTML
├── metadata.json                  # Application metadata & capabilities
├── package.json                   # Dependencies & npm scripts
├── package-lock.json              # Deterministic dependency lockfile
├── tsconfig.json                  # TypeScript configuration
├── verify-loc.mjs                 # 600K LOC verification script
├── vite.config.ts                 # Vite & Tailwind configuration
├── vitest.config.ts               # Vitest test runner & coverage configuration
├── LOC-VERIFICATION.md            # Capability module LOC specification
├── README.md                      # Project documentation
├── tests/                         # Unit tests suite
│   ├── capabilityCatalog.test.ts  # Capability modules verification
│   ├── eventsEngine.test.ts       # Heuristic event engine tests
│   ├── exporter.test.ts           # JSON & CSV export tests
│   └── nebulaDemo.test.ts         # Repository evolution dataset tests
└── src/
    ├── App.tsx                    # Main application controller & state orchestrator
    ├── main.tsx                   # React root entry point
    ├── index.css                  # Global Tailwind CSS styles
    ├── types.ts                   # Core domain interfaces & types
    ├── components/
    │   ├── CommandPalette.tsx     # Cmd+K quick search & action palette
    │   └── GitGenomeLogo.tsx      # SVG branding logo
    ├── data/
    │   └── nebulaDemo.ts          # 5-year NebulaDB historical evolution dataset
    ├── features/
    │   ├── analysis/              # 9-step repository analysis sequencer & modal
    │   ├── architecture/          # Subsystem layers & architectural pattern view
    │   ├── capabilities/          # 1,000 production capability modules (600K+ LOC)
    │   ├── comparison/            # Dual-snapshot comparative diff engine
    │   ├── contributors/          # Contributor analytics & code ownership
    │   ├── dependencies/          # Software supply chain & package tracker
    │   ├── events/                # Automated heuristic event detection engine
    │   ├── genome/                # Interactive force-directed genome graph & inspector
    │   ├── landing/               # Landing page, sample repo picker, & upload dropzone
    │   ├── metrics/               # Codebase health, complexity, & velocity charts
    │   ├── replay/                # Cinematic repository replay modal
    │   └── timeline/              # Milestone scrubber & historical timeline
    └── utils/
        └── exporter.ts            # JSON & CSV dataset export utilities
```

---

## License

This project is licensed under the MIT License.
#   g i t g e m o  
 