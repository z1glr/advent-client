<script setup lang="ts">
import LayoutFooter from "./LayoutFooter.vue";
import LayoutHeader from "./LayoutHeader.vue";
</script>

<template>
	<LayoutHeader><slot name="header"></slot></LayoutHeader>
	<div id="scroll">
		<div id="app_content">
			<slot></slot>
		</div>
	</div>
	<LayoutFooter id="footer" />
</template>

<style scoped>
#scroll {
	width: 100%;
	height: 100%;

	overflow: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
}

#app_content {
	width: 100%;
	height: 100%;
	max-width: 50em;
}

#footer {
	margin-top: auto;
}
</style>

<style>
#app_mount {
	font-family: "Signika";
	font-size: 1.5em;

	margin: 0 auto;
	padding-block: 2em;
	height: 100vh;
	width: 100vw;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;

	overflow: clip;
}
</style>
