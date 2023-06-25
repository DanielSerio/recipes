<script lang="ts">
	import DashboardCard from '$lib/components/cards/DashboardCard.svelte';
	import '$lib/styles/page/_dashboard.scss';
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="page dashboard-landing-page">
	<main id="content" class="main-content">
		<div class="dashboard-grid">
			<DashboardCard class="users-card" color="primary">
				<svelte:fragment slot="top">
					<div class="title">
						<span class="icon">
							<i class="bi bi-people" />
						</span>
						<span class="text h3"> Users </span>
					</div>
				</svelte:fragment>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, culpa aliquid. Deserunt, eos
					nostrum. Quas quisquam suscipit earum repudiandae. Quasi error sed quo consequatur nihil
					magni sunt officia odit ipsa.
				</p>
				<svelte:fragment slot="bottom">
					<a class="card-link" href="/dashboard/uoms">Go To Users</a>
				</svelte:fragment>
			</DashboardCard>
			<DashboardCard class="uom-card" color="light-accent">
				<svelte:fragment slot="top">
					<div class="title">
						<span class="icon">
							<i class="bi bi-rulers" />
						</span>
						<span class="text h3"> UOMs </span>
					</div>
				</svelte:fragment>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, culpa aliquid. Deserunt, eos
					nostrum. Quas quisquam suscipit earum repudiandae. Quasi error sed quo consequatur nihil
					magni sunt officia odit ipsa.
				</p>
				<svelte:fragment slot="bottom">
					<a class="card-link" href="/dashboard/uoms">Go To UOMs</a>
				</svelte:fragment>
			</DashboardCard>
			<DashboardCard class="recipes-card" color="light-accent">
				<svelte:fragment slot="top">
					<div class="title">
						<span class="icon">
							<i class="bi bi-file-earmark-richtext" />
						</span>
						<span class="text h3"> Recipes </span>
					</div>
				</svelte:fragment>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, culpa aliquid. Deserunt, eos
					nostrum. Quas quisquam suscipit earum repudiandae. Quasi error sed quo consequatur nihil
					magni sunt officia odit ipsa.
				</p>
				<svelte:fragment slot="bottom">
					<a class="card-link" href="/dashboard/uoms">Go To Recipes</a>
				</svelte:fragment>
			</DashboardCard>
			<DashboardCard class="books-card" color="light-accent">
				<svelte:fragment slot="top">
					<div class="title">
						<span class="icon">
							<i class="bi bi-journals" />
						</span>
						<span class="text h3"> Books </span>
					</div>
				</svelte:fragment>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, culpa aliquid. Deserunt, eos
					nostrum. Quas quisquam suscipit earum repudiandae. Quasi error sed quo consequatur nihil
					magni sunt officia odit ipsa.
				</p>
				<svelte:fragment slot="bottom">
					<a class="card-link" href="/dashboard/uoms">Go To Books</a>
				</svelte:fragment>
			</DashboardCard>
		</div>
	</main>
</div>
