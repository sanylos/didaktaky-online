<template>
    <div v-if="!isTest"
        class="container rounded d-flex flex-column justify-content-center align-items-center mt-2 bg-dark p-3">

        <Alert type="danger" :message="errorMessage"></Alert>

        <!--EXAM TYPE-->
        <div class="d-flex mb-3">
            <div class="mx-1" v-for="option in examOptions.examTypes" :key="option.id">
                <input type="radio" class="btn-check" name="examOption" :id="option.id" autocomplete="off"
                    :value="option.id" v-model="selectedFilter.examType">
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
                <input type="radio" class="btn-check" name="examYear" :id="option" autocomplete="off" :value="option"
                    v-model="selectedFilter.examYear">
                <label class="btn btn-outline-light" :for="option">{{ option }}</label>
            </div>
        </div>

        <!--EXAM VARIANT-->
        <div class="d-flex mb-3">
            <div class="mx-1" v-for="option in examOptions.examVariants" :key="option.id">
                <input type="radio" class="btn-check" name="examVariant" :id="option.id" autocomplete="off"
                    :value="option.id" v-model="selectedFilter.examVariant">
                <label class="btn btn-outline-light" :for="option.id">{{ option.title }}</label>
            </div>
        </div>

        <button class="btn btn-success" @click="handleSubmit">Začít <i class="bi bi-rocket-takeoff"></i></button>

    </div>
    <div v-else>
        <div class="d-flex bg-secondary">
            <button v-for="number in exerciseCount" :key="number" class="text-white text-center">{{ number }}</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Alert from '@/components/Alert.vue';
import { reactive, ref } from 'vue';
import { supabase } from '@/supabase';
import { FunctionsRelayError } from '@supabase/supabase-js';
const errorMessage = ref('');
const isTest = ref(false)
const exerciseCount = ref(0);

const selectedFilter: { examType: string, examYear: string[], examVariant: string[], examSubject: string } = reactive({
    examType: "",
    examYear: [],
    examVariant: [],
    examSubject: "",
});

const handleSubmit = () => {
    if (selectedFilter.examType == "") {
        errorMessage.value = "Vyber si typ zkoušky"
    } else if (selectedFilter.examSubject == "") {
        errorMessage.value = "Vyber si předmět"
    } else {
        generateTest();
    }
}

const generateTest = async () => {
    let testId = 0;
    exerciseCount.value = getExerciseCountBySubject(selectedFilter.examSubject);
    console.log(exerciseCount);
    const { data, error } = await supabase
        .from('tests')
        .select('id')
        .eq('year', selectedFilter.examYear)
        .eq('type', selectedFilter.examType)
        .eq('subject', selectedFilter.examSubject)
        .eq('variant', selectedFilter.examVariant)
    if (data) {
        if (!data[0]) {
            alert("Žádný test");
        } else {
            console.log(data);
            testId = data[0].id;
            isTest.value = true;
        }
    }
    if (error) {
        console.log(error);
    }
}

const examOptions = reactive({
    examTypes: [
        { "id": "PZ", "title": "Přijímačky" },
        { "id": "MZ", "title": "Maturita" },
    ],
    examSubjects: [
        { "id": "CJL", "title": "Český jazyk a literatura", "exerciseCountPZ": 30, "exerciseCountMZ": 32 },
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

const getExerciseCountBySubject = (subject: string) => {
    let filteredSubject = examOptions.examSubjects.filter((item) => item.id === subject);
    if (selectedFilter.examType == "PZ") return filteredSubject[0].exerciseCountPZ;
    if (selectedFilter.examType == "MZ") return filteredSubject[0].exerciseCountMZ;
    return 0;
}
</script>

<style></style>