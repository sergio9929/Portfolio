<script setup lang="ts">
const props = defineProps<{
    theme?: 'dark' | 'warning',
    icon?: string,
    visibility?: 'low'
}>()
</script>

<template>
    <button class="button"
        :class="[{ 'button--icon-only': !$slots.default }, (theme ? `button--${theme}` : ''), (visibility ? `button--${visibility}` : '')]">
        <slot />
        <Icon v-if="icon" :name="icon" class="button__icon" />
    </button>
</template>

<style scoped>
.button {
    --color: var(--primary-color);

    -webkit-tap-highlight-color: transparent;
    appearance: none;
    font-size: inherit;
    font-family: inherit;
    border: none;
    cursor: pointer;

    box-shadow: inset 0 0 0 var(--border-width) var(--color);
    background-color: transparent;
    color: var(--color);
    padding: .5em 1em;
    border-radius: 1em;
    text-decoration: none;
    display: inline-flex;
    gap: .5em;
    align-items: center;

    transition: scale .2s, opacity .2s, box-shadow .5s, color .5s;
}

.button:hover,
.button:focus-visible {
    scale: 1.1;
}

.button:active {
    transition-duration: .1s;
    box-shadow: inset 0 0 0 calc(var(--border-width) * 2) var(--color);
    scale: 1;
}

.button--low {
    opacity: .3;
}

.button--low:hover,
.button--low:focus-visible {
    opacity: 1;
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