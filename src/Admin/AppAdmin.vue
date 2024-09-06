<script setup lang="ts">
	import { ref, watch } from "vue";

	import AppLayout from "@/components/AppLayout/AppLayout.vue";
	import AdminPosts from "./AdminPosts.vue";
	import AdminComments from "./AdminComments.vue";
	import AdminUsers from "./AdminUsers.vue";

	import Global from "@/Global";

	enum State {
		Posts,
		Comments,
		Users
	}

	const window_state = ref<State>(State.Posts);

	watch(
		() => Global.user.value?.logged_in,
		() => {
			if (!!Global.user.value && !(Global.user.value?.logged_in && Global.user.value?.admin)) {
				window.location.href = window.location.origin;
			}
		},
		{ immediate: true }
	);
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

		<AdminPosts v-if="window_state === State.Posts" />
		<AdminComments v-else-if="window_state === State.Comments" />
		<AdminUsers v-else-if="window_state === State.Users" />
	</AppLayout>
</template>

<style scoped>
	a.active {
		text-decoration: underline;
	}
</style>
