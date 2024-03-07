export interface Song {
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
  { id: '11', title: 'Hieno kappale', artist: 'Hieno artisti' },
  { id: '12', title: 'Huono kappale', artist: 'Huono artisti' },
  { id: '13', title: 'Keskitason kappale', artist: 'Keskitason artisti' },
  { id: '14', title: 'Random Kappale', artist: 'Artisti' },
  { id: '15', title: 'Axu Kappale', artist: 'Artisti' },
  { id: '16', title: 'Juxu Kappale', artist: 'Bertisti' },
  { id: '17', title: 'Haaste Kappale', artist: 'Hieno artisti' },
  { id: '188', title: 'Iso Kappale', artist: 'Artisti' },
  { id: '19', title: 'Raimo Kappale', artist: 'Hieno artisti' },
  { id: '20', title: 'Jarmo Kappale', artist: 'Artisti' },
];

export function getAvailableSongs() {
  return [...SONGS];
}
