import path from 'path';

import fs from 'fs';
import sharp from 'sharp';

import config from './config';

const dirs = ['mobile', 'mobile-2x', 'desktop', 'desktop-2x'];

const desktopMaxHeight = 440;
const mobileMaxWidth = 420;

// Images

config.CONTENT.forEach((item) => {
  dirs.forEach((dir) => {
    const d = path.join(config.MEDIA_DIR, item.id, dir);
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d);
    } else {
      fs.readdirSync(d).forEach((file) => {
        fs.unlinkSync(path.join(d, '/', file));
      });
    }
  });

  const images = fs.readdirSync(path.join(config.MEDIA_DIR, item.id));
  images.forEach((image) => {
    if (!path.extname(image)) {
      return;
    }

    // Mobile
    const img1 = sharp(path.join(config.MEDIA_DIR, item.id, image));
    img1
      .metadata()
      .then((metadata) => {
        if (metadata.width > mobileMaxWidth) {
          return img1
            .resize(mobileMaxWidth)
            .toFile(path.join(config.MEDIA_DIR, item.id, dirs[0], image));
        }
        return img1
          .toFile(path.join(config.MEDIA_DIR, item.id, dirs[0], image));
      });
    // Mobile 2x
    const img2 = sharp(path.join(config.MEDIA_DIR, item.id, image));
    img2
      .metadata()
      .then((metadata) => {
        if (metadata.width > mobileMaxWidth * 2) {
          return img2
            .resize(mobileMaxWidth * 2)
            .toFile(path.join(config.MEDIA_DIR, item.id, dirs[1], image));
        }
        return img2
          .toFile(path.join(config.MEDIA_DIR, item.id, dirs[1], image));
      });
    // Desktop
    const img3 = sharp(path.join(config.MEDIA_DIR, item.id, image));
    img3
      .metadata()
      .then((metadata) => {
        if (metadata.height > desktopMaxHeight) {
          return img3
            .resize(null, desktopMaxHeight)
            .toFile(path.join(config.MEDIA_DIR, item.id, dirs[2], image));
        }
        return img3
          .toFile(path.join(config.MEDIA_DIR, item.id, dirs[2], image));
      });
    // Desktop 2x
    const img4 = sharp(path.join(config.MEDIA_DIR, item.id, image));
    img4
      .metadata()
      .then((metadata) => {
        if (metadata.height > desktopMaxHeight * 2) {
          return img4
            .resize(null, desktopMaxHeight * 2)
            .toFile(path.join(config.MEDIA_DIR, item.id, dirs[3], image));
        }
        return img4
          .toFile(path.join(config.MEDIA_DIR, item.id, dirs[3], image));
      });
  });
});
