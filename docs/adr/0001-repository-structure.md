# ADR-0001: Repository Structure

## Status

Accepted

## Date

2026-07-02

## Context

The bootcamp repository will grow significantly over 60 days and include multiple projects, documentation, notes, and experiments.

A flat directory structure would become difficult to navigate and maintain.

## Decision

Organize the repository into:

- bootcamp/
- docs/
- playground/
- assets/
- scripts/
- templates/

Inside bootcamp/, group daily work by sprints.

## Consequences

### Advantages

- Better scalability
- Clear separation of concerns
- Easier navigation
- Closer to enterprise repositories

### Disadvantages

- Slightly more nested folders