<script>
import { store } from '../store.js'
import axios from 'axios';
import MapMarker from './MapMarker.vue';
export default {
    name: "SingleApartment",
    components: {
        MapMarker
    },
    data() {
        return {
            store,
            apartments: null,
            name: '',
            surname: '',
            email: '',
            message: '',
            apartment_id: '',
            loading: false,
            success: false,
            errors: {}
        }
    },
    methods: {
        submitForm(apartment) {
            this.loading = true
            const data = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                message: this.message,
                apartment_id: apartment
            }

            axios
                .post(store.server + store.end_point_messages, data)
                .then(response => {
                    if (!response.data.success) {
                        this.errors = response.data.errors

                    } else {
                        this.name = '',
                            this.surname = '',
                            this.email = '',
                            this.message = '',
                            this.success = true
                    }
                    this.loading = false

                })
                .catch(err => {
                    console.log(err);

                })

        }
    },

    mounted() {
        axios
            .get(store.server + store.end_point_apartments + this.$route.params.slug)
            .then((response) => {
                if (response.data.success) {
                    this.apartments = response.data.result
                    this.position = {
                        lng: this.apartments.longitude,
                        lat: this.apartments.latitude
                    }
                } else {
                    this.$router.push({
                        name: "error",
                        params: { pathMatch: this.$route.path.substring(1).split("/") }
                    });
                }
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
            <div class="card shadow p-5">
                <h1 class="card-title text-center text-uppercase">{{ apartments.title }}</h1>
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
                    <div class="form w-50">
                        <div class="card p-3 m-4 shadow">
                            <h4 class="text-center mb-3 fw-semibold">Contatta l'host di questo boolbnb</h4>
                            <div class="alert alert-success" role="alert" v-if="success">
                                <strong>Messaggio inviato!</strong> Presto riceverai una risposta
                            </div>
                            <form @submit.prevent="submitForm(apartments.id)">

                                <div class="mb-3">
                                    <label for="name" class="form-label">Nome:</label>
                                    <input type="text" name="name" id="name" class="form-control" placeholder="Piermario"
                                        aria-describedby="nameHelper" v-model="name">
                                    <small id="nameHelper" class="text-muted">Inserisci il tuo nome qui</small>
                                </div>
                                <div class="alert alert-primary" role="alert" v-for="error in errors.name"
                                    :key="`message-error-${index}`" :class="invalid - feedback">
                                    <strong>{{ error }}</strong>
                                </div>
                                <div class="mb-3">
                                    <label for="surname" class="form-label">Cognome:</label>
                                    <input type="text" name="surname" id="surname" class="form-control" placeholder="Rossi"
                                        aria-describedby="surnameHelper" v-model="surname">
                                    <small id="surnameHelper" class="text-muted">Inserisci il tuo nome qui</small>
                                </div>
                                <div class="alert alert-primary" role="alert" v-for="error in errors.surname"
                                    :key="`message-error-${index}`" :class="invalid - feedback">
                                    <strong>{{ error }}</strong>
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="form-label">E-Mail:</label>
                                    <input type="email" name="email" id="email" class="form-control"
                                        placeholder="piermariorossi@gmail.com" aria-describedby="emailHelper"
                                        v-model="email">
                                    <small id="emailHelper" class="text-muted">Inserisci la tua e-mail qui</small>
                                </div>
                                <div class="alert alert-primary" role="alert" v-for="error in errors.email"
                                    :key="`message-error-${index}`" :class="invalid - feedback">
                                    <strong>{{ error }}</strong>
                                </div>

                                <div class="mb-3">
                                    <label for="message" class="form-label">Messaggio:</label>
                                    <textarea class="form-control" name="message" id="message" rows="3"
                                        placeholder="Ciao vorrei contattarti in merito all'appartamento..."
                                        v-model="message"></textarea>
                                    <small id="messageHelper" class="text-muted">Inserisci il tuo messaggio qui</small>
                                </div>
                                <div class="alert alert-primary" role="alert" v-for="error in errors.message"
                                    :key="`message-error-${index}`" :class="invalid - feedback">
                                    <strong>{{ error }}</strong>
                                </div>
                                <div class="d-flex align-items-center justify-content-end gap-3">
                                    <button type="reset" class="btn-2">Reset</button>
                                    <button type="submit" class="btn-1 btn-1-blue" :disable="loading">Invia</button>
                                    
                                </div>
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
                    <MapMarker :lat="apartments.latitude" :lon="apartments.longitude" />
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>