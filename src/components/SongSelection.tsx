import FormField from './FormField';
import { FormDataKey } from './Lomake';
import { Song } from '../utils/test-data';

import './SongSelection.css';

interface SongSelectionProps {
  chosenId: string | null;
  setProperty: (propertyName: FormDataKey, newValue: string) => void;
  songs: Song[];
  disabled?: boolean;
}

// Could create different functions for sorting
function titleAlphabeticalSorter(a: Song, b: Song) {
  const aTitle = a.title.toLocaleLowerCase();
  const bTitle = b.title.toLocaleLowerCase();
  return aTitle.localeCompare(bTitle);
}

export default function SongSelection(props: SongSelectionProps) {
  const { chosenId, setProperty, songs, disabled } = props;

  const sortedSongs = songs.sort(titleAlphabeticalSorter);

  return (
    <FormField>
      <label htmlFor="song" className="required">
        Biisi
      </label>
      <div className="select-container">
        <select
          name="song"
          id="song"
          value={chosenId ?? undefined}
          onChange={(e) => setProperty('songId', e.target.value)}
          required
          disabled={disabled}
        >
          <option value="" hidden>
            Valitse alta
          </option>

          {sortedSongs.map((song) => (
            <option key={song.id} value={song.id}>
              {song.title} - {song.artist}
            </option>
          ))}
        </select>
      </div>
    </FormField>
  );
}
