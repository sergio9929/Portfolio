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
            return obj.width && obj.imgWidth && obj.height
        },
        required: true
    }
})

</script>

<template>
    <div class="element" :style="{ backgroundColor: props.backgroundColor }">
        <img :src="props.src" alt="" class="element__img" :style="{ borderColor: props.borderColor }">
    </div>
</template>

<style>
.element {
    width: v-bind('props.options.width + "rem"');
    height: v-bind('props.options.height + "rem"');
    position: relative;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 0 0 0 v-bind('props.backgroundColor');

    transition: box-shadow .2s;
}

.element__img {
    width: v-bind('props.options.imgWidth + "rem"');
    height: auto;
    display: block;
    border-radius: .5rem .5rem 0 0;
    pointer-events: none;
    scale: .5;
    opacity: 0;
    transform-origin: bottom;
    border: 1px solid transparent;
    border-bottom-width: 0;

    transition: border-radius .2s;
}

.element:hover {
    box-shadow: 0 0 0 .5em v-bind('props.backgroundColor');
    z-index: 1;
}

.element:hover .element__img {
    border-radius: .5rem;
}

@media (max-width: 768px) {
    .element {
        border-radius: 1.2rem;
    }

    .element__img {
        border-radius: .3rem .3rem 0 0;
    }

    .element:hover .element__img {
    border-radius: .3rem;
}
}
</style>