<template>
  <div class="main-page">
    <div class="page-title">
      <p>Náhodné cvičení</p>
    </div>
    <div class="container-fluid bg-dark w-auto rounded p-3 shadow-lg m-1">
      <div class="question-title">
        <div class="fw-bolder">
          {{ exercises.number }}
          {{ exercises.title }}
        </div>
      </div>
      <div>
        <div v-for="option, index in exercises.answers" :key="index" class="question-option mb-1">
          <input type="radio" class="btn-check" name="options-base" :id="'option'+index" autocomplete="off" :value="option" v-model="answer">
          <label class="btn text-white fw-normal" :for="'option'+index">{{option}}</label>
        </div>
        {{ answer }}
      </div>
    </div>
    <div class="footer">
      <a href="https://www.buymeacoffee.com/sanyl">PODPORA PROJEKTU</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { supabase } from '@/supabase'
import { reactive, ref } from 'vue';


let answer = ref('');
let exercises: any = ref([]);

const getQuestion = async () => {
  const { data } = await supabase
    .from('random_exercise')
    .select('*');
  exercises.value = data[0];
  console.log(exercises.value)
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
  font-size: 3em;
}

.footer {
  position: absolute;
  bottom: 1rem;
}
</style>
