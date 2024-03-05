import PitchSelection from './PitchSelection';
import PersonalInfoCheckbox from './PersonalInfoCheckbox';
import FormField from './FormField';

import './Lomake.css';
import SongSelection from './SongSelection';
import { useState, FormEvent as ReactFormEvent } from 'react';
import { getAvailableSongs } from '../utils/test-data';

const PITCH_OPTIONS = ['-2', '-1', '0', '+1', '+2'] as const;
type Pitch = (typeof PITCH_OPTIONS)[number];
const DEFAULT_PITCH = '0';

interface FormData {
  username: string;
  songId: string | null;
  pitch: Pitch;
  allowPersonalInfo: boolean;
}

export type FormDataKey = keyof FormData;

export default function Lomake() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    songId: null,
    pitch: DEFAULT_PITCH,
    allowPersonalInfo: false,
  });

  /* TODO: this is NOT as typesafe as you'd expect! Choose to live with it or else do runtime checks? Although I'm pretty sure it could be done at compoile time as well... */
  function setFormProperty(propertyName: FormDataKey, newValue: FormData[FormDataKey]) {
    setFormData({ ...formData, [propertyName]: newValue });
  }

  function handleFormSubmit(e: ReactFormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
  }

  return (
    <div className="form-container">
      {/* Idea: choose the heading level dynamically based on the prop?? How could I know what the user has around the component */}
      <h1 className="form-title">Ilmoittautumislomake</h1>
      <form onSubmit={handleFormSubmit}>
        <FormField>
          <label htmlFor="username" className="required">
            Nimi tai nimimerkki
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={(e) => setFormProperty('username', e.target.value)}
            required
          />
        </FormField>

        <SongSelection chosenId={formData.songId} setProperty={setFormProperty} songs={getAvailableSongs()} />

        <PitchSelection
          options={PITCH_OPTIONS}
          selectedOption={formData.pitch}
          setProperty={(value: string) => {
            setFormProperty('pitch', value);
          }}
        />

        <PersonalInfoCheckbox
          checked={formData.allowPersonalInfo}
          setChecked={(newVal: boolean) => {
            setFormProperty('allowPersonalInfo', newVal);
          }}
        />

        <button className="submit-button align-left" type="submit">
          Ilmoittaudu
        </button>
      </form>
    </div>
  );
}
