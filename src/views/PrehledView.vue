<template>
    <div class="d-flex justify-content-center text-white">
        <div class="alert alert-danger" role="alert" v-if="!userStore.isLoggedIn">
            ❗ Pro zobrazení přehledu se musíš přihlásit!
        </div>
        <div v-else class="container d-flex flex-column">
            <div class="row my-2">

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">{{ answerCount }}</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">126</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">126</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">126</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

            </div>
            <div class="container rounded-3 bg-dark table-responsive">
                <div class="">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">PŘEDMĚT</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';

const answerCount = ref(0);

const userStore = useUserStore();
const getAnswerCount = async () => {
    const { count, error } = await supabase
        .from('userAnswers')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userStore.id)
    if (error) console.log(error);
    else answerCount.value = count ? count : 0;
}

onMounted(() => {
    getAnswerCount();
})
</script>

<style></style>