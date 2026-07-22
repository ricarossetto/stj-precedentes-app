<div align="center">

# ⚖️ Open Source Legal AI Infrastructure for Brazil
### Module: STJ Qualified Precedents & Jurisprudence AI Atlas

**A high-performance Open Source Legal Intelligence Infrastructure & Precedent Engine for the Brazilian Legal System, powered by Google Gemini 2.5 AI.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 18](https://img.shields.io/badge/React-18.2-61dafb.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Google Gemini AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-8e44ad.svg?logo=google)](https://ai.google.dev/)
[![Open Source Legal AI](https://img.shields.io/badge/Focus-Legal%20AI%20Infrastructure-10b981.svg)]()
[![Dataset](https://img.shields.io/badge/STJ%20Dataset-1%2C190%20Precedents-blueviolet.svg)]()

[Live Demo](https://stj-precedentes-app.vercel.app) • [Documentation](README.md) • [Contributing](CONTRIBUTING.md) • [Code of Conduct](CODE_OF_CONDUCT.md) • [Security](SECURITY.md)

</div>

---

## 📌 Overview

**Open Source Legal AI Infrastructure for Brazil** is an open-source initiative developing reusable data pipelines, structured legal datasets, and natural language AI systems for the Brazilian judicial ecosystem.

This repository hosts the **STJ Precedentes Atlas** module — an automated harvesting, categorization, and intelligent search infrastructure built for qualified precedents (*Temas Repetitivos, Controvérsias, IAC, SIRDR, PUIL*) from the Superior Court of Justice of Brazil (STJ).

Focused on **Civil Law**, **Civil Procedure**, **Social Security / Previdenciário**, and **Consumer Law**, the platform bridges official judicial database streams with modern Generative AI to provide legal professionals, developers, and researchers with structured legal datasets, instant case strategy, and precedent reasoning.

---

## 💡 Why This Matters

Brazil's judicial system faces over **80 million pending lawsuits** and millions of complex judicial decisions. While qualified precedent jurisprudence from superior courts (STJ & STF) is legally binding, searching, categorizing, and applying these decisions consistently remains a major bottleneck.

This project transforms raw, unstructured judicial web data from official court systems into an **AI-ready, normalized, structured dataset and query engine** that can be directly consumed by:
1. Legal tech applications and legal LLM pipelines (RAG systems).
2. Practicing lawyers, public defenders, and legal researchers needing fast precedent synthesis.

---

## 👥 Who Benefits?

- **⚖️ Lawyers & Legal Advocates**: Instant precedent matching, binding thesis verification, and AI-generated petition draft strategies.
- **🛡️ Public Defenders (*Defensoria Pública*)**: Rapid legal research for high-volume public defense litigation.
- **🏛️ Judges, Prosecutors & Magistrates**: Fast precedent reference and consistency checks across civil and social security cases.
- **💻 Legal AI Developers & Data Scientists**: Reusable, clean, JSON/CSV structured legal datasets for training, evaluating, and powering Brazilian Legal RAG applications.
- **🎓 Legal Researchers & Law Students**: Academic exploration of STJ decision patterns, rapporteur trends, and procedural timelines.

---

## ✨ Key Capabilities

- **🌐 1,190 Qualified Precedents Dataset**: Comprehensive dataset harvested from official STJ streams across all 5 binding decision categories:
  - **Temas Repetitivos (T)**: 753 Repetitive Themes.
  - **Controvérsias (C)**: 412 Controversy Cases.
  - **IAC (Incidente de Assunção de Competência)**: 12 Incident Cases.
  - **PUIL (Uniformização de Lei)**: 13 Uniformization Cases.
- **⚡ Pre-Computed AI Summaries (Zero Runtime Token Cost)**: Every precedent includes a 2-3 line plain-language legal summary (`resumoPratico`) pre-synthesized during dataset compilation, eliminating runtime token latency.
- **🤖 Gemini 2.5 Natural Language Search Engine**: Enter complex factual scenarios (e.g., *"Assignment of credit in execution without debtor consent"*) and receive instant AI legal analysis, applicable theme numbers, binding theses, and petition draft models.
- **🏷️ Granular Sub-Area Categorization**:
  - *Social Security*: Special Retirement & Hazardous Agents, Incapacity & Disability Benefits, Pensions & BPC/LOAS, Benefit Adjustments & Calculations.
  - *Civil Law*: Contracts & Banking Obligations, Civil Liability & Damages, Real Estate & Possession, Family & Successions.
  - *Civil Procedure*: Execution & Judgment Enforcement, Statute of Limitations & Intercurrent Prescription, Free Justice & Legal Fees, Appeals & Admissibility.
- **📊 Interactive Full-Width Atlas UI**: Built with a dark-mode design system, dynamic sorting (Number Asc/Desc, Procedural Phase, Paradigm Count), full-text expanders, 1-click thesis copying, and responsive grid layout.
- **📥 Open CSV Data Export**: 1-click download of the complete 1,190 precedent database as clean, UTF-8 encoded `.csv` for offline analytical work in Excel or Python data pipelines.

---

## 🛠️ Architecture & Tech Stack

```
                               ┌────────────────────────────────┐
                               │       Official STJ Portal      │
                               │  (pesquisa.jsp / STJ Database) │
                               └───────────────┬────────────────┘
                                               │
                                      ISO-8859-1 Fetch &
                                   HTML Parsing Engine
                                               │
                                               ▼
┌───────────────────────┐      ┌────────────────────────────────┐
│   Google Gemini AI    │◄────┤     STJ Dataset Compiler       │
│  (REST API Service)   │      │  (stj_precedents.json - 1,190) │
└───────────┬───────────┘      └───────────────┬────────────────┘
            │                                  │
            ▼                                  ▼
┌───────────────────────────────────────────────────────────────┐
│              STJ Precedentes Atlas Client (React 18 + Vite)    │
│    - Atlas Dark Mode UI         - Dynamic Filters & Sorting   │
│    - Full Text Expanders       - CSV Data Exporter Engine     │
└───────────────────────────────────────────────────────────────┘
```

- **Frontend**: React 18, Vite 5, Lucide Icons, Vanilla CSS Design System.
- **AI Intelligence**: Google Gemini 2.5 Flash API.
- **Data Scraping & ETL**: Node.js ES Modules with `latin1` arrayBuffer decoder and multi-regex block extractors.

---

## 🚀 Quick Start & Installation

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Google Gemini API Key**: Free key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ricarossetto/stj-precedentes-app.git
   cd stj-precedentes-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key inside `.env`:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Launch Local Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 🔄 Running Data Harvesting Pipeline

To re-run the automated scraper and pull updated jurisprudence from the STJ:

```bash
# Run automated scraper & sub-area enricher
npm run scrape
```

The script will query all STJ precedent endpoints, parse HTML blocks, decode ISO-8859-1 special characters, enrich sub-areas, and save the updated dataset to `src/data/stj_precedents.json`.

---

## 🤝 Community & Collaboration

We welcome contributions from developers, legal tech researchers, and practitioners!

- **🐛 Bug Reports**: Found a bug or parsing issue? [Open a Bug Report](https://github.com/ricarossetto/stj-precedentes-app/issues/new?template=bug_report.md)
- **💡 Feature Requests**: Want a new court, filter, or AI prompt template? [Submit a Feature Request](https://github.com/ricarossetto/stj-precedentes-app/issues/new?template=feature_request.md)
- **📜 Guidelines**: Read our [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## 🗺️ Product Roadmap

- [x] **v1.0.0**: Core scraper for 5 STJ precedent categories (Civil & Previdenciário).
- [x] **v1.1.0**: Gemini 2.5 AI natural language query integration & AI petition strategy generator.
- [x] **v1.2.0**: Atlas UI redesign, full-width responsive layout, text justification, sub-area filters.
- [x] **v1.3.0**: CSV Data Export utility and pre-computed AI summaries.
- [ ] **v2.0.0 (Q4 2026)**: Integration with STF Repercussão Geral live tracking.
- [ ] **v2.1.0 (Q1 2027)**: Automated daily GitHub Action scraper & precedent alert system.

---

## 📄 License & Security

- Licensed under the **MIT License** - see [LICENSE](LICENSE).
- Security policy & vulnerability reporting - see [SECURITY.md](SECURITY.md).

---

<div align="center">

**Open Source Legal AI for Brazil 🇧🇷⚖️**  
Developed with ❤️ by [Ricardo Rossetto](https://github.com/ricarossetto)

</div>
