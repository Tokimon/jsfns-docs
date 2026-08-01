<script lang="ts">
  import type { ResolvedPathname } from '$app/types';
  import type { ModuleEntry } from '$lib/doc-builder/type-parsing/prepareModules.js';
  import ArrowLeft from './icons/arrow-left.svelte';

  const { module, href }: { module: ModuleEntry; href: ResolvedPathname } =
    $props();

  let funcIndex = $state(0);
  const func = $derived(module.functions[funcIndex]);
  const maxIndex = module.functions.length - 1;

  function goPrev() {
    funcIndex = Math.max(funcIndex - 1, 0);
  }

  function goNext() {
    funcIndex = Math.min(funcIndex + 1, maxIndex);
  }
</script>

<div class="module">
  <a
    class="module-link"
    //  eslint-disable-next-line svelte/no-navigation-without-resolve
    {href}
    id={module.name}
    data-sveltekit-noscroll
    aria-label={module.name}
  >
  </a>

  {#if func}
    <h3 class="definition">
      {module.name}({#each func.params as param, index (index)}
        {index > 0 ? ', ' : ''}<b>{param.name}</b>
      {/each})
    </h3>

    <div class="nav">
      {#if maxIndex > 0}
        <button
          type="button"
          disabled={funcIndex <= 0}
          class="prev-item-button"
          onclick={goPrev}
        >
          <ArrowLeft />
        </button>

        {funcIndex + 1} / {maxIndex + 1}

        <button
          type="button"
          disabled={funcIndex >= maxIndex}
          class="next-item-button"
          onclick={goNext}
        >
          <ArrowLeft />
        </button>
      {/if}
    </div>

    <div class="summary">
      {@html func.summary}
    </div>
  {/if}
</div>

<style>
  .module {
    position: relative;
    background-color: var(--card-bg-color);
    border: 2px solid transparent;
    border-radius: 0.3rem;
    color: var(--text-color);
    outline: none;
    padding-block-end: 1.4rem;
    flex: 1;

    :global(p) {
      font-size: 1rem;
      color: var(--light-gray);
    }

    &:hover,
    &:has(.module-link:focus-visible) {
      background-color: var(--highlight);
      border-color: var(--highlight-contrast);

      .definition b {
        color: var(--highlight-contrast);
      }

      :global(p) {
        color: var(--dark-1);
      }

      .nav {
        color: var(--white);
      }

      .prev-item-button,
      .next-item-button {
        color: var(--dark-1);
      }
    }

    .module-link {
      display: block;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
      }

      &:focus {
        outline: none;
      }

      &:hover,
      &:focus-visible {
        text-decoration-line: none;
      }
    }

    .definition {
      white-space: nowrap;
      border-radius: 0.3rem;
      padding: 1rem 1.6rem;
      margin: 0.2rem;
      background: var(--dark-1);
      font-family: 'Courier New', Courier, monospace;
      font-size: 1.6rem;
      font-weight: 400;
      margin-block-end: 1rem;

      b {
        font-size: 1.3rem;
        color: var(--light-gray);
        font-weight: normal;
      }
    }

    .summary {
      padding-inline: 1.8rem;

      :global(a) {
        position: relative;
        z-index: 1;
      }
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.4rem;
      color: var(--light-gray);
      margin-block-start: -1rem;
      padding: 0.2rem;
    }

    .prev-item-button,
    .next-item-button {
      position: relative;
      z-index: 1;
      color: var(--highlight);
      transition: 0.2s linear;
      transition-property: background-color, opacity;
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 3px;

      &:disabled {
        opacity: 0;
      }

      &:not(:disabled) {
        &:hover,
        &:focus-visible {
          background: oklch(from var(--highlight-dark) l c h / 50%);
          color: var(--white);
        }
      }

      :global(svg) {
        width: 1rem;
        height: 1rem;
      }
    }

    .next-item-button {
      :global(svg) {
        rotate: 180deg;
      }
    }
  }
</style>
