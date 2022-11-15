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
    -webkit-tap-highlight-color: transparent;
    appearance: none;
    font-size: inherit;
    font-family: inherit;
    border: none;
    cursor: pointer;

    background-color: var(--primary-color);
    color: var(--base-color);
    padding: .5em 1em;
    border-radius: 1em;
    text-decoration: none;
    display: inline-flex;
    gap: .5em;
    align-items: center;
    box-shadow: 0 0 0 1em transparent;

    transition-property: scale, box-shadow, opacity;
    transition-duration: .2s;
}

.button:hover, .button:focus-visible {
    scale: 1.1;
}

.button:active {
    transition-duration: .1s;
    box-shadow: 0 0 0 2em var(--border-color);
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
    background-color: var(--base-color);
    color: var(--primary-color);
}

.button--warning {
    background-color: var(--warning-color);
    color: var(--primary-color);
}

.button__icon {
    display: block;
    width: 1.2em;
}
</style>