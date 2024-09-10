<script setup lang="ts">
	import { FEATURES } from "vuefinder/dist/features.js";
</script>

<template>
	<h1>Files</h1>
	<VueFinder
		id="finder"
		request="/api/storage/browse"
		:features="[
			FEATURES.EDIT,
			FEATURES.NEW_FOLDER,
			FEATURES.PREVIEW,
			FEATURES.RENAME,
			FEATURES.DELETE,
			FEATURES.DOWNLOAD
		]"
	/>
</template>

<style scoped>
	.vuefinder {
		width: 100%;
		height: 100%;

		border-radius: 0.25em;

		outline: none;
	}

	.vuefinder:deep(> div) {
		height: 100%;
	}

	.vuefinder:deep(.stroke-sky-500),
	:deep(.vuefinder__rename-modal__icon),
	:deep(.vuefinder__delete-modal__icon) {
		stroke: var(--color-contrast) !important;
	}

	.vuefinder:deep(.fill-sky-500),
	:deep(.vuefinder__rename-modal__icon),
	:deep(.vuefinder__delete-modal__icon) {
		fill: var(--color-contrast) !important;
	}

	:deep(.vuefinder__main__container) {
		height: 100%;

		max-height: unset !important;

		resize: none !important;

		border: unset;
	}

	:deep(.vuefinder__status-bar__wrapper) {
		display: none !important;
	}

	:deep(.vuefinder__breadcrumb__container),
	:deep(.vuefinder__treestorageitem__header),
	:deep(.vuefinder__treeview__pinned-toggle) {
		background-color: var(--color-contrast) !important;

		border: none !important;
	}

	:deep(.dark\:hover\:bg-gray-700:hover),
	:deep(.vuefinder__breadcrumb__go-up--active:hover) {
		background-color: var(--color-contrast-hover) !important;
	}

	:deep(.vf-sort-button),
	:deep(.vuefinder__explorer__header),
	:deep(.vuefinder__breadcrumb__toggle-tree--active) {
		background-color: var(--color-contrast-disabled) !important;
		border: none !important;
	}

	:deep(.vuefinder__treeview__pin-icon),
	:deep(.vuefinder__item--pinned) {
		color: var(--color-accent) !important;
	}

	:deep(.vf-toolbar-icon-disabled) {
		stroke: var(--color-text-disabled) !important;
	}

	:deep(.vuefinder__main__container),
	:deep(.vuefinder__context-menu),
	:deep(.vuefinder__breadcrumb__search-container) {
		color: var(--color-text) !important;

		background-color: var(--color-background-disabled) !important;
	}

	:deep(.vuefinder__treesubfolderlist__item-content:hover) {
		color: var(--color-text-hover) !important;
	}

	:deep(.vuefinder__treeview__container),
	:deep(.dark\:hover\:bg-gray-800:hover),
	:deep(.vuefinder__breadcrumb__item:hover) {
		background-color: var(--color-background) !important;
	}

	:deep(.vf-item-grid) {
		border-radius: 0.25em;

		border: none;
	}

	:deep(.vf-item-grid:hover) {
		background-color: var(--color-on) !important;
	}

	:deep(div.vf-explorer-selected:first-of-type) {
		background-color: var(--color-on-disabled) !important;
	}

	:deep(.vf-toolbar-icon) {
		stroke: var(--color-text) !important;
	}

	:deep(.vuefinder__treeview__scroll) {
		border: none !important;
	}

	/* Popup */
	:deep(.vuefinder__modal-layout__overlay) {
		backdrop-filter: blur(0.5em);

		background-color: unset !important;
	}

	:deep(.vuefinder__modal-layout__content),
	:deep(.vuefinder__modal-layout__footer) {
		background-color: var(--color-background) !important;
	}

	:deep(.vuefinder__modal-layout__content *) {
		color: var(--color-text) !important;
	}

	:deep(.vuefinder__modal-layout__content input) {
		background-color: var(--color-contrast-disabled) !important;
	}

	:deep(.vuefinder__modal-layout__content input::placeholder) {
		color: var(--color-text-disabled);
	}

	:deep(.vuefinder__modal-header__icon-container) {
		background-color: var(--color-accent) !important;
	}

	:deep(.vf-btn-primary) {
		background-color: var(--color-contrast) !important;
		border: none;
	}

	:deep(.vf-btn-primary:hover) {
		background-color: var(--color-contrast-hover) !important;
	}

	:deep(.vf-btn-secondary) {
		background-color: var(--color-background) !important;

		border-color: var(--color-text) !important;
	}

	:deep(.vf-btn-secondary:hover) {
		background-color: var(--color-background-hover) !important;
	}

	:deep(.vf-btn-danger) {
		background-color: var(--color-error) !important;

		border: none;
	}

	:deep(.vf-btn-danger:hover) {
		background-color: var(--color-error-hover) !important;
	}

	:deep(.vuefinder__delete-modal__warning) {
		color: var(--color-error) !important;
	}

	@media (prefers-color-scheme: dark) {
		:deep(.dark\:text-neutral-300),
		:deep(.vuefinder__breadcrumb__separator),
		:deep(.vuefinder__breadcrumb__item),
		:deep(.vuefinder__treestorageitem__header),
		:deep(.vuefinder__treeview__pinned-toggle),
		:deep(.vuefinder__folder-loader-indicator--minus),
		:deep(.vuefinder__folder-indicator--minus),
		:deep(.vuefinder__treestorageitem__icon),
		:deep(.vuefinder__treestorageitem__info) {
			color: var(--color-text) !important;
		}
	}
</style>
