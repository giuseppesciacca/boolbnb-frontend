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
    <div class="container my-5">
        <div class="card p-5 shadow" v-if="apartments">
            <div class="row row-cols-1 row-cols-sm-2 g-5">

                <div class="col-auto">
                    <h1 class="card-title text-center text-uppercase mt-3 mb-5 our-quote">{{ apartments.title }}</h1>
                    <div class="primary-info d-flex flex-column">
                        <div class="d-flex justify-content-between">
                            <div class="badge p-2 btn-1 me-3 d-flex justify-content-center align-items-center gap-2">
                                <i class="fa-solid fa-house fa-lg"></i>
                                <span class="align-bottom">{{ apartments.rooms }}</span>
                                <span class="fw-light">Stanze</span>
                            </div>

                            <div class="badge p-2 btn-1 me-3 d-flex justify-content-center align-items-center gap-2">
                                <i class="fa-solid fa-bed fa-lg"></i>
                                <span class="align-bottom">{{ apartments.beds }}</span>
                                <span class="fw-light">Letti</span>
                            </div>

                            <div class="badge p-2 btn-1 me-3 d-flex justify-content-center align-items-center gap-2">
                                <i class="fa-solid fa-toilet fa-lg"></i>
                                <span class="align-bottom">{{ apartments.bathrooms }}</span>
                                <span class="fw-light"> Bagni </span>
                            </div>


                            <div class="badge p-2 btn-1 me-3 d-flex justify-content-center align-items-center gap-2">
                                <i class="fa-solid fa-ruler fa-lg"></i>
                                <span class="align-bottom">{{ apartments.square_meters }}</span>
                                <span class="fw-light">m²</span>
                            </div>
                        </div>
                        <div class="mt-3">
                            <p class="card-text mb-1 fs-5">Descrizione:</p>
                            <p class="fw-light">{{ apartments.description }}</p>
                        </div>
                        <div class="card-footer px-2">
                            <div class="d-flex gap-1 flex-wrap">
                                <p v-for="service in apartments.services">
                                    <span class="badge btn-1 btn-1-blue p-2">{{
                                        service.name }}
                                    </span>
                                    <span>
                                        {{ service.image }}
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-auto position-relative px-0">
                    <div class="card p-2 shadow">
                        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
                            <div class="carousel-indicators">

                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1">
                                </button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                    aria-label="Slide 2">
                                </button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img :src="`${store.server}storage/${apartments.image[0]}`" class="d-block w-100"
                                        alt="...">
                                    <div class="carousel-caption d-none d-md-block">
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img :src="`${store.server}storage/${apartments.image[1]}`" class="d-block w-100"
                                        alt="...">
                                    <div class="carousel-caption d-none d-md-block">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="col-auto pt-5 mt-5">
                    <h4 class="our-address d-flex justify-content-start align-items-center gap-2 mb-0 my-2 py-2">
                        <i class="fa-solid fa-map-location-dot fa-lg"></i>
                        <span>Indirizzo: {{ apartments.address }}</span>
                    </h4>
                    <MapMarker :lat="apartments.latitude" :lon="apartments.longitude" />
                </div>

                <div class="col-auto card shadow p-3 mt-5">
                    <h4 class="text-center mb-3 fw-semibold">Contatta l'host di questo <span
                            class="text-bool">boolbnb</span></h4>
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
                                placeholder="piermariorossi@gmail.com" aria-describedby="emailHelper" v-model="email">
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
    </div>
</template>


<style lang="scss" scoped>
.carousel-control-next-icon,
.carousel-control-prev-icon {
    scale: 0.7;
}
</style>