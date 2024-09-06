<script setup lang="ts">
	const sites = {
		/* eslint-disable @typescript-eslint/naming-convention */
		Datenschutz: "/legal/Datenschutz",
		Impressum: "/legal/Impressum"
		/* eslint-enable @typescript-eslint/naming-convention */
	};

	function is_home(pathname: string): boolean {
		return window.location.pathname === pathname;
	}
</script>

<template>
	<div class="footer">
		<a
			v-for="[name, url] in Object.entries(sites)"
			:key="name"
			:href="url"
			:class="{ active: is_home(url) }"
		>
			{{ name }}
		</a>
	</div>
</template>

<style scoped>
	.footer {
		display: flex;
		gap: 2em;
	}

	a:link,
	a:visited,
	a:hover,
	a:active {
		text-decoration: none;
		color: unset;
	}

	a.active {
		text-decoration: underline;
	}
</style>
