<template>
    <div class="main-page text-white-50">
        <div class="page-title">
            Náhodné cvičení
        </div>
        <div class="container rounded bg-dark p-3 shadow-lg m-1 w-auto">

            <!--SPINNER LOADING-->
            <div v-if="loading" class="d-flex justify-content-center flex-column align-items-center">
                <div v-if="!errorMessage" class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <!--ERROR MESSAGE DISPLAY-->
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
                ❗ {{ errorMessage }}
            </div>

            <div v-if="!loading">

                <div class="d-flex flex-column">

                    <div class="d-flex flex-column justify-content-center align-items-center">
                        <div v-if="exercises.text1imgPath" class="col mb-1">
                            <span class="row fw-bold">TEXT 1</span>
                            <img class="exercise-text-image"
                                :src="'/exercise_texts/' + exercises.text1imgPath + '.png'">
                        </div>
                        <div v-if="exercises.text2imgPath" class="col mb-1">
                            <span class="row fw-bold">TEXT 2</span>
                            <img class="exercise-text-image"
                                :src="'/exercise_texts/' + exercises.text2imgPath + '.png'">
                        </div>
                    </div>

                    <div class="d-flex flex-column justify-content-start">

                        <div class="question-claims">
                            <div v-for="claim, index in exercises.claims" :key="index">
                                <span class="fw-bold">Tvrzení č. {{ index + 1 }}: </span><span v-html="claim"></span>
                            </div>
                        </div>

                        <div class="question-title">
                            <div class="">
                                <span class="fw-bold" v-html="exercises.title"></span>
                            </div>
                        </div>

                        <div v-if="exercises.description" class="mb-2">
                            (<span v-html="exercises.description"></span>)
                        </div>

                        <!--VÝBĚR Z MOŽNOSTÍ-->
                        <div class="exercise-options" v-if="exercises.type == 'Výběr z možností'">
                            <div>
                                <div v-for="option, index in exercises.answers" :key="index"
                                    class="question-option mb-1 d-flex flex-column align-content-start">
                                    <input type="radio" class="btn-check" name="options-base" :id="'option' + index"
                                        autocomplete="off" :value="index" v-model="answer[0]" :disabled="answered">
                                    <label class="btn text-white text-start fw-normal bg-unanswered" :for="'option' + index"
                                        :class="{
                                            'bg-success': index == exercises.correct_answer && answered,
                                            'bg-danger': index == answer && index != exercises.correct_answer && answered,
                                        }" v-html="option"></label>
                                </div>
                            </div>
                        </div>

                        <!--Výběr mezi ANO/NE-->
                        <div class="exercise-options" v-if="exercises.type == 'Výběr mezi ANO/NE'">
                            <div>
                                <div class="row text-center">
                                    <div class="col-10">
                                    </div>
                                    <div class="col-1">ANO</div>
                                    <div class="col-1">NE</div>
                                </div>
                                <div v-for="option, index in exercises.answers" :key="index"
                                    class="row question-option rounded mb-1" :class="{
                                        'bg-success': answer[index] == exercises.correct_answer[index] && answered,
                                        'bg-danger': answer[index] != exercises.correct_answer[index] && answered,
                                    }">
                                    <p class="col-10">{{ option }}</p>
                                    <input type="radio" class="col text-white fw-normal radio-anone" v-model="answer[index]"
                                        :name="'input' + index" :id="'option' + index" autocomplete="off" value="ANO"
                                        :disabled="answered">
                                    <input type="radio" class="col text-white fw-normal radio-anone" v-model="answer[index]"
                                        :name="'input' + index" :id="'option' + index" autocomplete="off" value="NE"
                                        :disabled="answered">
                                </div>
                            </div>
                        </div>

                        <!--Přiřazení-->
                        <div class="exercise-options" v-if="exercises.type == 'Přiřazení'">
                            <div class="mb-3">
                                <div v-for="option, index in exercises.answers" :key="index"
                                    class="question-option mb-1 d-flex flex-row align-content-start justify-content-between p-1 rounded"
                                    :class="{
                                        'bg-success': answer[index] == exercises.correct_answer[index] && answered,
                                        'bg-danger': answer[index] != exercises.correct_answer[index] && answered,
                                    }">
                                    <span>{{ option }}</span>
                                    <input v-model="answer[index]" type="text" v-on:input="convertAnswerArrayToUpperCase"
                                        class="text-center text-white fw-bold bg-secondary border-0 rounded"
                                        style="width:30px;" maxlength="1" :disabled="answered">
                                </div>
                            </div>
                            <div v-for="sentence, index in exercises.sentences" :key="index" class="mb-1">
                                {{ sentence }}
                            </div>
                        </div>

                        <!--Více textových odpovědí-->
                        <div class="exercise-options" v-if="exercises.type == 'Více textových odpovědí'">
                            <div class="mb-3">
                                <div v-for="option, index in exercises.answers" :key="index"
                                    class="question-option mb-2 d-flex flex-column align-content-start justify-content-between p-1 rounded"
                                    :class="{
                                        'bg-success': answer[index] == exercises.correct_answer[index] && answered,
                                        'bg-danger': answer[index] != exercises.correct_answer[index] && answered,
                                    }">
                                    <span v-html="option"></span>
                                    <input v-model="answer[index]" type="text" v-on:input="convertAnswerArrayToLowerCase"
                                        class="text-start text-white fw-bold bg-secondary border-0 rounded"
                                        style="width:auto;" :disabled="answered">
                                </div>
                            </div>
                            <div v-for="sentence, index in exercises.sentences" :key="index" class="mb-1">
                                {{ sentence }}
                            </div>
                        </div>

                        <!--Textová odpověď-->
                        <div class="exercise-options" v-if="exercises.type == 'Textová odpověď'">
                            <div class="mb-3 d-flex flex-row align-content-start">
                                <div v-for="item, index in exercises.correct_answer" :key="index"
                                    class="question-option mb-2 mx-1 p-1 rounded" :class="{
                                        'bg-success': answer[index] == exercises.correct_answer[index] && answered,
                                        'bg-danger': answer[index] != exercises.correct_answer[index] && answered,
                                    }">
                                    <input v-model="answer[index]" type="text"
                                        class="text-start text-white fw-bold bg-secondary border-0 rounded"
                                        style="width:150px;" :disabled="answered">
                                </div>
                            </div>
                            <div v-for="sentence, index in exercises.sentences" :key="index" class="mb-1">
                                {{ sentence }}
                            </div>
                        </div>

                        <!--Seřazení-->
                        <div class="exercise-options" v-if="exercises.type == 'Seřazení'">
                            <div v-for="option, index in exercises.answers" :key="index" class="mb-1 border p-1">
                                {{ option }}
                            </div>
                            <div class="d-flex flex-row align-content-center justify-content-center mt-3">
                                <div v-for="option, index in exercises.correct_answer" :key="index"
                                    class="question-option mb-2 mx-1 p-1 rounded" :class="{
                                        'bg-success': answer[index] == exercises.correct_answer[index] && answered,
                                        'bg-danger': answer[index] != exercises.correct_answer[index] && answered,
                                    }">
                                    <input v-model="answer[index]" type="text"
                                        class="text-center text-white fw-bold bg-secondary border-0 rounded fs-4"
                                        style="width:40px; height:40px;" maxlength="1"
                                        v-on:input="convertAnswerArrayToUpperCase" :disabled="answered">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="mt-4 d-flex justify-content-between">
                <button :disabled="!answered" class="btn btn-primary" @click="handlePrevious">⮜ Předchozí</button>
                <button v-if="!answered" class="btn btn-success" @click="handleSubmit">✍🏼Zkontrolovat</button>
                <button v-if="answered" class="btn btn-primary" @click="handleNext">Další ⮞</button>
            </div>

        </div>
    </div>
</template>
  
<script lang="ts" setup>
// @ts-nocheck
import { useUserStore } from '@/stores/user';
import { supabase } from '@/supabase'
import { reactive, ref } from 'vue';

const userStore = useUserStore();

let loading = ref(false);
let exercises: any = ref([]);
let answer: any = ref([""]);
let answered = ref(false);
const isAnswerCorrect = ref("FALSE");
const userAnswerId = ref('');
const exercisePagination = ref(1);

const errorMessage = ref('');

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const convertAnswerArrayToUpperCase = () => {
    answer.value = answer.value.map(index => index.toUpperCase());
}

const convertAnswerArrayToLowerCase = () => {
    answer.value = answer.value.map(index => index.toLowerCase());
}

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
    try {
        const { data: userData, error } = await supabase
            .from('userAnswers')
            .select('*')
            .order('generated_at', { ascending: false })
            .eq('user_id', userStore.id)
            .range(pagination - 1, pagination - 1); //PAGINATION-1 TO GET PREVIOUS EXERCISE

        const exerciseId = userData[0].exercise_id; //STORE ID OF THE EXERCISE

        const { data: exerciseData } = await supabase
            .from('exercises')
            .select('*')
            .eq('id', exerciseId);

        exercises.value = exerciseData[0]; //SET exercise data
        answer.value = userData[0].answer; //SET answer

    } catch (error) {
        console.log(error);
    }
}

const handleSubmit = () => {
    //COMPARE ARRAYS CONTENT
    if (answer.value.toString() === exercises.value.correct_answer.toString()) isAnswerCorrect.value = "TRUE";

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
                'answer': answer.value,
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
            .upsert({
                'exercise_id': exercises.value.id,
                'answer': answer.value,
            })
        if (error) console.log(error);
    } catch (error) {
        console.log(error);
    }

    //FETCH LATEST EXERCISE ID
    try {
        const { data, error } = await supabase
            .from('userAnswers')
            .select('id')
            .eq('user_id', userStore.id)
            .order('generated_at', { ascending: false })
            .limit(1);
        if (error) console.log(error);
        else {
            userAnswerId.value = data[0].id;
        }
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
        in_years: userStore.exerciseFilters.examYears, 
        in_subjects: userStore.exerciseFilters.examSubjects, 
        in_variants: userStore.exerciseFilters.examVariants, 
        in_types: userStore.exerciseFilters.examType });

        if (error) {
            errorMessage.value = "Nenalezena žádná cvičení odpovídající zadaným filtrům"
            console.log(error);
        }
        else {
            //console.log(data[0].random_exercise[0]);
            exercises.value = data;
            answered.value = false;
            answer.value = '';
            isAnswerCorrect.value = "FALSE";


            answer.value = Array(exercises.value.correct_answer.length).fill(""); //FILL ARRAY WITH EMPTY STRINGS TO MAINTAIN SAME ARRAY LENGTHS WITH DATABASE

            if (userStore.isLoggedIn) await saveQuestion();
            loading.value = false;
        }
    } catch (error) {
        errorMessage.value = "Nenalezena žádná cvičení odpovídající zadaným filtrům"
        console.log(error);
    }
}

getQuestion();

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

.exercise-text-image {
    max-width: 100%;
}

.bg-unanswered {
    background-color: rgba(245, 245, 220, 0.036);
}

.bg-unanswered:hover {
    background-color: rgba(255, 255, 255, 0.13);
}

.radio-anone {
    width: 2rem;
    height: 2rem;
}
</style>
  