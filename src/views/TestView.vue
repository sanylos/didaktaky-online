<template>
    <div v-if="!isTest" class="container rounded d-flex flex-column justify-content-center align-items-center mt-2 bg-dark p-3">

        <Alert type="danger" :message="errorMessage"></Alert>

        <!--EXAM TYPE-->
        <div class="d-flex mb-3">
            <div class="mx-1" v-for="option in examOptions.examTypes" :key="option.id">
                <input type="radio" class="btn-check" name="examOption" :id="option.id" autocomplete="off"
                    :value="option.id" v-model="selectedFilter.examType[0]">
                <label class="btn btn-outline-light" :for="option.id">{{ option.title }}</label>
            </div>
        </div>

        <!--EXAM SUBJECT-->
        <div class="d-flex mb-3">
            <div class="mx-1" v-for="option in examOptions.examSubjects" :key="option.id">
                <input type="radio" class="btn-check" name="examSubject" :id="option.id" autocomplete="off"
                    :value="option.id" v-model="selectedFilter.examSubject">
                <label class="btn btn-outline-light" :for="option.id">{{ option.title }}</label>
            </div>
        </div>

        <!--EXAM YEAR-->
        <div class="d-flex mb-3">
            <div class="mx-1" v-for="option in examOptions.examYears" :key="option">
                <input type="checkbox" class="btn-check" name="examYear" :id="option" autocomplete="off" :value="option"
                    v-model="selectedFilter.examYears">
                <label class="btn btn-outline-light" :for="option">{{ option }}</label>
            </div>
        </div>

        <!--EXAM VARIANT-->
        <div class="d-flex mb-3">
            <div class="mx-1" v-for="option in examOptions.examVariants" :key="option.id">
                <input type="checkbox" class="btn-check" name="examVariant" :id="option.id" autocomplete="off"
                    :value="option.id" v-model="selectedFilter.examVariants">
                <label class="btn btn-outline-light" :for="option.id">{{ option.title }}</label>
            </div>
        </div>

        <button class="btn btn-success" @click="handleSubmit">Začít <i class="bi bi-rocket-takeoff"></i></button>

    </div>
    <div v-else>
        the test
    </div>
</template>

<script lang="ts" setup>
import Alert from '@/components/Alert.vue';
import { reactive, ref } from 'vue';
import { supabase } from '@/supabase';
const errorMessage = ref('');
const isTest = ref(false)

const selectedFilter: { examType: string[], examYears: string[], examVariants: string[], examSubject: string[] } = reactive({
    examType: [],
    examYears: ["2020","2021","2022","2023"],
    examVariants: ["1","2","3","4","5"],
    examSubject: [],
});

const handleSubmit = () => {
    if(selectedFilter.examType.length < 1) {
        errorMessage.value = "Vyber si typ zkoušky"
    } else if (selectedFilter.examSubject.length < 1) {
        errorMessage.value = "Vyber si předmět"
    } else {
        generateTest();
    }
}

const generateTest = () => {
    


    isTest.value = true;
}

const examOptions = reactive({
    examTypes: [
        { "id": "PZ", "title": "Přijímačky" },
        { "id": "MZ", "title": "Maturita" },
    ],
    examSubjects: [
        { "id": "CJL", "title": "Český jazyk a literatura", "exerciseCountPZ": 30 },
        { "id": "MAT", "title": "Matematika" },
        { "id": "ANJ", "title": "Anglický jazyk" },
    ],
    examYears: ["2023", "2022", "2021", "2020"],
    examVariants: [
        { "id": "1", "title": "1. řádný" },
        { "id": "2", "title": "2. řádný" },
        { "id": "3", "title": "1. náhradní" },
        { "id": "4", "title": "2. náhradní" },
        { "id": "5", "title": "Ilustrační" },
    ],
})
</script>

<style></style>