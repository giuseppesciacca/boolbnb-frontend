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
            text_to_convert: '',
            services: null,
            selected_service: [],
            range: 10,
            rooms: 1,
            beds: 1,
            suggestions: [],
            arrayAddressComplete: [],
            coordinate: {
                latitude: null,
                longitude: null,
            },
            city: '',
        }
    },
    methods: {
        tomtom() {
            const ulElement = document.getElementById('list_address');

            this.suggestions = []; //svuoto i suggestions
            this.arrayAddressComplete = [] //svuoto l'array di indirizzi
            ulElement.innerHTML = ''; //svuoto l'elemento <ul>

            /* creazione endpoint */
            const baseUrl = 'https://api.tomtom.com/search/2/search/';
            const address = this.text_to_search + '.json?';
            const keyTomTomAndTypeahead = 'key=VTS7KTu4nrOLxN010rCYu364QXAVRCfK&typeahead=true&language=it-IT&limit=5&countrySet=IT';
            const endpoint = baseUrl + address + keyTomTomAndTypeahead;
            /* **** */

            if (this.text_to_search.length > 1) {
                fetch(endpoint)
                    .then(response => response.json())
                    .then(data => {
                        this.suggestions.push(data.results)

                        this.suggestions.forEach(element => {
                            //console.log(element);

                            element.forEach(element_inside => {

                                //console.log(element_inside);

                                const addressComplete = element_inside.address.freeformAddress + ' ' + element_inside.position.lat + ' ' + element_inside.position.lon;

                                this.arrayAddressComplete.push(addressComplete);
                            });

                            this.arrayAddressComplete.forEach(singleAddress => {
                                const liEl = document.createElement('li');

                                liEl.innerHTML = singleAddress; //metto ogni singolo indirizzo nei list item

                                ulElement.append(liEl); //li appendo nell'ul

                                liEl.addEventListener('click', function () {
                                    //al click del suggerimento lo inserisce nell'input
                                    this.text_to_search = liEl.childNodes[0].data
                                })
                            });
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            };
        },

        tomtom2() {
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
                        console.log('Stai cercando la città di ' + response.data.results[0].address.municipality);

                        this.city = response.data.results[0].address.municipality;


                        console.log(response.data.results[0].position.lat);
                        console.log(response.data.results[0].position.lon);
                        this.coordinate = {
                            latitude: response.data.results[0].position.lat,
                            longitude: response.data.results[0].position.lon,
                        }

                        console.log(this.coordinate);
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
         * 
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
        }
    },
    mounted() {
        /**
         * prende tutti gli appartamenti
         */
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
            });

    },
}
</script>

<template>
    <div class="container mt-5">
        <div class="text-center my-5">

            <p v-if="this.city == ''">
                <label for="address" class="form-label">Dove vuoi andare?</label>
            </p>
            <p v-else>
                <label for="address" class="form-label">Stai cercando la città di {{ this.city }}?</label>
            </p>

            <input type="text" name="address" id="address" class="form-control" placeholder="Dove vuoi andare?"
                v-model="text_to_convert" aria-describedby="nameHelper" @keyup="tomtom2()">

            <ul id="list_address" class="list-unstyled">
            </ul>
        </div>

        <!--         
        <div class="text-center my-5">
            <label for="address" class="form-label">Dove vuoi andare?</label>
            <input type="text" name="address" id="address" class="form-control" placeholder="Dove vuoi andare?"
                v-model="text_to_search" aria-describedby="nameHelper" @keyup="tomtom()" v-on:keyup.enter="printlatlon()">

            <ul id="list_address" class="list-unstyled">
            </ul>
        </div> -->

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