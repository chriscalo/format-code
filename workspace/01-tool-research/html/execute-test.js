import { spawn } from 'child_process';

const test = spawn('node', ['--test', 'format-html.test.js'], {
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
});

test.stdout.on('data', (data) => {
  process.stdout.write(data);
});

test.stderr.on('data', (data) => {
  process.stderr.write(data);
});

test.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ ALL TESTS PASS!');
  } else {
    console.log('\n❌ TESTS FAILED');
  }
  process.exit(code);
});