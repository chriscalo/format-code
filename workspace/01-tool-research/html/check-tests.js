import { spawn } from 'child_process';

const child = spawn('npm', ['test'], {
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
  stdio: 'inherit'
});

child.on('close', (code) => {
  process.exit(code);
});