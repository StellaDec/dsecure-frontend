const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');
let tsContent = fs.readFileSync(tsPath, 'utf8');

const months = ['March', 'April', 'May', 'June'];
const daysInMonth = [31, 30, 31, 30];

let currentMonthIdx = 0;
let currentDay = 1;

let count = 0;
tsContent = tsContent.replace(/publishDate: "July 10, 2026",/g, () => {
    count++;
    let dateStr = `${months[currentMonthIdx]} ${currentDay.toString().padStart(2, '0')}, 2026`;
    
    currentDay += 4;
    if (currentDay > daysInMonth[currentMonthIdx]) {
        currentDay = currentDay - daysInMonth[currentMonthIdx];
        currentMonthIdx++;
        if (currentMonthIdx > 3) {
            currentMonthIdx = 3; // cap at June
            currentDay = Math.floor(Math.random() * 28) + 1; // random day in June if we exceed
        }
    }
    
    return `publishDate: "${dateStr}",`;
});

fs.writeFileSync(tsPath, tsContent, 'utf8');
console.log(`Updated ${count} publish dates.`);
