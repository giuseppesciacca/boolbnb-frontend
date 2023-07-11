<script>
import { store } from '../store.js'
export default {
    name: "CardComponent",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div class="card h-100 rounded-4 border-0 position-relative" :class="{ 'selected': apartment.selected }">
        <router-link :to="{ name: 'single-apartment', params: { 'slug': apartment.slug } }"><i
                class="fa-regular fa-eye fs-3 position-absolute" style="color: #d4ecff;"></i></router-link>
        <i class="fa-regular fa-heart fs-3 position-absolute" style="color: #ff0000;"
            :class="apartment.selected ? 'fa-solid' : ''" @click="select(apartment)"></i>
        <img class="card-img-top w-100 h-100 object-fit-cover rounded-4 shadow-lg"
            :src="`${store.server}storage/${apartment.image[0]}`" :alt="apartment.name">
        <div class="card-body">
            <h6 class="text-left fw-semibold">{{ apartment.title }}</h6>
            <small>{{ apartment.address }}</small>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>