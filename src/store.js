import { reactive } from "vue";
const store = reactive({
  active: true,
  server: "http://127.0.0.1:8000/",
  admin: "admin",
  api_get: {
    end_point_apartments: "api/apartments/",
    end_point_services: "api/services",
    end_point_messages: "api/contacts",
  },
  api_post: {
    end_point_views: "api/views",
  },
});

export { store };
