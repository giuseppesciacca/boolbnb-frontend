<script>
import { store } from "../store.js";
import axios from "axios";
export default {
  name: "ApartmentsPage",
  data() {
    return {
      store,
      apartments: [],
      all_apartments: [],
      all_apartments_sponsored: [],
      clean_apartments: [],
      text_to_convert: "",
      services: [],
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
      city: "",
    };
  },
  methods: {
    /**
     * GET all_apartments, all_apartments_sponsored, clean_apartments, call removeSponsoredApartmentFromAllApartments()
     */
    getAllApartments() {
      axios
        .get(store.server + store.api_get.end_point_apartments)
        .then((response) => {
          this.apartments = response.data.results.data;
          this.all_apartments = response.data.all_apartments;
          this.all_apartments_sponsored =
            response.data.all_apartments_sponsored.data;
          this.clean_apartments = response.data.all_apartments_sponsored.data;
          this.removeSponsoredApartmentFromAllApartments();
        })
        .catch((err) => {
          console.error(err);
          console.error(err.message);
        });
    },
    /**
     * GET prende tutti i servizi e li mette in services[];
     */
    getAllServices() {
      axios
        .get(store.server + store.api_get.end_point_services)
        .then((response) => {
          this.services = response.data.results;
        })
        .catch((err) => {
          console.error(err);
          console.error(err.message);
        });
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
      const phi1 = (lat1 * Math.PI) / 180; // φ, λ in radians
      const phi2 = (lat2 * Math.PI) / 180;
      const deltaPhy = ((lat2 - lat1) * Math.PI) / 180;
      const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(deltaPhy / 2) * Math.sin(deltaPhy / 2) +
        Math.cos(phi1) *
          Math.cos(phi2) *
          Math.sin(deltaLambda / 2) *
          Math.sin(deltaLambda / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = r * c; // in metres
      const distanceInKm = distance / 1000;
      const distanceInKmRounded = distanceInKm.toFixed(2);

      return distanceInKmRounded;
    },
    /**
     * resetta i filtri
     */
    resetFilter() {
      this.rooms = 1;
      this.beds = 1;
      this.selected_service = [];
      this.range = 20;
    },
    /**
     * remove Sponsored Apartment From All Apartments
     * @returns Array apartments[]
     */
    removeSponsoredApartmentFromAllApartments() {
      this.apartments = this.all_apartments.filter((element1) => {
        return !this.all_apartments_sponsored.some(
          (element2) => element2.title === element1.title
        );
      });
    },
    /**
     * clicca sullo span #suggestion_city per cambiare il value di input
     */
    changeInputValue() {
      this.text_to_convert = this.city;
    },
  },
  computed: {
    /**
     * filtro dei servizi e per range
     */
    filter_apartments: function () {
      if (this.all_apartments_sponsored) {
        this.clean_apartments = [];
        this.all_apartments_sponsored.forEach((apartment) => {
          if (
            this.range >
              this.distanceBetweenTwoLatAndLog(
                this.coordinate.latitude,
                this.coordinate.longitude,
                apartment.latitude,
                apartment.longitude
              ) ||
            this.text_to_convert == false
          ) {
            if (apartment.rooms >= this.rooms && apartment.beds >= this.beds) {
              if (this.selected_service.length === 0) {
                this.clean_apartments.push(apartment);
              } else {
                apartment.services.forEach((service) => {
                  if (this.selected_service.includes(service.name)) {
                    if (!this.clean_apartments.includes(apartment)) {
                      this.clean_apartments.push(apartment);
                    }
                  }
                });
              }
            }
          }
        });
      }

      if (this.all_apartments) {
        this.apartments = [];
        this.all_apartments.forEach((apartment) => {
          if (
            this.range >
              this.distanceBetweenTwoLatAndLog(
                this.coordinate.latitude,
                this.coordinate.longitude,
                apartment.latitude,
                apartment.longitude
              ) ||
            this.text_to_convert == false
          ) {
            if (apartment.rooms >= this.rooms && apartment.beds >= this.beds) {
              if (this.selected_service.length === 0) {
                this.apartments.push(apartment);

                this.apartments = this.apartments.filter((element1) => {
                  return !this.clean_apartments.some(
                    (element2) => element2.title === element1.title
                  );
                });
              } else {
                apartment.services.forEach((service) => {
                  if (this.selected_service.includes(service.name)) {
                    if (!this.apartments.includes(apartment)) {
                      this.apartments.push(apartment);

                      this.apartments = this.apartments.filter((element1) => {
                        return !this.clean_apartments.some(
                          (element2) => element2.title === element1.title
                        );
                      });
                    }
                  }
                });
              }
            }
          }
        });
      }
    },
    /**
     * converte ciò che scriviamo nell'input in lat e lon
     */
    convertInLatLog: function () {
      const url = "https://api.tomtom.com/search/2/geocode/";
      const address = this.text_to_convert + ".json";
      const apiKey = "vPuUkOEvt9S93r8E98XRbrHJJG1Mz6Tr";
      const apiKeyAndOption =
        "vPuUkOEvt9S93r8E98XRbrHJJG1Mz6Tr&limit=5&countrySet=IT&entityTypeSet=Municipality&extendedPostalCodesFor=Geo";
      const urlComplete = url + address + apiKeyAndOption;

      this.coordinate = {
        latitude: Number,
        longitude: Number,
      };

      if (this.text_to_convert.length > 2) {
        axios
          .get(urlComplete, {
            params: {
              key: apiKey,
            },
          })
          .then((response) => {
            this.city = response.data.results[0].address.municipality;

            this.coordinate = {
              latitude: response.data.results[0].position.lat,
              longitude: response.data.results[0].position.lon,
            };
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  mounted() {
    this.getAllApartments();
    this.getAllServices();
  },
};
</script>

<template>
  <div id="apartments-page">
    <div class="container mt-5">
      <div
        class="offcanvas offcanvas-start w-auto"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div
            class="top-off-canvas d-flex flex-column justify-content-lg-between align-items-start"
          >
            <div
              class="range mb-3 d-flex align-items-center justify-content-center gap-2"
            >
              <label for="raggio">Raggio</label>
              <input
                type="range"
                name="raggio"
                id="raggio"
                min="1"
                max="40"
                class="me-3"
                v-model.number="range"
              />
              <span class="h2 range-width">{{ range }}</span
              ><span>Km</span>
            </div>
            <div
              class="control-div mb-3 d-flex align-items-center justify-content-between gap-2"
            >
              <i class="fa-solid fa-house fa-lg"></i>
              <input
                type="number"
                class="w-50"
                min="1"
                name="rooms"
                id="rooms"
                v-model="rooms"
              />
              <label for="rooms">Stanze</label>
            </div>
            <div
              class="control-div mb-3 d-flex align-items-center justify-content-between gap-2"
            >
              <i class="fa-solid fa-bed fa-lg"></i>
              <input
                type="number"
                class="w-50"
                min="1"
                name="beds"
                id="beds"
                v-model="beds"
              />
              <label for="beds">Letti</label>
            </div>
          </div>
          <div v-if="services" class="my-3 mb-4 d-flex flex-column">
            <div
              class="d-flex justify-content-start align-items-center gap-2 my-1"
              v-for="service in services"
            >
              <input
                type="checkbox"
                class="ms-1"
                :value="service.name"
                :id="service.name"
                v-model="selected_service"
              />
              <label
                class="control-box d-flex justify-content-start align-items-center gap-2"
                :for="service.name"
                ><i :class="service.image" class="me-1 fa-lg"></i
                >{{ service.name }}</label
              >
            </div>
          </div>
          <div class="buttons text-center">
            <button
              type="reset"
              class="btn-2 mt-1 mb-2 me-lg-2 me-md-2 me-sm-2 me-0"
              @click="resetFilter()"
            >
              Reset
            </button>
            <button
              class="btn-1"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              @click="filter_apartments"
            >
              Cerca
            </button>
          </div>
        </div>
      </div>
      <div class="mb-5 text-center">
        <p v-if="this.city === ''" class="m-0">
          <label for="address" class="form-label mb-0">Dove vuoi andare?</label>
        </p>
        <p v-else class="m-0">
          <label for="address" class="form-label mb-0"
            >Stai cercando la città di
            <span
              id="suggestion_city"
              class="fs-5"
              @click="changeInputValue()"
              >{{ this.city }}</span
            >
            ?</label
          >
        </p>
        <div class="text-center my-2 d-inline-block mx-3">
          <div class="text-center mt-0 search-box">
            <button class="btn-search" aria-label="search button">
              <i class="fas fa-search" @click="filter_apartments"></i>
            </button>
            <input
              type="text"
              name="address"
              id="address"
              class="input-search"
              placeholder="Cerca una città..."
              v-model="text_to_convert"
              @keyup="convertInLatLog"
              @keydown.enter="filter_apartments"
            />
          </div>
        </div>
        <button
          class="btn-1"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >
          Filtri
        </button>
      </div>

      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-lg-4"
        v-if="apartments.length > 0"
      >
        <div
          class="col rounded-4 mb-4"
          v-for="apartment in clean_apartments"
          :key="apartment.title"
        >
          <div v-if="apartment.visibility === 1">
            <div
              class="sponsored card multi-card h-100 rounded-4 border-0 position-relative"
              :class="{ selected: apartment.selected }"
            >
              <i class="fa-solid fa-crown"></i>
              <router-link
                class="text-decoration-none h-100 position-relative"
                :to="{
                  name: 'single-apartment',
                  params: { slug: apartment.slug },
                }"
              >
                <img
                  fetchpriority="high"
                  class="card-img-top w-100 h-100 object-fit-cover rounded-4 shadow-lg"
                  :src="`${store.server}storage/${apartment.image[0]}`"
                  :alt="apartment.title"
                />
                <p class="mb-0 details-badge">
                  Vai ai dettagli... <i class="fa-solid fa-arrow-right"></i>
                </p>
              </router-link>
              <div class="card-body">
                <h6 class="fs-6 fw-semibold">{{ apartment.title }}</h6>
                <div>
                  €{{ apartment.price }}<span class="fw-light"> a notte</span>
                </div>
                <small class="text-secondary">{{ apartment.address }}</small>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col rounded-4 mb-4"
          v-for="apartment in apartments"
          :key="apartment.title"
        >
          <div v-if="apartment.visibility === 1">
            <div
              class="card multi-card h-100 rounded-4 border-0 position-relative"
              :class="{ selected: apartment.selected }"
            >
              <router-link
                class="text-decoration-none h-100 position-relative"
                :to="{
                  name: 'single-apartment',
                  params: { slug: apartment.slug },
                }"
              >
                <img
                  loading="lazy"
                  class="card-img-top w-100 h-100 object-fit-cover rounded-4 shadow-lg"
                  :src="`${store.server}storage/${apartment.image[0]}`"
                  :alt="apartment.title"
                />
                <p class="mb-0 details-badge">
                  Vai ai dettagli... <i class="fa-solid fa-arrow-right"></i>
                </p>
              </router-link>
              <div class="card-body">
                <h6 class="fs-6 fw-semibold">{{ apartment.title }}</h6>
                <div>
                  €{{ apartment.price }}<span class="fw-light"> a notte</span>
                </div>
                <small class="text-secondary">{{ apartment.address }}</small>
              </div>
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
