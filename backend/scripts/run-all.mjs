import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const mode = process.argv[2] === "start" ? "start" : "dev";

const services = [
  { name: "web-backend", cwd: "backend", script: mode === "start" ? "start:web" : "dev:web" },
  { name: "admin-backend", cwd: "backend", script: mode === "start" ? "start:admin" : "dev:admin" },
  { name: "frontend", cwd: "frontend", script: mode },
  { name: "admin", cwd: "admin", script: mode },
];

const children = services.map(({ name, cwd, script }) => {
  const child = spawn("npm", ["run", script], { cwd: path.join(root, cwd), shell: true, stdio: ["ignore", "pipe", "pipe"] });
  const prefix = (stream, target) =>
    stream.on("data", (chunk) => {
      for (const line of chunk.toString().split(/\r?\n/)) if (line.trim()) target.write(`[${name}] ${line}\n`);
    });
  prefix(child.stdout, process.stdout);
  prefix(child.stderr, process.stderr);
  child.on("exit", (code) => console.log(`[${name}] exited with code ${code}`));
  return child;
});

function shutdown() {
  for (const child of children) {
    if (process.platform === "win32") spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    else child.kill("SIGTERM");
  }
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
