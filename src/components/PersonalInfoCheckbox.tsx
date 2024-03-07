import CheckSolid from '../assets/CheckSolid';

import './PersonalInfoCheckbox.css';

interface PersonalInfoCheckboxProps {
  checked: boolean;
  setChecked: (newVal: boolean) => void;
  disabled?: boolean;
}

/* 
  Approach: hide the default checkbox and apply styles to the label instead. Allows for more control over the visual look.
*/
export default function PersonalInfoCheckbox({ checked, setChecked, disabled }: PersonalInfoCheckboxProps) {
  return (
    <>
      <label htmlFor="allow-personal-info" className="checkbox-container">
        Sallin tietojeni tallentamisen karaokejärjestelmään.
        <input
          type="checkbox"
          className="checkbox"
          name="allow-personal-info"
          id="allow-personal-info"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
          disabled={disabled}
        />
        <div className="icon-container">
          <CheckSolid />
        </div>
      </label>
    </>
  );
}
