import { reactive } from 'vue'
const store = reactive({
    active:true,
    server: 'http://127.0.0.1:8000/',
    end_point_apartments: 'api/apartments/',
})

export { store }