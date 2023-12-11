<template>
  <div class="main-page">
    <div class="page-title">
      Náhodné cvičení
    </div>
    <div class="container-md bg-dark rounded p-3 shadow-lg m-1 w-100">

      <div v-if="loading" class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-if="!loading">

        <div class="question-title">
          <div class="fw-bolder">
            {{ exercises.number }}
            {{ exercises.title }}
          </div>
        </div>

        <div v-if="exercises.description">
          ({{ exercises.description }})
        </div>

        <div class="exercise-options" v-if="exercises.type == 'option'">
          <div>
            <div v-for="option, index in exercises.answers" :key="index" class="question-option mb-1">
              <input type="radio" class="btn-check" name="options-base" :id="'option' + index" autocomplete="off"
                :value="index" v-model="answer" :disabled="answered">
              <label class="btn text-white fw-normal" :for="'option' + index" :class="{
                'bg-success': index == exercises.correct_answer && answered,
                'bg-danger': index == answer && index != exercises.correct_answer && answered,
              }">{{ option }}</label>
            </div>
          </div>
        </div>

        <div class="exercise-options" v-if="exercises.type == 'anone'">
          <div>
            <div class="row text-center">
              <div class="col-10">
              </div>
              <div class="col-1 p-1">ANO</div>
              <div class="col-1 p-1">NE</div>
            </div>
            <div v-for="option, index in exercises.answers" :key="index"
              class="row question-option mb-1 mt-1 p-1 rounded" :class="{
                'bg-success': answer[index] == exercises.correct_answer[index] && answered,
                'bg-danger': answer[index] != exercises.correct_answer[index] && answered,
              }">
              <p class="col-10">{{ option }}</p>
              <input type="radio" class="col text-white fw-normal" v-model="answer[index]" :name="'input' + index"
                :id="'option' + index" autocomplete="off" value="ANO" :disabled="answered">
              <input type="radio" class="col text-white fw-normal" v-model="answer[index]" :name="'input' + index"
                :id="'option' + index" autocomplete="off" value="NE" :disabled="answered">
            </div>
          </div>
        </div>

      </div>

      <div class="mt-4 d-flex justify-content-between">
        <button class="btn btn-primary">⮜ Předchozí</button>
        <button v-if="!answered" class="btn btn-success" @click="handleSubmit">✍🏼
          Zkontrolovat</button>
        <button v-if="answered" class="btn btn-primary" @click="getQuestion">Další ⮞</button>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { supabase } from '@/supabase'
import { reactive, ref } from 'vue';

let loading = ref(false);

let exercises: any = ref([]);
let answer = ref([]);
let answered = ref(false);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const handleSubmit = () => {
  answered.value = true;
}

const getQuestion = async () => {
  loading.value = true;
  await sleep(0);
  const { data } = await supabase
    .from('random_exercise')
    .select('*');
  answered.value = false;
  answer.value = null;
  exercises.value = data[0];
  if (exercises.value.type == 'anone') answer.value = Array(exercises.value.answers.length).fill(null);
  console.log(exercises.value)
  loading.value = false;
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
}</style>
