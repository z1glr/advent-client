<script setup lang="ts">
	import { api_call } from "@/Lib";
import Button from "./Button.vue";
	import DropdownMenu from "./DropdownMenu.vue";

	import Global, { State, type User } from '@/Global';

	const admin_menu_items = {
		Home: State.Home,
		Posts: State.Posts,
		Comments: State.Comments,
		Users: State.Users
	}

	async function logout() {
		const data = await api_call<User>("GET", "logout");

		if (data !== false) {
			Global.user.value = data;
			Global.state.value = State.Login;
		}
	}
</script>

<template>
	<div id="header">
			<!-- Impressum -->
			<!-- About -->
			<DropdownMenu>
				<Button v-if="Global.user.value.admin">
					Admin
				</Button>
				<template #dropdown>
					<Button
						v-for="([name, state]) of Object.entries(admin_menu_items)"
						:active="Global.state.value === state"
						@click="Global.state.value = state"
					>
						{{ name }}
					</Button>
				</template>
			</DropdownMenu>
			<Button v-if="Global.state.value > State.Login"@click="logout">Logout</Button>
		</div>
</template>

<style scoped>
	#header {
		display: flex;
		gap: 0.25em;
	}
</style>
