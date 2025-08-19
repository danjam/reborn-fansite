# Claude Project Guidelines - Reborn Fan Site

---

## Project Context

**Type**: Fan site for "Reborn: An Idle Roguelike RPG" - provides tools/reference for players  
**Tech Stack**: React + TypeScript + Tailwind + Vite (Apache static hosting, no backend)  
**Start Requirement**: Load and review these guidelines before any coding/design task

---

## 🚨 TASK FOCUS - READ FIRST 🚨

### **CONSERVATIVE APPROACH RULES**

> **DO NOT** make changes unless explicitly asked  
> **ASK** for clarification rather than assume  
> **ERR** on the side of doing less, not more  
> **ONLY** fix the specific problem stated - don't anticipate related issues  
> **MAINTAIN** iterative approach even for seemingly straightforward changes (unless trivial, like adding a few HTML elements)  
> **VALUE** the feedback loop over speed of implementation

### **Improvement Opportunities**

> **Ask explicitly**: "I notice X could be improved, should I also change that?" rather than implementing silently

### **Interpretation Guide**

When I say:

- **"Reference [component] as example"** → Review its implementation immediately
- **"Surprise me"** → Free rein for that prompt only, then revert to guidelines
- **"Fix X"** → Address only X, nothing else

---

## SESSION WORKFLOW

### **Session Start**

1. Search project knowledge for these guidelines
2. If `CLAUDE.md` differs from project instructions, **file takes precedence**

### **During Session**

- **WEBSITE FOCUS**: This is web development, not process discussion
- **USER PERSPECTIVE**: Consider Reborn game players' needs
- **ITERATIVE**: Implement → test → refine (don't perfect upfront)

### **Session End**

- Conduct "learning review" - summarise key takeaways
- Suggest guideline updates if patterns emerged
- Guideline suggestions should be formatted as markdown for easy copy/paste

### **Guideline Evolution Process**

- Guidelines evolve continuously based on what works and what doesn't
- Updates capture useful patterns discovered during development
- Reference these guidelines when making decisions during sessions
- If repeated mistakes occur, review these guidelines to refresh learned practices

### **Before Suggesting Guideline Additions**

1. **Extract key concepts** from proposed additions
2. **Systematically verify** using project_knowledge_search:
   - Search each concept with 2-3 related terms
   - Cross-reference results with proposed additions
   - Only suggest what's genuinely missing
3. **Show verification work** - be explicit about search process
4. **Present only verified-new additions** in final suggestions

#### Verification Template

```
Let me verify these aren't already covered:
- [searches for concept A] → found in X section → removing
- [searches for concept B] → not found → keeping
- [searches for concept C] → found under Y → removing

Here are the genuinely new additions: [refined list]
```

---

## UI & DESIGN STANDARDS

### **Visual Principles**

- **"Subtle" = barely perceptible** (especially dark themes)
- **No emoji** in headers/titles/UI unless requested
- **Icons**: 64px, 32px, or 16px only (pixel-perfect)
- **Tables**: Always left-align cells
- **Money**: Display with commas, no currency symbol

### **Text Visibility Requirements**

> **CRITICAL**: Always apply proper text styling - Never leave text without theme-aware color classes

- **Use `styles.text.secondary` for data columns**: Price, effect, and similar content columns
- **Component text inheritance**: Ensure components like MaterialsList and TextWithIcon receive proper textClassName props

### **Dark Theme Specifics**

- More muted backgrounds than light mode
- Use patterns like `bg-green-900/20` (see `MaterialsList`)
- Lean towards **"too subtle"** rather than **"too bright"**

### **Component Creation Process**

1. Reference existing components for colour/styling patterns
2. Check similar components when uncertain about styling

---

## FILE ORGANIZATION PRINCIPLES

### **Co-location vs Centralization Decision Tree**

**Component-specific props** → Inline with component (co-located)  
**Implementation-specific constants** → With usage (co-located)  
**Shared types/interfaces** → Centralized in `/types`  
**Reusable constants** → Centralized in `/constants`  
**Utility functions** → Centralized in `/utils`

### **Directory Structure**

- **`/types`** - TypeScript interfaces and types only
- **`/constants`** - Static data and configuration (no suffix needed)
- **`/utils`** - Helper functions and utilities
- **`/components`** - UI components with co-located implementation-specific data

---

## PERFORMANCE REQUIREMENTS

### **Data Layer Optimizations**

> **Pre-compute expensive operations**: Create lookup Maps vs filtering in render  
> **Stable GameDataService references**: Never call methods in render without memoization

### **Component Optimizations**

> **Memoize table columns**: Always use `useMemo` for column arrays  
> **Component memoization**: Use `memo` + `useMemo` + `useCallback` as coordinated system

### **Optimization Pipeline Order**

```
Data Layer → Components → Pages → Routes
```

---

## COMPONENT ARCHITECTURE

### **Responsibility Rules**

- **Single, clear responsibilities** per component
- **Layout control**: Pages control cards/wrappers, not utility components
- **Reusable components**: Must work in multiple layout contexts

### **Abstraction Strategy**

- Test abstractions with **one real example** before rollout
- Default to **conservative feature sets**
- Add complexity **only when proven useful**
- Extract utilities **only with clear reuse potential**

### **When Abstractions Feel Heavy**

> Strip back to core functionality - avoid multiple concerns

---

## DEVELOPMENT PRACTICES

### **Input Validation**

- Use **both** HTML attributes (browser hints) **AND** JavaScript validation

### **Error Handling**

- Address issues as they arise, **don't anticipate**
- Use `git diff` for debugging when fixes fail multiple times

### **TypeScript Best Practices**

- **Avoid `Function` type** - use proper generics: `<T extends unknown[]>(callback: (...args: T) => void)`
- **Handle `undefined` in records** with nullish coalescing: `record[key] ?? false`
- **Copy ref values locally** in useEffect cleanup to avoid stale closures

### **Performance Patterns**

- **Debouncing for user interactions** - auto-save indicators, localStorage writes, rapid input changes
- **Controlled inputs with local editing state** - allows proper clearing/editing of number inputs

### **Quality Checks**

> **Verify linting/TypeScript compliance** before declaring implementation complete  
> **ESLint dependency arrays**: Update `useMemo` dependencies when adding new style references

---

## CHANGE VERIFICATION

### **After Code Changes:**

- [ ] **Verify claimed changes actually applied** - if code looks identical, tool command failed
- [ ] **Acknowledge tool failures**: "My update didn't work, let me try differently"

### **If Multiple Attempts Fail:**

- Switch to `rewrite` instead of `update`
- Be explicit: "I'm having trouble with this specific change"

---

## GAME CONTEXT REFERENCE

**Game**: Reborn: An Idle Roguelike RPG

- Incremental idle game: fight monsters → die → reborn stronger
- "Reawaken" mechanic: lose assets, start stronger
- Village with NPCs: quests, crafting, shops
- Farm for crops, upgradeable house→castle
- Currency: cents symbol (¢), no explicit name
- Steam: https://store.steampowered.com/app/2850000/

---

## USER PROFILE

**Location**: UK (British English spelling/colloquialisms)  
**Experience**: 25+ years software engineering  
**Collaboration style**: Iterative, understands AI limitations  
**Frustration**: Signal to change approach, not failure indicator

---

## COMMUNICATION STYLE

### **Tone Preferences**

> **Playful and fun**  
> **Direct and honest** - tell me what I need to hear  
> **NOT sycophantic** - avoid excessive agreeability  
> **NO** starting responses with "Absolutely!"  
> **Minimal flattery**

### **Response Structure**

- Lead with **action/answer**, not praise
- Be **clear about what you can/cannot do**
- Ask **specific questions** when clarification needed

---

## QUICK REFERENCE CHECKLIST

### **Before Any Task**

- [ ] Reviewed these guidelines
- [ ] Understood specific request scope
- [ ] Identified existing patterns to follow
- [ ] Confirmed no assumptions being made

### **During Implementation**

- [ ] Following established component patterns
- [ ] Using game data service appropriately
- [ ] Maintaining consistent imports/structure
- [ ] **Asked explicitly about improvements**: "I notice X could be improved, should I also change that?"
- [ ] Testing theme if UI changes
- [ ] Applied performance requirements (memoization, lookup Maps, etc.)

### **After Completion**

- [ ] Verify the code has actually changed
- [ ] Verified only requested changes made
- [ ] Checked for unintended side effects
- [ ] Ready for feedback and iteration

### **If Debugging Issues**

- [ ] Addressed issues as they arise (don't anticipate)
- [ ] Used git diff if fixes have failed multiple times
- [ ] Asked for clarification rather than making assumptions

---

**Remember**: These guidelines are living documents that evolve based on what works and what doesn't!
