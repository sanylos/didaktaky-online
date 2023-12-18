<template>
  <div class="container d-flex flex-column justify-content-center align-items-center mt-2 bg-dark">
    {{ selectedFilter }}

    <!--EXAM TYPE-->
    <div class="d-flex mb-3">
      <div class="mx-1" v-for="option in examOptions.examTypes" :key="option.id">
        <input type="radio" class="btn-check" name="examOption" :id="option.id" autocomplete="off" :value="option.id"
          v-model="selectedFilter.examType">
        <label class="btn btn-outline-light" :for="option.id">{{ option.title }}</label>
      </div>
    </div>

    <!--EXAM SUBJECT-->
    <div class="d-flex mb-3">
      <div class="mx-1" v-for="option in examOptions.examSubjects" :key="option.id">
        <input type="radio" class="btn-check" name="examSubject" :id="option.id" autocomplete="off" :value="option.id"
          v-model="selectedFilter.examSubject">
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
        <input type="radio" class="btn-check" name="examVariant" :id="option.id" autocomplete="off" :value="option.id"
          v-model="selectedFilter.examVariant">
        <label class="btn btn-outline-light" :for="option.id">{{ option.title }}</label>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const selectedFilter = reactive({
  examType: null,
  examYear: null,
  examVariant: null,
  examSubject: null,
});

const examOptions = reactive({
  examTypes: [
    { "id": "PRIJIMACKY", "title": "Přijímačky" },
    { "id": "MATURITA", "title": "Maturita" },
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

<style></style>