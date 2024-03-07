import PitchSelection from './PitchSelection';
import PersonalInfoCheckbox from './PersonalInfoCheckbox';
import FormField from './FormField';

import './Lomake.css';
import SongSelection from './SongSelection';
import { useState, FormEvent as ReactFormEvent } from 'react';
import { getAvailableSongs } from '../utils/test-data';
import { promiseWait } from '../utils/timers';
import Loader from './Loader';
import SelfieInput from './SelfieInput';

const PITCH_OPTIONS = ['-2', '-1', '0', '+1', '+2'] as const;
type Pitch = (typeof PITCH_OPTIONS)[number];
const DEFAULT_PITCH = '0';

function formDataIsValid(data: FormData): boolean {
  const { songId, username } = data;
  const trimmed = username.trim();
  return trimmed.length > 0 && songId !== null;
}

interface FormData {
  username: string;
  songId: string | null;
  imageBlob: string | null;
  pitch: Pitch;
  allowPersonalInfo: boolean;
}

export type FormDataKey = keyof FormData;

export default function Lomake() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    songId: null,
    imageBlob: null,
    pitch: DEFAULT_PITCH,
    allowPersonalInfo: false,
  });

  const [incomplete, setIncomplete] = useState(true);

  const [loading, setLoading] = useState(false);

  /* TODO: this is NOT as typesafe as you'd expect! Choose to live with it or else do runtime checks? Although I'm pretty sure it could be done at compoile time as well... */
  function setFormProperty(propertyName: FormDataKey, newValue: FormData[FormDataKey]) {
    const newFormData = { ...formData, [propertyName]: newValue };
    setFormData(newFormData);

    setIncomplete(!formDataIsValid(newFormData));
  }

  async function handleFormSubmit(e: ReactFormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Would need to convert the image data url for the backend here at latest
    setLoading(true);
    try {
      // This delay could be read from environment variables, for instance? Right now just hardcoded in the middle of a long function...
      await promiseWait(5000);
    } catch (e: unknown) {
      // Handle possible errors with communicating with backend, or whatever is done on submission
    } finally {
      setLoading(false);
    }
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
            className="username-input"
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={(e) => setFormProperty('username', e.target.value)}
            required
            disabled={loading}
          />
        </FormField>

        <SelfieInput
          imageBlob={formData.imageBlob}
          setImageBlob={(newBlob: string | null) => {
            setFormProperty('imageBlob', newBlob);
          }}
          disabled={loading}
        />

        <SongSelection
          chosenId={formData.songId}
          setProperty={setFormProperty}
          songs={getAvailableSongs()}
          disabled={loading}
        />

        <PitchSelection
          options={PITCH_OPTIONS}
          selectedOption={formData.pitch}
          setProperty={(value: string) => {
            setFormProperty('pitch', value);
          }}
          disabled={loading}
        />

        <PersonalInfoCheckbox
          checked={formData.allowPersonalInfo}
          setChecked={(newVal: boolean) => {
            setFormProperty('allowPersonalInfo', newVal);
          }}
          disabled={loading}
        />

        <button className="submit-button align-left" type="submit" disabled={incomplete || loading}>
          Ilmoittaudu
        </button>

        {loading && <Loader />}
      </form>
    </div>
  );
}
