<script>
import { carouselData } from "../assets/data/carouselData";

export default {
  name: "HomeView",
  data() {
    return {
      carouselData,
    };
  },
  methods: {
    consoleText(words, id, colors) {
      if (colors === undefined) colors = ["#222"];
      let visible = true;
      let con = document.getElementById("console");
      let letterCount = 1;
      let x = 1;
      let waiting = false;
      let target = document.getElementById(id);
      target.setAttribute("style", "color:" + colors[0]);
      window.setInterval(function () {
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount);
          window.setTimeout(function () {
            let usedColor = colors.shift();
            colors.push(usedColor);
            let usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute("style", "color:" + colors[0]);
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function () {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 120);
      window.setInterval(function () {
        if (visible === true) {
          con.className = "console-underscore hidden";
          visible = false;
        } else {
          con.className = "console-underscore";

          visible = true;
        }
      }, 400);
    },
  },
  mounted() {
    this.consoleText(["Boolbnb.", "by Team Five.", "with Love."], "text", [
      "#ff5a5f",
      "rebeccapurple",
      "lightblue",
    ]);
  },
};
</script>

<template>
  <div id="our-home">
    <div class="container">
      <div class="console-container">
        <span id="text"></span>
        <div class="console-underscore" id="console">&#95;</div>
      </div>
    </div>

    <div class="slider-wrapper">
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
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
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="5"
            aria-label="Slide 6"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="6"
            aria-label="Slide 7"
          ></button>
        </div>
        <!-- /carousel-indicators -->
        <div class="carousel-inner">
          <div
            v-for="(data, index) in carouselData"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <img
              :src="data.src"
              class="d-block w-100 img-carousel-home"
              :alt="data.alt"
            />
            <div class="carousel-caption">
              <h5>{{ data.title }}</h5>
              <router-link
                :to="{ name: 'apartments' }"
                class="text-decoration-none"
              >
                <span class="text-bnb">Questo e tanto altro su Boolbnb!</span>
              </router-link>
            </div>
          </div>
        </div>
        <!-- /carousel-inner -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <!-- /carousel-control-prev -->
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        <!-- /carousel-control-next -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss";
</style>
