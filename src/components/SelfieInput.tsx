import { useState } from 'react';
import './SelfieInput.css';

/*
 * Approach inspired by MDN example: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 */
export default function SelfieInput() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const displayImage = imageSrc != null;

  return (
    <div className="selfie-container">
      <label htmlFor="selfie">
        <span>Kasvokuva</span>
        {/* Is this a faux pas? Inside the label it would open the file selection nicely... */}
        <div className="selfie-visible-input">+ Tuo kasvokuva</div>
      </label>

      <input
        type="file"
        id="selfie"
        name="selfie"
        accept="image/png,image/jpeg,image/jpg"
        capture="user"
        onChange={(e) => {
          console.log('change detected?');
          console.log(e);

          const fileInfos = e.target.files;
          if (fileInfos == null) return;

          const firstFile = fileInfos[0];
          console.log('file uploaded: ', firstFile);

          setImageSrc(URL.createObjectURL(firstFile));
        }}
      />

      <div className={`selfie-preview ${displayImage ? 'selfie-preview-display' : ''}`}>
        <img alt="Uploaded selfie" src={imageSrc || ''} />
        <span>Preview here?</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            alert('Should remove the file now...');
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
