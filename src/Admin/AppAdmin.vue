<script setup lang="ts">
	import { ref } from "vue";

	import AppLayout from "@/components/AppLayout/AppLayout.vue";
	import AdminPosts from "./AdminPosts.vue";
	import AdminComments from "./AdminComments.vue";
	import AdminUsers from "./AdminUsers.vue";
	import BaseLogin from "@/components/BaseLogin.vue";

	import Global from "@/Global";

	enum State {
		Posts,
		Comments,
		Users
	}

	const window_state = ref<State>(State.Posts);
</script>

<template>
	<AppLayout>
		<template #header>
			<a :class="{ active: window_state === State.Posts }" @click="window_state = State.Posts"
				>Posts</a
			>
			<a :class="{ active: window_state === State.Comments }" @click="window_state = State.Comments"
				>Comments</a
			>
			<a :class="{ active: window_state === State.Users }" @click="window_state = State.Users"
				>Users</a
			>
		</template>

		<BaseLogin v-if="!Global.user.value.logged_in" />
		<AdminPosts v-else-if="window_state === State.Posts" />
		<AdminComments v-else-if="window_state === State.Comments" />
		<AdminUsers v-else-if="window_state === State.Users" />
	</AppLayout>
</template>

<style scoped>
	a.active {
		text-decoration: underline;
	}
</style>
