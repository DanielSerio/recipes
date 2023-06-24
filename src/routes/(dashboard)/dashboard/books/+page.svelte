<script lang="ts">
	import ApiTable from '$lib/components/ApiTable/ApiTable.svelte';
	import collapseString from '$lib/utility/collapse-string';
	const fields: App.ApiTableField[] = [
		{
			column: 'recipe_book_id',
			title: 'ID',
			transform: {
				collapse: (value) => collapseString(value)
			},
			href: '/dashboard/books/$recipe_book_id$'
		},
		{
			column: 'uom_name',
			title: 'Name',
			href: '/dashboard/books/$recipe_book_id$'
		},
		{
			column: 'uom_abbv',
			title: 'Abbv.',
			href: '/dashboard/books/$recipe_book_id$'
		}
	];
</script>

<div class="page dashboard-books-page">
	<main id="content" class="main-content">
		<ApiTable
			{fields}
			url="books"
			entityName="Book"
			entityIcon="journals"
			deleteColumnKey="recipe_book_id"
		/>
	</main>
</div>
