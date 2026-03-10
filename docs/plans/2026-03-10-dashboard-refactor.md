# Dashboard Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Simplify the dashboard code by extracting sections, shared UI, and static data while preserving the current layout and behavior.

**Architecture:** Keep `src/App.tsx` as the page shell, move shared display helpers into `src/components/dashboard/ui.tsx`, move page sections into `src/components/dashboard/`, and move static content into `src/data/dashboard.ts`. Preserve the current `TopGrid` local state and validate the refactor with structural render tests plus TypeScript verification.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Node test runner, `tsx`

---

### Task 1: Add characterization tests for the new module boundaries

**Files:**
- Create: `tests/dashboard-data.test.ts`
- Modify: `tests/top-grid-overlay.test.tsx`

**Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  navigationSections,
  topGridCards,
  recommendationTabs,
  recommendedItems,
  chatMessages,
} from '../src/data/dashboard.ts';

test('dashboard static data exports the expected content groups', () => {
  assert.equal(navigationSections.length, 2);
  assert.equal(topGridCards.length, 4);
  assert.equal(recommendationTabs.length, 3);
  assert.equal(recommendedItems.length, 3);
  assert.equal(chatMessages.length, 2);
});
```

**Step 2: Run test to verify it fails**

Run: `node --import tsx --test tests/dashboard-data.test.ts`
Expected: FAIL because `src/data/dashboard.ts` does not exist yet

**Step 3: Write minimal implementation**

Create the `src/data/dashboard.ts` module with the exported arrays and the current dashboard content.

**Step 4: Run test to verify it passes**

Run: `node --import tsx --test tests/dashboard-data.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/dashboard-data.test.ts src/data/dashboard.ts
git commit -m "test: characterize dashboard static data"
```

### Task 2: Extract shared dashboard UI primitives

**Files:**
- Create: `src/components/dashboard/ui.tsx`
- Modify: `tests/top-grid-overlay.test.tsx`

**Step 1: Write the failing test**

Add an assertion that rendering the app still produces zero floating logos inside the right panel after shared UI extraction.

**Step 2: Run test to verify it fails**

Run: `node --import tsx --test tests/top-grid-overlay.test.tsx`
Expected: FAIL after tightening the assertion or adding the new coverage

**Step 3: Write minimal implementation**

Move `SphereIcon`, `AnimatedLogo`, and `NavItem` to `src/components/dashboard/ui.tsx`, then update imports.

**Step 4: Run test to verify it passes**

Run: `node --import tsx --test tests/top-grid-overlay.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/top-grid-overlay.test.tsx src/components/dashboard/ui.tsx src/App.tsx
git commit -m "refactor: extract dashboard shared ui"
```

### Task 3: Extract sidebar and header sections

**Files:**
- Create: `src/components/dashboard/Sidebar.tsx`
- Create: `src/components/dashboard/Header.tsx`
- Modify: `src/App.tsx`
- Modify: `src/data/dashboard.ts`

**Step 1: Write the failing test**

Extend `tests/dashboard-data.test.ts` to assert the navigation labels exported by `navigationSections`.

**Step 2: Run test to verify it fails**

Run: `node --import tsx --test tests/dashboard-data.test.ts`
Expected: FAIL until the data structure matches the extracted rendering needs

**Step 3: Write minimal implementation**

Render the sidebar and header from extracted files, using `navigationSections` data for sidebar output.

**Step 4: Run test to verify it passes**

Run: `node --import tsx --test tests/dashboard-data.test.ts tests/top-grid-overlay.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/dashboard/Sidebar.tsx src/components/dashboard/Header.tsx src/data/dashboard.ts src/App.tsx tests/dashboard-data.test.ts
git commit -m "refactor: extract dashboard chrome"
```

### Task 4: Extract top grid and recommended sections

**Files:**
- Create: `src/components/dashboard/TopGrid.tsx`
- Create: `src/components/dashboard/Recommended.tsx`
- Modify: `src/App.tsx`
- Modify: `src/data/dashboard.ts`
- Modify: `tests/top-grid-overlay.test.tsx`

**Step 1: Write the failing test**

Add assertions that the recommendation section renders three cards and the top grid still includes the expected four `data-card-shell` nodes.

**Step 2: Run test to verify it fails**

Run: `node --import tsx --test tests/top-grid-overlay.test.tsx`
Expected: FAIL until the extracted components preserve the same structure

**Step 3: Write minimal implementation**

Move `TopGrid` and `Recommended` into dedicated files. Keep `activeCard` local to `TopGrid`. Use `topGridCards`, `recommendationTabs`, and `recommendedItems` from `src/data/dashboard.ts`.

**Step 4: Run test to verify it passes**

Run: `node --import tsx --test tests/top-grid-overlay.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/dashboard/TopGrid.tsx src/components/dashboard/Recommended.tsx src/data/dashboard.ts src/App.tsx tests/top-grid-overlay.test.tsx
git commit -m "refactor: extract dashboard content sections"
```

### Task 5: Extract the right panel and shrink App to composition only

**Files:**
- Create: `src/components/dashboard/RightPanel.tsx`
- Modify: `src/App.tsx`
- Modify: `src/data/dashboard.ts`

**Step 1: Write the failing test**

Add an assertion that the right panel still renders the current greeting and media card title from exported chat data.

**Step 2: Run test to verify it fails**

Run: `node --import tsx --test tests/dashboard-data.test.ts tests/top-grid-overlay.test.tsx`
Expected: FAIL until the extracted right panel reads the new data exports

**Step 3: Write minimal implementation**

Move the right panel into `src/components/dashboard/RightPanel.tsx` and update `App.tsx` to compose the extracted sections only.

**Step 4: Run test to verify it passes**

Run: `node --import tsx --test tests/dashboard-data.test.ts tests/top-grid-overlay.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/dashboard/RightPanel.tsx src/data/dashboard.ts src/App.tsx tests/dashboard-data.test.ts tests/top-grid-overlay.test.tsx
git commit -m "refactor: extract dashboard assistant panel"
```

### Task 6: Final verification

**Files:**
- Verify: `src/App.tsx`
- Verify: `src/components/dashboard/ui.tsx`
- Verify: `src/components/dashboard/Sidebar.tsx`
- Verify: `src/components/dashboard/Header.tsx`
- Verify: `src/components/dashboard/TopGrid.tsx`
- Verify: `src/components/dashboard/Recommended.tsx`
- Verify: `src/components/dashboard/RightPanel.tsx`
- Verify: `src/data/dashboard.ts`
- Verify: `tests/dashboard-data.test.ts`
- Verify: `tests/top-grid-overlay.test.tsx`

**Step 1: Run the full test suite**

Run: `node --import tsx --test tests/*.test.ts*`
Expected: PASS

**Step 2: Run type verification**

Run: `npm run lint`
Expected: PASS

**Step 3: Review the final app shell**

Confirm `src/App.tsx` only composes the page shell and extracted sections.

**Step 4: Commit**

```bash
git add src/App.tsx src/components/dashboard src/data/dashboard.ts tests
git commit -m "refactor: simplify dashboard structure"
```
