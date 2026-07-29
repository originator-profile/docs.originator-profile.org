---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/e0e20e4/docs/development/deprecation.md
---
# API Deprecation Policy

This document explains the API deprecation policy.

## Target Audience

- Development team members

## Criteria

- Usage status: APIs with low usage frequency will be prioritized for deprecation.
- Introduction of New Features: Old APIs will be deprecated when new APIs are introduced.
- Security: If a security risk exists, the API will be immediately deprecated without a deprecation period.

## Process

Changes follow the [Semantic Versioning](https://semver.org/) guidelines.

1. Notification: Deprecation is announced in the OpenAPI documentation.
2. Disabling: The endpoint is disabled.
3. Release: The API is removed in a major version release.
