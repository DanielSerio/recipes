<script lang="ts">
	import '$lib/styles/critical.scss';
	import { toggleTheme } from '$stores/theme';
</script>

<svelte:head>
	<title>Site | Landing</title>
	<meta name="description" content="Landing Page" />
</svelte:head>

<div class="page">
	<section>
		<article>
			<h1>Welcome to SvelteKit</h1>
			<h2>Welcome to SvelteKit</h2>
			<h3>Welcome to SvelteKit</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non reprehenderit ex sequi quo cum
				incidunt quae molestiae, doloremque asperiores dolore, facere sed iure impedit ullam
				suscipit quam numquam magnam fuga.
			</p>
			<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
			<button class="btn btn-filled primary" on:click={toggleTheme}>Theme</button>
			<a href="/login">Go to login</a>
		</article>
	</section>
</div>
