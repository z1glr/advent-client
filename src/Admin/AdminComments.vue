<script setup lang="ts">
	import { onMounted, ref } from "vue";

	import { api_call } from "@/Lib";
	import { type Comment } from "@/Global";
	import BaseComment from "@/components/Post/BaseComment.vue";

	const comments = ref<Comment[]>([]);

	onMounted(async () => {
		await get_comments();
	});

	async function get_comments() {
		const response = await api_call<Comment[]>("GET", "comments");

		if (response.ok) {
			comments.value = response.data;
		}
	}
</script>

<template>
	<h1>Comments</h1>
	<BaseComment
		v-for="(comment, i_comment) of comments"
		:key="comment.cid"
		:comment="comment"
		:pid="comment.pid"
		@answer="(comment) => (comments[i_comment] = comment)"
		@delete="get_comments()"
	/>
</template>

<style scoped></style>
