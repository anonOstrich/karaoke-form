import { calculateBackgroundColor } from '../utils/color-utils';
import { ChangeEvent as ReactChangeEvent, useRef, useState } from 'react';

import './SelfieInput.css';

interface SelfieInputProps {
  objectURL: string | null;
  setObjectURL: (newBlob: string | null) => void;
  disabled?: boolean;
}

export default function SelfieInput({ objectURL, setObjectURL, disabled }: SelfieInputProps) {
  const [displayImage, setDisplayImage] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('gray');

  // Helper canvas for calculating color information
  const workingCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

  function resetImage() {
    setObjectURL(null);
    setDisplayImage(false);
  }

  function displayImageFile(e: ReactChangeEvent<HTMLInputElement>) {
    const fileInfos = e.target.files;
    if (fileInfos == null) return;

    const firstFile = fileInfos[0];

    const blob = URL.createObjectURL(firstFile);
    setObjectURL(blob);
  }

  const PreviewElement = (
    <div className={`selfie-preview ${displayImage ? 'selfie-preview-display' : ''}`} style={{ backgroundColor }}>
      <img
        alt="Uploaded selfie"
        src={objectURL ?? ''}
        onLoad={(e) => {
          setDisplayImage(true);
          const imgEl = e.target as HTMLImageElement;

          if (objectURL != null) {
            const bgColor = calculateBackgroundColor(workingCanvasRef.current, imgEl);
            setBackgroundColor(bgColor);
          }
        }}
      />
      <button
        className="close-button"
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
      {PreviewElement}
      <label htmlFor="selfie" id="kasvokuva-label">
        Kasvokuva
      </label>

      <input
        type="file"
        id="selfie"
        name="selfie"
        accept="image/png,image/jpeg,image/jpg"
        capture="user"
        onChange={displayImageFile}
        disabled={disabled}
      />
      <label className="selfie-label" htmlFor="selfie">
        <div className="selfie-visible-input">{displayImage ? '+ Vaihda kasvokuva' : '+ Tuo kasvokuva'}</div>
      </label>
    </div>
  );
}
