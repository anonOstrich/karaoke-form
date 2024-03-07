/**
 *
 * Calculates a fitting background color for the image, using average as a starting point
 *
 * @param canvas Working canvas for drawing and getting pixel data
 * @param imgEl Source of image data
 * @returns
 */
export function calculateBackgroundColor(canvas: HTMLCanvasElement, imgEl: HTMLImageElement) {
  const context = canvas.getContext('2d', { willReadFrequently: true });

  if (context == null) {
    console.error('Canvas context is null');
    return 'transparent';
  }

  context.drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const pixelData = context.getImageData(x, y, 1, 1).data;
      sumR += pixelData[0];
      sumG += pixelData[1];
      sumB += pixelData[2];
    }
  }

  const totalPixels = canvas.width * canvas.height;

  const avgR = sumR / totalPixels;
  const avgG = sumG / totalPixels;
  const avgB = sumB / totalPixels;

  const bgColor = `rgba(${avgR}, ${avgG}, ${avgB}, 0.4)`;

  return bgColor;
}
