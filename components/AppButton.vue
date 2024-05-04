<script setup lang="ts">
const props = defineProps<{
    theme?: 'dark' | 'warning',
    icon?: string,
    visibility?: 'low'
}>()
</script>

<template>
    <button class="button" :class="[{'button--icon-only': !$slots.default}, (theme ? `button--${theme}` : ''), (visibility ? `button--${visibility}` : '')]">
        <slot />
        <Icon v-if="icon" :name="icon" class="button__icon" />
    </button>
</template>

<style scoped>
.button {
    --color: var(--base-color);
    --background-color: var(--primary-color-hsl);

    -webkit-tap-highlight-color: transparent;
    appearance: none;
    font-size: inherit;
    font-family: inherit;
    border: none;
    cursor: pointer;
    
    box-shadow: 0 0 0 1em transparent;
    background-color: hsl(var(--background-color));
    color: var(--color);
    padding: .5em 1em;
    border-radius: 1em;
    text-decoration: none;
    display: inline-flex;
    gap: .5em;
    align-items: center;

    transition: scale .2s, opacity .2s, box-shadow .5s, color .5s;
}

.button:hover, .button:focus-visible {
    scale: 1.1;
}

.button:active {
    transition-duration: .1s;
    box-shadow: 0 0 0 2em hsl(var(--background-color) / 10%);
    scale: 1;
}

.button--low {
    opacity: .3;
}

.button--low:hover, .button--low:focus-visible {
    opacity: 1;
}

.button--icon-only {
    padding: .5678em .68em;
}

.button--dark {
    --color: var(--primary-color);
    --background-color: var(--base-color-hsl);
}

.button--warning {
    --color: var(--primary-color);
    --background-color: var(--warning-color-hsl);
}
</style>