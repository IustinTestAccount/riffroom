export type GenreName =
  | 'folk metal'
  | 'industrial metal'
  | 'symphonic death metal'
  | 'alternative metal'
  | 'progressive metal'
  | 'nu metal'
  | 'gothic metal'
  | 'rock';

export type LibraryStatus = 'rated' | 'listening' | 'planned';

export interface ImageCredit {
  label: string;
  sourceName: string;
  sourceUrl: string;
  license: string;
  imageUrl: string;
  notes?: string;
}

export interface Artist {
  id: string;
  name: string;
  country: string;
  formed: number;
  genres: GenreName[];
  tone: string;
  summary: string;
  imageUrl: string;
  credit: ImageCredit;
  monthlyListeners: string;
}

export interface Album {
  id: string;
  artistId: string;
  title: string;
  year: number;
  genres: GenreName[];
  status: LibraryStatus;
  userRating?: number;
  communityRating: number;
  coverUrl: string;
  credit: ImageCredit;
  capsule: string;
}

export interface Rating {
  albumId: string;
  score: number;
  date: string;
  note: string;
}

export interface FriendActivity {
  id: string;
  friendName: string;
  action: 'rated' | 'added' | 'reviewed' | 'recommended';
  albumId: string;
  score?: number;
  timestamp: string;
  note: string;
}

export interface GenreCard {
  name: GenreName;
  description: string;
  accent: 'red' | 'violet' | 'amber' | 'steel';
}

export interface Recommendation {
  album: Album;
  score: number;
  reason: string;
}

export interface LibraryFilter {
  status: 'all' | LibraryStatus;
  genre: 'all' | GenreName;
  query?: string;
}
