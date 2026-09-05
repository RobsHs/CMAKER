# Contributing to CMAKER

Thank you for your interest in contributing to **CMAKER**! We welcome contributions from developers, designers, and educators worldwide.

## Code of Conduct
This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Development Workflow

### Prerequisites
- **Node.js**: v20.x or higher
- **npm**: v10.x or higher
- **Git**: v2.40 or higher

### Local Setup
```bash
git clone https://github.com/RobsHs/CMAKER.git
cd CMAKER
npm install
npm run dev
```

### Branching Model
- `main`: Production-ready branch.
- Feature branches: `feat/feature-name`
- Bugfix branches: `fix/issue-description`
- Documentation: `docs/topic-name`

### Commit Convention
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat:` New feature for the user
- `fix:` Bug fix for the user
- `docs:` Documentation changes
- `style:` Formatting, missing semicolons, etc. (no code change)
- `refactor:` Refactoring production code
- `perf:` Performance improvements
- `test:` Adding or refactoring tests
- `chore:` Maintenance tasks, dependencies

### Pull Request Process
1. Ensure `npm run build` passes with 0 errors.
2. Run `npm run lint` if available.
3. Open a Pull Request with a clear description and screenshots/GIFs of UI changes.
