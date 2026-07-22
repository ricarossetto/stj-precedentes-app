# Contributing to Open Source Legal AI Brazil

First off, thank you for considering contributing to **STJ Precedentes Atlas**! It's people like you that make open-source legal AI tools for Brazil so great.

---

## 📜 How Can I Contribute?

### 1. Reporting Bugs
- Check if the bug has already been reported under [Issues](https://github.com/ricarossetto/stj-precedentes-app/issues).
- If not, submit a new bug report using our [Bug Report Template](https://github.com/ricarossetto/stj-precedentes-app/issues/new?template=bug_report.md).
- Include steps to reproduce, browser version, and error logs if available.

### 2. Suggesting Enhancements & New Courts
- We welcome proposals for adding new legal branches, STF Repercussão Geral streams, or AI prompt templates.
- Open a feature request using our [Feature Request Template](https://github.com/ricarossetto/stj-precedentes-app/issues/new?template=feature_request.md).

### 3. Pull Requests
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`).
3. Make your changes and test locally (`npm run dev` and `npx vite build`).
4. Commit your changes with clear, descriptive commit messages (`git commit -m "feat: Add STF theme linkage filter"`).
5. Push to your branch (`git push origin feature/amazing-feature`).
6. Open a Pull Request against the `main` branch of this repository.

---

## 💻 Development Guidelines

- **Code Style**: We use clean React 18 functional components and ES modules.
- **Data Privacy**: Never hardcode API keys or credentials in source files. Always use environment variables (`VITE_GEMINI_API_KEY`).
- **Formatting**: Ensure text elements use `.text-justify-formatted` where appropriate for card presentation consistency.

---

## 📜 Code of Conduct
By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

Thank you for helping build open-source legal tech for Brazil! 🇧🇷⚖️
