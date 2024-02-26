<script>
import { store } from "../store.js";
import axios from "axios";
import MapMarker from "./MapMarker.vue";
import { faker } from "@faker-js/faker";

export default {
  name: "SingleApartment",
  components: {
    MapMarker,
  },
  data() {
    return {
      store,
      apartments: null,
      name: "",
      surname: "",
      email: "",
      message: "",
      apartment_id: "",
      loading: false,
      success: false,
      errors: {},
      currentDate: new Date(),
    };
  },
  methods: {
    /**
     * GET PER L'APT
     */
    getApartment() {
      axios
        .get(
          store.server +
            store.api_get.end_point_apartments +
            this.$route.params.slug
        )
        .then((response) => {
          if (response.data.success) {
            this.apartments = response.data.result;
            this.position = {
              lng: this.apartments.longitude,
              lat: this.apartments.latitude,
            };
            /**
             * POST PER LA VIEW
             */
            axios
              .post(store.server + store.api_post.end_point_views, {
                apartment_id: this.apartments.id,
                ip_address: faker.internet.ipv4(),
                date_view: this.currentDate
                  .toISOString()
                  .replace("T", " ")
                  .slice(0, 19),
              })
              .then((response) => {
                if (!response.data.success) {
                  this.errors = response.data.errors;
                }
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            this.$router.push({
              name: "error",
              params: { pathMatch: this.$route.path.substring(1).split("/") },
            });
          }
        })
        .catch((err) => {
          console.error(err);
          console.error(err.message);
        });
    },
    /**
     * submit form for message
     * @param {string} apartmentId
     */
    submitForm(apartmentId) {
      this.loading = true;
      const data = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        message: this.message,
        apartment_id: apartmentId,
      };

      axios
        .post(store.server + store.api_get.end_point_messages, data)
        .then((response) => {
          if (!response.data.success) {
            this.errors = response.data.errors;
          } else {
            (this.name = ""),
              (this.surname = ""),
              (this.email = ""),
              (this.message = ""),
              (this.success = true);
          }
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * reset form fields
     */
    resetForm() {
      this.errors = {};
    },
  },
  mounted() {
    this.getApartment();
  },
};
</script>

<template>
  <div class="container my-5">
    <div class="card p-5 shadow" v-if="apartments">
      <div class="row row-cols-1 row-cols-sm-2 g-5">
        <div class="col-auto">
          <h1 class="card-title text-center text-uppercase mt-3 mb-5 our-quote">
            {{ apartments.title }}
          </h1>
          <div class="primary-info d-flex flex-column">
            <div class="d-flex justify-content-between">
              <div
                class="badge p-2 btn-1 me-3 d-flex justify-content-center align-items-center gap-2"
              >
                <i class="fa-solid fa-house fa-lg"></i>
                <span class="align-bottom">{{ apartments.rooms }}</span>
                <span class="fw-light">Stanze</span>
              </div>

              <div
                class="badge p-2 btn-1 me-3 d-flex justify-content-center align-items-center gap-2"
              >
                <i class="fa-solid fa-bed fa-lg"></i>
                <span class="align-bottom">{{ apartments.beds }}</span>
                <span class="fw-light">Letti</span>
              </div>

              <div
                class="badge p-2 btn-1 me-3 d-flex justify-content-center align-items-center gap-2"
              >
                <i class="fa-solid fa-toilet fa-lg"></i>
                <span class="align-bottom">{{ apartments.bathrooms }}</span>
                <span class="fw-light">Bagni</span>
              </div>

              <div
                class="badge p-2 btn-1 me-3 d-flex justify-content-center align-items-center gap-2"
              >
                <i class="fa-solid fa-ruler fa-lg"></i>
                <span class="align-bottom">{{ apartments.square_meters }}</span>
                <span class="fw-light">m²</span>
              </div>
            </div>
            <span class="mb-0 mt-3"
              ><span class="fw-semibold">€{{ apartments.price }}</span>
              <span class="fw-light">a notte</span></span
            >
            <div class="mt-3">
              <p class="card-text mb-1 fs-5">Descrizione:</p>
              <p class="fw-light">{{ apartments.description }}</p>
            </div>
            <div class="card-footer px-0">
              <div class="d-flex gap-1 flex-wrap align-items-center">
                <div
                  class="badge p-2 btn-1 btn-1-blue d-flex justify-content-center align-items-center gap-2"
                  v-for="service in apartments.services"
                >
                  <i :class="service.image" class="fa-lg"></i>
                  <span class="fw-light">{{ service.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /description -->

        <div class="col-auto position-relative px-0">
          <div class="card p-2 shadow">
            <div
              id="carouselExampleCaptions"
              class="carousel slide"
              data-bs-ride="false"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    :src="`${store.server}storage/${apartments.image[0]}`"
                    class="d-block w-100"
                    alt="..."
                  />
                  <div class="carousel-caption d-none d-md-block"></div>
                </div>
                <div class="carousel-item">
                  <img
                    :src="`${store.server}storage/${apartments.image[1]}`"
                    class="d-block w-100"
                    alt="..."
                  />
                  <div class="carousel-caption d-none d-md-block"></div>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <!-- /carousel -->

        <div class="col-auto pt-5 mt-5">
          <h4
            class="our-address d-flex justify-content-start align-items-center gap-2 mb-0 my-2 py-2"
          >
            <i class="fa-solid fa-map-location-dot fa-lg"></i>
            <span>Indirizzo: {{ apartments.address }}</span>
          </h4>
          <MapMarker :lat="apartments.latitude" :lon="apartments.longitude" />
        </div>
        <!-- /map -->

        <div class="col-auto card shadow p-3 mt-5">
          <h4 class="text-center mb-3 fw-semibold">
            Contatta l'host di questo <span class="text-bool">boolbnb</span>
          </h4>
          <div class="alert alert-success" role="alert" v-if="success == true">
            <strong id="message_error">Messaggio inviato!</strong> Presto
            riceverai una risposta
          </div>
          <form @submit.prevent="submitForm(apartments.id)">
            <div class="mb-3">
              <label for="name" class="form-label">Nome:</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-control"
                placeholder="Piermario"
                aria-describedby="nameHelper"
                v-model="name"
              />
              <small id="nameHelper" class="text-muted"
                >Inserisci il tuo nome qui</small
              >
            </div>
            <div
              class="alert alert-danger"
              role="alert"
              v-for="error in errors.name"
              :key="`message-error-${index}`"
              :class="invalid - feedback"
            >
              <strong>{{ error }}</strong>
            </div>
            <div class="mb-3">
              <label for="surname" class="form-label">Cognome:</label>
              <input
                type="text"
                name="surname"
                id="surname"
                class="form-control"
                placeholder="Rossi"
                aria-describedby="surnameHelper"
                v-model="surname"
              />
              <small id="surnameHelper" class="text-muted"
                >Inserisci il tuo nome qui</small
              >
            </div>
            <div
              class="alert alert-danger"
              role="alert"
              v-for="error in errors.surname"
              :key="`message-error-${index}`"
              :class="invalid - feedback"
            >
              <strong>{{ error }}</strong>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">E-Mail:</label>
              <input
                type="email"
                name="email"
                id="email"
                class="form-control"
                placeholder="piermariorossi@gmail.com"
                aria-describedby="emailHelper"
                v-model="email"
              />
              <small id="emailHelper" class="text-muted"
                >Inserisci la tua e-mail qui</small
              >
            </div>
            <div
              class="alert alert-danger"
              role="alert"
              v-for="error in errors.email"
              v-if="errors.email && email === ''"
              :key="`message-error-${index}`"
              :class="invalid - feedback"
            >
              <strong>{{ error }}</strong>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">Messaggio:</label>
              <textarea
                class="form-control"
                name="message"
                id="message"
                rows="3"
                placeholder="Ciao vorrei contattarti in merito all'appartamento..."
                v-model="message"
              ></textarea>
              <small id="messageHelper" class="text-muted"
                >Inserisci il tuo messaggio qui</small
              >
            </div>
            <div
              class="alert alert-danger"
              role="alert"
              v-for="error in errors.message"
              :key="`message-error-${index}`"
              :class="invalid - feedback"
            >
              <strong>{{ error }}</strong>
            </div>
            <div class="d-flex align-items-center justify-content-end gap-3">
              <button type="reset" class="btn-2" @click="resetForm">
                Reset
              </button>
              <button type="submit" class="btn-1 btn-1-blue" @click="resetForm">
                Invia
              </button>
            </div>
          </form>
        </div>
        <!-- /form -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-control-next-icon,
.carousel-control-prev-icon {
  scale: 0.7;
}

img {
  aspect-ratio: 16 / 9;
}
</style>
