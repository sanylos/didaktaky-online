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
      <div class="mx-1" v-for="option in filteredExamSubjects" :key="option.id">
        <input type="radio" class="btn-check" name="examOption" :id="option.id" autocomplete="off" :value="option.id"
          v-model="selectedFilter.examSubject">
        <label class="btn btn-outline-light" :for="option.id">{{ option.subject }}</label>
      </div>
    </div>

    <!--EXAM YEAR-->
    <div class="d-flex mb-3">
      <div class="mx-1" v-for="option in examOptions.examYears" :key="option">
        <input type="radio" class="btn-check" name="examYear" :id="option" autocomplete="off" :value="option"
          v-model="selectedFilter.examYear" @click="selectedFilter.examVariant = null">
        <label class="btn btn-outline-light" :for="option">{{ option }}</label>
      </div>
    </div>

    <!--EXAM VARIANT-->
    <div class="d-flex mb-3">
      <div class="mx-1" v-for="option in filteredExamVariants" :key="option.id">
        <input type="radio" class="btn-check" name="examVariant" :id="option.id" autocomplete="off" :value="option.id"
          v-model="selectedFilter.examVariant">
        <label class="btn btn-outline-light" :for="option.id">{{ option.variant }}</label>
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

const filteredExamVariants = computed(() => {
  const examVariants = examOptions.examVariants;
  const variantType = examVariants.find(variant => {
    return variant.type === selectedFilter.examType;
  });
  if (variantType && variantType.data) {
    const yearData = variantType.data.find(data => data.year === selectedFilter.examYear);
    if (yearData && yearData.variants && yearData.variants.length > 0) {
      return yearData.variants[0]; //Return variants if found
    }
  }
  return null; //Return null if no variant is found
});

const filteredExamSubjects = computed(() => {
  const selectedType = selectedFilter.examType;
  const matchedSubjects = examOptions.examSubjects.find(subject => {
    return subject.type === selectedType;
  });

  if (matchedSubjects && matchedSubjects.data) {
    return matchedSubjects.data;
  }
  return []; //Return null if no subject is found
});

const examOptions = reactive({
  examTypes: [
    { "id": "PRIJIMACKY", "title": "Přijímačky" },
    { "id": "MATURITA", "title": "Maturita" }
  ],
  examSubjects: [
    {
      "type": "PRIJIMACKY", "data": [
        { "id": "CJL", "subject": "Český jazyk a literatura" },
        { "id": "MAT", "subject": "Matematika" }
      ]
    },
    {
      "type": "MATURITA", "data": [
        { "id": "CJL", "subject": "Český jazyk a literatura" },
        { "id": "MAT", "subject": "Matematika" },
        { "id": "ANJ", "subject": "Anglický jazyk" }
      ]
    }
  ],
  examYears: ["2023", "2022", "2021", "2020"],
  examVariants: [
    {
      "type": "PRIJIMACKY", "data": [
        {
          "year": "2023", "variants": [[
            { "id": "1", "variant": "1. řádný" },
            { "id": "2", "variant": "2. řádný" },
            { "id": "3", "variant": "1. náhradní" },
            { "id": "4", "variant": "2. náhradní" },
          ]]
        },
        {
          "year": "2022", "variants": [[
            { "id": "1", "variant": "1. řádný" },
            { "id": "2", "variant": "2. řádný" },
            { "id": "3", "variant": "1. náhradní" },
            { "id": "4", "variant": "2. náhradní" },
          ]]
        },
        {
          "year": "2021", "variants": [[
            { "id": "1", "variant": "1. řádný" },
            { "id": "2", "variant": "2. řádný" },
            { "id": "3", "variant": "1. náhradní" },
            { "id": "4", "variant": "2. náhradní" },
            { "id": "5", "variant": "Ilustrační" },
          ]]
        },
        {
          "year": "2020", "variants": [[
            { "id": "1", "variant": "1. řádný" },
            { "id": "2", "variant": "Ilustrační" },
          ]]
        }]
    },
  ],
})
</script>

<style></style>