<script lang="ts">
	import DashboardNavItem from './DashboardNavItem.svelte';

	let isExpanded: boolean = false;
	const toggleExpanded = () => (isExpanded = !isExpanded);
</script>

<aside class="dashboard-nav aside {isExpanded ? 'expanded' : 'minimized'}" id="dashboardNav">
	<section id="navWrap" class="dashboard-nav-container">
		<div class="top">
			<div class="menu-area">
				<div class="track">
					<div class="logo">
						<div class="icon">
							<i class="bi bi-journal" />
						</div>
					</div>
					<div class="button-area">
						<button on:click={toggleExpanded}>
							<i class="bi bi-list" />
						</button>
					</div>
				</div>
			</div>
			<div class="avatar-area">
				<a href="/profile" class="img-wrap">
					<figure>
						<img src="https://picsum.photos/64/64" alt="" />
					</figure>
				</a>
				<div class="text-wrap">
					<p><a href="/profile">dserio.d@gmail.com</a></p>
					<small><a href="#signout">Sign Out</a></small>
				</div>
			</div>
		</div>
		<nav class="main-nav" id="nav">
			<DashboardNavItem href="/dashboard/books" icon="journals" text="Books" />
			<DashboardNavItem href="/dashboard/recipes" icon="file-earmark-richtext" text="Recipes" />
			<DashboardNavItem href="/dashboard/uoms" icon="rulers" text="UOMs" />
			<DashboardNavItem href="/dashboard/ingredients" icon="egg-fried" text="Ingredients" />
		</nav>
	</section>
</aside>
