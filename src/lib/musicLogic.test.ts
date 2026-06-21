import { describe, expect, it } from 'vitest';
import { albums, ratings } from './data';
import { buildRecommendations, calculateAlbumAverage, calculateAverageRating, filterLibrary, getTopGenres } from './musicLogic';

const sampleRatings = [
  { albumId: 'first', score: 8, date: '2026-01-01', note: 'solid' },
  { albumId: 'second', score: 9.5, date: '2026-01-02', note: 'excellent' },
  { albumId: 'third', score: 7.5, date: '2026-01-03', note: 'good' }
];

describe('music logic', () => {
  it('calculates an average rating rounded to one decimal', () => {
    expect(calculateAverageRating(sampleRatings)).toBe(8.3);
  });

  it('returns 0 for an empty average rating input', () => {
    expect(calculateAverageRating([])).toBe(0);
  });

  it('calculates an album average from rating entries', () => {
    const albumRatings = [
      { albumId: 'toxicity', score: 9.2, date: '2026-01-01', note: 'first pass' },
      { albumId: 'toxicity', score: 9.8, date: '2026-01-05', note: 'second pass' },
      { albumId: 'mutter', score: 8.5, date: '2026-01-06', note: 'other album' }
    ];

    expect(calculateAlbumAverage('toxicity', albumRatings)).toBe(9.5);
  });

  it('finds top genres from rated albums', () => {
    const topGenres = getTopGenres(albums, ratings, 2);

    expect(topGenres[0]?.genre).toBe('alternative metal');
    expect(topGenres).toHaveLength(2);
  });

  it('filters the library by status and genre', () => {
    const filtered = filterLibrary(albums, {
      status: 'planned',
      genre: 'industrial metal',
      query: ''
    });

    expect(filtered.map((album) => album.id)).toEqual(['rosenrot']);
  });

  it('filters the library by query text', () => {
    const filtered = filterLibrary(albums, {
      status: 'all',
      genre: 'all',
      query: 'tox'
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.id).toBe('toxicity');
  });

  it('recommends unrated albums that match preferred genres first', () => {
    const recommendations = buildRecommendations(albums, ratings, ['industrial metal', 'symphonic death metal'], 3);

    expect(recommendations).toHaveLength(3);
    expect(recommendations.every((item) => !ratings.some((rating) => rating.albumId === item.album.id))).toBe(true);
    expect(recommendations[0]?.album.genres.some((genre) => ['industrial metal', 'symphonic death metal'].includes(genre))).toBe(true);
  });
});
