import type { ChangelogOptions, ResolvedChangelogOptions } from './types'
import { getCurrentGitBranch, getFirstGitCommit, getGitHubRepo, getGitTags } from 'changelogithub'

export function defineConfig(config: ChangelogOptions) {
  return config
}

const defaultConfig: ChangelogOptions = {
  types: {
    feat: { title: '🚀 Enhancements' },
    perf: { title: '🔥 Performance' },
    fix: { title: '🩹 Fixes' },
    refactor: { title: '💅 Refactors' },
    docs: { title: '📖 Documentation' },
    chore: { title: '🏡 Chore' },
    test: { title: '✅ Tests' },
    ci: { title: '🤖 CI' },
  },
  contributors: true,
}

export async function resolveConfig(options: ChangelogOptions) {
  const { loadConfig } = await import('c12')
  const config = await loadConfig<ChangelogOptions>({
    name: 'order-github-release-notes',
    defaults: defaultConfig,
    overrides: options,
  }).then(r => r.config || defaultConfig)

  config.from = config.from || (await getGitTags()).at(-1)
  config.to = config.to || await getCurrentGitBranch()
  config.github = config.github || await getGitHubRepo('github.com')

  if (config.to === config.from)
    config.from = (await getGitTags()).at(-1) || await getFirstGitCommit()

  return config as ResolvedChangelogOptions
}
