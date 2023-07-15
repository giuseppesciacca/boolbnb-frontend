<script>
import { store } from '../store.js'
export default {
    name: "AppFooter",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <footer>
        <div class="container">
            <div class="row">
                <ul
                    class="mb-0 mt-3 py-3 px-0 d-flex flex-column justify-content-center align-items-end gap-2 flex-md-row justify-content-lg-center list-unstyled gap-lg-5">
                    <li>
                        <router-link :to="{ 'name': 'home' }" class="nav-link">
                            <img class="animated-img" src="../assets/logo-footer.png" height=35 alt="boolbnb logo">
                        </router-link>
                    </li>
                    <li class="animated-li">
                        <a href="http://localhost:5174/about" target="_blank">Team Five</a>
                    </li>
                    <li class="animated-li">
                        <span>la nostra </span>
                        <a href="https://boolean.careers" target="_blank">Academy</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class=" copy text-white text-end pe-2">
                <span class="">Copyright&copy; 2023</span>
            </div>
    </footer>
</template>