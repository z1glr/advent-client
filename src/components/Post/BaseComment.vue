<script setup lang="ts">
	import Global, { type Comment, type Post } from '@/Global';
	import { api_call } from '@/Lib';

	const props = defineProps<{
		comment: Comment;
		pid: number;
	}>();

	const emit = defineEmits<{
		answer: [comment: Comment]
		delete: [];
	}>();

	async function add_answer(cid: number, answer: string) {
		const res = await api_call<Comment>("POST", "comment/answer", { cid }, { answer });

		if (res !== false) {
			emit("answer", res);
		}
	}

	async function delete_comment(cid: number) {
		if (window.confirm("Do you really want to delete this comment?")) {
			const res = await api_call<Post>("DELETE", "comment", {
				cid,
				pid: props.pid
			});

			if (res !== false) {
				emit("delete");
			}
		}
	}
</script>

<template>
	<div class="comment">
		<div class="comment_text">{{ comment.text }}<input class="btn_delete" type="button" value="X" @click="delete_comment(comment.cid)" /></div>
		<div v-if="Global.user.value.admin" class="answer">
			<textarea placeholder="Antwort" v-model="comment.answer" />
			<input type="button" value="Bestätigen"  @click="add_answer(comment.cid, comment.answer ?? '')" />
		</div>
		<div v-else-if="!!comment.answer" class="answer">{{ comment.answer }}</div>
	</div>
</template>

<style scoped>
	.comment * {
		padding: 0.25em;
	}

	.comment {
		border: 0.075em solid gray;
		border-radius: 0.125em;

		box-shadow: 1px 1px 1px #999;
	}
	
	.comment_text {
		display: flex;

		justify-content: space-between;
	}

	input.btn_delete {
		aspect-ratio: 1;
		height: 100%;
		width: 2em;
	}

	.answer {
		background-color: lightgray;
		margin-left: 1em;
	}

	.answer > textarea {
		flex: 1;

		font-family: Signika;
		color: black;

		resize: vertical;
		width: 100%;

		border: unset;
		background-color: transparent;
	}
</style>
