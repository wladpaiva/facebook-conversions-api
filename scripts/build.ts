import fs from 'fs'

function getExternalsFromPackageJson() {
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString())

  const sections = ['dependencies', 'devDependencies', 'peerDependencies'],
    externals = new Set<string>()

  for (const section of sections)
    if (packageJson[section])
      Object.keys(packageJson[section]).forEach(_ => externals.add(_))

  console.log('externals', externals)

  return Array.from(externals)
}

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  external: getExternalsFromPackageJson(),
  splitting: true,
})
