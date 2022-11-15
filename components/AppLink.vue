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
    --color: var(--base-color);
    --background-color: var(--primary-color-hsl);

    -webkit-tap-highlight-color: transparent;
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

.link:hover, .link:focus-visible {
    scale: 1.1;
}

.link:active {
    transition-duration: .1s;
    box-shadow: 0 0 0 2em hsl(var(--background-color) / 10%);
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
    --color: var(--primary-color);
    --background-color: var(--base-color-hsl);
}

.link--warning {
    --color: var(--primary-color);
    --background-color: var(--warning-color-hsl);
}

.link__icon {
    display: block;
    width: 1.2em;
}
</style>