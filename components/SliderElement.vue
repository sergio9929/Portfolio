<script setup lang="ts">
const props = defineProps<{
    backgroundColor: string,
    borderColor: string,
    src: string,
    options: {
        width: string,
        gap: string
    }
}>()
</script>

<template>
    <div class="element">
        <div class="element__fade"></div>
        <div class="element__background"></div>
        <NuxtImg format="webp" :src="src" sizes="mobile:90vw desktop:70vw" class="element__img"
            :style="{ borderColor: borderColor }" alt="" width="1500" height="1100" />
    </div>
</template>

<style>
.element {
    width: v-bind('options.width');
    height: auto;
    /* aspect-ratio: 15 / 11; */
    position: absolute;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 0 0 0 v-bind('backgroundColor');
    background-color: v-bind('backgroundColor');

    transition: box-shadow .2s;
}

.element:hover {
    box-shadow: 0 0 0 .5em v-bind('backgroundColor');
}

.element__background {
    position: absolute;
    inset: 0;
    opacity: .6;
    background-color: v-bind('backgroundColor');
}

.element__fade {
    position: absolute;
    inset: 0;
    z-index: 1;
}

.element__img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: .5rem;
    pointer-events: none;
}

@media (max-width: 768px) {
    .element {
        width: 100%;
        border-radius: 1.2rem;
    }

    .element:hover {
        box-shadow: none;
    }

    .element__img {
        border-radius: .3rem;
    }
}
</style>