<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
	import { faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";

	import Button from "@/components/Button.vue";
	import BaseSlider from "../BaseSlider.vue";

	import Global, { type User } from "@/Global";
	import { api_call } from "@/Lib";

	type PasswordUser = User & { password: string; };

	const users = ref<(PasswordUser)[]>([]);
	const add_user_name = ref<string>("");
	const add_user_password = ref<string>("");

	onMounted(async () => {
		create_password();

		const url = Global.api + "/users";

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			store_users(await response.json());
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		}
	});

	function create_password() {
		// create the password
		const password_number = String(Math.floor(Math.random() * 90000000 + 10000000));
		const password = password_number.slice(0, 4) + "-" + password_number.slice(4);

		add_user_password.value = password;
	}

	async function add_user(user: string = add_user_name.value, password: string = add_user_password.value) {
		console.debug(user, password);
		
		if (user.length > 0 && password.length > 0) {
			const data = await api_call<User[]>("POST", "user", undefined, { user, password });

			if (!!data) {
				create_password();

				store_users(data);
			}
		}
	}

	async function modify_user(user: PasswordUser) {
		if (window.confirm(`Modify user '${user.name}'?`)) {
			const data = await api_call<User[]>("POST", "user/modify", { uid: user.uid }, { password: user.password, admin: user.admin });

			if (!!data) {
				store_users(data);
			}
		}
	}

	async function delete_user(user: PasswordUser) {
		if (window.confirm(`Delete user '${user.name}'?`)) {
			const data = await api_call<User[]>("DELETE", "user", { uid: user.uid });
			
			if (!!data) {
				store_users(data);
			}
		}
	}

	function store_users(new_users: User[]) {
		users.value = new_users.map(user => { return { ...user, password: "" }; });
	}
</script>

<template>
	<div id="container">
		<h1>
			Users
		</h1>
		<div id="add_user">
			<input v-model="add_user_name" placeholder="username" @keydown.enter="add_user()" />
			<input v-model="add_user_password" placeholder="password" @keydown.enter="add_user()" />
			<Button @click="add_user()">add</Button>
		</div>
		<table id=users>
			<tr class="header">
				<th>UID</th>
				<th>Name</th>
				<th>New password</th>
				<th>Admin</th>
				<th>Submit</th>
				<th>Delete</th>
			</tr>
			<tr class="content" v-for="user of users">
				<th>{{ user.uid }}</th>
				<th>{{ user.name }}</th>
				<th><div class="cell"><input type="text" v-model="user.password" placeholder="password" /></div></th>
				<th><div class="cell"><BaseSlider class="slider" :disabled='user.name === "admin"' v-model="user.admin" /></div></th>
				<th><div class="cell"><Button class="button" @click="modify_user(user)"><FontAwesomeIcon :icon="faFloppyDisk" /></Button></div></th>
				<th><div class="cell"><Button class="button" @click="delete_user(user)"><FontAwesomeIcon :icon="faTrash" /></Button></div></th>
			</tr>
		</table>
	</div>
</template>

<style scoped>
	#container {
		/* width: 100%; */

		display: flex;
		flex-direction: column;

		align-items: center;

		gap: 0.25em;
	}

	#add_user {
		display: flex;

		gap: 0.25em;

		font-size: 1em;
	}

	#add_user > input {
		font-size: inherit;
	}

	#users {
		width: 100%;
	}

	tr.header * {
		font-weight: bolder;

		background-color: black;
		color: white;
	}

	tr.content:nth-of-type(2n) {
		background-color: hsl(0, 0%, 90%);
	}

	tr.content:nth-of-type(2n + 1) {
		background-color: hsl(0, 0%, 80%);
	}

	th {
		padding: 0.25em;;
	}

	th > div.cell {
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	th input[type="text"] {
		flex: 1;
	}

	tr.content input[type="text"] {
		font-size: 0.67em;
	}

	.content .button {
		background-color: transparent;
		color: var(--color-off);
	}

	.content .button:hover {
		color: var(--color-off-hover);
	}
</style>
