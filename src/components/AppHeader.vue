<script>
export default {
    name: "AppHeader",
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light shadow">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav d-flex justify-content-around w-100">
                <li>
                    <router-link to="/" class="nav-link">
                        <span class="">BoolBnb</span>
                    </router-link>
                </li>
                <li class="d-flex gap-5">
                    <router-link to="/" class="nav-link">
                        <span class="">Apartments</span>
                    </router-link>
                    <router-link :to="{ 'name': 'about' }" class="nav-link">
                        <span class="">About</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/" class="nav-link">
                        <span class="">Sign up/Login</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

</style>