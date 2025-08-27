#!/usr/bin/env bun

import { mkdirSync, existsSync, readdirSync, writeFileSync } from 'fs';
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
      // First non-flag argument is treated as example name
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

// Create the JavaScript content
const jsContent = `
import { serve } from 'bun';
import { open } from 'bun';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const PORT = 3000;
const EXAMPLE_NAME = '${example}';

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(1);
  let port = PORT;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' || args[i] === '-p') {
      port = parseInt(args[i + 1]) || PORT;
      i++;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(\`
Usage: ${outputName}.exe [options]

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

// Get the correct path for the executable context
function getSlideDeckPath() {
  // Strategy 1: Look relative to the executable (if placed in project root)
  const exeRelativePath = join(__dirname, 'build', 'examples', EXAMPLE_NAME);
  
  // Strategy 2: Look relative to current working directory
  const cwdRelativePath = join(process.cwd(), 'build', 'examples', EXAMPLE_NAME);
  
  // Strategy 3: Look for common project structures
  const commonPaths = [
    exeRelativePath,
    cwdRelativePath,
    join(__dirname, '..', 'build', 'examples', EXAMPLE_NAME),
    join(__dirname, '..', '..', 'build', 'examples', EXAMPLE_NAME),
    join(__dirname, '..', '..', '..', 'build', 'examples', EXAMPLE_NAME),
    join(process.cwd(), '..', 'build', 'examples', EXAMPLE_NAME),
    join(process.cwd(), '..', '..', 'build', 'examples', EXAMPLE_NAME),
  ];

  // Add environment variable path if set
  if (process.env.RSLIDY_PATH) {
    commonPaths.push(join(process.env.RSLIDY_PATH, 'build', 'examples', EXAMPLE_NAME));
  }

  for (const path of commonPaths) {
    if (existsSync(join(path, 'index.html'))) {
      return path;
    }
  }

  console.error(\`❌ Example "\${EXAMPLE_NAME}" not found.\`);
  console.error('💡 Please place this executable in your RSlidy project root directory');
  console.error('💡 Or set the RSLIDY_PATH environment variable to your project path');
  console.error('💡 Alternatively, run it from the command line in your project directory');
  process.exit(1);
}

const actualSlideDeckPath = getSlideDeckPath();

// Serve static files
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
    'html': 'text/html',
    'htm': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'mjs': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'webp': 'image/webp',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'otf': 'font/otf'
  };
  return types[ext] || 'text/plain';
};

// Start server and open browser
console.log(\`🚀 Starting RSlidy Server for example: \${EXAMPLE_NAME}\`);
console.log(\`📁 Serving from: \${actualSlideDeckPath}\`);

// Open browser after a short delay to ensure server is ready
setTimeout(async () => {
  const url = \`http://localhost:\${port}\`;
  console.log(\`🌐 Slide deck available at: \${url}\`);
  console.log('📋 Press Ctrl+C to stop the server');

  try {
    await open(url);
  } catch (err) {
    console.log('⚠️  Could not open browser automatically');
    console.log('   Please open manually:', url);
  }
}, 500);

// Handle graceful shutdown
const shutdown = () => {
  console.log('\\n👋 Shutting down RSlidy server...');
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start the server (this is blocking in Bun)
serve({
  port: port,
  hostname: 'localhost',
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Serve index.html for root
    if (path === '/' || path === '') {
      return serveStatic('index.html');
    }

    // Serve other static files
    return serveStatic(path);
  },
  error(error) {
    console.error('Server error:', error);
    return new Response(
      \`<h1>Server Error</h1><p>\${error.message}</p><p>Please check if the slide deck files exist at: \${actualSlideDeckPath}</p>\`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
});

console.log(\`✅ Server started on port \${port}\`);
`;

// Create executables directory if it doesn't exist
const executablesDir = join(__dirname, 'executables');
if (!existsSync(executablesDir)) {
  mkdirSync(executablesDir);
}

console.log(`📦 Creating executable for: ${example}`);
console.log(`📁 Output file: ${outputName}.exe`);

// Create a temporary file for compilation
const tempFile = join(executablesDir, `temp-${outputName}.js`);
writeFileSync(tempFile, jsContent);

try {
  // Use Bun to compile the temporary file
  const result = spawnSync('bun', [
    'build',
    tempFile,
    '--compile',
    '--outfile',
    join(executablesDir, outputName + '.exe'),
    '--target',
    'bun-windows-x64-baseline'
  ], {
    stdio: 'inherit',
    cwd: __dirname
  });

  // Clean up the temporary file
  try {
    const { unlinkSync } = await import('fs');
    unlinkSync(tempFile);
  } catch (cleanupError) {
    console.log('⚠️  Could not clean up temporary file:', tempFile);
  }

  if (result.status === 0) {
    console.log(`✅ Successfully created: ${join(executablesDir, outputName)}.exe`);


    console.log('\n📋 Usage:');
    console.log(`   1. Go to folder "executables" and double-click ${outputName}.exe`);
    console.log(`   2. Or run from command line and use a specific port: ./${outputName} --port 8000`);
  } else {
    console.error('❌ Failed to create executable');
  }
} catch (error) {
  console.error('❌ Error creating executable:', error.message);

  // Clean up temporary file on error too
  try {
    const { unlinkSync } = await import('fs');
    unlinkSync(tempFile);
  } catch (cleanupError) {
    // Ignore cleanup errors
  }
}