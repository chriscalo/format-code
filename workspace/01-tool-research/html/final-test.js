import { execSync } from 'child_process';

console.log('Running HTML formatter tests...\n');

try {
  const result = execSync('npm test', {
    cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  
  console.log(result);
  console.log('\n✅ All tests passed!');
  process.exit(0);
} catch (error) {
  if (error.stdout) {
    console.log(error.stdout);
  }
  if (error.stderr) {
    console.error(error.stderr);
  }
  console.log('\n❌ Some tests failed');
  
  // Try to show which specific tests failed
  const output = error.stdout || '';
  if (output.includes('failing tests:')) {
    console.log('\nFailing tests detected. See output above for details.');
  }
  
  process.exit(1);
}