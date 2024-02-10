<script>
import { onMounted } from "vue";

export default {
  name: "Map",

  props: {
    lat: String,
    lon: String,
  },

  setup(props) {
    let map = null;

    onMounted(() => {
      map = tt.map({
        key: "vPuUkOEvt9S93r8E98XRbrHJJG1Mz6Tr",
        container: "map",
        center: [props.lon, props.lat],
        zoom: 14,
        radius: 20000,
      });

      new tt.Marker().setLngLat([props.lon, props.lat]).addTo(map);
      map.addControl(new tt.NavigationControl());
    });

    return { map };
  },
};
</script>

<template>
  <div id="map" style="height: 400px"></div>
</template>

<style lang="scss" scoped></style>
