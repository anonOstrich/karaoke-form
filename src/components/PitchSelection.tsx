import './PitchSelection.css';

// Might be an easier option? But what I want: a tsc error if the defaultOption is not possible...
interface GenericPitchSelectionProps<R extends string, T extends readonly R[]> {
  options: T;
  selectedOption: T[number];
  setProperty: (value: T[number]) => void;
}

export default function PitchSelection<R extends string, T extends readonly R[]>(
  props: GenericPitchSelectionProps<R, T>,
) {
  const { options, selectedOption, setProperty } = props;

  // Initially: choose with JS. Could be done with pure html / css, too.

  // Do the tests in one function?
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
    <fieldset>
      <legend className="required">Sävellaji</legend>
      <div className="radio-buttons-parent">
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

interface PitchRadioOptionProps {
  option: string;
  selected: boolean;
  callback: () => void;
}

function PitchRadioOption({ option, callback, selected }: PitchRadioOptionProps) {
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
