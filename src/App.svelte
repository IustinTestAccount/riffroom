<script lang="ts">
  import ImageWithFallback from './lib/components/ImageWithFallback.svelte';
  import { albums, artists, friendActivity, genreCards, imageCredits, ratings } from './lib/data';
  import { buildRecommendations, calculateAverageRating, filterLibrary, getTopGenres } from './lib/musicLogic';
  import type { Album, GenreName, LibraryStatus } from './lib/types';

  const listenerName = 'Iustin Mitu';
  const listenerHandle = '@mituiustin1708';
  const artistById = new Map(artists.map((artist) => [artist.id, artist]));
  const albumById = new Map(albums.map((album) => [album.id, album]));
  const statusOptions: Array<'all' | LibraryStatus> = ['all', 'rated', 'listening', 'planned'];
  const genreOptions: Array<'all' | GenreName> = ['all', ...genreCards.map((genre) => genre.name)];
  const fallbackPreviewUrl = 'https://riffroom.invalid/missing-cover.jpg';
  const openingAlbumIds = ['mutter', 'toxicity', 'origins', 'titan'];
  const openingAlbums = openingAlbumIds
    .map((albumId) => albumById.get(albumId))
    .filter((album): album is Album => Boolean(album));

  let statusFilter: 'all' | LibraryStatus = 'all';
  let genreFilter: 'all' | GenreName = 'all';
  let query = '';

  const userAverage = calculateAverageRating(ratings);
  const topGenres = getTopGenres(albums, ratings, 3);
  const preferredGenres = topGenres.map((genre) => genre.genre);
  const recommendations = buildRecommendations(albums, ratings, preferredGenres, 4);

  $: filteredAlbums = filterLibrary(albums, {
    status: statusFilter,
    genre: genreFilter,
    query
  });

  function artistNameFor(albumId: string): string {
    const album = albumById.get(albumId);
    return album ? (artistById.get(album.artistId)?.name ?? 'Unknown artist') : 'Unknown artist';
  }

  function albumTitleFor(albumId: string): string {
    return albumById.get(albumId)?.title ?? 'Unknown album';
  }
</script>

<svelte:head>
  <title>Riffroom | Dark music ratings</title>
</svelte:head>

<header class="site-header">
  <a class="brand" href="#top" aria-label="Riffroom home">
    <span class="brand-mark">R</span>
    <span>riffroom</span>
  </a>

  <nav aria-label="Primary navigation">
    <a href="#top">Home</a>
    <a href="#library">Library</a>
    <a href="#recommendations">Recommendations</a>
    <a href="#activity">Activity</a>
  </nav>

  <a class="user-chip" href="#profile" aria-label="Open listener profile">
    <span>{listenerName}</span>
    <small>{listenerHandle}</small>
  </a>
</header>

<main id="top" class="page-shell">
  <section class="opening-panel panel" aria-labelledby="opening-title">
    <div class="opening-topline">
      <div>
        <p class="eyebrow">Heavy rotation</p>
        <h1 id="opening-title">Most played bands</h1>
      </div>
      <div class="opening-score" aria-label="Listener average rating">
        <span>Avg rating</span>
        <strong>{userAverage.toFixed(1)}</strong>
      </div>
    </div>

    <div class="home-layout">
      <div class="rotation-grid" aria-label="Most played bands">
        {#each artists as artist (artist.id)}
          <article class="rotation-card">
            <ImageWithFallback src={artist.imageUrl} alt={`${artist.name} band photo`} label={artist.name} variant="artist" />
            <div class="rotation-card-content">
              <div class="card-topline">
                <span>{artist.country}</span>
                <span>{artist.monthlyListeners}</span>
              </div>
              <h2>{artist.name}</h2>
              <p>{artist.genres.slice(0, 2).join(' / ')}</p>
            </div>
          </article>
        {/each}
      </div>

      <aside class="album-strip" aria-label="Featured albums">
        <div class="strip-heading">
          <span>Albums visible now</span>
          <small>rated and recommended</small>
        </div>

        <div class="strip-grid">
          {#each openingAlbums as album (album.id)}
            {@const artist = artistById.get(album.artistId)}
            <article class="strip-album">
              <ImageWithFallback src={album.coverUrl} alt={`${album.title} album cover`} label={album.title} variant="cover" />
              <div>
                <h3>{album.title}</h3>
                <p>{artist?.name ?? 'Unknown artist'}</p>
                <strong>{album.userRating ? album.userRating.toFixed(1) : album.communityRating.toFixed(1)}</strong>
              </div>
            </article>
          {/each}
        </div>
      </aside>
    </div>
  </section>

  <section id="profile" class="profile panel" aria-labelledby="profile-title">
    <div>
      <p class="eyebrow">Listener profile</p>
      <h2 id="profile-title">{listenerName}</h2>
      <p class="muted">Compact public profile snapshot for metal and rock ratings.</p>
    </div>

    <div class="profile-metrics" aria-label="Profile metrics">
      <div>
        <strong>{ratings.length}</strong>
        <span>ratings</span>
      </div>
      <div>
        <strong>{albums.length}</strong>
        <span>records</span>
      </div>
      <div>
        <strong>{artists.length}</strong>
        <span>core artists</span>
      </div>
      <div>
        <strong>{topGenres[0]?.genre ?? 'none'}</strong>
        <span>top genre</span>
      </div>
    </div>
  </section>

  <section class="section-block" aria-labelledby="artists-title">
    <div class="section-heading compact-heading">
      <p class="eyebrow">Artist rooms</p>
      <h2 id="artists-title">Artist pages</h2>
    </div>

    <div class="artist-grid">
      {#each artists as artist (artist.id)}
        <article class="artist-card panel">
          <ImageWithFallback src={artist.imageUrl} alt={`${artist.name} band photo`} label={artist.name} variant="artist" />
          <div class="artist-card-body">
            <div class="card-topline">
              <span>{artist.country}</span>
              <span>formed {artist.formed}</span>
            </div>
            <h3>{artist.name}</h3>
            <p>{artist.summary}</p>
            <div class="tag-row" aria-label={`${artist.name} genres`}>
              {#each artist.genres as genre (genre)}
                <span>{genre}</span>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section id="library" class="section-block" aria-labelledby="library-title">
    <div class="section-heading library-heading">
      <div>
        <p class="eyebrow">Music library</p>
        <h2 id="library-title">Albums and ratings</h2>
        <p class="muted">Rated, listening, and planned records with real cover URLs and fallbacks.</p>
      </div>

      <form class="filters" aria-label="Library filters">
        <label>
          <span>Status</span>
          <select bind:value={statusFilter}>
            {#each statusOptions as option (option)}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </label>

        <label>
          <span>Genre</span>
          <select bind:value={genreFilter}>
            {#each genreOptions as option (option)}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </label>

        <label>
          <span>Search</span>
          <input bind:value={query} type="search" placeholder="Search albums" />
        </label>
      </form>
    </div>

    <div class="album-grid">
      {#each filteredAlbums as album (album.id)}
        {@const artist = artistById.get(album.artistId)}
        <article class="album-card panel">
          <ImageWithFallback src={album.coverUrl} alt={`${album.title} album cover`} label={album.title} variant="cover" />
          <div class="album-body">
            <div class="card-topline">
              <span>{album.status}</span>
              <span>{album.year}</span>
            </div>
            <h3>{album.title}</h3>
            <p class="album-artist">{artist?.name ?? 'Unknown artist'}</p>
            <p>{album.capsule}</p>
            <div class="album-score">
              <span>Community {album.communityRating.toFixed(1)}</span>
              {#if album.userRating}
                <strong>Your rating {album.userRating.toFixed(1)}</strong>
              {:else}
                <strong>Unrated</strong>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section id="recommendations" class="section-block" aria-labelledby="recommendations-title">
    <div class="section-heading compact-heading">
      <p class="eyebrow">Recommendations</p>
      <h2 id="recommendations-title">Next records</h2>
    </div>

    <div class="recommendation-list">
      {#each recommendations as recommendation, index (recommendation.album.id)}
        {@const artist = artistById.get(recommendation.album.artistId)}
        <article class="recommendation-card panel">
          <span class="rank">0{index + 1}</span>
          <ImageWithFallback src={recommendation.album.coverUrl} alt={`${recommendation.album.title} album cover`} label={recommendation.album.title} variant="cover" />
          <div>
            <div class="card-topline">
              <span>{artist?.name ?? 'Unknown artist'}</span>
              <span>score {recommendation.score.toFixed(1)}</span>
            </div>
            <h3>{recommendation.album.title}</h3>
            <p>{recommendation.reason}</p>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section class="section-block" aria-labelledby="genres-title">
    <div class="section-heading compact-heading">
      <p class="eyebrow">Taste map</p>
      <h2 id="genres-title">Genre lanes</h2>
    </div>

    <div class="genre-grid">
      {#each genreCards as genre (genre.name)}
        <article class={`genre-card panel ${genre.accent}`}>
          <span>{genre.name}</span>
          <p>{genre.description}</p>
        </article>
      {/each}
    </div>
  </section>

  <section id="activity" class="section-grid activity-grid" aria-labelledby="activity-title">
    <div class="panel activity-panel">
      <p class="eyebrow">Friends and activity</p>
      <h2 id="activity-title">Recent listening circle</h2>
      <div class="activity-list">
        {#each friendActivity as item (item.id)}
          <article class="activity-item">
            <div>
              <strong>{item.friendName}</strong>
              <span>{item.action} {albumTitleFor(item.albumId)} by {artistNameFor(item.albumId)}</span>
            </div>
            <p>{item.note}</p>
            <small>{item.timestamp}{item.score ? ` · ${item.score.toFixed(1)}` : ''}</small>
          </article>
        {/each}
      </div>
    </div>

    <aside class="panel fallback-panel" aria-labelledby="fallback-title">
      <p class="eyebrow">Resilience check</p>
      <h2 id="fallback-title">Image fallback</h2>
      <p class="muted">This card intentionally uses an invalid URL to show the fallback used by artist and album cards.</p>
      <ImageWithFallback src={fallbackPreviewUrl} alt="Broken image fallback preview" label="Fallback Preview" variant="cover" />
    </aside>
  </section>

  <section class="section-block credits" aria-labelledby="credits-title">
    <div class="section-heading compact-heading">
      <p class="eyebrow">Image credits</p>
      <h2 id="credits-title">Replaceable source list</h2>
    </div>

    <div class="credit-list panel">
      {#each imageCredits as credit (credit.sourceUrl)}
        <a href={credit.sourceUrl} target="_blank" rel="noreferrer">
          <span>{credit.label}</span>
          <small>{credit.sourceName} · {credit.license}</small>
        </a>
      {/each}
    </div>
  </section>
</main>
