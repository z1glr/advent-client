<script setup lang="ts">
	import { onBeforeMount, ref } from 'vue';
	import Post from './BasePost.vue';
import { api_call, create_lcg_random } from '@/Lib';

	interface Door { value: number; date: string; enabled: boolean; }
	const active_day = ref<Door>();
	const doors = ref<Door[]>();

	onBeforeMount(async () => {
		const response = await api_call<{ start: string; days: number; }>("GET", "posts/config");

		if (response.ok) {
			const days = Array.from(Array(response.data.days).keys());

			// shuffle the elements
			const lcg_random = create_lcg_random(17)
			for (var i = days.length - 1; i >= 0; i--) {
				var j = Math.floor(lcg_random() * (i + 1));
				var temp = days[i];
				days[i] = days[j];
				days[j] = temp;
			}

			const today = new Date();
			const start_date = new Date(response.data.start);

			function format_date(dt: Date): string {
				return [
					dt.getFullYear().toString(),
					(dt.getMonth() + 1).toString().padStart(2, "0"),
					dt.getDate().toString().padStart(2, "0")
				].join("-");
			}

			doors.value = days.map((day) => {
				const this_date = new Date(start_date.valueOf());
				this_date.setDate(this_date.getDate() + day);

				return {
					value: day + 1,
					date: format_date(this_date),
					enabled: today >= this_date
				};
			});
		}
	});


	function select_door(door: Door) {
		if (active_day.value?.date !== door.date && door.enabled) {
			active_day.value = door;
		}
	}
</script>

<template>
	<div id="container">
		<div id="day_selection">
			<div v-for="door of doors" class="door" :class="{ selected: door.value === active_day?.value, enabled: door.enabled }" @click="select_door(door)">
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

		cursor: not-allowed;
	}

	.door.selected {
		background-color: green;
	}

	.door.enabled {
		cursor: pointer;
	}
</style>
