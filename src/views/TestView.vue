<template>
    <div v-if="!isTest"
        class="container rounded d-flex flex-column justify-content-center align-items-center mt-2 bg-dark p-3">

        <Alert type="danger" :message="errorMessage"></Alert>

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
                <input type="radio" class="btn-check" name="examSubject" :id="option.id" autocomplete="off"
                    :value="option.id" v-model="selectedFilter.examSubject[0]">
                <label class="btn btn-outline-light" :for="option.id">{{ option.title }}</label>
            </div>
        </div>

        <!--EXAM YEAR-->
        <div class="d-flex mb-3">
            <div class="mx-1" v-for="option in examOptions.examYears" :key="option">
                <input type="radio" class="btn-check" name="examYear" :id="option" autocomplete="off" :value="option"
                    v-model="selectedFilter.examYear[0]">
                <label class="btn btn-outline-light" :for="option">{{ option }}</label>
            </div>
        </div>

        <!--EXAM VARIANT-->
        <div class="d-flex mb-3">
            <div class="mx-1" v-for="option in examOptions.examVariants" :key="option.id">
                <input type="radio" class="btn-check" name="examVariant" :id="option.id" autocomplete="off"
                    :value="option.id" v-model="selectedFilter.examVariant[0]">
                <label class="btn btn-outline-light" :for="option.id">{{ option.title }}</label>
            </div>
        </div>
        <button class="btn btn-success" @click="handleSubmit" data-bs-toggle="modal"
            data-bs-target="#testLoadingModal">Začít <i class="bi bi-rocket-takeoff"></i></button>
    </div>

    <div v-else class="m-3">
        <div class="bg-dark shadow-lg w-auto rounded mb-1">
            <div class="d-flex justify-content-between" style="overflow: auto">
                <button v-for="number in exerciseCount" :key="number"
                    @click="switchToExercise(exerciseNumberIndex, number - 1)" class="text-white-50 text-center m-1 btn"
                    :class="exerciseNumberIndex + 1 == number ? 'btn-primary' : 'btn-dark'">{{ number }}</button>
            </div>
        </div>
        <div class="bg-dark shadow-lg w-auto rounded">

            <Exercise v-if="exercises[exerciseNumberIndex]" :answered="false" :exercises="exercises[exerciseNumberIndex]"
                class="p-3 text-white-50">
            </Exercise>
            <span v-else>chyba cviceni</span>

            <div class="p-2 d-flex justify-content-evenly">
                <button class="btn btn-primary" @click="switchToExercise(exerciseNumberIndex, exerciseNumberIndex - 1)"
                    :disabled="exerciseNumberIndex < 1">⮜ Předchozí</button>
                <button class="btn btn-success" data-bs-toggle="modal"
                    data-bs-target="#checkTestModal">✍🏼Zkontrolovat</button>
                <button class="btn btn-primary" @click="switchToExercise(exerciseNumberIndex, exerciseNumberIndex + 1)"
                    :disabled="exerciseNumberIndex >= exerciseCount - 1">Další ⮞</button>
            </div>
        </div>
    </div>

    <span v-if="exercises[exerciseNumberIndex]" class="text-white">{{ exercises[exerciseNumberIndex][0] }}</span>

    <!-- Check Test Modal -->
    <div v-if="isTest" class="modal fade text-white" id="checkTestModal" tabindex="-1" aria-labelledby="checkTestModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Zkontrolovat test</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Opravdu chceš ukončit toto testové zadání? Ukončením ztratíš možnost opravy svých odpovědí a bude ti
                    zobrazeno hodnocení!
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Pokračovat v testu</button>
                    <button type="button" class="btn btn-success" @click="handleTestSubmit">Vyhodnotit</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Test Loading Modal -->
    <div class="modal fade text-white" id="testLoadingModal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="testLoadingModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Test se připravuje</h1>
                </div>
                <div class="modal-body">

                    <div class="progress" role="progressbar" aria-label="Success example"
                        :aria-valuenow="loadedExerciseCount" aria-valuemin="0" :aria-valuemax="exerciseCount">
                        <div class="progress-bar bg-success"
                            :style="{ width: ((loadedExerciseCount / exerciseCount) * 100) + '%' }"></div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" :disabled="!isTest"
                        @click="testStartDateTime = new Date()">Začít</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Alert from '@/components/Alert.vue';
import { reactive, ref } from 'vue';
import { supabase } from '@/supabase';
import Exercise from '@/components/Exercise.vue';
import { useUserStore } from '@/stores/user';

const errorMessage = ref('');
const isTest = ref(false)
const exerciseCount: any = ref(0);
const exerciseNumberIndex = ref(0);
const exercises: any = ref([]);
const testAnswers: any = ref([""]);
const userStore = useUserStore();
const loadedExerciseCount = ref(0);
const testStartDateTime = ref(new Date());
const submittedExercises: any = ref([]);

const selectedFilter: { examType: string[], examYear: string[], examVariant: string[], examSubject: string[] } = reactive({
    examType: [],
    examYear: [],
    examVariant: [],
    examSubject: []
});

const switchToExercise = (from: number, to: number) => {
    console.log("from:" + from + ";to:" + to);
    console.log(userStore.exerciseAnswer);
    testAnswers.value[from] = userStore.exerciseAnswer;
    console.log(testAnswers.value);
    userStore.exerciseAnswer = testAnswers.value[to];

    exerciseNumberIndex.value = to;

    console.log(userStore.exerciseAnswer);
    console.log(testAnswers.value);

}

const handleTestSubmit = async () => {
    for (let i = 0; i < exerciseCount.value; i++) {
        const { data, error } = await supabase
            .from('userAnswers')
            .insert({
                'exercise_id': exercises.value[i].exercise_id,
                'answer': testAnswers.value[i],
                'examType': exercises.value[i].test_type,
                'examSubject': exercises.value[i].test_subject,
                'exerciseType': exercises.value[i].type,
                'exerciseGroup': exercises.value[i].group,
                'isCorrect': isAnswerCorrect(i),
                'answered_at': new Date(),
            }).select()
            if(data) {
                submittedExercises.value.push(data);
            }
        if (error) console.log(error);
        else console.log('success index:' + i);
    }
    console.log(submittedExercises.value);
}

const isAnswerCorrect = (index: number) => {
    const userAnswer = testAnswers.value[index];
    const correctAnswer = exercises.value[index].correct_answer;
    console.log('User Answer:', userAnswer);
    console.log('Correct Answer:', correctAnswer);

    if (exercises.value[index].type === "Textová odpověď") {
        if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
            return correctAnswer.every((answer) => userAnswer.includes(answer));
        }
    } else {
        return userAnswer.toString() === correctAnswer.toString();
    }

    return false;
};


const handleSubmit = () => {
    generateTest();
}

const initializeTestAnswerArray = () => {
    for (let i = 1; i <= exerciseCount.value; i++) {
        testAnswers.value[i - 1] = Array(exercises.value[i - 1].correct_answer.length).fill("");
    }
    console.log(testAnswers.value);
}

const generateTest = async () => {
    exerciseCount.value = getExerciseCountBySubject(selectedFilter.examSubject[0]);
    const { data, error } = await supabase
        .from('tests')
        .select('id')
        .eq('year', selectedFilter.examYear)
        .eq('type', selectedFilter.examType)
        .eq('subject', selectedFilter.examSubject)
        .eq('variant', selectedFilter.examVariant)
    if (error) console.log(error);

    for (let i = 1; i <= exerciseCount.value; i++) {
        const { data, error } = await supabase.rpc('getrandomexercisebyexercisenumber', {
            in_years: selectedFilter.examYear,
            in_subjects: selectedFilter.examSubject,
            in_variants: selectedFilter.examVariant,
            in_types: selectedFilter.examType,
            in_number: i,
        })
        exercises.value.push(data);
        loadedExerciseCount.value++;
    }
    isTest.value = true;
    console.log(exercises.value);
    initializeTestAnswerArray();
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
    if (selectedFilter.examType[0] == "PZ") return filteredSubject[0].exerciseCountPZ;
    if (selectedFilter.examType[0] == "MZ") return filteredSubject[0].exerciseCountMZ;
    return 0;
}

</script>

<style></style>