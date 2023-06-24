<script lang="ts">
	import { themeStore, toggleTheme } from '$stores/theme';
	import '$lib/styles/critical.scss';
	import '$lib/styles/layout/_layout-base.scss';
	import '$lib/styles/module/_buttons.scss';
	import '$lib/styles/module/_control-wrap.scss';
	import '$lib/styles/module/_form-control.scss';
</script>

<div class="root-layout {$themeStore !== 'LOADING' ? $themeStore.mode : 'loading'}">
	<header class="header">
		<section class="header-container">
			<button on:click={toggleTheme}>Theme</button>
		</section>
	</header>
	<slot />
</div>
