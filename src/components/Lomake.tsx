import PitchSelection from './PitchSelection';
import PersonalInfoCheckbox from './PersonalInfoCheckbox';
import FormField from './FormField';

import './Lomake.css';

export default function Lomake() {
  return (
    <>
      <h2>Ilmoittautumislomake</h2>
      <form>
        <FormField>
          <label htmlFor="username" className="required">
            Nimi tai nimimerkki
          </label>
          <input type="text" name="username" id="username" required />
        </FormField>

        <FormField>
          <label htmlFor="song" className="required">
            Biisi
          </label>
          <select name="song" id="song">
            <option value="" hidden disabled>
              Valitse biisi
            </option>
            <option value="1">Hieno kappale</option>
            <option value="2">Huono kappale</option>
          </select>
        </FormField>

        <PitchSelection options={['-1', '0', '+1']} defaultOption={'0'} />

        <PersonalInfoCheckbox />

        <button className="submit-button align-left" type="submit">
          Ilmoittaudu
        </button>
      </form>
    </>
  );
}
