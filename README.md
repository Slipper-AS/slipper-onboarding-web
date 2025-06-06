# Slipper Onboarding

Welcome to the official repository for **Slipper Onboarding**, a modern, standalone onboarding solution for the **Slipper** services. Built with the latest front-end technologies, this project is designed to provide users with a fast, accessible, and delightful first-touch experience.

In addition to guiding new users through account setup, this onboarding flow includes seamless support for Slipper’s **referral program**, helping users invite others while earning rewards.

---

## ✨ Tech Stack

- [SvelteKit](https://kit.svelte.dev/) – Application framework for Svelte
- [Bun](https://bun.sh/) – Fast JavaScript runtime and package manager
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Skeleton UI](https://www.skeleton.dev/) – UI toolkit built on Tailwind and Svelte
- [MeltUI](https://melt-ui.com/) – Headless UI components for Svelte
- [Playwright](https://playwright.dev/) – End-to-end testing framework

---

## 📦 Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/docs/installation) installed.

```bash
bun --version
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/slipper-onboarding.git
cd slipper-onboarding
bun install
```

---

## 🚧 Development

To start the development server:

```
bun -b run dev
```

Then open [localhost](http://localhost:3000) on port 3000 in your browser.

---

## 🧪 Testing

This project uses Playwright for end-to-end testing.

### Run tests

```bash
bunx playwright test
```

### Open Test UI

```bash
bunx playwright test --ui
```

To update snapshots:

```bash
bunx playwright test --update-snapshots
```

---

## 📁 Project Structure

```text
e2e/                    # Playwright tests
src/
├── lib/                # Reusable components, stores, and utilities
├── routes/             # Page-based routing (SvelteKit)
├── app.css             # Global app styling
├── app.html            # Entry HTML file used by SvelteKit
├── slipper-theme.css   # Global theme variable definitions
static/                 # Static files, mostly images

```

---

## 🧱 UI Architecture

- Skeleton UI provides the visual foundation: layouts, buttons, modals, etc.

- MeltUI offers accessible, unstyled component primitives with full keyboard and screen-reader support. !Not used as much!

- Tailwind CSS keeps styles scalable and consistent. !Mainly this is used!

- Lottie is used for animations

---

## 🛠 Build for Production

To generate a production-ready build:

```
bun run build
```

You can adapt your deployment target using a SvelteKit adapter, such as @sveltejs/adapter-node, adapter-static, or adapter-vercel.

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/license/mit).
