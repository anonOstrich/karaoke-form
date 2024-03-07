export function calculateBackgroundColor(canvas: HTMLCanvasElement, imgEl: HTMLImageElement, imageBlob: string | null) {
  if (imageBlob == null) return 'transparent';

  const context = canvas.getContext('2d', { willReadFrequently: true });
  context?.drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const pixelData = context!.getImageData(x, y, 1, 1).data;
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
