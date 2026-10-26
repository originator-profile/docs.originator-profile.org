---
sidebar_position: 6
original: https://github.com/originator-profile/docs.originator-profile.org/blob/710d107/docs/error-reference/warnings/UNSPECIFIED.md
tags:
  - Error Reference
slug: /error-reference/UNSPECIFIED
---

# UNSPECIFIED

## Code: UNSPECIFIED

This code is assigned to notifications and errors whose type is not specified.

## Message

The message varies depending on the content of the notification. Check the message.

## When It Occurs

- When a warning or information is reported without structured details.
- When `code` (`ERR_*`) is not set on the error object.
- When a value other than an error is thrown as an exception.

## Resolution

- `UNSPECIFIED` itself has no specific cause or resolution. Use the displayed message, details, and location as clues to identify the cause.
- Check whether a matching error code exists in the [Error Code List](../index.mdx).

## Related Information

- [Error Code List](../index.mdx)
