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
    <span class="button" :class="[{'button--icon-only': !$slots.default}, (theme ? `button--${theme}` : ''), (visibility ? `button--${visibility}` : '')]">
        <slot />
        <Component :is="props.icon" class="button__icon" />
    </span>
</template>

<style scoped>
.button {
    --color: var(--base-color);
    --background-color: var(--primary-color-hsl);
    
    background-color: hsl(var(--background-color));
    color: var(--color);
    padding: .5em 1em;
    border-radius: 1em;
    text-decoration: none;
    display: inline-flex;
    gap: .5em;
    align-items: center;
}

.button--low {
    opacity: .1;
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