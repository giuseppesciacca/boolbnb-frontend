<script>
import { store } from '../store.js'
import axios from 'axios';
export default {
    name: "SingleApartment",
    data() {
        return {
            store,
            apartments: null
        }
    },
    methods: {
        /**
         * 
         * @param {double} lat1 
         * @param {double} lon1 
         * @param {double} lat2 
         * @param {double} lon2 
         * @returns {float} distanza tra due lat e long
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

            return distanceInKm
        }

    },
    mounted() {

        axios
            .get(store.server + store.end_point_apartments + this.$route.params.slug)
            .then(response => {
                //console.log(response.data.result);
                this.apartments = response.data.result
                this.map = tt.map({
                    container: 'map',
                    key: 'pgm8CUe9eprWlGQKZLpGGv3UIBBCl7RG',
                    center: [this.apartments.longitude, this.apartments.latitude],
                    zoom: 14,
                    radius: 20000
                });

                const element = document.createElement('div')
                element.id = 'marker'

                const marker = new tt.Marker({ element: element }).setLngLat([this.apartments.longitude, this.apartments.latitude]).addTo(map);
            })
            .catch(err => {
                console.log(err)
                console.log(err.message);
            })
    }
}
</script>

<template>
    <div class="container">
        <div class="row py-4" v-if="apartments">
            <div>
                <p>Distanza tra lat e log scelte da me e questo appartamento:
                    <strong>
                        {{ distanceBetweenTwoLatAndLog(38.019050000000, 12.519150000000, this.apartments.latitude,
                            this.apartments.longitude) }}
                    </strong> km.
                </p>
            </div>

            <div class="card shadow p-5">
                <h1 class="card-title">{{ apartments.title }}</h1>
                <div class="card p-2 m-4 shadow">
                    <img class="card-img-top" :src="`${store.server}storage/${apartments.image[0]}`" alt="Title">
                </div>
                <h4> {{ apartments.address }}</h4>
                <div class="info d-flex justify-content-between">
                    <div class="primary-info d-flex flex-column w-75">
                        <h6>
                            <span class="badge bg-primary">{{ apartments.beds }}</span> Letti |
                            <span class="badge bg-primary">{{ apartments.bathrooms }}</span> Bagni |
                            <span class="badge bg-primary">{{ apartments.rooms }}</span> Stanze |
                            <span class="badge bg-primary">{{ apartments.square_meters }}</span> Metri Quadri
                        </h6>
                        <p class="card-text">Descrizione appartamento:</p>
                        <p>{{ apartments.description }}</p>
                    </div>
                    <div class="form w-100">
                        <div class="card p-3 m-4 shadow">
                            <h4>
                                Richiedi info sull'appartamento
                            </h4>
                            <form action="" @submit.prevent="submitform()">

                                <div class="mb-3">
                                    <label for="" class="form-label">Nome</label>
                                    <input type="text" name="" id="" class="form-control" placeholder="Piermario Rossi"
                                        aria-describedby="nameHelper" v-model="name">
                                    <small id="nameHelper" class="text-muted">Inserisci il tuo nome qui</small>
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" name="email" id="email" class="form-control"
                                        placeholder="Piermariorossi@gmail.com" aria-describedby="emailHelper"
                                        v-model="email">
                                    <small id="emailHelper" class="text-muted">Inserisci la tua email qui</small>
                                </div>

                                <div class="mb-3">
                                    <label for="message" class="form-label">Inserisci il tuo messaggio qui</label>
                                    <textarea class="form-control" name="message" id="message" rows="3"
                                        placeholder="Ciao vorrei contattarti in merito a..." v-model="message"></textarea>
                                </div>

                                <button type="submit" class="btn btn-primary" :disable="loading">Invia</button>
                            </form>

                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    Servizi:
                    <div class="d-flex gap-1">
                        <p v-for="service in apartments.services">
                            <span class="badge rounded-pill text-bg-primary">{{ service.name }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
        <div class="row">
            <div id="map" style="height: 300px;" class="d-block mb-5"></div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>