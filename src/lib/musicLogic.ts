import type { Album, GenreName, LibraryFilter, Rating, Recommendation } from './types';

const ratingPrecision = 10;

export function calculateAverageRating(ratings: Pick<Rating, 'score'>[]): number {
  if (ratings.length === 0) {
    return 0;
  }

  const total = ratings.reduce((sum, rating) => sum + rating.score, 0);
  return Math.round((total / ratings.length) * ratingPrecision) / ratingPrecision;
}

export function calculateAlbumAverage(albumId: string, ratings: Rating[]): number {
  return calculateAverageRating(ratings.filter((rating) => rating.albumId === albumId));
}

export function getTopGenres(albums: Album[], ratings: Rating[], limit = 3): Array<{ genre: GenreName; score: number }> {
  const albumById = new Map(albums.map((album) => [album.id, album]));
  const genreScores = new Map<GenreName, number>();

  for (const rating of ratings) {
    const album = albumById.get(rating.albumId);

    if (!album) {
      continue;
    }

    for (const genre of album.genres) {
      genreScores.set(genre, (genreScores.get(genre) ?? 0) + rating.score);
    }
  }

  return [...genreScores.entries()]
    .map(([genre, score]) => ({ genre, score: Math.round(score * ratingPrecision) / ratingPrecision }))
    .sort((left, right) => right.score - left.score || left.genre.localeCompare(right.genre))
    .slice(0, limit);
}

export function filterLibrary(albums: Album[], filter: LibraryFilter): Album[] {
  const query = filter.query?.trim().toLowerCase() ?? '';

  return albums.filter((album) => {
    const matchesStatus = filter.status === 'all' || album.status === filter.status;
    const matchesGenre = filter.genre === 'all' || album.genres.includes(filter.genre);
    const matchesQuery = query.length === 0 || album.title.toLowerCase().includes(query);

    return matchesStatus && matchesGenre && matchesQuery;
  });
}

export function buildRecommendations(
  albums: Album[],
  ratings: Rating[],
  preferredGenres: GenreName[],
  limit = 4
): Recommendation[] {
  const ratedAlbumIds = new Set(ratings.map((rating) => rating.albumId));

  return albums
    .filter((album) => !ratedAlbumIds.has(album.id))
    .map((album) => {
      const overlap = album.genres.filter((genre) => preferredGenres.includes(genre));
      const genreScore = overlap.length * 2.5;
      const communityScore = album.communityRating;
      const statusScore = album.status === 'planned' ? 1.2 : 0.4;
      const recencyScore = album.year >= 2015 ? 0.6 : 0;
      const score = Math.round((genreScore + communityScore + statusScore + recencyScore) * ratingPrecision) / ratingPrecision;
      const reason = overlap.length > 0
        ? `Matches ${overlap.join(', ')} and has a ${album.communityRating.toFixed(1)} community signal.`
        : `Expands the library outside the current comfort zone with a ${album.communityRating.toFixed(1)} community signal.`;

      return { album, score, reason };
    })
    .sort((left, right) => right.score - left.score || right.album.communityRating - left.album.communityRating)
    .slice(0, limit);
}
