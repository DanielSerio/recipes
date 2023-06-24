<script lang="ts">
	export let href: string;
	export let text: string;
	export let icon: string;
</script>

<div class="dashboard-nav-item" title={text}>
	<a {href} class="icon-wrap">
		<i class="bi bi-{icon}" />
	</a>
	<a {href} class="text-wrap">
		{text}
	</a>
</div>
