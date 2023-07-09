<script>
import { store } from '../store.js'
import axios from 'axios'
export default {
    name: 'Apartmentspage',
    data() {
        return {
            store,
            apartments: [],
            all_apartments: null,
            text_to_search: '',
            services: null,
            selected_service: [],
            range:10
        }
    },
    methods: {
        select(apartment) {
            apartment.selected = !apartment.selected;
        },
        filter_apartments() {
            if (this.all_apartments) {
                this.apartments = []
                this.all_apartments.forEach((apartment) => {
                    if (apartment.services.length > 0) {
                        apartment.services.forEach(service => {
                            if (this.selected_service.includes(service.name)) {
                                this.apartments.push(apartment)
                            }
                        });
                    }
                });
            }
        },
        filter_apartments_by_input(){
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
    <div class="container mt-5">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions">Filter</button>

        <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <label for="rooms" class="me-2">Rooms</label>
                    <input type="number" name="rooms" id="rooms">
                </div>
                <div class="my-2">
                    <label for="beds" class="me-2">Beds</label>
                    <input type="number" name="beds" id="beds">
                </div>
                <div>
                    <label for="raggio" class="me-2">Raggio kilometri {{ range }}</label>
                    <input type="range" name="raggio" id="raggio" min="1" max="20" v-model.number="range">
                </div>
                <div v-if="services" class="my-3">
                    <div class="d-inline-block me-4" v-for="service in services">
                        <label :for="service.name">{{ service.name }}</label>
                        <input type="checkbox" class="ms-1" :value="service.name" :id="service.name"
                            v-model="selected_service">
                    </div>
                </div>
                <button class="d-block mb-3 btn btn-primary" @click="filter_apartments()">Cerca appartamento</button>
            </div>
        </div>
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
    </div>
</template>


<style lang="scss" scoped>
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