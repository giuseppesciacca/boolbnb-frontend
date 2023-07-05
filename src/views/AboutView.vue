<template>
    <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">BoolBnb</h1>
            <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in
                previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to
                your liking.</p>
            <button class="btn btn-primary btn-lg" type="button">Lista appartamenti</button>
        </div>
    </div>

    <section class="about py-2">
        <div class="container">
            <h3>About us</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, molestias non. Repellendus officiis nesciunt ullam! Voluptas, et ratione rem inventore quae porro officiis voluptates sequi fuga non voluptate, voluptatem molestias!</p>
            <div class="row row-cols-md-2 row-cols-xl-3 row-cols-xxl-3">
                <div class="card rounded-5">
                    <img class="card-img-top" src="holder.js/100x180/" alt="Title">
                    <div class="card-body">
                        <h4 class="card-title">Title</h4>
                        <p class="card-text">Text</p>
                    </div>
                </div>
                <div class="card rounded-5">
                    <img class="card-img-top" src="holder.js/100x180/" alt="Title">
                    <div class="card-body">
                        <h4 class="card-title">Title</h4>
                        <p class="card-text">Text</p>
                    </div>
                </div>
                <div class="card rounded-5">
                    <img class="card-img-top" src="holder.js/100x180/" alt="Title">
                    <div class="card-body">
                        <h4 class="card-title">Title</h4>
                        <p class="card-text">Text</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="feedback py-2">

        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
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
                    <img src="../assets/img/turanoresort.jpg" class="img-fluid" alt="...">
                    <div class="carousel-caption d-md-block">
                        <h5>Feedback clienti</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../assets/img/turanoresort.jpg" class="img-fluid" alt="...">
                    <div class="carousel-caption d-md-block">
                        <h5>Feedback clienti</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../assets/img/turanoresort.jpg" class="img-fluid" alt="...">
                    <div class="carousel-caption d-md-block">
                        <h5>Feedback clienti</h5>
                        <p>Some representative placeholder content for the third slide.</p>
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
    </section>

    <div class="p-5 mb-4 bg-light rounded-3 call-to-action">
        <div class="container-fluid">
            <h1 class="display-5 fw-bold">Call to action</h1>
            <p class="col-md-8 fs-4">Registra il tuo appartamento qui</p>
            <button class="btn btn-primary btn-lg" type="button">Registrati qui</button>
        </div>
    </div>

</template>

<script>
export default {
    name: 'AboutView',
}
</script>

<style lang="scss" scoped>

</style>