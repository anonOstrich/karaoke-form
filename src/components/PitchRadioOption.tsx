import './PitchRadioOption.css';

interface PitchRadioOptionProps {
  option: string;
  selected: boolean;
  callback: () => void;
}

export default function PitchRadioOption({ option, callback, selected }: PitchRadioOptionProps) {
  return (
    <button
      tabIndex={-1}
      className={`radio-button-container ${selected ? 'radio-button-container-selected' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        callback();
      }}
    >
      <input type="radio" name="pitch" value={option} id={`pitch${option}`} onChange={callback} checked={selected} />
      <label htmlFor={`pitch${option}`}>{option}</label>
    </button>
  );
}
