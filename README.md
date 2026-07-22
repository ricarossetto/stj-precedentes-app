<div align="center">

# ⚖️ STJ Precedentes Atlas | Open Source Legal AI

**A high-performance Open Source Legal Intelligence Platform & Jurisprudence Search Engine powered by Google Gemini 2.5 AI.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 18](https://img.shields.io/badge/React-18.2-61dafb.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Google Gemini AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-8e44ad.svg?logo=google)](https://ai.google.dev/)
[![Status](https://img.shields.io/badge/Status-Active%20%26%20Maintained-10b981.svg)]()
[![Jurisprudence](https://img.shields.io/badge/STJ-1%2C190%20Precedents-blueviolet.svg)]()

[Live Demo](https://stj-precedentes-app.vercel.app) • [Documentation](README.md) • [Report Issue](https://github.com/ricarossetto/stj-precedentes-app/issues) • [Changelog](CHANGELOG.md)

</div>

---

## 📌 Overview

**STJ Precedentes Atlas** is an open-source legal technology platform designed to automate the harvesting, categorization, and intelligent natural-language analysis of qualified precedents (*Temas Repetitivos, Controvérsias, IAC, SIRDR, PUIL*) from the Superior Court of Justice of Brazil (STJ).

Focused on **Civil Law**, **Civil Procedure**, **Social Security / Previdenciário**, and **Consumer Law**, the platform bridges official judicial database streams with modern Generative AI to provide lawyers, researchers, and public defenders with instant case strategy, binding thesis verification, and procedural phase tracking.

---

## ✨ Key Features

- **🌐 1,190 Qualified Precedents Dataset**: Comprehensive dataset scraped directly from the official STJ portal across all 5 binding decision categories:
  - **Temas Repetitivos (T)**: 753 Repetitive Themes.
  - **Controvérsias (C)**: 412 Controversy Cases.
  - **IAC (Incidente de Assunção de Competência)**: 12 Incident Cases.
  - **PUIL (Uniformização de Lei)**: 13 Uniformization Cases.
- **⚡ Pre-Computed AI Summaries (Zero Runtime Token Cost)**: Every precedent includes a 2-3 line plain-language legal summary (`resumoPratico`) pre-synthesized during dataset compilation, eliminating runtime token latency.
- **🤖 Gemini 2.5 Natural Language Search Engine**: Ask complex factual scenarios (e.g., *"Assignment of credit in execution without debtor consent"*) and receive instant AI legal analysis, applicable theme numbers, binding theses, and petition draft models.
- **🏷️ Sub-Area Categorization**: Granular categorization into legal sub-fields:
  - *Social Security*: Special Retirement & Hazardous Agents, Incapacity & Disability Benefits, Pensions & BPC/LOAS, Benefit Adjustments & Calculations.
  - *Civil Law*: Contracts & Banking Obligations, Civil Liability & Damages, Real Estate & Possession, Family & Successions.
  - *Civil Procedure*: Execution & Judgment Enforcement, Statute of Limitations & Intercurrent Prescription, Free Justice & Legal Fees, Appeals & Admissibility.
- **📊 Interactive Full-Width Atlas UI**: Built with a sleek dark-mode design system, dynamic sorting (Number Asc/Desc, Procedural Phase, Paradigm Count), full-text expanders, 1-click thesis copying, and responsive grid layout.
- **📥 CSV Data Export**: 1-click download of the complete 1,190 precedent database as clean, UTF-8 encoded `.csv` for offline analytical work in Excel or Google Sheets.

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
│  (Rest API Service)   │      │  (stj_precedents.json - 1,190) │
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
- **AI Intelligence**: Google Gemini 2.5 Flash API (`@google/genai` REST).
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

## 🗺️ Product Roadmap

- [x] **v1.0.0**: Core scraper for 5 STJ precedent categories (Civil & Previdenciário).
- [x] **v1.1.0**: Gemini 2.5 AI natural language query integration & AI petition strategy generator.
- [x] **v1.2.0**: Atlas UI redesign, full-width responsive layout, text justification, sub-area filters.
- [x] **v1.3.0**: CSV Data Export utility and pre-computed AI summaries.
- [ ] **v2.0.0 (Q4 2026)**: Integration with STF Repercussão Geral live tracking.
- [ ] **v2.1.0 (Q1 2027)**: Automated daily GitHub Action scraper & precedent alert system.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Open Source Legal AI for Brazil 🇧🇷⚖️**  
Developed with ❤️ by [Ricardo Rossetto](https://github.com/ricarossetto)

</div>
