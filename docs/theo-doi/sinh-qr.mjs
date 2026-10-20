import QRCode from 'qrcode';
import { Jimp } from 'jimp';
import jsQR from 'jsqr';
const ds = {
  'CHUNG-trang-theo-doi': 'https://truongvietanh.com/theo-doi/',
  'facebook': 'https://www.facebook.com/truongvietanhhcm/',
  'youtube': 'https://www.youtube.com/@truongvietanhhcm?sub_confirmation=1',
};
for (const [t, u] of Object.entries(ds)) {
  const f = `docs/theo-doi/qr-${t}.png`;
  await QRCode.toFile(f, u, { width: 1000, margin: 4, errorCorrectionLevel: 'M' });
  const im = await Jimp.read(f);
  const r = jsQR(new Uint8ClampedArray(im.bitmap.data), im.bitmap.width, im.bitmap.height);
  console.log(t, r && r.data === u ? 'OK' : 'LOI');
}
