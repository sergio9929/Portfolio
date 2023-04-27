<script setup>

const props = defineProps({
    theme: {
        type: String,
        validator(value) {
            return ['', 'light', 'dark', 'warning'].includes(value)
        }
    },
    to: {
        required: true
    },
    icon: String,
    visibility: {
        type: String,
        validator(value) {
            return value == 'low'
        }
    }
})

</script>

<template>
    <NuxtLink class="link" :class="[{'link--icon-only': !$slots.default}, (theme ? `link--${theme}` : ''), (visibility ? `link--${visibility}` : '')]" :to="to" target="_blank">
        <slot />
        <Icon v-if="icon" :name="icon" class="link__icon" />
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

    transition: scale .2s, opacity .2s, box-shadow .5s, color .5s;
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
    opacity: .3;
}

.link--low:hover, .link--low:focus-visible {
    opacity: 1;
}

.link--icon-only {
    padding: .5678em .68em;
}

.link--dark {
    --color: var(--primary-color);
    --background-color: var(--base-color-hsl);
}

.link--warning {
    --color: var(--primary-color);
    --background-color: var(--warning-color-hsl);
}
</style>