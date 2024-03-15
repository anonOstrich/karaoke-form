import { useRef, useState, useTransition } from 'react';
import { calculateBackgroundColor } from '../utils/color-utils';

import './SelfiePreview.css';

interface PreviewElementProps {
  objectURL: string;
  removeImage: () => void;
}

export function PreviewElement(props: PreviewElementProps) {
  const { objectURL, removeImage } = props;

  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [transitioning, startTransition] = useTransition();

  const workingCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  return (
    <div className="selfie-preview" style={{ backgroundColor: transitioning ? 'transparent' : backgroundColor }}>
      <img
        alt="Uploaded selfie"
        src={objectURL}
        onLoad={(e) => {
          e.preventDefault();
          const imgEl = e.target as HTMLImageElement;
          startTransition(() => {
            setBackgroundColor(() => calculateBackgroundColor(workingCanvasRef.current, imgEl));
          });
        }}
      />
      <button
        className="close-button"
        onClick={(e) => {
          e.preventDefault();
          removeImage();
        }}
      >
        X
      </button>
    </div>
  );
}
