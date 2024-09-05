<script setup lang="ts">
	import { ref } from 'vue';

	import Global, { State, type User } from '@/Global';
	import { api_call, HTTPStatus } from '@/Lib';
import Button from './Button.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

	const user_input = ref<string>("");
	const password_input = ref<string>("");
	const wrong_password = ref<boolean>(false);

	async function login() {
		const response = await api_call<User>("POST", "login", undefined, { user: user_input.value, password: password_input.value });

		if (response.ok) {
			wrong_password.value = false;

			Global.user.value = response.data;
			if (response.data.loggedIn) {
				Global.state.value = State.Home;
			}
		} else {
			if (response.status === HTTPStatus.Unauthorized) {
				wrong_password.value = true;
			}
		}
	}
</script>

<template>
	<div id="content">
		<div v-if="wrong_password" id="wrong-password">
			<h2>Login fehlgeschlagen</h2>
			unbekannter Benutzer oder fasches Passwort
		</div>
		<form id="login">
			<input id="username" type="text" name="name" autocomplete="username" :required="true" v-model="user_input" placeholder="Name" @keydown.enter="login" />
			<input id="password" type="password" name="password" autocomplete="current-password" :required="true" v-model="password_input" placeholder="Passwort" @keydown.enter="login" />
			<Button id="submit" @click="login"><FontAwesomeIcon :icon="faRightToBracket" /> Login</Button>
		</form>
	</div>
</template>

<style scoped>
	#content {
		display: flex;
		flex-direction: column;
		gap: 0.25em;

		width: 15em;
		height: 100%;
		
		justify-content: center;
		align-items: center;

		font-size: 1.5em;
	}

	#wrong-password {
		color: red;
	}

	#login {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25em;
	}

	#login input {
		width: 100%;

		font-size: 1em;
	}
</style>
