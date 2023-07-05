<script>
import { store } from '../store.js'
import axios from 'axios'
export default {
    name: 'ApartmentsPage',
    data() {
        return {
            store,
            apartments:null
        }
    },
    mounted() {
        axios
            .get(store.server + store.end_point_apartments)
            .then(response => {
                console.log(response.data);
                this.apartments = response.data.results.data
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
        <div class="text-center my-5">
            <span class="d-block mb-3">Cerca appartamento</span>
            <input type="text">
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4" v-if="apartments">
            <div class="col h-100 mb-4" v-for="apartment in apartments">
                <div class="card text-left">
                    <img class="card-img-top img-fluid" :src="`${store.server}storage/${apartment.image[0]}`" alt="">
                    <div class="card-body">
                        <h4 class="card-title">{{ apartment.title }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>