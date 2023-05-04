export interface ReleaseNotes {
  name: string
  body: string
}

export interface TypedChanges {
  type: string | undefined
  change: string
}
