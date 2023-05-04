# order-github-release-notes

[![NPM version](https://img.shields.io/npm/v/@aneoconsultingfr/order-github-release-notes?color=fe5001&label=)](https://www.npmjs.com/package/@aneoconsultingfr/order-github-release-notes)

Organize auto generated changelog using the GitHub API in order to allow merge commit (instead of squash).
Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), powered by [changelogen](https://github.com/unjs/changelogen).

<!-- [👉 Changelog example](https://github.com/unocss/unocss/releases/tag/v0.39.0) -->

## Features

- Organize auto generated changelog using the GitHub API
- Allow merge commit
- List contributors

## Usage

In GitHub Actions:

```yml
# .github/workflows/release.yml

name: Release

permissions:
  contents: write

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v3
        with:
          node-version: 16.x

      - run: npx @aneoconsultingfr/order-github-release-notes
        env:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

It will be trigged whenever you push a tag to GitHub that starts with `v`.

## Configuration

You can put a configuration file in the project root, named as `changelogithub.config.{json,ts,js,mjs,cjs}`, `.changelogithubrc` or use the `changelogithub` field in `package.json`.

## Preview Locally

```bash
npx changelogithub --dry
```

## Why?

I used to use [`conventional-github-releaser`](https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser) for almost all my projects. Until I found that it [does NOT support using exclamation mark for breaking changes](https://github.com/conventional-changelog/conventional-changelog/issues/648) - hiding those important breaking changes in the changelog without the awareness from maintainers.

## License

[MIT](./LICENSE) License © 2023 [Aneo](https://github.com/aneoconsulting)

## Credits

Heavily inspired by [changelogithub](https://github.com/antfu/changelogithub) from [Anthony Fu](https://github.com/antfu)
