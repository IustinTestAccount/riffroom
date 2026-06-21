import type { Album, Artist, FriendActivity, GenreCard, ImageCredit, Rating } from './types';

const commonsBase = 'https://commons.wikimedia.org/wiki/Special:FilePath/';
const coverArtBase = 'https://coverartarchive.org/release/';

const artistCredits: Record<string, ImageCredit> = {
  eluveitie: {
    label: 'Eluveitie live at Barba Negra, Budapest',
    sourceName: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Eluveitie.jpg',
    license: 'CC BY-SA 4.0, author Elekes Andor',
    imageUrl: `${commonsBase}Eluveitie.jpg?width=900`,
    notes: 'Remote image URL is isolated in sample data and can be replaced later.'
  },
  rammstein: {
    label: 'Rammstein performance in Nijmegen, 2022',
    sourceName: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rammstein_Nijmegen_2022_(1).jpg',
    license: 'CC BY-SA 4.0, author Ogidya',
    imageUrl: `${commonsBase}Rammstein%20Nijmegen%202022%20%281%29.jpg?width=900`,
    notes: 'Remote image URL is isolated in sample data and can be replaced later.'
  },
  septicflesh: {
    label: 'Septicflesh at B90, Gdansk, 2022',
    sourceName: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Septicflesh,_B90,_Gda%C5%84sk,_November_8_2022_19.jpg',
    license: 'CC BY 4.0, author Wojciech Pedzich',
    imageUrl: `${commonsBase}Septicflesh%2C%20B90%2C%20Gda%C5%84sk%2C%20November%208%202022%2019.jpg?width=900`,
    notes: 'Remote image URL is isolated in sample data and can be replaced later.'
  },
  soad: {
    label: 'System of a Down at Pinkpop 2017',
    sourceName: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pinkpop_2017_-_System_of_a_Down.jpg',
    license: 'CC BY-SA 4.0, author Ben Houdijk',
    imageUrl: `${commonsBase}Pinkpop%202017%20-%20System%20of%20a%20Down.jpg?width=900`,
    notes: 'Remote image URL is isolated in sample data and can be replaced later.'
  }
};

function coverCredit(title: string, releaseId: string): ImageCredit {
  return {
    label: `${title} cover art`,
    sourceName: 'Cover Art Archive / MusicBrainz',
    sourceUrl: `https://musicbrainz.org/release/${releaseId}/cover-art`,
    license: 'Cover Art Archive metadata; verify label artwork rights before commercial use',
    imageUrl: `${coverArtBase}${releaseId}/front-500`,
    notes: 'The URL is generated from a MusicBrainz release MBID and can be replaced in one data field.'
  };
}

export const artists: Artist[] = [
  {
    id: 'eluveitie',
    name: 'Eluveitie',
    country: 'Switzerland',
    formed: 2002,
    genres: ['folk metal', 'progressive metal'],
    tone: 'ancient folk pressure, harsh melodic drive',
    summary: 'Folk instruments, Gaulish textures, and melodic death metal pacing for listeners who want history inside heavy records.',
    imageUrl: artistCredits.eluveitie.imageUrl,
    credit: artistCredits.eluveitie,
    monthlyListeners: '1.1M signal'
  },
  {
    id: 'rammstein',
    name: 'Rammstein',
    country: 'Germany',
    formed: 1994,
    genres: ['industrial metal', 'rock'],
    tone: 'mechanical riffs, pyrotechnic scale, severe hooks',
    summary: 'Industrial precision with theatrical weight, built for compact recommendations around rhythm, spectacle, and repetition.',
    imageUrl: artistCredits.rammstein.imageUrl,
    credit: artistCredits.rammstein,
    monthlyListeners: '11.6M signal'
  },
  {
    id: 'septicflesh',
    name: 'Septicflesh',
    country: 'Greece',
    formed: 1990,
    genres: ['symphonic death metal', 'gothic metal'],
    tone: 'orchestral threat, mythic density, death metal mass',
    summary: 'Symphonic death metal with dark classical scale, suited for listeners who like cinematic heaviness without losing aggression.',
    imageUrl: artistCredits.septicflesh.imageUrl,
    credit: artistCredits.septicflesh,
    monthlyListeners: '320K signal'
  },
  {
    id: 'soad',
    name: 'System of a Down',
    country: 'United States',
    formed: 1994,
    genres: ['alternative metal', 'nu metal'],
    tone: 'erratic turns, political bite, nervous rhythm',
    summary: 'Fast switches between melody, blast pressure, and satirical anger, useful for high-contrast album discovery.',
    imageUrl: artistCredits.soad.imageUrl,
    credit: artistCredits.soad,
    monthlyListeners: '18.4M signal'
  }
];

export const albums: Album[] = [
  {
    id: 'origins',
    artistId: 'eluveitie',
    title: 'Origins',
    year: 2014,
    genres: ['folk metal', 'progressive metal'],
    status: 'rated',
    userRating: 8.8,
    communityRating: 8.1,
    coverUrl: coverCredit('Origins', 'd44c860a-e657-4f82-86ac-19a72def7712').imageUrl,
    credit: coverCredit('Origins', 'd44c860a-e657-4f82-86ac-19a72def7712'),
    capsule: 'Dense folk-metal storytelling with an old-world frame and direct melodic pressure.'
  },
  {
    id: 'everything-remains',
    artistId: 'eluveitie',
    title: 'Everything Remains as It Never Was',
    year: 2010,
    genres: ['folk metal'],
    status: 'listening',
    communityRating: 8.0,
    coverUrl: coverCredit('Everything Remains as It Never Was', '80bd89fb-0e6c-44fe-b003-413eefc8ac2f').imageUrl,
    credit: coverCredit('Everything Remains as It Never Was', '80bd89fb-0e6c-44fe-b003-413eefc8ac2f'),
    capsule: 'A cleaner entry point into Eluveitie with strong folk hooks and compact track flow.'
  },
  {
    id: 'evocation-ii',
    artistId: 'eluveitie',
    title: 'Evocation II - Pantheon',
    year: 2017,
    genres: ['folk metal'],
    status: 'planned',
    communityRating: 7.4,
    coverUrl: coverCredit('Evocation II - Pantheon', 'f82bfd3b-d79e-45d4-b81b-97ae6b88c72d').imageUrl,
    credit: coverCredit('Evocation II - Pantheon', 'f82bfd3b-d79e-45d4-b81b-97ae6b88c72d'),
    capsule: 'A more acoustic and ritual-leaning detour for folk-first sessions.'
  },
  {
    id: 'mutter',
    artistId: 'rammstein',
    title: 'Mutter',
    year: 2001,
    genres: ['industrial metal'],
    status: 'rated',
    userRating: 9.4,
    communityRating: 9.0,
    coverUrl: coverCredit('Mutter', '9da5a7f9-bb2b-3421-bf82-29b4f124c6b3').imageUrl,
    credit: coverCredit('Mutter', '9da5a7f9-bb2b-3421-bf82-29b4f124c6b3'),
    capsule: 'Cold hooks, clean machinery, and enormous choruses without wasting space.'
  },
  {
    id: 'rosenrot',
    artistId: 'rammstein',
    title: 'Rosenrot',
    year: 2005,
    genres: ['industrial metal', 'rock'],
    status: 'planned',
    communityRating: 7.5,
    coverUrl: coverCredit('Rosenrot', '15b602a8-07d0-43f6-a0bd-10cde8b3a0b1').imageUrl,
    credit: coverCredit('Rosenrot', '15b602a8-07d0-43f6-a0bd-10cde8b3a0b1'),
    capsule: 'Slower, colder, and more theatrical than the obvious entry points.'
  },
  {
    id: 'liebe-ist',
    artistId: 'rammstein',
    title: 'Liebe ist fur alle da',
    year: 2009,
    genres: ['industrial metal'],
    status: 'listening',
    communityRating: 7.8,
    coverUrl: coverCredit('Liebe ist fur alle da', '103e5768-6d87-37e3-aeda-996f83d9cedb').imageUrl,
    credit: coverCredit('Liebe ist fur alle da', '103e5768-6d87-37e3-aeda-996f83d9cedb'),
    capsule: 'A sharp industrial set with heavier edges and a more abrasive surface.'
  },
  {
    id: 'a-fallen-temple',
    artistId: 'septicflesh',
    title: 'A Fallen Temple',
    year: 1998,
    genres: ['gothic metal', 'symphonic death metal'],
    status: 'rated',
    userRating: 8.1,
    communityRating: 7.8,
    coverUrl: coverCredit('A Fallen Temple', '01b1b7e6-6505-4100-ae3e-ffcdefc325fa').imageUrl,
    credit: coverCredit('A Fallen Temple', '01b1b7e6-6505-4100-ae3e-ffcdefc325fa'),
    capsule: 'Early gothic atmosphere before the fully cinematic later era took over.'
  },
  {
    id: 'titan',
    artistId: 'septicflesh',
    title: 'Titan',
    year: 2014,
    genres: ['symphonic death metal', 'gothic metal'],
    status: 'planned',
    communityRating: 8.5,
    coverUrl: coverCredit('Titan', '6c160968-3ea8-4ec0-8e2c-80e07f51987f').imageUrl,
    credit: coverCredit('Titan', '6c160968-3ea8-4ec0-8e2c-80e07f51987f'),
    capsule: 'A larger orchestral death metal record with mythic weight and direct force.'
  },
  {
    id: 'toxicity',
    artistId: 'soad',
    title: 'Toxicity',
    year: 2001,
    genres: ['alternative metal', 'nu metal'],
    status: 'rated',
    userRating: 9.6,
    communityRating: 9.1,
    coverUrl: coverCredit('Toxicity', '589cebcb-a7ea-3c76-b3b4-c7e77e38887e').imageUrl,
    credit: coverCredit('Toxicity', '589cebcb-a7ea-3c76-b3b4-c7e77e38887e'),
    capsule: 'Peak volatility: hooks, chaos, politics, and hard turns that still feel precise.'
  },
  {
    id: 'mezmerize',
    artistId: 'soad',
    title: 'Mezmerize',
    year: 2005,
    genres: ['alternative metal'],
    status: 'listening',
    communityRating: 8.4,
    coverUrl: coverCredit('Mezmerize', '62c28f7f-e8e2-4a94-b2bb-e0c77b3364af').imageUrl,
    credit: coverCredit('Mezmerize', '62c28f7f-e8e2-4a94-b2bb-e0c77b3364af'),
    capsule: 'Shorter songs, bright edges, and sudden switches that keep the whole record nervous.'
  },
  {
    id: 'hypnotize',
    artistId: 'soad',
    title: 'Hypnotize',
    year: 2005,
    genres: ['alternative metal', 'rock'],
    status: 'planned',
    communityRating: 8.2,
    coverUrl: coverCredit('Hypnotize', 'c5c36cb2-d409-4c97-ae21-9f331a895566').imageUrl,
    credit: coverCredit('Hypnotize', 'c5c36cb2-d409-4c97-ae21-9f331a895566'),
    capsule: 'The second half of the 2005 pair, more reflective but still unstable.'
  }
];

export const ratings: Rating[] = [
  { albumId: 'origins', score: 8.8, date: '2026-06-01', note: 'Best when the folk lines feel aggressive rather than decorative.' },
  { albumId: 'mutter', score: 9.4, date: '2026-06-02', note: 'Industrial pacing with almost no wasted movement.' },
  { albumId: 'a-fallen-temple', score: 8.1, date: '2026-06-05', note: 'Older production, but the atmosphere lands.' },
  { albumId: 'toxicity', score: 9.6, date: '2026-06-08', note: 'Chaotic without becoming loose.' },
  { albumId: 'mezmerize', score: 8.3, date: '2026-06-13', note: 'Still in rotation; concise and strange.' }
];

export const genreCards: GenreCard[] = [
  {
    name: 'folk metal',
    description: 'Ancient motifs, harsh guitars, and traditional instruments kept in the foreground.',
    accent: 'amber'
  },
  {
    name: 'industrial metal',
    description: 'Mechanical riffs, strict repetition, cold grooves, and theatrical force.',
    accent: 'red'
  },
  {
    name: 'symphonic death metal',
    description: 'Orchestral scale around death metal weight and dark ritual pacing.',
    accent: 'violet'
  },
  {
    name: 'alternative metal',
    description: 'Abrupt structures, political bite, and high-contrast vocal shifts.',
    accent: 'steel'
  }
];

export const friendActivity: FriendActivity[] = [
  {
    id: 'activity-01',
    friendName: 'Victor Stone',
    action: 'rated',
    albumId: 'mutter',
    score: 9.2,
    timestamp: '2 hours ago',
    note: 'Marked the production as the main reason to revisit it.'
  },
  {
    id: 'activity-02',
    friendName: 'Ana Vale',
    action: 'recommended',
    albumId: 'titan',
    timestamp: 'Yesterday',
    note: 'Suggested it after a Septicflesh session with orchestral tags enabled.'
  },
  {
    id: 'activity-03',
    friendName: 'Darius North',
    action: 'added',
    albumId: 'hypnotize',
    timestamp: '3 days ago',
    note: 'Added it to a compact road playlist for high-contrast tracks.'
  },
  {
    id: 'activity-04',
    friendName: 'Mina Cross',
    action: 'reviewed',
    albumId: 'everything-remains',
    timestamp: '5 days ago',
    note: 'Called it a cleaner gateway into folk metal without losing density.'
  }
];

export const imageCredits: ImageCredit[] = [
  ...Object.values(artistCredits),
  ...albums.map((album) => album.credit)
];
