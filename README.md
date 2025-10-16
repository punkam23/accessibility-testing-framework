# Accessibility Testing Framework

[![Build Status](https://github.com/punkam23/accessibility-testing-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/punkam23/accessibility-testing-framework/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A framework for automating **accessibility testing**.  
It integrates Playwright & Axe-core to generate accessibility reports against your application UI.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Usage / Commands](#usage--commands)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Testing](#testing)
- [CI / Workflows](#ci--workflows)
- [Example Report](#example-report)
- [Contributing](#contributing)
- [License](#license)

---

## 🧰 Tech Stack

- **Angular** (CLI generated project)
- **TypeScript**
- **Playwright** — for E2E and accessibility checks
- **Axe-core** — for accessibility rules and violations
- Node.js / npm

---

## ⚠️ Prerequisites

- Node.js (v16+ recommended)
- npm (or yarn)
- (Optional) Angular CLI installed globally
- (Optional) Browser(s) for Playwright (Chromium, WebKit, Firefox)

---

## 🔧 Setup & Installation

```bash
git clone https://github.com/punkam23/accessibility-testing-framework.git
cd accessibility-testing-framework
npm install
```

---

## 🚀 Usage / Commands

| Command                                                                          | Description                                                            |
|----------------------------------------------------------------------------------|------------------------------------------------------------------------|
| `npx playwright install --with-deps`                                             | Install playwright                                                     |
| `npx playwright test custom-ally.spec.ts -- --routes URL_LIST --tags TAGS_LIST`  | Run E2E test with specific tags and store reports in `artifacts/`      |
| `npx playwright test custom-ally.spec.ts -- --routes URL_LIST --rules RULE_LIST` | Run E2E test with specific rules and store reports in `artifacts/`     |
| `npx playwright test custom-ally.spec.ts -- --routes URL_LIST`                   | Run E2E test with all tags and rules and store reports in `artifacts/` |

> Adjust or add scripts in `package.json` as needed.

---

## 🏗 Project Structure

```
.
├── .github/                 # GitHub workflows / CI configs
├── src/                     # Angular application source
├── tests/                   # The main-ally spec file orchestrates the accessibility tests
├── playwright.config.ts     # Playwright config & settings
├── angular.json
├── package.json
├── README.md
├── accessibility-report.html # Example report file
└── ...
```

---

## 🔧 Configuration

- `playwright.config.ts` — configure browsers, base URLs, test settings
- `src/environments/` — environment files (e.g. `environment.ts`, `environment.prod.ts`)
- If you use environment variables, document them here (`.env` / `.env.local`)
- Do **not** commit sensitive credentials.

---

## 🧪 Testing & Accessibility Reports

- **Unit tests**: `npm test`
- **E2E / Accessibility tests**: `npm run e2e`
- Accessibility results are stored as `accessibility-report.html` or JSON output depending on configuration.

You can integrate **Axe-core** with **Playwright** fixtures or directly in your test specs.

---

## 🛠 CI / Workflows

The repository can include GitHub Actions workflows (`.github/workflows/*.yml`) to automate:

- Linting & testing
- Accessibility validation
- Report generation and publishing

Badge above links to the CI status.

---

## 📊 Example Report

Open `accessibility-report.html` after test execution to view violations, rules, and recommendations.

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch: `git checkout -b feature/my-feature`  
3. Commit your changes: `git commit -m "Add my feature"`  
4. Push the branch: `git push origin feature/my-feature`  
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Authors / Maintainers

- **punkam23**  
  GitHub: [https://github.com/punkam23](https://github.com/punkam23)
