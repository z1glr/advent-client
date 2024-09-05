<script setup lang="ts">
	import { watch, onMounted } from 'vue';
	import { MdEditor } from 'md-editor-v3';
	import 'md-editor-v3/lib/style.css';
	import VueMarkdown from 'vue-markdown-render';
	
	import type { Post } from '@/Global';
	import { api_call } from '@/Lib';

	const post = defineModel<Post>("post", { required: true });
	const unsaved_changes = defineModel<boolean>("unsaved_changes", { required: true });

	onMounted(() => {
		unsaved_changes.value = false;
	});

	watch(post, () => {
		unsaved_changes.value = true;
	});

	async function save_post() {
		const response = await api_call("POST", "post", { pid: post.value.pid }, {
			title: post.value.title,
			text: post.value.content,
			date: post.value.date
		});

		if (response.ok) {
			unsaved_changes.value = false;
		}
	}
</script>

<template>
	<div id="main">
		<div id="title">
			<input type="text" v-model="post.title" placeholder="Title" />
			<input type="buttoN" value="Save" @click="save_post" />
		</div>
		<div id="content">
			<MdEditor
				id="editor"
				v-model="post.content"
				language="en-US"
				:toolbars='["revoke", "next", "save", "-", "title", "bold", "italic", "underline", "strikeThrough", "orderedList", "unorderedList", "link", "table", "quote", "image"]'
				:tab-width="4"
				:no-upload-img="true"
				:preview="false"
				@on-save="save_post"
			/>
			<VueMarkdown id="preview" :source="post.content" />
		</div>
	</div>
</template>

<style scoped>
	#main {
		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 0.25em;

		flex: 1;

		overflow: clip;
	}

	#title {
		display: flex;
		gap: 0.25em;
	}

	#title input[type="text"] {
		width: 100%;
		font-size: 1em;
	}

	#title input[type="button"] {
		font-size: 0.67em;
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