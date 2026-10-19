<script lang="ts">
	import { resolve } from '$app/paths';
	import { HomeSolid } from 'flowbite-svelte-icons';

	const { path }: { path: { label: string; url?: string }[] } = $props();
</script>

<nav aria-label="Breadcrumb" class="flex">
	<ol class="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
		{#each path as item, index (index)}
			<li
				class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
			>
				{#if index > 0}
					<svg
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-gray-400 rtl:-scale-x-100"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						></path>
					</svg>
				{/if}

				{#if item.url}
					<a
						class="inline-flex items-center text-sm font-medium text-gray-700 capitalize hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
						href={resolve(item.url as '/')}
					>
						{#if index === 0}
							<HomeSolid class="me-2 h-4 w-4" aria-hidden="true" />
						{/if}
						{item.label}
					</a>
				{:else}
					<span aria-current="page" class="text-gray-500 dark:text-gray-400">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
