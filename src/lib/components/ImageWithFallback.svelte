<script lang="ts">
  export let src: string;
  export let alt: string;
  export let label: string;
  export let variant: 'artist' | 'cover' = 'cover';

  let failed = false;
  let previousSrc = src;

  $: if (previousSrc !== src) {
    failed = false;
    previousSrc = src;
  }

  $: initials = label
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');

  function handleImageError(): void {
    failed = true;
  }
</script>

<div class={`image-frame ${variant}`} aria-label={alt}>
  {#if src && !failed}
    <img src={src} alt={alt} loading="lazy" onerror={handleImageError} />
  {:else}
    <div class="image-fallback" role="img" aria-label={`${alt} fallback`}>
      <span>{initials}</span>
      <small>Image unavailable</small>
    </div>
  {/if}
</div>
