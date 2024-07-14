import fs from 'fs'
import {glob} from 'glob'

const entrypoints = await glob('src/**/*.{ts,tsx}')

function getExternalsFromPackageJson() {
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString())

  const sections = ['dependencies', 'devDependencies', 'peerDependencies'],
    externals = new Set<string>()

  for (const section of sections)
    if (packageJson[section])
      Object.keys(packageJson[section]).forEach(_ => externals.add(_))

  return Array.from(externals)
}

await Bun.build({
  entrypoints,
  outdir: './dist',
  external: ['*'],
  minify: false,
})
