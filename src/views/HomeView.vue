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
<h1>Home view</h1>
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