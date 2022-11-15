<script setup>

const props = defineProps({
    theme: {
        type: String,
        validator(value) {
            return ['dark', 'warning'].includes(value)
        }
    },
    to: {
        required: true
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
    <NuxtLink class="link" :class="[{'link--icon-only': !$slots.default}, (theme ? `link--${theme}` : ''), (visibility ? `link--${visibility}` : '')]" :to="props.to" target="_blank">
        <slot />
        <Component :is="props.icon" class="link__icon" />
    </NuxtLink>
</template>

<style scoped>
.link {
    -webkit-tap-highlight-color: transparent;
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

.link:hover, .link:focus-visible {
    scale: 1.1;
}

.link:active {
    transition-duration: .1s;
    box-shadow: inset 0 0 0 calc(var(--border-width) * 2) var(--primary-color);
    scale: 1;
}

.link--low {
    opacity: .1;
}

.link--low:hover, .link--low:focus-visible {
    opacity: 1;
}

.link--icon-only {
    padding: .5em .6em;
}

.link--dark {
    box-shadow: inset 0 0 0 var(--border-width) var(--base-color);
    color: var(--base-color);
}

.link--warning {
    box-shadow: inset 0 0 0 var(--border-width) var(--warning-color);
    color: var(--primary-color);
}

.link__icon {
    display: block;
    width: 1.2em;
}
</style>