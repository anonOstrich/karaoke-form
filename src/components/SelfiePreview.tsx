import { useRef, useState, useTransition } from 'react';
import { calculateBackgroundColor } from '../utils/color-utils';

import './SelfiePreview.css';

interface PreviewElementProps {
  objectURL: string;
  removeImage: () => void;
}

export function PreviewElement(props: PreviewElementProps) {
  const { objectURL, removeImage } = props;

  const [display, setDisplay] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [transitioning, startTransition] = useTransition();

  const workingCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  return (
    <div className={'selfie-preview'} style={{ backgroundColor: transitioning ? 'transparent' : backgroundColor }}>
      <img
        alt="Uploaded selfie"
        src={objectURL}
        style={{ opacity: display ? 1 : 0, transition: 'opacity 0.5s' }}
        onLoad={(e) => {
          e.preventDefault();
          const imgEl = e.target as HTMLImageElement;
          setDisplay(true);
          startTransition(() => {
            setBackgroundColor(() => calculateBackgroundColor(workingCanvasRef.current, imgEl));
          });
        }}
      />

      <button
        className="close-button"
        onClick={(e) => {
          e.preventDefault();
          setDisplay(false);
          removeImage();
        }}
      >
        X
      </button>
    </div>
  );
}
