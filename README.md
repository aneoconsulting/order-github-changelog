# order-github-release-notes

[![NPM version](https://img.shields.io/npm/v/@aneoconsultingfr/order-github-release-notes?color=fe5001&label=)](https://www.npmjs.com/package/@aneoconsultingfr/order-github-release-notes)

Organize auto generated changelog using the GitHub API in order to allow merge commit (instead of squash).
Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), powered by [changelogen](https://github.com/unjs/changelogen).

We use

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

You can put a configuration file in the project root, named as `order-github-release-notes.config.{json,ts,js,mjs,cjs}`, `.order-github-release-notesrc` or use the `order-github-release-notes` field in `package.json`.

## Preview Locally

```bash
npx @aneoconsultingfr/order-github-release-date --dry
```

In order to avoid to use a GitHub token, you can use the `--input` flag to provide data.

```bash
npx @aneoconsultingfr/order-github-release-date --input '* feat: a new feature
* fix: a bug fix
* docs: documentation only changes
* @new-contributor: a new contributor
'
```

## License

[MIT](./LICENSE) License © 2023 [Aneo](https://github.com/aneoconsulting)

## Credits

Heavily inspired by [changelogithub](https://github.com/antfu/changelogithub) from [Anthony Fu](https://github.com/antfu)
