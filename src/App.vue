<script setup lang="ts">
	/*	# TODO
	 *	- Impressum
	 *	- FAQ / About-Seite, inklusive Cookie-Hinweis (nur technisch notwendige)
	 *	- Error-Messages after failed login etc.
	 */	

	import { onMounted, ref } from "vue";

	import ManageUsers from './components/Admin/ManageUsers.vue';
	import CommentView from './components/Admin/CommentView.vue';
	import BaseHome from './components/Post/BaseHome.vue';
	import Login from './Login.vue';
	import ViewPost from "./components/Admin/ViewPost.vue";
	import BaseHeader from "./components/BaseHeader.vue";

	import Global, { State } from '@/Global';

	onMounted(async () => {
		const url = Global.api + "/welcome";

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json; charset=UTF-8"

				},
				credentials: 'include'
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			Global.user.value = await response.json();

			if (Global.user.value.loggedIn) {
				Global.state.value = State.Home;
			} else {
				Global.state.value = State.Login;
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("unknown error");
			}
		}
	});
</script>

<template>
	<div id="app" v-if="Global.state.value !== State.INIT">
		<BaseHeader />

		<Login v-if="Global.state.value === State.Login" />
		<BaseHome v-else-if="Global.state.value === State.Home" />
		<ViewPost v-else-if="Global.state.value === State.Posts" />
		<CommentView v-else-if="Global.state.value === State.Comments" />
		<ManageUsers v-else-if="Global.state.value === State.Users" />
	</div>
</template>

<style scoped>
	#app {
		font-family: "Signika";
		font-size: 1.5em;

		margin: 0 auto;
		padding: 2em;
		height: 100vh;
		max-width: 50em;
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
	}

	.dropdown-menu {
		position: relative;
		top: 0;
		left: 0;

		border: 1px solid red;
	}
</style>
