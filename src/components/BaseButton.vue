<script setup lang="ts">
	defineProps<{
		active?: boolean;
		disabled?: boolean;
	}>();
</script>

<template>
	<span class="button" :class="{ active, disabled }">
		<div>
			<slot></slot>
		</div>
	</span>
</template>

<style scoped>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		background-color: lightgray;

		padding-inline: 0.25em;

		border-radius: 0.25em;

		user-select: none;

		transition: filter 0.2s ease;
	}

	.button:not(.disabled) {
		cursor: pointer;
	}

	.button.active {
		color: white;
		background-color: black;
	}

	.button.disabled {
		filter: opacity(50%);
	}

	.button:not(.disabled):hover {
		filter: brightness(85%);
	}
</style>
