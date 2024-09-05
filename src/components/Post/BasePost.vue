<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import VueMarkdown from 'vue-markdown-render';

	import BaseComment from './BaseComment.vue';

	import Global, { type Comment, type Post } from '@/Global';
	import { api_call } from '@/Lib';

	const props = defineProps<{
		pid: number;
	}>();

	const content = ref<Post>();
	const comments = ref<Comment[]>([]);
	const comment_input_text = ref<string>("");

	onMounted(async () => {
		await Promise.allSettled([get_post(), get_comments()]);
	});

	async function get_post() {
		const data = await api_call<Post>("GET", "posts", { pid: props.pid });

		if (data !== false) {
			content.value = data;
		}
	}

	async function get_comments() {
		const data = await api_call<Comment[]>("GET", "comments", { pid: props.pid });

		if (data !== false) {
			comments.value = data;
		}
	}

	async function send_comment() {
		if (comment_input_text.value.length > 0 && !!content.value) {
			const data = await api_call<Comment[]>("POST", "comment", { pid: content.value.pid }, {
				text: comment_input_text.value
			});

			if (data !== false) {
				comments.value = data;
				
				comment_input_text.value = "";
			}
		}
	}
</script>

<template>
	<template v-if="content !== undefined">
		<h1 class="title">{{ content.title }}</h1>
		<VueMarkdown id="content" :source="content.content" />
		<h2>Fragen</h2>
		<div id="comment-input" v-show="!comments.some(comment => comment.uid === Global.user.value.uid)">
			<textarea v-model="comment_input_text" placeholder="Frage einsenden" />
			<input type="button" value="Senden" @click="send_comment" />
		</div>
		<div id="comments">
			<BaseComment
				v-for="(comment, i_comment) of comments"
				:comment="comment"
				:pid="content.pid"
				@answer="(new_comment) => comments[i_comment] = new_comment"
				@delete="get_comments()"
			/>
		</div>
	</template>
</template>

<style scoped>
	h1.title {
		font-weight: bold;
		font-size: 2.5em;
	}

	#content {
		overflow-x: clip;
	}

	#comment-input {
		display: flex;

		flex-direction: row;
	}

	#comment-input > textarea {
		flex: 1;

		font-family: Signika;

		resize: vertical;
	}

	#comments {
		display: grid;
		
		gap: 0.25em;
	}
</style>
