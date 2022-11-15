<script setup>

const props = defineProps({
    theme: {
        type: String,
        validator(value) {
            return ['dark', 'warning'].includes(value)
        }
    },
    icon: {},
    visibility: {
        type: String,
        validator(value) {
            return value == 'low'
        }
    }
})

</script>

<template>
    <button class="button" :class="[{'button--icon-only': !$slots.default}, (theme ? `button--${theme}` : ''), (visibility ? `button--${visibility}` : '')]">
        <slot />
        <Component :is="props.icon" class="button__icon" />
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

    transition-property: scale, box-shadow, opacity;
    transition-duration: .2s;
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
    opacity: .1;
}

.button--low:hover, .button--low:focus-visible {
    opacity: 1;
}

.button--icon-only {
    padding: .5em .6em;
}

.button--dark {
    --color: var(--primary-color);
    --background-color: var(--base-color-hsl);
}

.button--warning {
    --color: var(--primary-color);
    --background-color: var(--warning-color-hsl);
}

.button__icon {
    display: block;
    width: 1.2em;
}
</style>