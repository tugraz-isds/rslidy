#!/usr/bin/env bun

import { mkdirSync, existsSync, writeFileSync, unlinkSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  let example = '';
  let outputName = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--example' || args[i] === '-e') {
      example = args[i + 1] || '';
      i++;
    } else if (args[i] === '--output' || args[i] === '-o') {
      outputName = args[i + 1] || '';
      i++;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: bun create-executable.js [options]

Options:
  -e, --example <name>    Example folder name to create executable for (required)
  -o, --output <name>     Output executable name (default: same as example name)
  -h, --help              Show this help message
      `);
      process.exit(0);
    } else if (!example) {
      example = args[i];
    }
  }

  if (!example) {
    console.error('❌ Error: Example name is required');
    console.log('Use --help for usage information');
    process.exit(1);
  }

  if (!outputName) {
    outputName = example;
  }

  return { example, outputName };
}

const { example, outputName } = parseArgs();

// Check if example exists
const examplePath = join(__dirname, 'build', 'examples', example);
if (!existsSync(examplePath) || !existsSync(join(examplePath, 'index.html'))) {
  console.error(`❌ Error: Example "${example}" not found or missing index.html`);
  process.exit(1);
}

// Platform-specific settings
const isWindows = process.platform === 'win32';
const outputFile = isWindows ? `${outputName}.exe` : outputName;
const target = isWindows ? 'bun-windows-x64-baseline' : 'bun-linux-x64';

// Create the JavaScript content
const jsContent = `import { serve } from 'bun';
import { open } from 'bun';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const EXAMPLE_NAME = '${example}';

function parseArgs() {
  const args = process.argv.slice(1);
  let port = PORT;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' || args[i] === '-p') {
      port = parseInt(args[i + 1]) || PORT;
      i++;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(\`
Usage: ${outputFile} [options]

Options:
  -p, --port <number>   Port to use (default: \${PORT})
  -h, --help            Show this help message
      \`);
      process.exit(0);
    }
  }
  return { port };
}

const { port } = parseArgs();

function getSlideDeckPath() {
  const exeRelativePath = join(__dirname, 'build', 'examples', EXAMPLE_NAME);
  const cwdRelativePath = join(process.cwd(), 'build', 'examples', EXAMPLE_NAME);
  const commonPaths = [
    exeRelativePath,
    cwdRelativePath,
    join(__dirname, '..', 'build', 'examples', EXAMPLE_NAME),
    join(__dirname, '..', '..', 'build', 'examples', EXAMPLE_NAME),
    join(__dirname, '..', '..', '..', 'build', 'examples', EXAMPLE_NAME),
    join(process.cwd(), '..', 'build', 'examples', EXAMPLE_NAME),
    join(process.cwd(), '..', '..', 'build', 'examples', EXAMPLE_NAME)
  ];
  if (process.env.RSLIDY_PATH) {
    commonPaths.push(join(process.env.RSLIDY_PATH, 'build', 'examples', EXAMPLE_NAME));
  }

  for (const path of commonPaths) {
    if (existsSync(join(path, 'index.html'))) {
      return path;
    }
  }

  console.error(\`❌ Example "\${EXAMPLE_NAME}" not found.\`);
  console.error('💡 Place this executable in your RSlidy project root or set RSLIDY_PATH environment variable');
  process.exit(1);
}

const actualSlideDeckPath = getSlideDeckPath();

const serveStatic = (path) => {
  const fullPath = join(actualSlideDeckPath, path);
  if (existsSync(fullPath)) {
    const content = readFileSync(fullPath);
    return new Response(content, {
      headers: {
        'Content-Type': getContentType(path),
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  return new Response('Not found', { status: 404 });
};

const getContentType = (path) => {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  const types = {
    'html': 'text/html', 'htm': 'text/html', 'css': 'text/css',
    'js': 'application/javascript', 'mjs': 'application/javascript',
    'json': 'application/json', 'png': 'image/png', 'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg', 'gif': 'image/gif', 'svg': 'image/svg+xml',
    'ico': 'image/x-icon', 'webp': 'image/webp',
    'woff': 'font/woff', 'woff2': 'font/woff2', 'ttf': 'font/ttf', 'otf': 'font/otf'
  };
  return types[ext] || 'text/plain';
};

console.log(\`🚀 Starting RSlidy Server for example: \${EXAMPLE_NAME}\`);
console.log(\`📁 Serving from: \${actualSlideDeckPath}\`);

setTimeout(async () => {
  const url = \`http://localhost:\${port}\`;
  console.log(\`🌐 Slide deck available at: \${url}\`);
  console.log('📋 Press Ctrl+C to stop the server');
  try { await open(url); } catch { console.log('⚠️ Could not open browser automatically'); }
}, 500);

const shutdown = () => { console.log('\\n👋 Shutting down RSlidy server...'); process.exit(0); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

serve({
  port, hostname: 'localhost',
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    if (path === '/' || path === '') return serveStatic('index.html');
    return serveStatic(path);
  },
  error(error) {
    console.error('Server error:', error);
    return new Response(\`<h1>Server Error</h1><p>\${error.message}</p>\`, { status: 500, headers: { 'Content-Type': 'text/html' } });
  }
});

console.log(\`✅ Server started on port \${port}\`);
`;

// Create executables directory if missing
const executablesDir = join(__dirname, 'executables');
if (!existsSync(executablesDir)) mkdirSync(executablesDir);

console.log(`📦 Creating executable for: ${example}`);
console.log(`📁 Output file: ${outputFile}`);

const tempFile = join(executablesDir, `temp-${outputName}.js`);
writeFileSync(tempFile, jsContent);

try {
  const result = spawnSync('bun', [
    'build', tempFile, '--compile',
    '--outfile', join(executablesDir, outputFile),
    '--target', target,
    '--minify', '--compress', '--no-source-maps'
  ], { stdio: 'inherit', cwd: __dirname });

  try { unlinkSync(tempFile); } catch {}

  if (result.status === 0) {
    if (!isWindows) spawnSync('chmod', ['+x', join(executablesDir, outputFile)]);
    console.log(`✅ Successfully created: ${join(executablesDir, outputFile)}`);
    console.log('\n📋 Usage:');
    console.log(`   1. Run from folder "executables": ./` + outputFile);
    console.log(`   2. Or specify a port: ./` + outputFile + ' --port 8000');
  } else {
    console.error('❌ Failed to create executable');
  }
} catch (error) {
  console.error('❌ Error creating executable:', error.message);
  try { unlinkSync(tempFile); } catch {}
}
