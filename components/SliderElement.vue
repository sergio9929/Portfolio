<script setup>
const props = defineProps({
    backgroundColor: {
        type: String,
        required: true
    },
    borderColor: String,
    src: {
        type: String,
        required: true
    },
    options: {
        type: Object,
        validator(obj) {
            return obj.width
        },
        required: true
    }
})

const webp = encodeURIComponent(props.src.replace(/\.[^/.]+$/, ".webp"))

</script>

<template>
    <div class="element" :style="{ backgroundColor: props.backgroundColor }">
        <div class="element__fade"></div>
        <div class="element__background"></div>
        <img :src="props.src" width="1500" height="1100" alt="" sizes="(max-width: 768px) 90vw, 70vw" :srcset="(`mobile/${webp} 691w, desktop/${webp} 1344w`)" class="element__img" :style="{ borderColor: props.borderColor }" />
        <!-- replace this ↑ with the commented component ↓ and remove all .webp images when nuxt/image fixes static generation -->
        <!-- <NuxtImg format="webp" :src="props.src" sizes="mobile:90vw desktop:70vw" class="element__img" :style="{ borderColor: props.borderColor }" alt="" width="1500" height="1100" /> -->
    </div>
</template>

<style>
.element {
    width: v-bind('props.options.width + "rem"');
    height: auto;
    /* aspect-ratio: 15 / 11; */
    position: absolute;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 0 0 0 v-bind('props.backgroundColor');

    transition: box-shadow .2s;
}

.element:hover {
    box-shadow: 0 0 0 .5em v-bind('props.backgroundColor');
}

.element__background {
    position: absolute;
    inset: 0;
    opacity: .6;
    background-color: v-bind('props.backgroundColor');
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