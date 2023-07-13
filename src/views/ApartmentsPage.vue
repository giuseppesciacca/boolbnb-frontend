<script>
import { store } from '../store.js'
import axios from 'axios'
export default {
    name: "ApartmentsPage",
    data() {
        return {
            store,
            apartments: [],
            all_apartments: null,
            text_to_search: "",
            text_to_convert: "",
            services: null,
            selected_service: [],
            range: 20,
            rooms: 1,
            beds: 1,
            suggestions: [],
            arrayAddressComplete: [],
            coordinate: {
                latitude: null,
                longitude: null,
            },
            city: '',
        };
    },
    methods: {
        /**
         * converte ciò che scriviamo nell'input in lat e lon
         */
        convertInLatLog() {
            const url = 'https://api.tomtom.com/search/2/geocode/';
            const address = this.text_to_convert + '.json'
            const apiKey = 'vPuUkOEvt9S93r8E98XRbrHJJG1Mz6Tr';
            const apiKeyAndOption = 'vPuUkOEvt9S93r8E98XRbrHJJG1Mz6Tr&limit=5&countrySet=IT&entityTypeSet=Municipality&extendedPostalCodesFor=Geo';
            const urlComplete = url + address + apiKeyAndOption;

            this.coordinate = {
                latitude: Number,
                longitude: Number,
            }

            if (this.text_to_convert.length > 2) {
                axios.get(urlComplete, {
                    params: {
                        key: apiKey
                    }
                })
                    .then(response => {
                        this.city = response.data.results[0].address.municipality;

                        this.coordinate = {
                            latitude: response.data.results[0].position.lat,
                            longitude: response.data.results[0].position.lon,
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        /**
         * 
         * @param {*} apartment 
         */
        select(apartment) {
            apartment.selected = !apartment.selected;
        },
        /**
         * cerca ciò che scriviamo tra gli appartamenti, nel titolo e nell'indirizzo
         */
        filter_apartments_by_input() {
            if (this.all_apartments) {
                this.apartments = []

                this.all_apartments.forEach((apartment) => {
                    if (apartment.title.toLowerCase().includes(this.text_to_search.toLowerCase()) || apartment.address.toLowerCase().includes(this.text_to_search.toLowerCase())) {

                        this.apartments.push(apartment)
                    }
                });
            }
        },
        /**
         * 
         * @param {double} lat1 
         * @param {double} lon1 
         * @param {double} lat2 
         * @param {double} lon2 
         * @returns {float} distanza tra due lat e long in km
         */
        distanceBetweenTwoLatAndLog(lat1, lon1, lat2, lon2) {
            const r = 6371000; // metres. raggio terrestre
            const phi1 = lat1 * Math.PI / 180; // φ, λ in radians
            const phi2 = lat2 * Math.PI / 180;
            const deltaPhy = (lat2 - lat1) * Math.PI / 180;
            const deltaLambda = (lon2 - lon1) * Math.PI / 180;

            const a = Math.sin(deltaPhy / 2) * Math.sin(deltaPhy / 2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = r * c; // in metres
            const distanceInKm = distance / 1000;
            const distanceInKmRounded = distanceInKm.toFixed(2)

            return distanceInKmRounded
        },
        /**
         * filtro dei servizi e per range
         */
        filter_apartments() {
            if (this.all_apartments) {
                this.apartments = []
                this.all_apartments.forEach((apartment) => {

                    if (this.range > this.distanceBetweenTwoLatAndLog(this.coordinate.latitude, this.coordinate.longitude, apartment.latitude, apartment.longitude)) {
                        if (apartment.rooms >= this.rooms && apartment.beds >= this.beds) {
                            if (this.selected_service.length === 0) {
                                this.apartments.push(apartment)
                            } else {
                                apartment.services.forEach(service => {
                                    if (this.selected_service.includes(service.name)) {
                                        if (!this.apartments.includes(apartment)) {
                                            this.apartments.push(apartment)
                                        }
                                    }
                                });
                            }

                        }
                    }
                });
            }
        },
    },
    mounted() {
        axios
            .get(store.server + store.end_point_apartments)
            .then(response => {
                //console.log(response.data);
                this.apartments = response.data.results.data;
                this.all_apartments = response.data.all_apartments;
                //console.log(this.all_apartments)
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            });

        axios
            .get(store.server + store.end_point_services)
            .then(response => {
                this.services = response.data.results;
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            });
    },
}
</script>

<template>
<div id="all-apartments">
    <div class="container mt-5">
        <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <label for="rooms" class="me-2">Rooms</label>
                    <input type="number" name="rooms" id="rooms" v-model="rooms">
                </div>
                <div class="my-2">
                    <label for="beds" class="me-2">Beds</label>
                    <input type="number" name="beds" id="beds" v-model="beds">
                </div>

                <div class="text-center my-2">

                    <p v-if="this.city == ''">
                        <label for="address" class="form-label">Dove vuoi andare?</label>
                    </p>
                    <p v-else>
                        <label for="address" class="form-label">Stai cercando la città di {{ this.city }}?</label>
                    </p>

                    <input type="text" name="address" id="address" class="form-control" placeholder="Dove vuoi andare?"
                        v-model="text_to_convert" aria-describedby="nameHelper" @keyup="convertInLatLog()">
                </div>

                <div>
                    <label for="raggio" class="me-2">Raggio kilometri {{ range }}</label>
                    <input type="range" name="raggio" id="raggio" min="1" max="40" v-model.number="range">
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
        <div class="d-flex justify-content-center align-items-center">
            <div class="text-center mt-0 mb-4 search-box">
                <button class="btn-search"><i class="fas fa-search"></i></button>
                <input type="text" v-model="text_to_search" class="input-search" placeholder="Digita per cercare..."
                    @keydown="filter_apartments_by_input()">
            </div>
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-primary mb-5" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Filtro</button>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4" v-if="apartments.length > 0">
            <div class="col rounded-4 mb-4" v-for="apartment in apartments" :key="apartment.title">
                <div class="card multi-card g-3 h-100 rounded-4 border-0 position-relative" :class="{ 'selected': apartment.selected }">
<!--                     <i class="fa-regular fa-heart fs-3 position-absolute" style="color: #ff0000;"
                        :class="apartment.selected ? 'fa-solid' : ''" @click="select(apartment)"></i> -->
                    <router-link class="text-decoration-none h-100 position-relative"
                        :to="{ name: 'single-apartment', params: { 'slug': apartment.slug } }">
                        <img class="card-img-top w-100 h-100 object-fit-cover rounded-4 shadow-lg"
                            :src="`${store.server}storage/${apartment.image[0]}`" :alt="apartment.name">
                            <p class="mb-0 details-badge">Vai ai dettagli... <i class="fa-solid fa-arrow-right"></i></p>
                    </router-link>
                    <div class="card-body">
                        <h6 class="h6-title">{{ apartment.title }}</h6>
                        <h6 class="h6-address">{{ apartment.address }}</h6>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-center">Nessun appartamento trovato!</p>
        </div>
    </div>
</div>
</template>


<!-- <style lang="scss" scoped>
.fa-heart {
    right: 20px;
    top: 20px;
    cursor: pointer;

}
</style> -->