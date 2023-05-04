import type { ChangelogOptions } from 'changelogithub'
import type { ReleaseNotes, TypedChanges } from './types'

export function buildReleaseNotes(releaseNotes: ReleaseNotes, config: ChangelogOptions) {
  const contributors = getContributors(releaseNotes)
  const changes = buildChanges(releaseNotes, config)

  const content = /* md */`# 👉 Changelog

[compare changes](https://github.com/${config.github}/compare/${config.from}...${config.to})

${changes.length ? changes : '_No significant changes._\n'}
${contributors.length ? '## ❤️ Contributors' : ''}
${contributors.join('\n')}`

  return content
}

export function orderReleaseNotes(releaseNotes: ReleaseNotes) {
  const changes = getChanges(releaseNotes)
  const typedChanges = typeChanges(changes)
  const orderedChanges = orderTypedChanges(typedChanges)

  return orderedChanges
}

export function getContributors(releaseNotes: ReleaseNotes) {
  const body = releaseNotes.body
  const contributors = body.split('\n').filter(line => line.startsWith('* @'))
  return contributors
}

export function getChanges(releaseNotes: ReleaseNotes) {
  const body = releaseNotes.body
  const changes = body.split('\n').filter(line => line.match(/^\* (?!@)/))
  return changes
}

export function typeChanges(changes: string[]) {
  const orderedChanges = changes.map((change) => {
    const type = change.match(/^\* (\w+):/)?.[1]
    return {
      type,
      change,
    }
  })
  return orderedChanges
}

export function orderTypedChanges(typedChanges: TypedChanges[]) {
  const orderedChanges = typedChanges.reduce((acc, change) => {
    const type = change.type
    if (!type)
      return acc

    if (!acc[type])
      acc[type] = []

    acc[type].push(change.change)
    return acc
  }, {} as Record<string, string[]>)

  return orderedChanges
}

export function buildChanges(releaseNotes: ReleaseNotes, config: ChangelogOptions) {
  const orderedReleaseNotes = orderReleaseNotes(releaseNotes)

  let content = ''

  const types = Object.keys(config.types ?? {})
  for (const type of types) {
    const title = config.types?.[type].title
    const lines = orderedReleaseNotes[type]
    if (!lines)
      continue

    content += `## ${title}\n`
    content += lines.join('\n')
    content += '\n\n'
  }

  return content
}
