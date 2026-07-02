const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');

async function generateOG() {
  const WIDTH = 1200;
  const HEIGHT = 630;

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // === BACKGROUND ===
  ctx.fillStyle = '#0e1525';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle grid dots pattern
  ctx.fillStyle = 'rgba(255,255,255,0.015)';
  for (let x = 30; x < WIDTH; x += 40) {
    for (let y = 30; y < HEIGHT; y += 40) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Subtle vignette glow
  const vigGrad = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 50, WIDTH / 2, HEIGHT / 2, 450);
  vigGrad.addColorStop(0, 'rgba(16, 185, 129, 0.06)');
  vigGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const iconCX = 390;
  const iconCY = 270;
  
  try {
    // Try to load the exact icon if user saved it
    const iconPath = path.join(__dirname, 'public', 'network-icon.png');
    if (fs.existsSync(iconPath)) {
      const image = await loadImage(iconPath);
      // Draw image centered at iconCX, iconCY
      const imgW = 160;
      const imgH = 160;
      ctx.drawImage(image, iconCX - imgW/2, iconCY - imgH/2, imgW, imgH);
    } else {
      // Fallback to programmatic icon
      const iconColor = '#34d399';
      const branches = [
        { angle: 0, len: 65, r: 9 },
        { angle: 36, len: 50, r: 7 },
        { angle: 72, len: 75, r: 10 },
        { angle: 108, len: 55, r: 8 },
        { angle: 144, len: 60, r: 7 },
        { angle: 180, len: 65, r: 9 },
        { angle: 216, len: 45, r: 6 },
        { angle: 252, len: 70, r: 10 },
        { angle: 288, len: 50, r: 7 },
        { angle: 324, len: 60, r: 8 },
      ];

      ctx.strokeStyle = iconColor;
      ctx.lineWidth = 4;
      for (const b of branches) {
        const rad = (b.angle * Math.PI) / 180;
        const ex = iconCX + Math.cos(rad) * b.len;
        const ey = iconCY + Math.sin(rad) * b.len;
        ctx.beginPath();
        ctx.moveTo(iconCX, iconCY);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      ctx.fillStyle = iconColor;
      for (const b of branches) {
        const rad = (b.angle * Math.PI) / 180;
        const ex = iconCX + Math.cos(rad) * b.len;
        const ey = iconCY + Math.sin(rad) * b.len;
        ctx.beginPath();
        ctx.arc(ex, ey, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(iconCX, iconCY, 22, 0, Math.PI * 2);
      ctx.fill();
    }
  } catch (e) {
    console.error("Error drawing icon:", e);
  }

  // === TEXT — "D-Secure" ===
  ctx.font = 'bold 84px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('D-Secure', iconCX + 100, iconCY + 5);

  // === TAGLINE ===
  ctx.font = '400 34px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.textAlign = 'center';
  // Dropped "for ITAD & ITAM"
  ctx.fillText('Enterprise Data Solutions Software', WIDTH / 2, 380);

  // === Bottom thin accent line ===
  const bottomGrad = ctx.createLinearGradient(300, 0, 900, 0);
  bottomGrad.addColorStop(0, 'rgba(16, 185, 129, 0)');
  bottomGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.4)');
  bottomGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
  ctx.fillStyle = bottomGrad;
  ctx.fillRect(300, 480, 600, 2);

  // Save
  const outputPath = path.join(__dirname, 'public', 'og-default.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`OG image saved to ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

generateOG();
