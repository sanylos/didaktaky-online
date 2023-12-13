<template>
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="login" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-dark">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ pageType }}</h1>
                    <button type="button" class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-if="pageType == 'Přihlášení'">
                        <form @click.prevent="handleLogin">
                            <div class="mb-3">
                                <label for="emailInput" class="form-label">Email</label>
                                <input type="email" v-model="email" class="form-control bg-dark text-white border-secondary"
                                    id="emailInput" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="passwordInput" class="form-label">Heslo</label>
                                <input type="password" v-model="password"
                                    class="form-control bg-dark text-white border-secondary" id="passwordInput">
                            </div>
                            <div class="d-flex justify-content-between">
                                <button type="submit" class="btn btn-primary">Přihlásit</button>

                            </div>
                        </form>
                        <div class="d-flex justify-content-end">
                            <a @click="pageType = 'Registrace'" class="">Nemáš účet? Registruj se</a>
                        </div>
                    </div>

                    <div v-else>
                        <form @click.prevent="handleRegister">
                            <div class="mb-3">
                                <label for="emailInput" class="form-label">Email</label>
                                <input type="email" v-model="email" class="form-control bg-dark text-white border-secondary"
                                    id="emailInput" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="passwordInput" class="form-label">Heslo</label>
                                <input type="password" v-model="password"
                                    class="form-control bg-dark text-white border-secondary" id="passwordInput">
                            </div>
                            <div class="d-flex justify-content-between">
                                <button type="submit" class="btn btn-primary">Registrovat</button>
                            </div>
                        </form>
                        <div class="d-flex justify-content-end">
                            <a @click="pageType = 'Přihlášení'" class="">Máš účet? Přihlaš se</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { useUserStore } from '@/stores/user';

const pageType = ref("Přihlášení");
const errorMessage = ref("");
const email = ref("");
const password = ref("");

const userStore = useUserStore();

const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
    if (error) errorMessage.value = error;
    else {
        document.getElementById('close').click();
        userStore.initialize();
    }
}

const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    })
    if (error) errorMessage.value = error;
    else {
        document.getElementById('close').click();
        userStore.initialize();
    }
}
</script>

<style></style>