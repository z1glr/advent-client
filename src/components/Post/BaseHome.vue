<script setup lang="ts">
	import { ref } from 'vue';
	import Post from './BasePost.vue';

	const active_day = ref<{ value: number; date: string; }>();

	const doors = [
		{ value: 4, date: "2024-12-04" },
		{ value: 24, date: "2024-12-24" },
		{ value: 2, date: "2024-12-02" },
		{ value: 16, date: "2024-12-16" },
		{ value: 6, date: "2024-12-06" },
		{ value: 21, date: "2024-12-21" },
		{ value: 15, date: "2024-12-15" },
		{ value: 1, date: "2024-12-01" },
		{ value: 13, date: "2024-12-13" },
		{ value: 18, date: "2024-12-18" },
		{ value: 8, date: "2024-12-08" },
		{ value: 7, date: "2024-12-07" },
		{ value: 19, date: "2024-12-19" },
		{ value: 12, date: "2024-12-12" },
		{ value: 9, date: "2024-12-09" },
		{ value: 10, date: "2024-12-10" },
		{ value: 17, date: "2024-12-17" },
		{ value: 3, date: "2024-12-03" },
		{ value: 11, date: "2024-12-11" },
		{ value: 22, date: "2024-12-22" },
		{ value: 20, date: "2024-12-20" },
		{ value: 14, date: "2024-12-14" },
		{ value: 5, date: "2024-12-05" },
		{ value: 23, date: "2024-12-23" }
	];
</script>

<template>
	<div id="container">
		<div id="day_selection">
			<div v-for="door of doors" class="door" :class="{ selected: door.value === active_day?.value }" @click="active_day = active_day?.value === door.value ? undefined : door">
				{{ door.value }}
			</div>
		</div>
		<Post v-if="active_day !== undefined" :pid="active_day.value" :key="active_day.value"/>
	</div>
</template>

<style scoped>
	#container {
		width: 100%;
	}

	#day_selection {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

		gap: 0.25em;

		max-width: 20em;
		width: 100%;

		margin-inline: auto;
	}

	.door {
		display: flex;
		justify-content: center;
		align-items: center;

		aspect-ratio: 1;
		/* padding: 0.25em; */

		font-size: 1.333em;

		background-color: red;
		color: white;

		cursor: pointer;
	}

	.door.selected {
		background-color: green;
	}
</style>
