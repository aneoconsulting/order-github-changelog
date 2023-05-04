import { $fetch } from 'ofetch'
import type { ReleaseNotes, ResolvedChangelogOptions } from './types'

export async function generateReleaseNotesContent(config: ResolvedChangelogOptions) {
  const data = await $fetch<ReleaseNotes>(`https://api.github.com/repos/${config.github}/releases/generate-notes`, {
    method: 'POST',
    headers: {
      Authorization: `token ${config.token}`,
    },
    body: {
      tag_name: config.to,
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
        Authorization: `token ${config.token}`,
      },
    })
    if (exists.url) {
      url = exists.url
      method = 'PATCH'
    }
  }
  catch (e) {
  }

  await $fetch(url, {
    method,
    body: {
      tag_name: config.to,
      body: releaseNotes,
    },
    headers: {
      Authorization: `token ${config.token}`,
    },
  })
}
