import { spawnSync } from "node:child_process"
import { access, cp, mkdir, rm } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const legacyRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const appsRoot = resolve(legacyRoot, "..")
const runningUnderTurbo = Boolean(process.env.TURBO_HASH)
const builds = [
  ["@qingyu/commercial-visual-portfolio", "commercial-visual-portfolio", "dist", "commercial-visual"],
  ["@qingyu/morie-store", "morie-store", "out", "morie"],
]

for (const [packageName, project, output, slug] of builds) {
  if (process.argv[2] && process.argv[2] !== slug) continue
  const projectRoot = resolve(appsRoot, project)
  const destination = resolve(legacyRoot, "public/demo", slug)
  try {
    await access(resolve(projectRoot, "package.json"))
  } catch {
    await access(resolve(destination, "index.html"))
    continue
  }

  if (!runningUnderTurbo) {
    const packageManagerCli = process.env.npm_execpath
    if (!packageManagerCli) throw new Error("Run the legacy build through the package manager")
    const result = spawnSync(process.execPath, [packageManagerCli, "run", "build"], {
      cwd: projectRoot,
      stdio: "inherit",
    })
    if (result.status !== 0) throw new Error(`${packageName} build failed`)
  }

  await access(resolve(projectRoot, output, "index.html"))

  await rm(destination, { recursive: true, force: true })
  await mkdir(destination, { recursive: true })
  await cp(resolve(projectRoot, output), destination, { recursive: true })
}
