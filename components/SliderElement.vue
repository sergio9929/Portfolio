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

</script>

<template>
    <div class="element" :style="{ backgroundColor: props.backgroundColor }">
        <div class="element__fade"></div>
        <div class="element__background"></div>
        <img :src="props.src" alt="" class="element__img" :style="{ borderColor: props.borderColor }">
    </div>
</template>

<style>
.element {
    width: v-bind('props.options.width + "rem"');
    height: auto;
    aspect-ratio: 15 / 11;
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
    border-radius: .5rem .5rem 0 0;
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
        border-radius: .3rem .3rem 0 0;
    }
}
</style>