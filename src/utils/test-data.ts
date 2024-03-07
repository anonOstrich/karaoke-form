export interface Song {
  id: string;
  title: string;
  artist: string;
}

const SONGS: Song[] = [
  { id: '1', title: 'The Winner Takes It All', artist: 'ABBA' },
  { id: '2', title: 'Mökkitie', artist: 'Arttu Wiskari' },
  { id: '3', title: 'Yesterday', artist: 'The Beatles' },
  { id: '4', title: 'My Heart Will Go On', artist: 'Céline Dion' },
  { id: '5', title: 'Tahroja paperilla', artist: 'Eppu Normaali' },
  { id: '6', title: 'Lumi teki enkelin eteiseen', artist: 'Hector' },
  { id: '8', title: 'Paratiisi', artist: 'Rauli Badding Somerjoki' },
  { id: '9', title: 'Eye of the Tiger', artist: 'Survivor' },
  { id: '10', title: 'Sata salamaa', artist: 'Virve Rosti' },
];

// Should place some obstacles for modifying the original list from the modules importing the songs
export function getAvailableSongs() {
  return [...SONGS];
}
