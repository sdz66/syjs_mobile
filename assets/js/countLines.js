const fs = require('fs');
const path = require('path');

/**
 * 统计指定目录下源代码有效行数
 * @param {string} dir - 要统计的目录路径
 * @returns {number} 有效代码行数（排除注释和空行）
 */
function countLines(dir) {
    let totalLines = 0;
    
    // 递归遍历目录的核心方法
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
                    // 匹配JS单行注释(//)和块注释(/* */)
                    cleanedContent = content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
                } else if (filePath.endsWith('.css')) {
                    // 匹配CSS块注释(/* */)
                    cleanedContent = content.replace(/\/\*[\s\S]*?\*\//g, '');
                } else { // 处理HTML文件
                    // 匹配HTML注释(<!-- -->)
                    cleanedContent = content.replace(/<!--[\s\S]*?-->/g, '');
                }
                
                // 按换行分割后过滤空行，统计有效行数
const lines = cleanedContent.split('\n').filter(line => line.trim() !== '').length;
                totalLines += lines;
            }
        }
    }
    
    walk(dir);
    return totalLines;
}

const total = countLines('E:\\23107\\Documents\\syjs_mobile');

console.log(`Total lines of code: ${total}`);