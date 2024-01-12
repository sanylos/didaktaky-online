<template>
    <div class="d-flex flex-column">

        <div class="d-flex flex-column justify-content-center align-items-center">
            <div v-if="exercises.text1imgPath" class="col mb-1">
                <span class="row fw-bold">TEXT 1</span>
                <img class="exercise-text-image" :src="'/exercise_texts/' + exercises.text1imgPath + '.png'">
                <!--PATH WORKING ONLY IN PRODUCTION-->
            </div>
            <div v-if="exercises.text2imgPath" class="col mb-1">
                <span class="row fw-bold">TEXT 2</span>
                <img class="exercise-text-image" :src="'/exercise_texts/' + exercises.text2imgPath + '.png'">
                <!--PATH WORKING ONLY IN PRODUCTION-->
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
                        <input type="radio" class="btn-check" name="options-base" :id="'option' + index" autocomplete="off"
                            :value="index" v-model="userStore.exerciseAnswer[0]" :disabled="answered">
                        <label class="btn text-white text-start fw-normal bg-unanswered" :for="'option' + index" :class="{
                            'bg-success': index == exercises.correct_answer[0] && answered,
                            'bg-danger': index == userStore.exerciseAnswer[0] && index != exercises.correct_answer[0] && answered,
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
                    <div v-for="option, index in exercises.answers" :key="index" class="row question-option rounded mb-1"
                        :class="{
                            'bg-success': userStore.exerciseAnswer[index] == exercises.correct_answer[index] && answered,
                            'bg-danger': userStore.exerciseAnswer[index] != exercises.correct_answer[index] && answered,
                        }">
                        <p class="col-10">{{ option }}</p>
                        <input type="radio" class="col text-white fw-normal radio-anone"
                            v-model="userStore.exerciseAnswer[index]" :name="'input' + index" :id="'option' + index"
                            autocomplete="off" value="ANO" :disabled="answered">
                        <input type="radio" class="col text-white fw-normal radio-anone"
                            v-model="userStore.exerciseAnswer[index]" :name="'input' + index" :id="'option' + index"
                            autocomplete="off" value="NE" :disabled="answered">
                    </div>
                </div>
            </div>

            <!--Přiřazení-->
            <div class="exercise-options" v-if="exercises.type == 'Přiřazení'">
                <div class="mb-3">
                    <div v-for="option, index in exercises.answers" :key="index"
                        class="question-option mb-1 d-flex flex-row align-content-start justify-content-between p-1 rounded"
                        :class="{
                            'bg-success': userStore.exerciseAnswer[index] == exercises.correct_answer[index] && answered,
                            'bg-danger': userStore.exerciseAnswer[index] != exercises.correct_answer[index] && answered,
                        }">
                        <span>{{ option }}</span>
                        <input v-model="userStore.exerciseAnswer[index]" type="text"
                            v-on:input="convertAnswerArrayToUpperCase"
                            class="text-center text-white fw-bold bg-secondary border-0 rounded" style="width:30px;"
                            maxlength="1" :disabled="answered">
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
                            'bg-success': userStore.exerciseAnswer[index] == exercises.correct_answer[index] && answered,
                            'bg-danger': userStore.exerciseAnswer[index] != exercises.correct_answer[index] && answered,
                        }">
                        <span v-html="option"></span>
                        <input v-model="userStore.exerciseAnswer[index]" type="text"
                            v-on:input="convertAnswerArrayToLowerCase"
                            class="text-start text-white fw-bold bg-secondary border-0 rounded" style="width:auto;"
                            :disabled="answered">
                    </div>
                </div>
                <div v-for="sentence, index in exercises.sentences" :key="index" class="mb-1">
                    {{ sentence }}
                </div>
            </div>

            <!--Textová odpověď-->
            <div class="exercise-options container" v-if="exercises.type == 'Textová odpověď'">
                <div class="mb-3 d-flex flex-wrap align-content-start">
                    <div v-for="item, index in exercises.correct_answer" :key="index"
                        class="question-option mb-2 mx-1 p-1 rounded" :class="{
                            'bg-success': exercises.correct_answer.includes(userStore.exerciseAnswer[index]) && answered,
                            'bg-danger': !exercises.correct_answer.includes(userStore.exerciseAnswer[index]) && answered,
                        }">
                        <input v-model="userStore.exerciseAnswer[index]" type="text"
                            class="text-start text-white fw-bold bg-secondary border-0 rounded" style="width:150px;"
                            :disabled="answered">
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
                            'bg-success': userStore.exerciseAnswer[index] == exercises.correct_answer[index] && answered,
                            'bg-danger': userStore.exerciseAnswer[index] != exercises.correct_answer[index] && answered,
                        }">
                        <input v-model="userStore.exerciseAnswer[index]" type="text"
                            class="text-center text-white fw-bold bg-secondary border-0 rounded fs-4"
                            style="width:40px; height:40px;" maxlength="1" v-on:input="convertAnswerArrayToUpperCase"
                            :disabled="answered">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';


const userStore = useUserStore();
const answer = userStore.exerciseAnswer;

interface Exercise {
    answers: String[],
    claims: String[],
    correct_answer: String[] | Number[],
    description: String,
    exercise_id: Number,
    group: String,
    number: Number,
    points: Number,
    sentences: String[],
    test_id: Number,
    test_subject: String,
    test_type: String,
    text1imgPath: String,
    text2imgPath: String,
    title: String,
    type: String
}

defineProps<{
    exercises: Exercise,
    answered: boolean | undefined,
}>();

const convertAnswerArrayToUpperCase = () => {
    userStore.exerciseAnswer = userStore.exerciseAnswer.map((index: string) => index.toUpperCase());
}

const convertAnswerArrayToLowerCase = () => {
    userStore.exerciseAnswer = userStore.exerciseAnswer.map((index: string) => index.toLowerCase());
}

</script>

<style>
.radio-anone {
    width: 2rem;
    height: 2rem;
}

.exercise-text-image {
    max-width: 100%;
}

.bg-unanswered {
    background-color: rgba(245, 245, 220, 0.036);
}

.bg-unanswered:hover {
    background-color: rgba(255, 255, 255, 0.13);
}</style>