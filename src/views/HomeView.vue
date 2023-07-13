<script>
import { store } from '../store.js'
import axios from 'axios'
export default {
    name: 'HomeView',
    data() {
        return {
            store,
            apartments: [],
            all_apartments: null,
        }
    },
    methods: {
    },
    mounted() {
        consoleText(['boolbnb.', 'by Team Five.', 'with Love.'], 'text', ['#ff5a5f', 'rebeccapurple', 'lightblue']);
        axios
            .get(store.server + store.end_point_apartments)
            .then(response => {
                //console.log(response.data);
                this.apartments = response.data.results.data;
                this.all_apartments = response.data.all_apartments;
                //console.log(this.all_apartments)
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            });
    }
}

function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#222'];
    let visible = true;
    let con = document.getElementById('console');
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    let target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function () {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function () {
                let usedColor = colors.shift();
                colors.push(usedColor);
                let usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0])
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function () {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
        }
    }, 120)
    window.setInterval(function () {
        if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;

        } else {
            con.className = 'console-underscore'

            visible = true;
        }
    }, 400)
}

</script>

<template>
    <div id="our-home">
        <div class="container">
            <div class='console-container'><span id='text'></span>
                <div class='console-underscore' id='console'>&#95;</div>
            </div>
        </div>
        <div class="slider-wrapper">
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://s1.1zoom.me/b5050/704/Italy_Coast_Sea_Houses_Manarola_Crag_616074_1920x1200.jpg"
                            class="d-block w-100" alt="Manarola">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>La città di Manarola sulla costa ligure, in Italia</h5>
                            <router-link :to="{ 'name': 'apartments' }" class="text-decoration-none">
                                <span class="text-bnb">Questo e tanto altro su boolbnb!</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://s1.1zoom.me/b5050/684/Houses_Riverboat_Amsterdam_Netherlands_Canal_581172_1920x1200.jpg"
                            class="d-block w-100" alt=".Amsterdam">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Le case fluviali di Amsterdam, nei Paesi Bassi</h5>
                            <router-link :to="{ 'name': 'apartments' }" class="text-decoration-none">
                                <span class="text-bnb">Questo e tanto altro su boolbnb!</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://s1.1zoom.me/b5050/538/Japan_Tokyo_Temples_Flowering_trees_Asakusa_Kannon_549958_1920x1200.jpg"
                            class="d-block w-100" alt="Tokyo">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Asakusa Kannon a Tokyo, in Giappone</h5>
                            <router-link :to="{ 'name': 'apartments' }" class="text-decoration-none">
                                <span class="text-bnb">Questo e tanto altro su boolbnb!</span>
                            </router-link>
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
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';
</style>