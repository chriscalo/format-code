import { execSync } from 'child_process';

try {
  const result = execSync('npm test', {
    cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  
  console.log(result);
  console.log('\n✅ YES, ALL TESTS PASS!');
} catch (error) {
  const output = error.stdout || '';
  console.log(output);
  
  // Parse the summary
  const passMatch = output.match(/pass (\d+)/);
  const failMatch = output.match(/fail (\d+)/);
  
  if (failMatch && failMatch[1] === '0') {
    console.log('\n✅ YES, ALL TESTS PASS!');
  } else {
    console.log('\n❌ NO, TESTS ARE FAILING');
    
    // Show which tests failed
    const lines = output.split('\n');
    const failures = lines.filter(line => line.includes('✖') && line.includes('ms)'));
    if (failures.length > 0) {
      console.log('\nFailing tests:');
      failures.forEach(f => console.log(f));
    }
  }
}