<script setup lang="ts">
const props = defineProps<{ stars: number }>()
</script>

<template>
    <div class="text-with-stars">
        <div class="text-with-stars__text">
            <slot />
        </div>
        <span class="text-with-stars__stars">
            <AppStar v-for="i in stars" :key="i" />
        </span>
    </div>
</template>

<style scoped>
.text-with-stars {
    display: inline-flex;
    align-items: center;
    gap: .5em;
}
</style>