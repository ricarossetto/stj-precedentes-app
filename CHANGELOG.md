# Changelog

All notable changes to **STJ Precedentes Atlas** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-07-22

### Added
- **CSV Data Exporter Utility**: Added 1-click dataset export to `.csv` for offline Excel and Sheets analysis (`downloadPrecedentsCSV`).
- **Pre-computed AI Summaries**: Synthesized 2-3 line plain-language legal summaries (`resumoPratico`) for all 1,190 precedents.
- **Atlas UI Redesign**: Implemented full-width responsive layout, hero banner, search shortcuts, quick search pills, and methodology section.

### Fixed
- **IAC Description Parsing**: Corrected inner HTML `<p>` block parsing for Incidentes de Assunção de Competência (IACs).
- **Text Justification**: Applied `.text-justify-formatted` styling across all precedent text cards.

---

## [1.2.0] - 2026-07-22

### Added
- **Sub-Area Categorization**: Added legal sub-areas for Social Security, Civil Law, and Civil Procedure.
- **Dynamic Sorting**: Added sorting dropdown supporting Number Ascending, Number Descending, Procedural Phase, and Paradigm Process Count.
- **Full Text Card Expanders**: Added inline expand/collapse toggles on precedent cards.

---

## [1.1.0] - 2026-07-22

### Added
- **Google Gemini 2.5 AI Integration**: Connected Gemini REST API for natural language precedent query matching.
- **AI Petition Strategy Generator**: Added precedent analysis modal generating executive summaries, practical impacts, binding force status, and petition draft paragraphs.

---

## [1.0.0] - 2026-07-22

### Added
- **Initial Open Source Release**: Automated scraper and database compiler harvesting 1,190 STJ qualified precedents across Temas Repetitivos, Controvérsias, IAC, SIRDR, and PUIL.
