<template>
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="login" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-dark">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{pageType}}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form v-if="pageType == 'Přihlášení'" @click.prevent="handleLogin">
                        <div class="mb-3">
                            <label for="emailInput" class="form-label">Email</label>
                            <input type="email" class="form-control bg-dark text-white border-secondary" id="emailInput"
                                aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="passwordInput" class="form-label">Heslo</label>
                            <input type="password" class="form-control bg-dark text-white border-secondary"
                                id="passwordInput">
                        </div>
                        <div class="d-flex justify-content-between">
                            <button type="submit" class="btn btn-primary">Přihlásit</button>
                            <a @click="pageType = 'Registrace'" class="">Nemáš účet? Registruj se</a>
                        </div>
                    </form>
                    <form v-else @click.prevent="handleRegister">
                        <div class="mb-3">
                            <label for="emailInput" class="form-label">Email</label>
                            <input type="email" class="form-control bg-dark text-white border-secondary" id="emailInput"
                                aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="passwordInput" class="form-label">Heslo</label>
                            <input type="password" class="form-control bg-dark text-white border-secondary"
                                id="passwordInput">
                        </div>
                        <div class="d-flex justify-content-between">
                            <button type="submit" class="btn btn-primary">Přihlásit</button>
                            <a @click="pageType = 'Přihlášení'" class="">Máš účet? Přihlaš se</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const pageType = ref("Přihlášení");

const handleLogin = () => {
//LOGIN
}

const handleRegister = () => {
//REGISTER
}
</script>

<style></style>