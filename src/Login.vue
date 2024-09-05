<script setup lang="ts">
	import { ref } from 'vue';

	import Global, { State } from '@/Global';

	const user_input = ref<string>("");
	const password_input = ref<string>("");

	async function login() {
		const url = `${Global.api}/login`;

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=UTF-8"

				},
				body: JSON.stringify({
					user: user_input.value,
					password: password_input.value
				})
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const data = await response.json();

			Global.user.value = data;
			if (data.loggedIn) {
				Global.state.value = State.Home;
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("unknown error");
			}
		}
	}
</script>

<template>
	<div id="content">
		<form id="login">
			<input id="username" type="text" name="name" autocomplete="username" :required="true" v-model="user_input" placeholder="Name" @keydown.enter="login" />
			<input id="password" type="password" name="password" autocomplete="current-password" :required="true" v-model="password_input" placeholder="Passwort" @keydown.enter="login" />
			<input type="button" value="Login" @click="login" />
		</form>
	</div>
</template>

<style scoped>
	#content {
		flex: 1;

		display: flex;
		
		justify-content: center;
		align-items: center;
	}

	#login {
		display: flex;
		flex-direction: column;
	}

	#login * {
		width: 100%;

		font-size: 2em;
	}
</style>
