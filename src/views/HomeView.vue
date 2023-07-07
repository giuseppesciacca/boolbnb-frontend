<script>
import { store } from '../store.js'
import axios from 'axios';
export default {
    name: 'HomeView',
    data() {
        return {
            store,
            apartments: null,
        }
    },
    methods:{
        select(apartment) {
        apartment.selected = !apartment.selected;
  }
    },
    mounted() {
        axios
            .get(store.server + store.end_point_apartments)
            .then(response => {
                console.log(response.data.results);
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
    <div class="container mt-5">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4" v-if="apartments">
            <div class="col rounded-4 mb-4" v-for="apartment in apartments" :key="apartment.title">
                <div class="card h-100 rounded-4 border-0 position-relative" :class="{ 'selected': apartment.selected }">
                   <router-link :to="{ name: 'single-apartment', params:{'slug':apartment.slug}}"><i class="fa-regular fa-eye fs-3 position-absolute" style="color: #d4ecff;"></i></router-link> 
                    <i class="fa-regular fa-heart fs-3 position-absolute" style="color: #ff0000;" :class="apartment.selected ? 'fa-solid' : ''" @click="select(apartment)"></i>
                    <img class="card-img-top w-100 h-100 object-fit-cover rounded-4 shadow-lg" :src="`${store.server}storage/${apartment.image[0]}`" alt="">
                    <div class="card-body">
                        <h6 class="text-left fw-semibold">{{apartment.title}}</h6>
                        <small>{{ apartment.address }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';
.fa-heart {
    right:20px;
    top:20px;
    cursor: pointer;

}
.fa-eye{
        left: 20px;
        top:20px;
        cursor: pointer;
    }
</style>