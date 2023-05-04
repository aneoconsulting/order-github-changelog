import cac from 'cac'
import { consola } from 'consola'
import { version } from '../package.json'
import { buildReleaseNotes } from './generate'
import { generateReleaseNotesContent, updateReleaseNotesContent } from './github'
import { resolveConfig } from './config'
import type { ReleaseNotes } from './types'

const cli = cac('order-github-release-notes')

cli.version(version)
  .option('-t, --token <token>', 'GitHub Token')
  .option('-i, --input <input>', 'Custom changelog input (avoid fetching from GitHub)')
  .option('--dry', 'Dry run')
  .help()

cli.command('')
  .action(async (args) => {
    args.token = args.token || process.env.GITHUB_TOKEN

    try {
      const config = await resolveConfig(args)

      if (!config.token) {
        consola.fatal('No GitHub token found. Please set the GITHUB_TOKEN environment variable.')
        process.exit(1)
      }

      let generatedReleaseNotes: ReleaseNotes = {
        name: '',
        body: '',
      }
      if (config.input) {
        consola.info('Use Custom Release Notes Content')
        generatedReleaseNotes.body = config.input
      }
      else {
        consola.info('Generate Release Notes Content')
        generatedReleaseNotes = await generateReleaseNotesContent(config)
      }

      consola.log(generatedReleaseNotes)
      consola.info('Build Release Notes')
      const releaseNotes = buildReleaseNotes(generatedReleaseNotes, config)

      if (config.dry) {
        consola.info('Dry run. Update skipped.')
        consola.log(releaseNotes)
        process.exit(0)
      }

      consola.info('Update Release Notes')
      await updateReleaseNotesContent(releaseNotes, config)

      consola.success('Successfully updated release notes.')
    }
    catch (error) {
      consola.error(error)
      process.exit(1)
    }
  })

cli.parse()

// create a cli function (from @antfu/changelogithub)
// async function main() {
//   const config = await resolveConfig({})

//   console.log(config.types)

//   const { body } = await fetchReleaseNotes(config)

//   // rename to another function
//   const groupedLines = groupLines(data, config)
//   const changes = generateChanges(groupedLines)

//   const diffURL = data[data.length - 1].replace('**Full Changelog**: ', '')
//   const releaseNotes = generateReleaseNotes(changes, diffURL)

//   await updateReleaseNotes(releaseNotes, config)
// }

// main().then(() => {
//   process.exit(0)
// },
// ).catch((err) => {
//   console.error(err)
//   process.exit(1)
// })
