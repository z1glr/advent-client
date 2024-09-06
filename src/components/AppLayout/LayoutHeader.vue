<script setup lang="ts">
import { api_call } from "@/Lib";
import Global, { type User } from "@/Global";

async function logout() {
	const res = await api_call<User>("GET", "logout");

	if (res.ok) {
		Global.user.value = res.data;
	}
}

function is_home(pathname: string): boolean {
	return window.location.pathname === pathname;
}
</script>

<template>
	<div class="header">
		<a v-if="!is_home('/')" href="/">Home</a>
		<a v-if="Global.user.value.admin && !is_home('/admin')" href="/admin">Admin</a>

		<slot></slot>

		<a v-if="Global.user.value.logged_in" @click="logout">Logout</a>
	</div>
</template>

<style scoped>
.header {
	display: flex;
	gap: 2em;
}
</style>
