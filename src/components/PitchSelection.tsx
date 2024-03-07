import PitchRadioOption from './PitchRadioOption';
import './PitchSelection.css';

/* 
  Generics to help ensure that the selected option has the same type as the elements of the options array.
*/
interface PitchSelectionProps<R extends string, T extends readonly R[]> {
  options: T;
  selectedOption: T[number];
  setProperty: (value: T[number]) => void;
  disabled?: boolean;
}

export default function PitchSelection<R extends string, T extends readonly R[]>(props: PitchSelectionProps<R, T>) {
  const { options, selectedOption, setProperty, disabled } = props;

  if (selectedOption != null && !options.includes(selectedOption)) {
    throw new Error(`Default option ${selectedOption} not in options ${options}`);
  }

  if (options.length <= 0) {
    throw new Error('Must provide at least one option');
  }

  function createOptionChangeHandler(option: R) {
    return function () {
      setProperty(option);
    };
  }

  return (
    <fieldset disabled={disabled}>
      <legend className="required">Sävellaji</legend>
      <div
        className="radio-buttons-parent"
        style={{
          gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        }}
      >
        {options.map((option) => {
          return (
            <PitchRadioOption
              key={option}
              option={option}
              selected={option === selectedOption}
              callback={createOptionChangeHandler(option)}
            />
          );
        })}
      </div>
    </fieldset>
  );
}
