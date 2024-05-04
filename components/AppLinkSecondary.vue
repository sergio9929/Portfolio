<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router';

const props = defineProps<{
    to: RouteLocationRaw,
    theme?: 'dark' | 'warning',
    icon?: string,
    visibility?: 'low'
}>()

</script>

<template>
    <NuxtLink class="link"
        :class="[{ 'link--icon-only': !$slots.default }, (theme ? `link--${theme}` : ''), (visibility ? `link--${visibility}` : '')]"
        :to="to" target="_blank">
        <slot />
        <Icon v-if="icon" :name="icon" class="link__icon" />
    </NuxtLink>
</template>

<style scoped>
.link {
    --color: var(--primary-color);

    -webkit-tap-highlight-color: transparent;
    box-shadow: inset 0 0 0 var(--border-width) var(--color);
    color: var(--color);
    padding: .5em 1em;
    border-radius: 1em;
    text-decoration: none;
    display: inline-flex;
    gap: .5em;
    align-items: center;

    transition: scale .2s, opacity .2s, box-shadow .5s, color .5s;
}

.link:hover,
.link:focus-visible {
    scale: 1.1;
}

.link:active {
    transition-duration: .1s;
    box-shadow: inset 0 0 0 calc(var(--border-width) * 2) var(--color);
    scale: 1;
}

.link--low {
    opacity: .3;
}

.link--low:hover,
.link--low:focus-visible {
    opacity: 1;
}

.link--icon-only {
    padding: .5678em .68em;
}

.link--dark {
    --color: var(--base-color);
}

.link--warning {
    --color: var(--warning-color);
}
</style>