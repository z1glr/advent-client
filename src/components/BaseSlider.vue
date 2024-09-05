<script setup lang="ts">
	const props = defineProps<{
		disabled?: boolean;
	}>();

	const state = defineModel<boolean>({ default: false });

	function toggle() {
		if (!props.disabled) {
			state.value = !state.value;
		}
	}
</script>

<template>
	<div id="wrapper" :class="{ active: state, disabled }" @click="toggle">
		<div id="slider"></div>
	</div>
</template>

<style scoped>
	#wrapper {
		aspect-ratio: 2;

		height: 1.125em;
		user-select: none;

		position: relative;

		background-color: var(--color-off);

		transition: background-color 0.2s ease, filter 0.2s ease;

		border-radius: 50cqb;
	}

	#wrapper.disabled {
		background-color: var(--color-off-disabled);
	}
	#wrapper.active.disabled {
		background-color: var(--color-active-disabled);
	}

	#wrapper:not(.disabled) {
		cursor: pointer;
	}

	#wrapper.active {
		background-color: var(--color-active)
	}

	#wrapper:not(.disabled):hover {
		background-color: var(--color-off-hover);
	}
	#wrapper.active:not(.disabled):hover {
		background-color: var(--color-active-hover);
	}

	#slider {
		position: absolute;
		inset: 0;

		margin: 0.1875em;
	}

	#slider::before {
		position: absolute;

		content: "";
		
		aspect-ratio: 1;
		height: 100%;

		left: 0;
		top: 0;

		border-radius: 50%;;

		background-color: white;

		transition-property: margin, transform;
		transition-duration: 0.2s;
		transition-timing-function: ease;
	}

	.active > #slider::before {
		margin-left: 100%;
		transform: translatex(-100%);
	}
</style>
