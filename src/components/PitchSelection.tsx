import { useState } from 'react';
import './PitchSelection.css';

// Might be an easier option? But what I want: a tsc error if the defaultOption is not possible...
interface GenericPitchSelectionProps<R extends string, T extends readonly R[]> {
  options: T;
  defaultOption: T[number];
}

export default function PitchSelection<R extends string, T extends readonly R[]>(
  props: GenericPitchSelectionProps<R, T>,
) {
  const { options, defaultOption } = props;

  // Initially: choose with JS. Could be done with pure html / css, too.

  // Do the tests in one function?
  if (defaultOption != null && !options.includes(defaultOption)) {
    throw new Error(`Default option ${defaultOption} not in options ${options}`);
  }

  if (options.length <= 0) {
    throw new Error('Must provide at least one option');
  }

  const [selectedOption, setSelectedOption] = useState(defaultOption);

  function createOptionChangeHandler(option: R) {
    return function () {
      setSelectedOption(option);
    };
  }

  return (
    <fieldset>
      <legend className="required" style={{ display: 'block' }}>
        Sävellaji
      </legend>
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
      <input type="radio" name="pitch" value={option} id={`pitch${option}`} onChange={callback} />
      <label htmlFor={`pitch${option}`}>{option}</label>
    </button>
  );
}
