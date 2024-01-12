<template>
    <div class="modal fade text-white" id="loginModal" tabindex="-1" aria-labelledby="login" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ pageType }}</h1>
                    <button type="button" class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Alert :message="errorMessage" type="danger"></Alert>

                    <div v-if="pageType == 'Přihlášení'">
                        <form>
                            <div class="mb-3">
                                <label for="emailInput" class="form-label">Email</label>
                                <input type="email" v-model="email" class="form-control" id="emailInput"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="passwordInput" class="form-label">Heslo</label>
                                <input type="password" v-model="password" class="form-control" id="passwordInput">
                            </div>
                            <div class="d-flex justify-content-between flex-column align-items-center">
                                <button type="submit" @click.prevent="handleLogin"
                                    class="btn btn-primary w-100 row">Přihlásit</button>
                                <a @click="pageType = 'Registrace'" class="text-center mt-2">Nemáš účet? Registruj se</a>
                            </div>
                        </form>
                    </div>

                    <div v-else>
                        <form>
                            <div class="mb-3">
                                <label for="emailInput" class="form-label">Email</label>
                                <input type="email" v-model="email" class="form-control" id="emailInput"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="passwordInput" class="form-label">Heslo</label>
                                <input type="password" v-model="password" class="form-control" id="passwordInput">
                            </div>
                            <div class="d-flex justify-content-between flex-column align-items-center">
                                <button type="submit" @click.prevent="handleRegister"
                                    class="btn btn-primary w-100 row">Registrovat</button>
                                <a @click="pageType = 'Přihlášení'" class="text-center mt-2">Máš účet? Přihlaš se</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import Alert from './Alert.vue';
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { useUserStore } from '@/stores/user';
import type { error } from 'console';

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
    if (error) errorMessage.value = "Nesprávné přihlašovací údaje";
    else {
        document.getElementById('close').click();
        userStore.initialize();
        password.value = "";
    }
}

const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    })
    if (error) errorMessage.value = "Nesprávné přihlašovací údaje";
    else {
        document.getElementById('close').click();
        userStore.initialize();
        password.value = "";
    }
}
</script>

<style>
.modal {
    color: rgb(37, 37, 37);
}
</style>