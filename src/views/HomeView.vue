<script>
import { store } from '../store.js'
import axios from 'axios';
export default {
    name: 'HomeView',
    data() {
        return {
            store,
            apartments: [],
            all_apartments: null,
            text_to_search: '',
            services: null,
            selected_service: [],
            range: 10,
            rooms: 1,
            beds: 1
        }
    },
    methods: {
        select(apartment) {
            apartment.selected = !apartment.selected;
        },
        filter_apartments_by_input() {
            if (this.all_apartments) {
                this.apartments = []
                this.all_apartments.forEach((apartment) => {
                    if (apartment.title.toLowerCase().includes(this.text_to_search.toLowerCase()) || apartment.address.toLowerCase().includes(this.text_to_search.toLowerCase())) {
                        this.apartments.push(apartment)
                    }
                });
            }
        }
    },
    mounted() {
        axios
            .get(store.server + store.end_point_apartments)
            .then(response => {
                //console.log(response.data);
                this.apartments = response.data.results.data
                this.all_apartments = response.data.all_apartments
                //console.log(this.all_apartments)
            })
            .catch(err => {
                console.log(err)
                console.log(err.message);
            })
        axios
            .get(store.server + store.end_point_services)
            .then(response => {
                this.services = response.data.results
            })
            .catch(err => {
                console.log(err)
                console.log(err.message);
            })

    }
}
</script>

<template>
    <!--     <div class="container mt-5">
        <div class="text-center my-5">
            <input type="text" v-model="text_to_search" @keydown="filter_apartments_by_input()">
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4" v-if="apartments.length > 0">
            <div class="col rounded-4 mb-4" v-for="apartment in apartments" :key="apartment.title">
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
            </div>
        </div>
        <div v-else>
            <p class="text-center">Nessun appartamento trovato!</p>
        </div>
    </div> -->
    <div class="container">
        <h1>to dev</h1>
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';

.fa-heart {
    right: 20px;
    top: 20px;
    cursor: pointer;

}

.fa-eye {
    left: 20px;
    top: 20px;
    cursor: pointer;
}
</style>