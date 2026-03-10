# Dashboard Refactor Design

**Date:** 2026-03-10

**Goal:** Simplify the existing dashboard codebase without changing the current visual output, content, or interaction behavior.

## Context

The current implementation keeps nearly all dashboard UI in `src/App.tsx`. That file mixes page composition, static content, local state, repeated JSX patterns, and repeated Tailwind class strings. The current structure makes it harder to:

- understand the page at a glance
- update one section without scanning the full file
- reuse repeated UI patterns
- preserve behavior safely during future edits

There is already a structural regression test in `tests/top-grid-overlay.test.tsx`. That test should remain intact and continue to pass after the refactor.

## Constraints

- Preserve the current visual layout and text content
- Preserve current interactions, especially the `TopGrid` hover-active behavior
- Do not add new dependencies
- Keep the refactor incremental and readable
- Work from the current uncommitted workspace state without reverting existing user changes

## Recommended Approach

Use a balanced refactor:

- keep `src/App.tsx` as a thin page shell
- extract page sections into area-based components
- move static content into a dedicated data module
- extract only the repeated UI pieces that are meaningfully reused
- avoid over-abstracting one-off markup into a generic component system

This approach reduces file size and duplication while keeping the code easy to follow.

## Target File Structure

- `src/App.tsx`
  - top-level page shell and section composition only
- `src/components/dashboard/Sidebar.tsx`
- `src/components/dashboard/Header.tsx`
- `src/components/dashboard/TopGrid.tsx`
- `src/components/dashboard/Recommended.tsx`
- `src/components/dashboard/RightPanel.tsx`
- `src/components/dashboard/ui.tsx`
  - light shared presentation helpers such as `SphereIcon`, `AnimatedLogo`, and `NavItem`
- `src/data/dashboard.ts`
  - static navigation, card, recommendation, and chat data

## Component Boundaries

### App

`App` should stop owning section markup. It should render:

- background blobs
- glass container
- sidebar
- main content shell
- left content column
- right panel

### Shared UI

Move these into `src/components/dashboard/ui.tsx`:

- `SphereIcon`
- `AnimatedLogo`
- `NavItem`

These are small, repeated, and independent from section-specific layout.

### Section Components

Each page region gets its own file:

- `Sidebar`
- `Header`
- `TopGrid`
- `Recommended`
- `RightPanel`

Small helpers that only serve one section stay local to that section file. Expected local helpers:

- `TopGridCard`
- `RecommendationCard`
- `ChatMessage`

## Data Model

Move static content into `src/data/dashboard.ts`:

- navigation sections and items
- top grid card metadata
- recommendation tabs
- recommendation items
- chat transcript metadata
- embedded media card metadata

The data module should export plain objects and arrays, not JSX.

## State Ownership

- `App` remains stateless
- `TopGrid` keeps `activeCard` locally
- no context or global state is introduced
- no custom hooks are added unless extraction reveals a real repeated state pattern

## Styling Strategy

- Keep the current Tailwind classes to preserve visuals
- Extract repeated class patterns into local constants only when duplication is obvious
- Keep conditional styling close to the component that owns the state
- Avoid introducing extra styling utilities or helper libraries for this refactor

## Testing Strategy

Use the existing structural render test as a regression guard. Add minimal characterization tests for the newly extracted static data module so the refactor has test coverage for the new organization, not just the final render.

Verification should include:

- `node --import tsx --test tests/*.test.tsx`
- `npm run lint`

## Risks

### Accidental visual drift

Mitigation:

- preserve existing class strings where possible
- avoid opportunistic design cleanup during extraction
- keep structural render tests green throughout

### Over-abstraction

Mitigation:

- extract only repeated structures
- keep one-off layout in the owning section file
- prefer business-named components over generic primitives

### Breaking current uncommitted work

Mitigation:

- build on the current workspace state
- do not revert existing `src/App.tsx` or `tests/` changes
- verify output after each extraction phase
