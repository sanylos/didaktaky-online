<template>
  <div class="main-page">
    <div class="page-title">
      <p>Náhodné cvičení</p>
    </div>
    <div class="container-fluid bg-dark w-auto rounded p-3 shadow-lg m-1">
      <div class="question-title">
        <div>
          <b>{{ exercises.number }}</b>
          {{ exercises.title }}
        </div>
      </div>
      <br>
      <div>
        <div v-for="option, index in exercises.answers" class="question-option">
          <div :class="[(option==exercises.correct_answer)&(answer == option) ? 'bg-success' : ''],
          [(option!=exercises.correct_answer)&(answer == option) ? 'bg-danger' : '']" class="rounded p-2 mb-1"
            @click="answer = option">{{ option }}</div>
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


let answer = ref('fsdfd');
let exercises = ref([]);

const getQuestion = async () => {
  const { data } = await supabase
    .from('random_exercise')
    .select('*')
    .limit(1);
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
