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
        <Component :is="icon" class="button__icon" />
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
    
    background-color: transparent;
    color: var(--primary-color);
    padding: .5em 1em;
    border-radius: 1em;
    box-shadow: inset 0 0 0 var(--border-width) var(--primary-color);
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
    box-shadow: inset 0 0 0 calc(var(--border-width) * 2) var(--primary-color);
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
    box-shadow: inset 0 0 0 var(--border-width) var(--base-color);
    color: var(--base-color);
}

.button--warning {
    box-shadow: inset 0 0 0 var(--border-width) var(--warning-color);
    color: var(--primary-color);
}

.button__icon {
    display: block;
    width: 1.2em;
}
</style>