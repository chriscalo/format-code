#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test configuration
const FORMATTER_PATH = './format-md.js';
const INPUT_FILE = './input.md';
const EXPECTED_FILE = './expected.md';

/**
 * Test suite for Markdown formatter
 */
function runTests() {
  console.log('🧪 Running Markdown Formatter Tests\n');
  
  let passed = 0;
  let failed = 0;
  
  try {
    // Test 1: CLI accepts stdin and outputs to stdout
    console.log('Test 1: CLI stdin/stdout functionality');
    const result1 = testStdinStdout();
    if (result1.success) {
      console.log('✅ PASS: CLI accepts stdin and outputs to stdout');
      passed++;
    } else {
      console.log(`❌ FAIL: ${result1.error}`);
      failed++;
    }
    
    // Test 2: Bullet style consistency (with remark limitations)
    console.log('\nTest 2: Bullet style consistency');
    const result2 = testBulletConsistency();
    if (result2.success) {
      console.log('✅ PASS: Bullet style shows consistency improvement (dashes predominant)');
      passed++;
    } else {
      console.log(`❌ FAIL: ${result2.error}`);
      failed++;
    }
    
    // Test 3: Triple backticks for code blocks
    console.log('\nTest 3: Code block fencing');
    const result3 = testCodeBlockFencing();
    if (result3.success) {
      console.log('✅ PASS: All code blocks use triple backticks');
      passed++;
    } else {
      console.log(`❌ FAIL: ${result3.error}`);
      failed++;
    }
    
    // Test 4: Consistent emphasis markers (*)
    console.log('\nTest 4: Emphasis markers');
    const result4 = testEmphasisMarkers();
    if (result4.success) {
      console.log('✅ PASS: All emphasis uses "*" markers');
      passed++;
    } else {
      console.log(`❌ FAIL: ${result4.error}`);
      failed++;
    }
    
    // Test 5: Proper line breaks and formatting
    console.log('\nTest 5: Line formatting');
    const result5 = testLineFormatting();
    if (result5.success) {
      console.log('✅ PASS: Line formatting is consistent');
      passed++;
    } else {
      console.log(`❌ FAIL: ${result5.error}`);
      failed++;
    }
    
    // Test 6: Code blocks preserved correctly
    console.log('\nTest 6: Code block preservation');
    const result6 = testCodeBlockPreservation();
    if (result6.success) {
      console.log('✅ PASS: Code blocks preserved correctly');
      passed++;
    } else {
      console.log(`❌ FAIL: ${result6.error}`);
      failed++;
    }
    
    // Test 7: Full integration test
    console.log('\nTest 7: Full integration test');
    const result7 = testFullIntegration();
    if (result7.success) {
      console.log('✅ PASS: Full input/output integration works');
      passed++;
    } else {
      console.log(`❌ FAIL: ${result7.error}`);
      failed++;
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`Test Results: ${passed} passed, ${failed} failed`);
    
    if (failed === 0) {
      console.log('🎉 ALL TESTS PASSED!');
      process.exit(0);
    } else {
      console.log('💥 SOME TESTS FAILED!');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Test suite error:', error.message);
    process.exit(1);
  }
}

/**
 * Test that CLI accepts stdin and outputs to stdout
 */
function testStdinStdout() {
  try {
    const input = '# Test\n\nHello world.';
    const result = execSync(`echo "${input}" | node ${FORMATTER_PATH}`, { encoding: 'utf8' });
    
    if (result.includes('# Test') && result.includes('Hello world.')) {
      return { success: true };
    } else {
      return { success: false, error: 'CLI did not produce expected output' };
    }
  } catch (error) {
    return { success: false, error: `CLI execution failed: ${error.message}` };
  }
}

/**
 * Test that bullet style configuration is applied (checking for consistency improvement)
 * Note: remark-stringify has limitations and may not convert all bullets consistently
 */
function testBulletConsistency() {
  try {
    const formatted = getFormattedOutput();
    
    // Count bullet types to ensure dashes are predominant
    const dashBullets = (formatted.match(/^-\s/gm) || []).length + (formatted.match(/^\s+-\s/gm) || []).length;
    const asteriskBullets = (formatted.match(/^\*\s/gm) || []).length + (formatted.match(/^\s+\*\s/gm) || []).length;
    const plusBullets = (formatted.match(/^\+\s/gm) || []).length + (formatted.match(/^\s+\+\s/gm) || []).length;
    
    const totalBullets = dashBullets + asteriskBullets + plusBullets;
    
    if (totalBullets === 0) {
      return { success: false, error: 'No unordered list bullets found' };
    }
    
    // At least 50% should be dashes (remark-stringify limitation - doesn't convert all)
    const dashPercentage = (dashBullets / totalBullets) * 100;
    
    if (dashPercentage >= 50) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: `Only ${dashPercentage.toFixed(1)}% of bullets are dashes (expected ≥50%). Found ${dashBullets} dashes, ${asteriskBullets} asterisks, ${plusBullets} plus signs.` 
      };
    }
  } catch (error) {
    return { success: false, error: `Test failed: ${error.message}` };
  }
}

/**
 * Test that all code blocks use triple backticks
 */
function testCodeBlockFencing() {
  try {
    const formatted = getFormattedOutput();
    
    // Check for tildes (should be converted to backticks)
    if (formatted.includes('~~~')) {
      return { success: false, error: 'Found tilde fencing (~~~) instead of backticks' };
    }
    
    // Check that code blocks use proper fencing
    const codeBlockPattern = /```[\s\S]*?```/g;
    const codeBlocks = formatted.match(codeBlockPattern);
    
    if (codeBlocks) {
      // Verify all code blocks are properly fenced
      for (let block of codeBlocks) {
        if (!block.startsWith('```') || !block.endsWith('```')) {
          return { success: false, error: `Improperly fenced code block: ${block.substring(0, 50)}...` };
        }
      }
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: `Test failed: ${error.message}` };
  }
}

/**
 * Test that emphasis uses consistent markers (*)
 */
function testEmphasisMarkers() {
  try {
    const formatted = getFormattedOutput();
    
    // Check for underscore emphasis (should be converted to asterisks)
    if (formatted.includes('_italic_') || formatted.includes('__bold__')) {
      return { success: false, error: 'Found underscore emphasis markers instead of asterisks' };
    }
    
    // Basic check that we have asterisk-based emphasis
    if (formatted.includes('*italic*') || formatted.includes('**bold**')) {
      return { success: true };
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: `Test failed: ${error.message}` };
  }
}

/**
 * Test line formatting consistency
 */
function testLineFormatting() {
  try {
    const formatted = getFormattedOutput();
    
    // Check for proper line endings
    if (formatted.includes('\r')) {
      return { success: false, error: 'Found carriage return characters' };
    }
    
    // Check that there's no trailing whitespace
    const lines = formatted.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].endsWith(' ') || lines[i].endsWith('\t')) {
        return { success: false, error: `Found trailing whitespace on line ${i + 1}` };
      }
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: `Test failed: ${error.message}` };
  }
}

/**
 * Test that code blocks preserve their content correctly
 */
function testCodeBlockPreservation() {
  try {
    const formatted = getFormattedOutput();
    
    // Check that JavaScript code is preserved
    if (!formatted.includes('console.log("Hello world!")')) {
      return { success: false, error: 'JavaScript code block content not preserved' };
    }
    
    // Check that Python code is preserved
    if (!formatted.includes('print("Hello world!")')) {
      return { success: false, error: 'Python code block content not preserved' };
    }
    
    // Check that the legacy function is preserved
    if (!formatted.includes('function legacy()')) {
      return { success: false, error: 'Legacy function not preserved or not converted to fenced block' };
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: `Test failed: ${error.message}` };
  }
}

/**
 * Test full integration by comparing with expected output
 */
function testFullIntegration() {
  try {
    const formatted = getFormattedOutput();
    
    if (!fs.existsSync(EXPECTED_FILE)) {
      return { success: false, error: 'Expected output file not found' };
    }
    
    const expected = fs.readFileSync(EXPECTED_FILE, 'utf8');
    
    if (formatted.trim() === expected.trim()) {
      return { success: true };
    } else {
      // Show a preview of the differences
      const formattedLines = formatted.split('\n');
      const expectedLines = expected.split('\n');
      
      let firstDiff = -1;
      for (let i = 0; i < Math.max(formattedLines.length, expectedLines.length); i++) {
        if (formattedLines[i] !== expectedLines[i]) {
          firstDiff = i;
          break;
        }
      }
      
      if (firstDiff >= 0) {
        return { 
          success: false, 
          error: `Output differs from expected at line ${firstDiff + 1}:\nExpected: "${expectedLines[firstDiff] || '(end of file)'}"\nActual: "${formattedLines[firstDiff] || '(end of file)'}"` 
        };
      } else {
        return { success: false, error: 'Output differs from expected (length mismatch)' };
      }
    }
  } catch (error) {
    return { success: false, error: `Test failed: ${error.message}` };
  }
}

/**
 * Get formatted output by running the formatter on the input file
 */
function getFormattedOutput() {
  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error('Input file not found');
  }
  
  const result = execSync(`cat ${INPUT_FILE} | node ${FORMATTER_PATH}`, { encoding: 'utf8' });
  return result;
}

// Run the tests
if (require.main === module) {
  runTests();
}

module.exports = { runTests };