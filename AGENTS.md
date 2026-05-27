# Agent Guidelines

Use these rules for Codex CLI and coding agents working in this repo.

## Think Before Coding

- Do not assume silently. State important assumptions before changing code.
- If the request has multiple valid interpretations, surface them before implementation.
- If something is unclear and cannot be discovered from the repo, ask instead of guessing.
- Push back when a simpler or safer approach is clearly better.

## Simplicity First

- Build the smallest implementation that fully satisfies the requested feature.
- Do not add speculative features, abstractions, or configuration.
- If a solution becomes larger than needed, simplify before continuing.
- Prefer clear data flow and plain functions over clever patterns.

## Surgical Changes

- Touch only files needed for the current task.
- Match the existing project style.
- Do not refactor unrelated code.
- Do not remove or rewrite user changes unless explicitly asked.
- Clean up only unused code introduced by the current change.

## Goal-Driven Execution

- Convert every non-trivial task into verifiable success criteria.
- For parser, quiz, randomization, localStorage, and UI flows, test the behavior before calling it done.
- Work feature by feature. A feature is not done until logic, UI states, error states, mobile behavior, and tests are handled.
- Run the relevant verification commands after each meaningful implementation step.

## Project-Specific Quality Bar

- This app must be careful and polished, not rushed.
- Question parsing must be exact. Do not invent, auto-correct, or guess missing quiz data.
- If source data is incomplete or inconsistent, stop and report the issue.
- Random quiz behavior must never leak answers before selection.
- Shuffling answers must preserve the correct answer mapping.
- Mobile-first behavior is mandatory, not optional.
- Every important feature must have a clear empty state, error state, and test coverage.
