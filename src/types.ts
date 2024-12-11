import type { ChangelogConfig } from 'changelogen'

export type ChangelogenOptions = ChangelogConfig

export interface ReleaseNotes {
  name: string
  body: string
}

export interface TypedChanges {
  type: string | undefined
  change: string
}

export interface ChangelogOptions extends Partial<ChangelogenOptions> {
  /**
   * Dry run. Skip releasing to GitHub.
   */
  dry?: boolean
  /**
   * Whether to include contributors in release notes.
   *
   * @default true
   */
  contributors?: boolean
  /**
   * Name of the release
   */
  name?: string
  /**
   * GitHub Token
   */
  token?: string
  /**
   * GitHub repository (owner/repo)
   */
  github?: string
  /**
   * Custom changelof input and avoid fetching from GitHub
   */
  input?: string
  /**
   * Custom titles
   */
  titles?: {
    breakingChanges?: string
  }
  /**
   * Display the config in the console.
   */
  config?: boolean
}

export type ResolvedChangelogOptions = Required<ChangelogOptions>
