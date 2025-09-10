import { execSync } from 'child_process';

console.log('Running HTML formatter tests...\n');

try {
  // First, let's run a simple format test
  const input = '<div class=test><p>Hello</p></div>';
  const formatted = execSync('node format-html.js', {
    input: input,
    encoding: 'utf-8',
    cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
  });
  
  console.log('Simple format test:');
  console.log('Input:', input);
  console.log('Output:', formatted);
  console.log('');
  
  // Now run the actual tests
  const result = execSync('node --test format-html.test.js', {
    cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
    encoding: 'utf-8'
  });
  
  console.log(result);
  console.log('\n✅ All tests passed!');
} catch (error) {
  console.log('Test output:');
  console.log(error.stdout || '');
  
  if (error.stderr) {
    console.error('\nErrors:', error.stderr);
  }
  
  // Parse the output to see what failed
  const output = error.stdout || '';
  const lines = output.split('\n');
  
  const failLine = lines.find(line => line.includes('✖ fail'));
  if (failLine) {
    console.log('\n' + failLine);
  }
  
  process.exit(1);
}