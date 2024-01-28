<template>
    <div class="main-page text-white-50">
        <div class="page-title">
            Náhodné cvičení
        </div>
        <div v-if="exerciseState == 'selection'"
            class="container rounded d-flex flex-column justify-content-center align-items-center mt-2 bg-secondary-subtle p-3">

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
                    <input type="checkbox" class="btn-check" name="examSubject" :id="option.id" autocomplete="off"
                        :value="option.id" v-model="selectedFilter.examSubjects">
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
            <button class="btn btn-success" @click="handleExerciseFilterSubmit"
                :disabled="selectedFilter.examType.length < 1 || selectedFilter.examSubjects.length < 1 || selectedFilter.examYears.length < 1 || selectedFilter.examVariants.length < 1">Začít<i
                    class="bi bi-rocket-takeoff"></i></button>

        </div>
        <div v-if="exerciseState == 'selected'" class="container rounded bg-dark p-3 shadow-lg m-1 w-auto">

            <Spinner :isLoading="loading"></Spinner>

            <!--ERROR MESSAGE DISPLAY-->
            <Alert :message="errorMessage" type="danger" />

            <div v-if="!loading">
                <Exercise :answered="answered" :exercises="exercises"></Exercise>
            </div>

            <div class="mt-4 d-flex justify-content-between">
                <button :disabled="!answered" class="btn btn-primary" @click="handlePrevious">⮜ Předchozí</button>
                <button v-if="!answered" :disabled="!exercises.type" class="btn btn-success"
                    @click="handleSubmit">✍🏼Zkontrolovat</button>
                <button v-if="answered" class="btn btn-primary" @click="handleNext">Další ⮞</button>
            </div>

        </div>
    </div>
</template>
  
<script lang="ts" setup>

//TODO - fix v-html for exercise answers

import Spinner from '@/components/Spinner.vue';
import Alert from '@/components/Alert.vue';
import { useUserStore } from '@/stores/user';
import { supabase } from '@/supabase'
import { reactive, ref } from 'vue';
import Exercise from '@/components/Exercise.vue';

const userStore = useUserStore();

let loading = ref(false);
let exercises: any = ref([]);
let answered = ref(false);
const isAnswerCorrect = ref("FALSE");
const userAnswerId = ref('');
const exercisePagination = ref(1);
const exerciseId = ref(0);
const exerciseState = ref('selection');

const errorMessage = ref('');

const selectedFilter: { examType: string[], examYears: string[], examVariants: string[], examSubjects: string[] } = reactive({
    examType: [],
    examYears: [],
    examVariants: [],
    examSubjects: [],
});

const handleExerciseFilterSubmit = () => {
    getQuestion();
    exerciseState.value = 'selected';
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const handlePrevious = () => {
    if (userStore.isLoggedIn) { //ALLOW browsing history only if isLoggedIn
        exercisePagination.value++; //INCREMENT PAGINATION - MOVE TO OLDER QUESTIONS
        getQuestionByPagination(exercisePagination.value);
    } else errorMessage.value = "Pro zobrazení historie tvých odpovědí se musíš přihlásit!";
}

const handleNext = () => {
    if (exercisePagination.value == 1) { //IF PAGINATION IS 0 - MOVE GENERATE NEW QUESTION
        getQuestion();
    } else {
        if (userStore.isLoggedIn) { //ALLOW browsing history only if isLoggedIn
            exercisePagination.value--; //DECREMENT PAGINATION - MOVE TO NEWER QUESTIONS
            getQuestionByPagination(exercisePagination.value);
        } else errorMessage.value = "Pro zobrazení historie tvých odpovědí se musíš přihlásit!";
    }
}

const getQuestionByPagination = async (pagination: number) => {
    loading.value = true;
    try {
        const { data: userData, error } = await supabase
            .from('userAnswers')
            .select('*')
            .order('generated_at', { ascending: false })
            .eq('user_id', userStore.id)
            .range(pagination - 1, pagination - 1); //PAGINATION-1 TO GET PREVIOUS EXERCISE

        if (userData) { exerciseId.value = userData[0].exercise_id; } //STORE ID OF THE EXERCISE
        else console.log(error);

        const { data: exerciseData } = await supabase
            .from('exercises')
            .select('*')
            .eq('id', exerciseId.value);

        if (exerciseData) { exercises.value = exerciseData[0]; }//SET exercise data
        if (userData) { userStore.exerciseAnswer = userData[0].answer; } //SET answer

    } catch (error) {
        console.log(error);
    }
    loading.value = false;
}

const handleSubmit = () => {
    console.log(userStore.exerciseAnswer);
    if (exercises.value.type == "Textová odpověď") { //IF exercise type is text answer, check if it contains all correct answers
        let correctAnswerCount = 0;
        for (let i = 0; i < (exercises.value.correct_answer.length); i++) {
            if (exercises.value.correct_answer.includes(userStore.exerciseAnswer[i])) {
                correctAnswerCount++;
            }
        }
        console.log(correctAnswerCount);
        if (exercises.value.correct_answer.length == correctAnswerCount) isAnswerCorrect.value = "TRUE";
    } else if (userStore.exerciseAnswer.toString() === exercises.value.correct_answer.toString()) isAnswerCorrect.value = "TRUE"; //COMPARE ARRAYS CONTENT

    //IF USER IS LOGGED IN -> SAVE TO DB
    if (userStore.isLoggedIn) saveQuestionAnswer();

    answered.value = true;
}

const saveQuestionAnswer = async () => {
    //POST EXERCISE ANSWER AND STATE (CORRECT(true)/INCORRECT(false))
    try {
        const { data, error } = await supabase
            .from('userAnswers')
            .update({
                'answer': userStore.exerciseAnswer,
                'isCorrect': isAnswerCorrect.value,
                'answered_at': new Date(),
            })
            .eq('id', userAnswerId.value);
        if (error) console.log(error);
    } catch (error) {
        console.log(error);
    }
}

const saveQuestion = async () => {
    //INSERT NEW EXERCISE TO DB
    try {
        const { data, error } = await supabase
            .from('userAnswers')
            .insert({
                'exercise_id': exercises.value.exercise_id,
                'answer': userStore.exerciseAnswer,
                'examType': exercises.value.test_type,
                'examSubject': exercises.value.test_subject,
                'exerciseType': exercises.value.type,
                'exerciseGroup': exercises.value.group
            })
            .select();
        if (error) console.log(error);
        else userAnswerId.value = data[0].id;
    } catch (error) {
        console.log(error);
    }
}

const getQuestion = async () => {
    errorMessage.value = "";

    loading.value = true;

    //DELAY BETWEEN FETCHES
    await sleep(0);

    //FETCH RANDOM EXERCISE USING POSTGRES FUNCTION
    try {
        const { data, error } = await supabase.rpc('getrandomexercise', {
            in_years: selectedFilter.examYears,
            in_subjects: selectedFilter.examSubjects,
            in_variants: selectedFilter.examVariants,
            in_types: selectedFilter.examType
        });

        if (error) {
            errorMessage.value = "Nenalezena žádná cvičení odpovídající zadaným filtrům"
            console.log(error);
        }
        else {
            exercises.value = data;
            answered.value = false;
            userStore.exerciseAnswer = [];
            isAnswerCorrect.value = "FALSE";


            userStore.exerciseAnswer = Array(exercises.value.correct_answer.length).fill(""); //FILL ARRAY WITH EMPTY STRINGS TO MAINTAIN SAME ARRAY LENGTHS WITH DATABASE

            if (userStore.isLoggedIn) await saveQuestion();
        }
        console.log(exercises.value);
    } catch (error) {
        errorMessage.value = "Nenalezena žádná cvičení odpovídající zadaným filtrům"
        console.log(error);
    }
    loading.value = false;
}

const examOptions = reactive({
    examTypes: [
        { "id": "PZ", "title": "Přijímačky" },
        { "id": "MZ", "title": "Maturita" },
    ],
    examSubjects: [
        { "id": "CJL", "title": "Český jazyk a literatura" },
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
<style scoped>
.main-page {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.page-title {
    font-size: 2em;
}
</style>
  