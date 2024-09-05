<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue';

	import BasePostEdit from './BasePostEdit.vue';

	import { api_call } from '@/Lib';
	import { type Post } from '@/Global';

	const posts = ref<Post[]>([]);
	const selected_post = ref<Post>();

	const unsaved_changes = ref<boolean>(false);

	onMounted(async () => {
		await get_posts();
	});

	watch (posts, (posts) => {
		selected_post.value = posts[0];
	});
	
	async function get_posts() {
		const response = await api_call<Post[]>("GET", "posts");
	
		if (response.ok) {
			posts.value = response.data;
		}
	}
</script>

<template>
	<h1>Posts</h1>
	<span :data-tooltip='unsaved_changes ? "There are unsaved changes" : undefined'>
		Select Post: 
		<select id="post-select" v-model="selected_post" :class="{ disabled: unsaved_changes }">
			<option
				v-for="post in posts"
				:value="post"
			>
				{{ post.date }}
			</option>
		</select>
	</span>
	<BasePostEdit
		v-if="!!selected_post"
		:key="selected_post.pid"
		v-model:unsaved_changes="unsaved_changes"
		:post="selected_post"
	/>
</template>

<style scoped>
	#post-select {
		font-size: 1em;
	}

	select.disabled {
		filter: opacity(50%);

		cursor: help;
	}

	[data-tooltip] {
		position: relative;
		cursor: help;
	}

	[data-tooltip]::after {
		content: attr(data-tooltip);

		position: absolute;
		left: 0;
		top: calc(100% + 0.25em);
		
		opacity: 0;

		font-size: 0.67em;

		max-width: 16em;
		width: max-content;

		pointer-events: none;
		border-radius: 0.125em;
		box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2);
		background-color: white;
		z-index: 10;
		padding: 0.5em;
		transform: translateY(-1em);
		transition: all 150ms cubic-bezier(.25, .8, .25, 1);
	}

	[data-tooltip]:hover::after {
		opacity: 1;
		transform: translateY(0);
		transition-duration: 300ms;
	}
</style>
