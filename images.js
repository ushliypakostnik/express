import path from 'path';
import url from 'url';

import config from './config';

import fs from 'fs';
import sharp from 'sharp';

const dirs = ['mobile', 'mobile-2x', 'desktop', 'desktop-2x'];

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

    const img1 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img1
      .metadata()
      .then(metadata => {
        if (metadata.width > 420) {
          return img1
            .resize(420)
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[0], image), err => {});
          } else {
          return img1
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[0], image), err => {});
        }
      });
    const img2 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img2
      .metadata()
      .then(metadata => {
        if (metadata.width > 840) {
          return img2
            .resize(840)
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[1], image), err => {});
          } else {
          return img2
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[1], image), err => {});
        }
      });
    const img3 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img3
      .metadata()
      .then(metadata => {
        if (metadata.height > 420) {
          return img3
            .resize(null, 420)
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[2], image), err => {});
          } else {
          return img3
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[2], image), err => {});
        }
      });
    const img4 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img4
      .metadata()
      .then(metadata => {
        if (metadata.height > 840) {
          return img4
            .resize(null, 840)
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[3], image), err => {});
          } else {
          return img4
            .toFile(path.join(config.MEDIA_DIR, item['id'], dirs[3], image), err => {});
        }
      });
  });
});
