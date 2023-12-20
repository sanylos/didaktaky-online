<template>
    <div class="main-page text-white-50">
        <div class="page-title">
            Náhodné cvičení
        </div>
        <div class="container rounded bg-dark p-3 shadow-lg m-1 w-auto">

            <div v-if="loading" class="d-flex justify-content-center flex-column align-items-center">
                <div v-if="!errorMessage" class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                    {{ errorMessage }}🥺
                </div>
            </div>

            <div v-if="!loading">

                <div class="d-flex flex-column">

                    <div class="d-flex flex-column justify-content-center align-items-center">
                        <div v-if="exercises.text1imgPath" class="col mb-1">
                            <span class="row fw-bold">TEXT 1</span>
                            <img class="exercise-text-image"
                                :src="'src/assets/exercise_texts/' + exercises.text1imgPath + '.png'">
                        </div>
                        <div v-if="exercises.text2imgPath" class="col mb-1">
                            <span class="row fw-bold">TEXT 2</span>
                            <img class="exercise-text-image"
                                :src="'src/assets/exercise_texts/' + exercises.text2imgPath + '.png'">
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
                            ({{ exercises.description }})
                        </div>

                        <!--SINGLE OPTION-->
                        <div class="exercise-options" v-if="exercises.type == 'option'">
                            <div>
                                <div v-for="option, index in exercises.answers" :key="index"
                                    class="question-option mb-1 d-flex flex-column align-content-start">
                                    <input type="radio" class="btn-check" name="options-base" :id="'option' + index"
                                        autocomplete="off" :value="index" v-model="answer" :disabled="answered">
                                    <label class="btn text-white text-start fw-normal bg-unanswered" :for="'option' + index"
                                        :class="{
                                            'bg-success': index == exercises.correct_answer && answered,
                                            'bg-danger': index == answer && index != exercises.correct_answer && answered,
                                        }">{{ option }}</label>
                                </div>
                            </div>
                        </div>

                        <!--ANO/NE OPTIONS-->
                        <div class="exercise-options" v-if="exercises.type == 'anone'">
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

                        <!--ASSIGN OPTIONS-->
                        <div class="exercise-options" v-if="exercises.type == 'assign'">
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

                        <!--TEXT-MULTIPLE OPTIONS-->
                        <div class="exercise-options" v-if="exercises.type == 'text-multiple'">
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

                        <!--TEXT OPTIONS-->
                        <div class="exercise-options" v-if="exercises.type == 'text'">
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

                        <!--SORT OPTIONS-->
                        <div class="exercise-options" v-if="exercises.type == 'sort'">
                            <div v-for="sentence, index in exercises.sentences" :key="index" class="mb-1 border p-1">
                                {{ sentence }}
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
                <button class="btn btn-primary">⮜ Předchozí</button>
                <button v-if="!answered" class="btn btn-success" @click="handleSubmit">✍🏼Zkontrolovat</button>
                <button v-if="answered" class="btn btn-primary" @click="getQuestion">Další ⮞</button>
            </div>

        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { supabase } from '@/supabase'
import { reactive, ref } from 'vue';

const userStore = useUserStore();

let loading = ref(false);
let isTextShown = ref(false);
let exercises: any = ref([]);
let answer: any = ref(['']);
let answered = ref(false);
//TODO isAnswerCorrect
const errorMessage = ref('');

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const convertAnswerArrayToUpperCase = () => {
    answer.value = answer.value.map(index => index.toUpperCase());
}

const convertAnswerArrayToLowerCase = () => {
    answer.value = answer.value.map(index => index.toLowerCase());
}

const handleSubmit = () => {
    if (userStore.isLoggedIn) saveQuestionAnswer();
    answered.value = true;
}

const saveQuestionAnswer = async () => {
    //TODO update answer in supabase
}

const saveQuestion = async () => {
    try {
        const { data, error } = await supabase
            .from('userAnswers')
            .upsert({
                'exercise_id': exercises.value.id,
                'answer': answer.value,
            })
            if(error) console.log(error);
    } catch (error) {
        console.log(error);
    }
}

const getQuestion = async () => {

    loading.value = true;
    await sleep(0);
    try {
        const { data, error } = await supabase
            .from('random_test')
            .select(`
            *,
            random_exercise ( * )
        `)
            //.or('subject.in.("CJL")')
            //.or('variant.in.("1")')
            //.eq('subject','CJL')
            .filter('subject', 'in', '(' + userStore.exerciseFilters.examSubjects + ')')
            .filter('variant', 'in', '(' + userStore.exerciseFilters.examVariants + ')')
            .filter('year', 'in', '(' + userStore.exerciseFilters.examYears + ')')
            .filter('type', 'in', '(' + userStore.exerciseFilters.examType + ')')
            .limit(1);

        if (error) {
            errorMessage.value = "Nenalezena žádná cvičení odpovídající zadaným filtrům"
            console.log(error);
        }
        else {
            //console.log(data[0].random_exercise[0]);
            exercises.value = data[0].random_exercise[0];
            if (userStore.isLoggedIn) await saveQuestion();
            answered.value = false;
            answer.value = '';


            if (exercises.value.type == 'anone' ||
                exercises.value.type == 'assign' ||
                exercises.value.type == 'text' ||
                exercises.value.type == 'sort' ||
                exercises.value.type == 'text-multiple') answer.value = Array(exercises.value.correct_answer.length).fill(''); //If exercise type is ANO/NE, set array to null

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
  