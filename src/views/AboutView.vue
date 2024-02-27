<script>
import { team } from "../assets/data/team";
export default {
  name: "AboutView",
  data() {
    return {
      team,
    };
  },
};
</script>

<template>
  <div id="about-view">
    <div class="container">
      <div class="row">
        <div class="col-12 shadow my-5 our-col px-0">
          <div
            v-for="member in team"
            class="profile-container flex-wrap m-3 d-flex justify-content-start align-content-center gap-5"
          >
            <img
              class="admin-pic"
              :src="member.img"
              :alt="`Admin ${member.name}`"
            />
            <div
              class="profile-info d-flex flex-column flex-wrap justify-content-center align-items-start gap-4"
            >
              <h2 class="our-name">
                <span class="suffix">{{ member.name }}</span>
                {{ member.surname }}
              </h2>
              <h4 class="our-quote">{{ member.quote }}</h4>
              <div
                class="d-flex justify-content-center align-content-center gap-3 our-social"
              >
                <a
                  :data-replace="`${member.name}`"
                  class="text-decoration-none linked-link"
                  target="_blank"
                  :href="`${member.linkedin}`"
                  ><i class="fa-brands fa-linkedin fa-lg"></i>
                  <span class=""
                    >{{ member.name }} {{ member.surname }}</span
                  ></a
                >
                <a
                  :data-replace="`${member.nickname}`"
                  class="text-decoration-none git-link"
                  target="_blank"
                  :href="`${member.github}`"
                  ><i class="pe-1 fa-brands fa-github fa-lg"></i>
                  <span class="">{{ member.nickname }}</span></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
