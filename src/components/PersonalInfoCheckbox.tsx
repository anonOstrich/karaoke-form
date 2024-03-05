import './PersonalInfoCheckbox.css';

interface PersonalInfoCheckboxProps {
  checked: boolean;
  setChecked: (newVal: boolean) => void;
}

export default function PersonalInfoCheckbox({ checked, setChecked }: PersonalInfoCheckboxProps) {
  return (
    <div className="checkbox-container">
      <label htmlFor="allow-personal-info">Sallin tietojeni tallentamisen karaokejärjestelmään.</label>
      <input
        type="checkbox"
        className="checkbox"
        name="allow-personal-info"
        id="allow-personal-info"
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
      />
    </div>
  );
}
