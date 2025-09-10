import { execSync } from 'child_process';

try {
  const result = execSync('node --test format-html.test.js', {
    cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
    encoding: 'utf-8'
  });
  console.log(result);
} catch (error) {
  console.log(error.stdout);
  process.exit(1);
}