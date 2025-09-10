import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import fs from 'fs';

// Parse the input to see the structure
const input = fs.readFileSync('input.html', 'utf-8');

unified()
  .use(rehypeParse, { fragment: false })
  .process(input)
  .then((file) => {
    // Find the paragraph element
    function findParagraph(node) {
      if (node.type === 'element' && node.tagName === 'p') {
        console.log('Found paragraph with children:');
        node.children.forEach((child, i) => {
          if (child.type === 'text') {
            console.log(`  [${i}] text: ${JSON.stringify(child.value)}`);
          } else if (child.type === 'element') {
            console.log(`  [${i}] <${child.tagName}>:`, 
              child.children?.[0]?.value ? JSON.stringify(child.children[0].value) : '...');
          }
        });
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (findParagraph(child)) return true;
        }
      }
      return false;
    }
    
    findParagraph(file.data.tree);
  });