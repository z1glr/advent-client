<script setup lang="ts">
	defineProps<{
		active?: boolean;
	}>();
</script>

<template>
	<span class="button" :class="{ active }"
		><div><slot></slot></div
	></span>
</template>

<style scoped>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		background-color: lightgray;

		padding-inline: 0.25em;

		border-radius: 0.25em;

		cursor: pointer;
		user-select: none;

		transition: filter 0.2s ease;
	}

	.button:hover {
		filter: brightness(85%);
	}

	.button.active {
		color: white;
		background-color: black;
	}
</style>
