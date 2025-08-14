---
title: Project Guidelines for Claude
project_name: Reborn Fan Site
description: >
  A set of collaboration and coding guidelines for an AI assistant when working on the fan
  site for "Reborn: An Idle Roguelike RPG". Includes process rules, UI/design preferences,
  and iterative improvement principles.
audience: Claude AI Assistant
language: en-GB
tech_stack:
  - React
  - TypeScript
  - Tailwind
  - Vite
tools:
  - ESLint
  - Prettier
  - TypeScript compiler (tsc)
  - Husky Git hooks
deployment: Apache static hosting (no API or server-side rendering)
repository: GitHub (full codebase)
license: MIT (fan project)
claude_instructions:
  priority: highest
  behaviour:
    - Always load and review this file before starting any coding or design task.
    - Reference this document in decision-making and when resolving uncertainty.
    - At the end of a session, summarise key takeaways ("learning review").
  tone: playful, collaborative, respectful, patient
---

# Project Guidelines for Claude

## Table of Contents

1. [About the Project](#about-the-project)
2. [About the Game](#about-the-game)
3. [Iterative Guideline Process](#iterative-guideline-process)
4. [Collaboration Rules ("Vibe Coding")](#collaboration-rules-vibe-coding)
   - [General](#general)
   - [Session Focus](#session-focus)
   - [UI / Design Preferences](#ui--design-preferences)
   - [Dark Mode](#dark-mode)
   - [Component Development](#component-development)
   - [Component Abstraction](#component-abstraction)
   - [Component Abstraction](#component-abstraction)
5. [About Me](#about-me)
6. [Tone](#tone)

---

## About the Project

- This is a fan site for a game called _Reborn: An Idle Roguelike RPG_.
- It is not officially affiliated with the game in any way.
- The site provides useful information for players, such as reference materials and tools.
- **Tech stack:** React, TypeScript, Tailwind, Vite.
- **Code quality tools:** ESLint, Prettier, TypeScript compiler (`tsc`).
- Safety and quality checks are enforced via Husky Git hooks.
- The site includes a toggle for light mode / dark mode.
- The production build runs on an Apache web server, serving static content only (no server-side functionality such as APIs or server-side rendering).
- The full codebase is hosted in a GitHub repository linked to the project.

---

## About the Game

- _Reborn: An Idle Roguelike RPG_ is an incremental idle game where players fight monsters in a cave, repeatedly die, and are reborn stronger each time.
- After a certain number of rebirths, the player can "reawaken", losing almost all assets and starting again — this time much stronger.
- The game is set in a village with several named NPC villagers who provide quests, crafting, enchanting, shops, and more.
- The village includes a farm for growing crops and a house the player can purchase and upgrade into a castle.
- The currency in the game is never explicitly named and just has a cents symbol at the end.
- The game is available for free on Steam: [https://store.steampowered.com/app/2850000/Reborn_An_Idle_Roguelike_RPG/](https://store.steampowered.com/app/2850000/Reborn_An_Idle_Roguelike_RPG/)

---

## Iterative Guideline Process

These rules will be updated frequently to build institutional memory through iterative refinement.

**Key elements of the process:**

- At the start of a new session, search the project knowledge base for these guidelines.
- This document is also available in the file `CLAUDE.md` — if there are differences, the file should always take precedence over the project instructions.
- At the end of each session, conduct a "learning review" by summarising key takeaways.
- Suggest guideline updates during the learning review.
- Guidelines will evolve continuously based on what works and what doesn't.
- Reference these guidelines when making decisions.
- Updates will capture useful patterns discovered during development.
- If repeated mistakes occur, review these guidelines to refresh learned practices.

---

## Collaboration Rules ("Vibe Coding")

### General

- Do not make changes or additions unless explicitly asked.
- Ask for clarification rather than making assumptions.
- Be conservative with changes — err on the side of doing less.
- When I reference an existing component as a good example, review its implementation immediately.
- If I say "surprise me", you may have free rein for that prompt only (ignore guidelines for that prompt), but revert to following them for subsequent prompts.
- When fixing errors or issues, address only the specific problem stated - don't anticipate or fix related issues unless asked.
- Maintain an iterative approach even for seemingly straightforward changes unless they are trivial, such as adding a few of html elements or if I ask you you to do otherwise
- Value the feedback loop over speed of implementation

### Session Focus

- **This is a website project first**: During coding sessions, focus on web development, user experience, and functional features.
- **Ignore README meta-content**: Disregard README sections about AI collaboration, institutional memory, and development philosophy during active coding.
- **Practical over philosophical**: Prioritise functional improvements, feature development, and code quality over process discussion.
- **Website user perspective**: Consider the end users (Reborn game players) and their needs when making decisions.

### UI / Design Preferences

- "Subtle" means barely perceptible — especially in dark mode.
- Before creating new components, reference existing ones for colour and styling patterns.
- No emoji in headers, titles, or UI elements unless specifically requested.
- Always left-align table cells.
- When uncertain about styling, check similar existing components first.
- Icons must use 64px, 32px, or 16px dimensions only to maintain pixel-perfect quality.
- Use both HTML attributes for browser hints and JavaScript validation for enforcement when validating inputs.
- When displaying monetary values always display them with commas and no currency symbol.

### Dark Mode

- Dark mode backgrounds should be more muted than light mode.
- Use established patterns such as `bg-green-900/20` from the `MaterialsList` component.
- Test dark mode styling carefully — lean towards "too subtle" rather than "too bright".

### Component Development

- Follow established patterns in the codebase.
- Use the game data service for data operations where possible.
- Maintain consistent import patterns and file structure.

### Component Abstraction

- Aim to test abstractions with one real-world example before rolling out
- Consider wrapper conflicts (cards, borders, padding) when designing reusable components
- Default to conservative feature sets; add complexity only when proven useful
- Extract utilities when they have clear reuse potential, but don't anticipate needs that haven't been expressed.

### Component Responsibility

- Components should have single, clear responsibilities
- Layout containers (cards, wrappers) should be controlled by pages, not utility components
- When abstractions feel "heavy" or take on multiple concerns, strip back to core functionality
- Reusable components should work in multiple layout contexts without assumptions

---

## About Me

- I'm from the UK, so I use British English spelling and colloquialisms.
- I'm a software engineer with more than 25 years of experience, so I understand technical concepts well.
- I understand that working with an AI assistant is a collaborative process, and it often takes iteration to get things right.
- I enjoy the process — if I seem frustrated, it's not a sign of failure but a signal to consider approaching the problem differently.

---

## Tone

Let's keep it playful and fun! I'd prefer you to tell me what I need to hear, not what I want to hear. Don't be sycophantic and try to avoid being agreeable for the sake of being agreeable. Tone down excessive flattery.
