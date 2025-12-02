---
sidebar_position: 300
original: https://github.com/originator-profile/docs.originator-profile.org/blob/63daf71/docs/contributing.md
---

# Contributor Guide

As an open-source project, we welcome community contributions to the Originator Profile repositories.  
By agreeing to the DCO (Developer Certificate of Origin) or signing a CLA (Contributor License Agreement), your contributions can be freely used and shared across the entire community.

## Agreement Process

When contributing technical specifications or software developed with Originator Profile, please agree to the [DCO (Developer Certificate of Origin)](https://developercertificate.org/) and add a sign-off (Signed-off-by line) to all commits submitted in pull requests to each GitHub repository.

Depending on the nature, scope, or scale of your contribution, you may also be asked to agree to one of the following CLAs (Contributor License Agreements):

- [Corporate Contributor License Agreement](pathname:///cla/Corporate_Contributor_License_Agreement.pdf)
- [Individual Contributor License Agreement](pathname:///cla/Individual_Contributor_License_Agreement.pdf)

## How to consent to [DCO (Developer Certificate of Origin)](https://developercertificate.org/)

Open a terminal window and run the following command to enable versioned Git hooks for this repository (recommended)

```
$ git config core.hooksPath .githooks
```

Manually copy [.githooks/prepare-commit-msg](https://github.com/originator-profile/originator-profile/blob/main/.githooks/prepare-commit-msg) from the public repository to .git/hooks/prepare-commit-msg in the locally cloned repository.

## How to add sign-off (Signed-off-by line)

You can add a signature to the commit message by specifying the "Signed-off-by" option when committing to each GitHub repository.

Example of Signed-off-by line:

```
Signed-off-by: YOUR NAME <your_email@example.com>
```

### For git command

Please include the -s or --signoff flag when committing.

Example command:

```
$ git commit -s
```

### For [TortoiseGit](https://tortoisegit.org/)

When committing, press the `Add Signed-off-by` button.

Example commit window:

![TortoiseGit example](./assets/tortoisegit_en.png)

### For [Sourcetree](https://www.sourcetreeapp.com/)

When committing, please specify `Sign off` in the commit Options... on the right.

Example commit window:

![Sourcetree example](./assets/sourcetree_en.png)
