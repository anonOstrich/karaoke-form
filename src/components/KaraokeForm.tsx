import { useState, FormEvent as ReactFormEvent } from 'react';

import PitchSelection from './PitchSelection';
import PersonalInfoCheckbox from './PersonalInfoCheckbox';
import SongSelection from './SongSelection';
import Loader from './utils/Loader';
import SelfieInput from './SelfieInput';
import UsernameInput from './UsernameInput';

import { getAvailableSongs } from '../utils/test-data';
import { promiseWait } from '../utils/timers';

import { DEFAULT_PITCH, PITCH_OPTIONS, Pitch } from '../utils/scale';

import './KaraokeForm.css';

interface FormData {
  username: string;
  songId: string | null;
  imageObjectURL: string | null;
  pitch: Pitch;
  allowPersonalInfo: boolean;
}

export type FormDataKey = keyof FormData;

function formDataIsValid(data: FormData): boolean {
  const { songId, username } = data;
  const trimmed = username.trim();
  return trimmed.length > 0 && songId !== null;
}

export default function KaraokeForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    songId: null,
    imageObjectURL: null,
    pitch: DEFAULT_PITCH,
    allowPersonalInfo: false,
  });

  const [isIncomplete, setIsIncomplete] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: This is not super type safe.
  function setFormProperty(propertyName: FormDataKey, newValue: FormData[FormDataKey]) {
    const newFormData = { ...formData, [propertyName]: newValue };
    setFormData(newFormData);
    setIsIncomplete(!formDataIsValid(newFormData));
  }

  async function handleFormSubmit(e: ReactFormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Would need to convert the image object url for the backend here at latest
    setIsLoading(true);
    try {
      // Simulating a slow backend
      await promiseWait(5500);
    } catch (e: unknown) {
      // Handle possible errors with communicating with backend, or whatever is done on submission
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Ilmoittautumislomake</h1>
      <form onSubmit={handleFormSubmit}>
        <UsernameInput
          disabled={isLoading}
          setValue={(newVal: string) => setFormProperty('username', newVal)}
          value={formData.username}
        />

        <SelfieInput
          objectURL={formData.imageObjectURL}
          setObjectURL={(newBlob: string | null) => {
            setFormProperty('imageObjectURL', newBlob);
          }}
          disabled={isLoading}
        />

        <SongSelection
          chosenId={formData.songId}
          setChosenId={(newId: string) => {
            setFormProperty('songId', newId);
          }}
          songs={getAvailableSongs()}
          disabled={isLoading}
        />

        <PitchSelection
          options={PITCH_OPTIONS}
          selectedOption={formData.pitch}
          setProperty={(value: string) => {
            setFormProperty('pitch', value);
          }}
          disabled={isLoading}
        />

        <PersonalInfoCheckbox
          checked={formData.allowPersonalInfo}
          setChecked={(newVal: boolean) => {
            setFormProperty('allowPersonalInfo', newVal);
          }}
          disabled={isLoading}
        />

        {isLoading && <Loader />}

        <button className="submit-button align-left" type="submit" disabled={isIncomplete || isLoading}>
          Ilmoittaudu
        </button>
      </form>
    </div>
  );
}
