import path from 'path';
import url from 'url';

import config from './config';

import fs from 'fs';
import sharp from 'sharp';

const CONTENT = [
  {'id': 'pinhole', 'name': 'pinhole'},
  {'id': 'wedding', 'name': 'wedding'},
  {'id': 'concert', 'name': 'concert'},
  {'id': 'pixelart', 'name': 'pixelart'},
];

const dirs = ['mobile', 'mobile-2x', 'desktop', 'desktop-2x'];

// Images

CONTENT.forEach((item, i) => {
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
            .toFile(path.join(config.MEDIA_DIR, item['id'], 'mobile', image), err => {});
          } else {
          return img1
            .toFile(path.join(config.MEDIA_DIR, item['id'], 'mobile', image), err => {});
        }
      });
    const img2 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img2
      .metadata()
      .then(metadata => {
        if (metadata.width > 840) {
          return img2
            .resize(840)
            .toFile(path.join(config.MEDIA_DIR, item['id'], 'mobile-2x', image), err => {});
          } else {
          return img2
            .toFile(path.join(config.MEDIA_DIR, item['id'], 'mobile-2x', image), err => {});
        }
      });
    const img3 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img3
      .metadata()
      .then(metadata => {
        if (metadata.height > 420) {
          return img3
            .resize(null, 420)
            .toFile(path.join(config.MEDIA_DIR, item['id'], 'desktop', image), err => {});
          } else {
          return img3
            .toFile(path.join(config.MEDIA_DIR, item['id'], 'desktop', image), err => {});
        }
      });
    const img4 = sharp(path.join(config.MEDIA_DIR, item['id'], image));
    img4
      .metadata()
      .then(metadata => {
        if (metadata.height > 840) {
          return img4
            .resize(null, 840)
            .toFile(path.join(config.MEDIA_DIR, item['id'], 'desktop-2x', image), err => {});
          } else {
          return img4
            .toFile(path.join(config.MEDIA_DIR, item['id'], 'desktop-2x', image), err => {});
        }
      });
  });
});
