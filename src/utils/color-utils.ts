/**
 *
 * Calculates a fitting background color for the image, using average as a starting point
 *
 * @param canvas Working canvas for drawing and getting pixel data
 * @param imgEl Source of image data
 * @returns
 */
export function calculateBackgroundColor(canvas: HTMLCanvasElement, imgEl: HTMLImageElement) {
  const context = canvas.getContext('2d');

  if (context == null) {
    console.error('Canvas context is null');
    return 'transparent';
  }

  context.drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;

  /* How pixels are layed out doesn't matter for this calculation. Each pixel has 4 entries: RGBA (so width * height * 4 elements in the array-like structure)  */
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    sumR += imageData.data[i];
    sumG += imageData.data[i + 1];
    sumB += imageData.data[i + 2];
  }

  const totalPixels = canvas.width * canvas.height;

  const avgR = sumR / totalPixels;
  const avgG = sumG / totalPixels;
  const avgB = sumB / totalPixels;

  const bgColor = `rgba(${avgR}, ${avgG}, ${avgB}, 0.4)`;

  return bgColor;
}
