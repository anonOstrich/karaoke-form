import { calculateBackgroundColor } from '../utils/color-utils';
import { ChangeEvent as ReactChangeEvent, useRef, useState } from 'react';

import './SelfieInput.css';

interface SelfieInputProps {
  imageBlob: string | null;
  setImageBlob: (newBlob: string | null) => void;
}

/*
 * Approach inspired by MDN example: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 */
export default function SelfieInput({ imageBlob, setImageBlob }: SelfieInputProps) {
  const [displayImage, setDisplayImage] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('gray');

  const workingCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

  function resetImage() {
    setImageBlob(null);
    setDisplayImage(false);
  }

  function displayImageFile(e: ReactChangeEvent<HTMLInputElement>) {
    const fileInfos = e.target.files;
    if (fileInfos == null) return;

    const firstFile = fileInfos[0];

    const blob = URL.createObjectURL(firstFile);
    setImageBlob(blob);
  }

  const previewElement = (
    <div className={`selfie-preview ${displayImage ? 'selfie-preview-display' : ''}`} style={{ backgroundColor }}>
      <img
        alt="Uploaded selfie"
        src={imageBlob ?? ''}
        onLoad={(e) => {
          setDisplayImage(true);
          console.log(e.target);
          const imgEl = e.target as HTMLImageElement;

          const bgColor = calculateBackgroundColor(workingCanvasRef.current, imgEl, imageBlob);

          setBackgroundColor(bgColor);
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          resetImage();
        }}
      >
        X
      </button>
    </div>
  );

  return (
    <div className="selfie-container">
      <label htmlFor="selfie">Kasvokuva</label>
      {previewElement}
      <input
        type="file"
        id="selfie"
        name="selfie"
        accept="image/png,image/jpeg,image/jpg"
        capture="user"
        onChange={displayImageFile}
      />
      <label className="selfie-label" htmlFor="selfie">
        <div className="selfie-visible-input">{displayImage ? '+ Vaihda kasvokuva' : '+ Tuo kasvokuva'}</div>
      </label>
    </div>
  );
}
