import sharp from 'sharp';
import fs from 'fs';

async function generateFavicons() {
  const input = 'public/logo.jpeg';
  
  if (!fs.existsSync(input)) {
    console.error(`Input file ${input} not found!`);
    process.exit(1);
  }

  console.log('Generating favicons...');

  try {
    // 16x16
    await sharp(input)
      .resize(16, 16)
      .toFormat('png')
      .toFile('public/favicon-16x16.png');
    console.log('Generated favicon-16x16.png');

    // 32x32
    await sharp(input)
      .resize(32, 32)
      .toFormat('png')
      .toFile('public/favicon-32x32.png');
    console.log('Generated favicon-32x32.png');

    // apple-touch-icon (180x180)
    await sharp(input)
      .resize(180, 180)
      .toFormat('png')
      .toFile('public/apple-touch-icon.png');
    console.log('Generated apple-touch-icon.png');

    // android-chrome-192x192
    await sharp(input)
      .resize(192, 192)
      .toFormat('png')
      .toFile('public/android-chrome-192x192.png');
    console.log('Generated android-chrome-192x192.png');

    // android-chrome-512x512
    await sharp(input)
      .resize(512, 512)
      .toFormat('png')
      .toFile('public/android-chrome-512x512.png');
    console.log('Generated android-chrome-512x512.png');

    // favicon.ico (Sharp doesn't natively support ico, but we can generate a 32x32 png and rename it to ico,
    // or we can use another package, but standard PNG renamed to .ico works on modern browsers.
    // Let's generate a 32x32 png as favicon.ico just in case it's used as a fallback).
    await sharp(input)
      .resize(32, 32)
      .toFormat('png')
      .toFile('public/favicon.ico');
    console.log('Generated favicon.ico');

    console.log('All favicons generated successfully!');
  } catch (err) {
    console.error('Error generating favicons:', err);
  }
}

generateFavicons();
