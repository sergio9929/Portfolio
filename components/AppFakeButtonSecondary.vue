<script setup lang="ts">
const props = defineProps<{
    theme?: 'dark' | 'warning',
    icon?: string,
    visibility?: 'low'
}>()
</script>

<template>
    <span class="button"
        :class="[{ 'button--icon-only': !$slots.default }, (theme ? `button--${theme}` : ''), (visibility ? `button--${visibility}` : '')]">
        <slot />
        <Icon v-if="icon" :name="icon" class="button__icon" />
    </span>
</template>

<style scoped>
.button {
    --color: var(--primary-color);

    box-shadow: inset 0 0 0 var(--border-width) var(--color);
    color: var(--color);
    padding: .5em 1em;
    border-radius: 1em;
    text-decoration: none;
    display: inline-flex;
    gap: .5em;
    align-items: center;

    transition: scale .2s, opacity .2s, box-shadow .5s, color .5s;
}

.button--low {
    opacity: .3;
}

.button--icon-only {
    padding: .5678em .68em;
}

.button--dark {
    --color: var(--base-color);
}

.button--warning {
    --color: var(--warning-color);
}
</style>