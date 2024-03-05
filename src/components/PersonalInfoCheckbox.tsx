import './PersonalInfoCheckbox.css';

export default function PersonalInfoCheckbox() {
  return (
    <div className="checkbox-container">
      <label htmlFor="allow-personal-info">Sallin tietojeni tallentamisen karaokejärjestelmään.</label>
      <input type="checkbox" className="checkbox" name="allow-personal-info" id="allow-personal-info" />
    </div>
  );
}
