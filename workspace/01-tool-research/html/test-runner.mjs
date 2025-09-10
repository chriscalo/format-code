import { spawn } from 'child_process';
import fs from 'fs';

async function runFormatter(input) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['format-html.js'], {
      cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
    });
    let output = '';
    let error = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      error += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}: ${error}`));
      } else {
        resolve(output);
      }
    });

    child.stdin.write(input);
    child.stdin.end();
  });
}

async function main() {
  console.log('Testing HTML formatter...\n');
  
  // Test 1: Simple formatting
  console.log('Test 1: Simple formatting');
  const simple = '<div class=test><p>Hello</p></div>';
  const simpleOut = await runFormatter(simple);
  console.log('Input:', simple);
  console.log('Output:', simpleOut.trim());
  console.log('✓ Basic formatting works\n');
  
  // Test 2: Attribute quoting
  console.log('Test 2: Attribute quoting');
  const attrs = '<img src=test.jpg width=300>';
  const attrsOut = await runFormatter(attrs);
  const hasQuotedAttrs = attrsOut.includes('src="test.jpg"') && attrsOut.includes('width="300"');
  console.log('Quotes attributes:', hasQuotedAttrs ? '✓' : '✗');
  if (!hasQuotedAttrs) {
    console.log('Output:', attrsOut.trim());
  }
  console.log('');
  
  // Test 3: Self-closing tags
  console.log('Test 3: Self-closing tags');
  const selfClose = '<br><hr><img src="test.jpg">';
  const selfCloseOut = await runFormatter(selfClose);
  const hasSelfClosing = selfCloseOut.includes('/>');
  console.log('Self-closing tags:', hasSelfClosing ? '✓' : '✗');
  if (!hasSelfClosing) {
    console.log('Output:', selfCloseOut.trim());
  }
  console.log('');
  
  // Test 4: Full document
  console.log('Test 4: Full document');
  const input = fs.readFileSync('input.html', 'utf-8');
  const output = await runFormatter(input);
  const expected = fs.readFileSync('expected.html', 'utf-8');
  
  // Save output for inspection
  fs.writeFileSync('output.html', output);
  
  // Compare line by line
  const outputLines = output.split('\n');
  const expectedLines = expected.split('\n');
  
  let matches = true;
  let firstDiff = -1;
  
  for (let i = 0; i < Math.max(outputLines.length, expectedLines.length); i++) {
    if (outputLines[i] !== expectedLines[i]) {
      if (firstDiff === -1) {
        firstDiff = i;
        console.log(`First difference at line ${i + 1}:`);
        console.log('Expected:', JSON.stringify(expectedLines[i] || '<EOF>'));
        console.log('Actual:  ', JSON.stringify(outputLines[i] || '<EOF>'));
      }
      matches = false;
    }
  }
  
  if (matches) {
    console.log('✓ Output matches expected.html perfectly!');
  } else {
    console.log(`✗ Output differs from expected (${outputLines.length} vs ${expectedLines.length} lines)`);
  }
  
  console.log('\n' + (matches ? '✅ All tests passed!' : '❌ Some tests failed'));
  process.exit(matches ? 0 : 1);
}

main().catch(console.error);