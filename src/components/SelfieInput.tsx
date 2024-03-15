import { ChangeEvent as ReactChangeEvent } from 'react';

import './SelfieInput.css';
import { PreviewElement } from './SelfiePreview';

// Would be better to have a useState setter as the setter, since it could also handle an updater function instead of just a value.
interface SelfieInputProps {
  objectURL: string | null;
  setObjectURL: (x: string | null) => void;
  disabled?: boolean;
}

export default function SelfieInput({ objectURL, setObjectURL, disabled }: SelfieInputProps) {
  const displayImage = objectURL != null;

  function displayImageFile(e: ReactChangeEvent<HTMLInputElement>) {
    const fileInfos = e.target.files;
    if (fileInfos == null) return;

    const firstFile = fileInfos[0];

    const newObjectURL = URL.createObjectURL(firstFile);

    if (objectURL != null) {
      URL.revokeObjectURL(objectURL);
    }
    setObjectURL(newObjectURL);
  }

  return (
    <div className="selfie-container">
      <label htmlFor="selfie" className="section-label">
        Kasvokuva
      </label>
      {displayImage && (
        <PreviewElement
          objectURL={objectURL ?? ''}
          removeImage={() => {
            setObjectURL(null);
          }}
        />
      )}

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
