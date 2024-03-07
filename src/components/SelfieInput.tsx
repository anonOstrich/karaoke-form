import { ChangeEvent as ReactChangeEvent, useState } from 'react';
import './SelfieInput.css';

/*
 * Approach inspired by MDN example: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 */
export default function SelfieInput() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [displayImage, setDisplayImage] = useState(false);

  function resetImage() {
    setImageSrc(null);
    setDisplayImage(false);
  }

  function displayImageFile(e: ReactChangeEvent<HTMLInputElement>) {
    const fileInfos = e.target.files;
    if (fileInfos == null) return;

    const firstFile = fileInfos[0];

    const blob = URL.createObjectURL(firstFile);
    setImageSrc(blob);
  }

  const previewElement = (
    <div className={`selfie-preview ${displayImage ? 'selfie-preview-display' : ''}`}>
      <img
        alt="Uploaded selfie"
        src={imageSrc ?? ''}
        onLoad={() => {
          setDisplayImage(true);
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
      {previewElement}
      <label htmlFor="selfie">
        <span>Kasvokuva</span>
        <div className="selfie-visible-input">{displayImage ? '+ Vaihda kasvokuva' : '+ Tuo kasvokuva'}</div>
      </label>

      <input
        type="file"
        id="selfie"
        name="selfie"
        accept="image/png,image/jpeg,image/jpg"
        capture="user"
        onChange={displayImageFile}
      />
    </div>
  );
}
