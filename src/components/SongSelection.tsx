import FormField from './FormField';
import { FormDataKey } from './Lomake';

interface Song {
  id: string;
  title: string;
  artist: string;
}

const SONGS: Song[] = [
  { id: '1', title: 'Hieno kappale', artist: 'Hieno artisti' },
  { id: '2', title: 'Huono kappale', artist: 'Huono artisti' },
  { id: '3', title: 'Keskitason kappale', artist: 'Keskitason artisti' },
  { id: '4', title: 'Random Kappale', artist: 'Artisti' },
  { id: '5', title: 'Axu Kappale', artist: 'Artisti' },
  { id: '6', title: 'Juxu Kappale', artist: 'Bertisti' },
  { id: '7', title: 'Haaste Kappale', artist: 'Hieno artisti' },
  { id: '8', title: 'Iso Kappale', artist: 'Artisti' },
  { id: '9', title: 'Raimo Kappale', artist: 'Hieno artisti' },
  { id: '10', title: 'Jarmo Kappale', artist: 'Artisti' },
];

interface SongSelectionProps {
  chosenId: string | null;
  setProperty: (propertyName: FormDataKey, newValue: string) => void;
}

export default function SongSelection(props: SongSelectionProps) {
  const { chosenId, setProperty } = props;

  return (
    <FormField>
      <label htmlFor="song" className="required">
        Biisi
      </label>
      <select
        name="song"
        id="song"
        value={chosenId ?? undefined}
        onChange={(e) => setProperty('songId', e.target.value)}
      >
        {/* Placeholder for the select */}
        <option value="" hidden>
          Valitse biisi
        </option>

        {SONGS.map((song) => (
          <option key={song.id} value={song.id}>
            {song.title} - {song.artist}
          </option>
        ))}
      </select>
    </FormField>
  );
}
