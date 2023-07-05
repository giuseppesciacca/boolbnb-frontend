<script>
import { store } from '../store.js'
import axios from 'axios';
export default {
    name: 'HomeView',
    data() {
        return {
            store,
            apartments: null
        }
    },
    mounted() {
        axios
            .get(store.server + store.end_point_apartments)
            .then(response => {
                console.log(response.data);
                this.apartments = response.data.results
            })
            .catch(err => {
                console.log(err)
                console.log(err.message);
            })

    }
}
</script>

<template>
    <div class="container mt-4">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4" v-if="apartments">
            <div class="col h-100 mb-4" v-for="apartment in apartments">
                <div class="card text-left">
                    <img class="card-img-top" :src="`${store.server}storage/${apartment.image[0]}`" alt="">
                    <div class="card-body">
                        <h4 class="card-title">{{ apartment.title }}</h4>
                        <p class="card-text">{{apartment.description}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>