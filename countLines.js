const fs = require('fs');
const path = require('path');

function countLines(dir) {
    let totalLines = 0;
    
    function walk(currentPath) {
        const files = fs.readdirSync(currentPath);
        for (const file of files) {
            const filePath = path.join(currentPath, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walk(filePath);
            } else if (/\.(js|css|html)$/i.test(file)) {
                const content = fs.readFileSync(filePath, 'utf8');
                let cleanedContent;
                
                if (filePath.endsWith('.js')) {
                    cleanedContent = content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
                } else if (filePath.endsWith('.css')) {
                    cleanedContent = content.replace(/\/\*[\s\S]*?\*\//g, '');
                } else { // .html
                    cleanedContent = content.replace(/<!--[\s\S]*?-->/g, '');
                }
                
                const lines = cleanedContent.split('\n').filter(line => line.trim() !== '').length;
                totalLines += lines;
            }
        }
    }
    
    walk(dir);
    return totalLines;
}

const total = countLines('e:\\syjs_mobile');
console.log(`Total lines of code: ${total}`);