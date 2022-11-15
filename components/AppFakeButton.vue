<script setup>

const props = defineProps({
    theme: {
        type: String,
        validator(value) {
            return ['dark', 'warning'].includes(value)
        }
    },
    icon: {}
})

</script>

<template>
    <span class="button" :class="[{'button--icon-only': !$slots.default}, (theme ? `button--${theme}` : '')]">
        <slot />
        <Component :is="props.icon" class="button__icon" />
    </span>
</template>

<style scoped>
.button {
    background-color: var(--primary-color);
    color: var(--base-color);
    padding: .5em 1em;
    border-radius: 1em;
    text-decoration: none;
    display: inline-flex;
    gap: .5em;
    align-items: center;

    transition: scale .2s;
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
    width: 1.5em;
}
</style>