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
    --color: var(--primary-color);
    
    box-shadow: inset 0 0 0 var(--border-width) var(--color);
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
    --color: var(--base-color);
}

.button--warning {
    --color: var(--warning-color);
}

.button__icon {
    display: block;
    width: 1.2em;
}
</style>