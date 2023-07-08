<script>
import { store } from '../store.js'
export default {
    name: "AppHeader",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light shadow">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav d-flex justify-content-around align-items-center w-100">
                <li>
                    <router-link :to="{ 'name': 'home' }" class="nav-link">
                        <img src="../assets/logo.png" height=40 alt="boolbnb logo">
                    </router-link>
                </li>
                <li class="d-flex gap-5">
                    <router-link :to="{ 'name': 'apartments' }" class="nav-link">
                        <span class="">Apartments</span>
                    </router-link>
                    <router-link :to="{ 'name': 'about' }" class="nav-link">
                        <span class="">About</span>
                    </router-link>
                </li>
                <li>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle bg-white text-black" type="button" id="triggerId"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sign up/ Login
                        </button>
                        <div class="dropdown-menu" aria-labelledby="triggerId">
                            <a class="dropdown-item" target="_blank" :href="store.server + 'register'">Registrati</a>
                            <a class="dropdown-item" :href="store.server">Login</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style lang="scss" scoped></style>