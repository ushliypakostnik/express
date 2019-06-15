import path from 'path';

import config from './config';

import fs from 'fs';
import sharp from 'sharp';

const dirs = ['mobile', 'mobile-2x', 'desktop', 'desktop-2x'];

const desktopMaxHeight = 440;
const mobileMaxWidth = 420;

// Images

config.CONTENT.forEach((item, i) => {
  dirs.forEach((dir, index) => {
    dir = path.join(config.MEDIA_DIR, item['id'], dir);
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    } else {
      fs.readdirSync(dir).forEach((file, index) => {
        fs.unlinkSync(path.join(dir, '/', file));
      });
    }
  });

  const images = fs.readdirSync(path.join(config.MEDIA_DIR, item['id']));
  images.forEach((image, k) => {
    if (!path.extname(image)) {
        return;
    }

    // Mobile
    const img1 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img1
      .metadata()
      .then(metadata => {
        if (metadata.width > mobileMaxWidth) {
          return img1
            .resize(mobileMaxWidth)
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[0], image), err => {});
          } else {
          return img1
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[0], image), err => {});
        }
      });
    // Mobile 2x
    const img2 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img2
      .metadata()
      .then(metadata => {
        if (metadata.width > mobileMaxWidth * 2) {
          return img2
            .resize(mobileMaxWidth * 2)
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[1], image), err => {});
          } else {
          return img2
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[1], image), err => {});
        }
      });
    // Desktop
    const img3 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img3
      .metadata()
      .then(metadata => {
        if (metadata.height > desktopMaxHeight) {
          return img3
            .resize(null, desktopMaxHeight)
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[2], image), err => {});
          } else {
          return img3
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[2], image), err => {});
        }
      });
    // Desktop 2x
    const img4 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img4
      .metadata()
      .then(metadata => {
        if (metadata.height > desktopMaxHeight * 2) {
          return img4
            .resize(null, desktopMaxHeight * 2)
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[3], image), err => {});
          } else {
          return img4
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[3], image), err => {});
        }
      });
  });
});
