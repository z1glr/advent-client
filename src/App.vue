<script setup lang="ts">
	/*	# TODO
	 *	- FAQ / About-Seite, inklusive Cookie-Hinweis (nur technisch notwendige)
	 */	

	import { onMounted } from "vue";

	import ManageUsers from './components/Admin/ManageUsers.vue';
	import CommentView from './components/Admin/CommentView.vue';
	import BaseHome from './components/Post/BaseHome.vue';
	import Login from './components/Login.vue';
	import ViewPost from "./components/Admin/ViewPost.vue";
	import BaseHeader from "./components/BaseHeader.vue";
	import BaseMarkdown from "./components/BaseMarkdown.vue";

	import Global, { State, type User } from '@/Global';
	import { api_call } from "./Lib";

	onMounted(async () => {
		const res = await api_call<User>("GET", "welcome");

		if (res.ok) {
			Global.user.value = res.data;

			if (Global.user.value.loggedIn) {
				Global.state.value = State.Home;
			} else {
				Global.state.value = State.Login;
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
		<BaseMarkdown v-else-if="Global.state.value === State.Datenschutz" url="/legal/Datenschutz.md" />
		<BaseMarkdown v-else-if="Global.state.value === State.Impressum" url="/legal/Impressum.md" />
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
