import { spawn } from 'child_process';
import fs from 'fs';

async function runFormatter(input) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['format-html.js'], {
      cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
    });
    let output = '';
    child.stdout.on('data', (data) => output += data.toString());
    child.on('close', () => resolve(output));
    child.stdin.write(input);
    child.stdin.end();
  });
}

async function main() {
  const input = fs.readFileSync('input.html', 'utf-8');
  const output = await runFormatter(input);
  
  // Check what's failing
  console.log('Checking failing tests:\n');
  
  // 1. Void elements test
  console.log('1. Void elements test - looking for <meta charset="UTF-8"/>:');
  console.log('   Has <meta charset="UTF-8"/>:', output.includes('<meta charset="UTF-8"/>'));
  console.log('   Has <meta charset="UTF-8">:', output.includes('<meta charset="UTF-8">'));
  
  // Find the actual meta tag
  const metaMatch = output.match(/<meta[^>]+charset[^>]+>/);
  console.log('   Actual meta tag:', metaMatch?.[0]);
  
  // 2. Nested list test - looking for "Item 2"
  console.log('\n2. Nested list test - looking for <li>Item 2:');
  console.log('   Has <li>Item 2:', output.includes('<li>Item 2'));
  console.log('   Has <li>\\n          Item 2:', output.includes('<li>\n          Item 2'));
  
  // Find the actual Item 2
  const item2Match = output.match(/<li>[^<]*Item 2[^<]*/);
  console.log('   Actual Item 2:', item2Match?.[0]);
  
  // Show context around Item 2
  const item2Index = output.indexOf('Item 2');
  if (item2Index > 0) {
    console.log('   Context:', JSON.stringify(output.substring(item2Index - 20, item2Index + 50)));
  }
}

main();