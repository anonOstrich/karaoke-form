import { useState } from 'react';
import FormField from './FormField';
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

  // Do the tests in one function?
  if (defaultOption != null && !options.includes(defaultOption)) {
    throw new Error(`Default option ${defaultOption} not in options ${options}`);
  }

  if (options.length <= 0) {
    throw new Error('Must provide at least one option');
  }

  const [pitch, setPitch] = useState(defaultOption ?? options[0]);

  return (
    <FormField>
      <label className="required" htmlFor="pitch">
        Sävellaji
      </label>
      <ul id="pitch">
        {
          // elements not rearranged, so idx is suitable for key
          options.map((option, idx) => (
            <li key={idx}>
              <PitchOption
                isSelected={option === pitch}
                handleSelection={(e) => {
                  // Browser will otherwise comment on the validation of other fields
                  e.preventDefault();
                  setPitch(option);
                }}
              >
                {option}
              </PitchOption>
            </li>
          ))
        }
      </ul>
    </FormField>
  );
}

type ButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

interface PitchOptionProps {
  children: React.ReactNode;
  isSelected: boolean;
  handleSelection: ButtonClickHandler;
}

function PitchOption({ children, isSelected, handleSelection }: PitchOptionProps) {
  return (
    <button className={`selection-button ${isSelected ? 'selected' : ''}`} onClick={handleSelection}>
      {children}
    </button>
  );
}
