<script setup lang="ts">
	import { onMounted, ref, watch } from "vue";
	import { MdEditor } from "md-editor-v3";
	import "md-editor-v3/lib/style.css";
	import VueMarkdown from "vue-markdown-render";

	import { api_call } from "@/Lib";
	import { type Post } from "@/Global";

	const posts = ref<Post[]>([]);
	const selected_post = ref<Post>();

	const unsaved_changes = ref<boolean>(false);

	onMounted(async () => {
		await get_posts();
		unsaved_changes.value = false;
	});

	watch(posts, (posts) => {
		selected_post.value = posts[0];
	});

	watch(selected_post, () => {
		unsaved_changes.value = true;
	});

	async function get_posts() {
		const response = await api_call<Post[]>("GET", "posts");

		if (response.ok) {
			posts.value = response.data;
		}
	}
	async function save_post() {
		if (selected_post.value !== undefined) {
			const response = await api_call(
				"POST",
				"post",
				{ pid: selected_post.value.pid },
				{
					text: selected_post.value.content,
					date: selected_post.value.date
				}
			);

			if (response.ok) {
				unsaved_changes.value = false;
			}
		}
	}
</script>

<template>
	<h1>Posts</h1>
	<span
		id="post-selector"
		:data-tooltip="unsaved_changes ? 'There are unsaved changes' : undefined"
	>
		Select Post:
		<select id="post-select" v-model="selected_post" :class="{ disabled: unsaved_changes }">
			<option v-for="post in posts" :key="post.pid" :value="post">
				{{ post.date }}
			</option>
		</select>
	</span>
	<div id="content_wrapper">
		<div id="content" v-if="!!selected_post">
			<MdEditor
				id="editor"
				v-model="selected_post.content"
				language="en-US"
				:toolbars="[
					'revoke',
					'next',
					'save',
					'-',
					'title',
					'bold',
					'italic',
					'underline',
					'strikeThrough',
					'orderedList',
					'unorderedList',
					'link',
					'table',
					'quote',
					'image'
				]"
				:tab-width="4"
				:no-upload-img="true"
				:preview="false"
				@on-save="save_post"
			/>
			<VueMarkdown id="preview" :source="selected_post.content" />
		</div>
	</div>
</template>

<style scoped>
	#post-selector {
		display: inline-flex;
		gap: 0.25em;
	}

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
		transition: all 150ms cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	[data-tooltip]:hover::after {
		opacity: 1;
		transform: translateY(0);
		transition-duration: 300ms;
	}

	#content_wrapper {
		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 0.25em;

		flex: 1;

		overflow: clip;
	}

	#content {
		display: flex;
		flex: 1;

		position: relative;
	}

	#content > * {
		position: absolute;

		top: 0;
		bottom: 0;

		height: unset;
		width: unset;
	}

	#editor {
		left: 0;
		right: 50%;
	}

	#preview {
		left: 50%;
		right: 0;

		display: block;

		padding: 1em;

		overflow-y: scroll;
		overflow-x: hidden;

		font-size: 0.75em;
	}

	#preview:deep(code) {
		text-wrap: wrap;
		overflow-wrap: anywhere;
	}

	@media screen and (max-width: 66em) {
		#content {
			display: block;
			overflow: unset;
			position: unset;
		}

		#content > * {
			position: unset;
		}
	}
</style>
