import { execSync } from 'child_process';

console.log('Installing prettier...');
execSync('npm install --save prettier', {
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
  stdio: 'inherit'
});

console.log('Prettier installed successfully');