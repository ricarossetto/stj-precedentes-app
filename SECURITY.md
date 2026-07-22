# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.3.x   | :white_check_mark: |
| 1.2.x   | :white_check_mark: |
| < 1.2   | :x:                |

---

## Environment Variables & Secret Handling

- **No Hardcoded Secrets**: This project strictly avoids hardcoding API keys or credentials in any source file.
- **Client Environment Variables**: The Google Gemini API key is referenced strictly via `import.meta.env.VITE_GEMINI_API_KEY`.
- **Git Ignore**: `.env`, `.env.local`, and `.env.*.local` are tracked in `.gitignore` to prevent accidental credential commits to public repositories.

---

## Reporting a Vulnerability

We take the security of open-source legal AI tools seriously. If you discover a security vulnerability, please do **NOT** open a public issue.

Instead, please report the vulnerability privately by:
1. Emailing the project maintainer or creating a Security Advisory on GitHub.
2. Providing detailed steps to reproduce the vulnerability.

We will acknowledge receipt within **24 hours** and aim to publish a security patch within **7 days**.

Thank you for helping keep Open Source Legal AI secure for the Brazilian community! 🇧🇷⚖️
