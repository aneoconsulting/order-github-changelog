import type { ReleaseNotes, ResolvedChangelogOptions } from './types'
import { $fetch } from 'ofetch'

export async function generateReleaseNotesContent(config: ResolvedChangelogOptions) {
  const data = await $fetch<ReleaseNotes>(`https://api.github.com/repos/${config.github}/releases/generate-notes`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: {
      tag_name: config.to,
      previous_tag_name: config.from,
    },
  })

  return data
}

export async function updateReleaseNotesContent(releaseNotes: string, config: ResolvedChangelogOptions) {
  let url = `https://api.github.com/repos/${config.github}/releases`
  let method = 'POST'
  try {
    const exists = await $fetch(`https://api.github.com/repos/${config.github}/releases/tags/${config.to}`, {
      headers: {
        'Authorization': `token ${config.token}`,
        'Content-Type': 'application/json',
      },
    })
    if (exists.url) {
      url = exists.url
      method = 'PATCH'
    }
  }
  catch {
  }

  await $fetch(url, {
    method,
    body: {
      tag_name: config.to,
      body: releaseNotes,
    },
    headers: {
      'Authorization': `token ${config.token}`,
      'Content-Type': 'application/json',
    },
  })
}
