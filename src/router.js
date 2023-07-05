import { createRouter, createWebHistory } from "vue-router"
import HomeView from './views/HomeView.vue'
import ApartmentsPage from './views/ApartmentsPage.vue'

const router = createRouter({
    history:createWebHistory(),
    routes: [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/apartments',
        name: 'apartments',
        component: ApartmentsPage
    }
]
})

export { router }