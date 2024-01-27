<template>
    <div v-if="testState === 'selection'"
        class="container rounded d-flex flex-column justify-content-center align-items-center mt-2 bg-dark p-3">

        <Alert v-if="!userStore.isLoggedIn" message="Pro vygenerování testu se musíš přihlásit!" type="info"></Alert>

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
            data-bs-target="#testLoadingModal" :disabled="!userStore.isLoggedIn">Začít <i class="bi bi-rocket-takeoff"></i></button>
    </div>

    <div v-if="testState == 'running'" class="m-3">

        <div class="bg-dark shadow-lg w-auto rounded mb-1">
            <div class="d-flex justify-content-between" style="overflow: auto">
                <button v-for="number in exerciseCount" :key="number"
                    @click="switchToExercise(exerciseNumberIndex, number - 1)" class="text-white-50 text-center m-1 btn"
                    :class="exerciseNumberIndex + 1 == number ? 'btn-primary' : 'btn-dark'">{{ number }}</button>
            </div>
        </div>
        <div class="bg-dark shadow-lg w-auto rounded">

            <div class="text-white bg-danger rounded-5 text-end w-auto container" style="position:absolute; right: 1rem;">
                <span v-if="remainingTime.hours > 0">{{ remainingTime.hours }}h </span>
                <span v-if="remainingTime.minutes > 0">{{ remainingTime.minutes }}m </span>
                <span v-if="remainingTime.seconds > 0">{{ remainingTime.seconds }}s</span>
            </div>
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

    <div v-if="testState == 'ended'" class="text-white container bg-dark rounded-3 shadow-lg my-2">
        <div class="container-fluid">
            <div class="d-flex justify-content-center">
                <div class="text-end col">
                    <div class="me-1">Úspěšnost </div>
                    <div class="me-1">Získáno </div>
                    <div class="me-1">Maximum </div>
                    <div class="me-1">Správných </div>
                    <div class="me-1">Špatných </div>
                    <div class="me-1">Dostupný čas </div>
                    <div class="me-1">Čas </div>
                </div>
                <div class="text-start col">
                    <div>{{ (getEarnedPointsCount() / getMaxPointsCount()) * 100 }} %</div>
                    <div>{{ getEarnedPointsCount() }} bodů</div>
                    <div>{{ getMaxPointsCount() }} bodů</div>
                    <div>{{ getAnswerCountByCorrectness.correct }} odpovědí</div>
                    <div>{{ getAnswerCountByCorrectness.incorrect }} odpovědí</div>
                    <div>{{ getTestDurationInMinutesBySubject(selectedFilter.examSubject[0]) }}m</div>
                    <div>
                        <span v-if="getTimeDurationOfTest().hours > 0">{{ getTimeDurationOfTest().hours }}h</span>
                        <span v-if="getTimeDurationOfTest().minutes > 0">{{ getTimeDurationOfTest().minutes }}m </span>
                        <span v-if="getTimeDurationOfTest().seconds > 0"> {{ getTimeDurationOfTest().seconds }}s</span>
                    </div>
                </div>
            </div>
            <hr>
            <div>
                <div class="text-center">Poměr správně zodpovězených cvičení</div>
                <div class="text-white d-flex justify-content-between">
                    <span>{{ ((getAnswerCountByCorrectness.correct / exerciseCount) * 100).toFixed(1) }}
                        %</span>
                    <span>{{ ((getAnswerCountByCorrectness.incorrect / exerciseCount) * 100).toFixed(1) }}
                        %</span>
                </div>
                <div class="progress-stacked">
                    <div class="progress" role="progressbar" aria-label="Segment one"
                        :aria-valuenow="getAnswerCountByCorrectness.correct" aria-valuemin="0"
                        :aria-valuemax="exerciseCount"
                        :style="{ width: (getAnswerCountByCorrectness.correct / exerciseCount) * 100 + '%' }">
                        <div class="progress-bar bg-success"></div>
                    </div>
                    <div class="progress" role="progressbar" aria-label="Segment two"
                        :aria-valuenow="getAnswerCountByCorrectness.incorrect" aria-valuemin="0"
                        :aria-valuemax="exerciseCount"
                        :style="{ width: (getAnswerCountByCorrectness.incorrect / exerciseCount) * 100 + '%' }">
                        <div class="progress-bar bg-danger"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center py-2">
            <button type="button" class="btn btn-light mx-1" data-bs-dismiss="modal" @click="console.log('TODO')"
                disabled>Zobrazit celý test</button>
            <button type="button" class="btn btn-danger mx-1" data-bs-dismiss="modal" @click="router.go(0)">Odejít</button>
        </div>
    </div>

    <span v-if="exercises[exerciseNumberIndex]" class="text-white">{{ exercises[exerciseNumberIndex][0] }}</span>

    <!-- Check Test Modal -->
    <div v-if="isTest" class="modal fade text-white" id="checkTestModal" tabindex="-1" aria-labelledby="checkTestModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Zkontrolovat test</h1>
                </div>

                <div>
                    <div class="modal-body">
                        Opravdu chceš ukončit toto testové zadání? Ukončením ztratíš možnost opravy svých odpovědí a bude ti
                        zobrazeno hodnocení!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Pokračovat v testu</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                            @click="handleTestSubmit">Vyhodnotit</button>
                    </div>
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
                    <Alert :message="errorMessage" type="danger"></Alert>

                    <div class="progress" role="progressbar" aria-label="Success example"
                        :aria-valuenow="loadedExerciseCount" aria-valuemin="0" :aria-valuemax="exerciseCount">
                        <div class="progress-bar bg-success"
                            :style="{ width: ((loadedExerciseCount / exerciseCount) * 100) + '%' }"></div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button v-if="!errorMessage" type="button" class="btn btn-success" data-bs-dismiss="modal"
                        :disabled="!isTest" @click="testStartDateTime = new Date(); testState = 'running';">Začít</button>
                    <button v-else type="button" class="btn btn-success" data-bs-dismiss="modal"
                        @click="router.go(0)">Zavřít</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import Alert from '@/components/Alert.vue';
import { computed, onUnmounted, reactive, ref } from 'vue';
import { supabase } from '@/supabase';
import Exercise from '@/components/Exercise.vue';
import { useUserStore } from '@/stores/user';

const errorMessage = ref('');
const testState = ref('selection');
const isTest = ref(false); //Bool used to determine if test was loaded or not
const exerciseCount: any = ref(0); //Number of exercises
const exerciseNumberIndex = ref(0); //Current exercise index
const exercises: any = ref([]); //All exercises
const testAnswers: any = ref([""]); //Exercise answers
const userStore = useUserStore();
const loadedExerciseCount = ref(0); //Exercise count used for loading
const testStartDateTime = ref(new Date()); //Begin date of test
const testEndDateTime = ref(new Date()); //End date of test
const submittedExercises: any = ref([]); //Array of submitted exercises
const userTestId = ref({}); //Test id
const remainingTime = reactive({ hours: 0, minutes: 0, seconds: 0 })

const selectedFilter: { examType: string[], examYear: string[], examVariant: string[], examSubject: string[] } = reactive({
    examType: [],
    examYear: [],
    examVariant: [],
    examSubject: []
});

const getAnswerCountByCorrectness = computed(() => { //Returns correct and incorrect answer count
    const correctCount = submittedExercises.value.filter((exercise: { isCorrect: boolean }) => exercise.isCorrect).length;
    const incorrectCount = submittedExercises.value.filter((exercise: { isCorrect: boolean }) => !exercise.isCorrect).length;

    return { correct: correctCount, incorrect: incorrectCount }
})

const calculateRemainingTime = () => { //Calculates remaining time
    const startDateTime = new Date(testStartDateTime.value);

    const testDurationInMinutes = getTestDurationInMinutesBySubject(selectedFilter.examSubject[0]);

    const endDateTime = new Date(startDateTime.getTime() + testDurationInMinutes * 60000);

    const timeDifference = endDateTime.getTime() - new Date().getTime();
    if (timeDifference <= 0) handleTestSubmit(); //Ends test if time runs out

    remainingTime.hours = Math.floor(timeDifference / (1000 * 60 * 60));
    remainingTime.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    remainingTime.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
}

const getTimeDurationOfTest = () => {
    const start = new Date(testStartDateTime.value).getTime();
    const end = new Date(testEndDateTime.value).getTime();
    const timeDifference = end - start;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
}

const switchToExercise = (from: number, to: number) => { //Handles switching between exercises
    if (userStore.exerciseAnswer.length > 0) {
        testAnswers.value[from] = userStore.exerciseAnswer;
    } else testAnswers.value[from][0] = "";

    userStore.exerciseAnswer = testAnswers.value[to];

    exerciseNumberIndex.value = to;
    console.log(testAnswers.value);
}

const insertTestToDB = async () => { //Inserts test to the database and also fetches the id of that test
    const { data, error } = await supabase
        .from('userTests')
        .insert({
            'created_at': testStartDateTime.value,
            'submitted_at': testEndDateTime.value,
            'points': getEarnedPointsCount(),
            'maxPoints': getMaxPointsCount(),
            'type': exercises.value[0].test_type,
            'subject': exercises.value[0].test_subject,
            'user_id': userStore.id
        }).select().single();
    if (error) console.log(error);
    else userTestId.value = data.id;
}

const getMaxPointsCount = () => { //Returns maximum points available
    let maxPoints = 0;
    for (let i = 0; i < exerciseCount.value; i++) {
        maxPoints += exercises.value[i].points;
    }
    return maxPoints;
}

const getEarnedPointsCount = () => { //Returns earned points
    let points = 0;
    for (let i = 0; i < exerciseCount.value; i++) {
        points += getEarnedExercisePointsByIndex(i);
    }
    return points;
}

const handleTestSubmit = async () => {
    clearInterval(updateInterval as any);
    testState.value = 'ended';
    switchToExercise(exerciseNumberIndex.value, exerciseNumberIndex.value); //Saves and corrects the format of the last answer

    testEndDateTime.value = new Date();

    await insertTestToDB();

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
                'userTest_id': userTestId.value,
            }).select().single();
        if (data) {
            submittedExercises.value.push(data);
        }
        if (error) console.log(error);
    }
}

const getCountOfCorrectAnswersByIndex = (index: number) => {
    const userAnswer = testAnswers.value[index];
    const correctAnswer = exercises.value[index].correct_answer;
    let correctCount = 0;
    const exerciseType = exercises.value[index].type;
    const answerArrayLength = correctAnswer.length;

    for (let i = 0; i < answerArrayLength; i++) {
        if (exerciseType === "Textová odpověď") {
            if (userAnswer.includes(correctAnswer[i])) {
                correctCount++;
            }
        } else if (exerciseType === "Výběr mezi ANO/NE") {
            if (userAnswer[i] === correctAnswer[i]) {
                correctCount++;
            }
        }
        else if (userAnswer[i].toString() === correctAnswer[i].toString()) {
            correctCount++;
        }
    }
    return correctCount;
}

const getEarnedExercisePointsByIndex = (index: number) => {
    const userAnswer = testAnswers.value[index];
    const correctAnswer = exercises.value[index].correct_answer;
    const maxPoints = exercises.value[index].points;
    const exerciseType = exercises.value[index].type;

    if (exerciseType === "Textová odpověď") {
        //0 z 4 = 0 - 4 = 4 + -4 = 0
        //1 z 4 = 1 - 4 = 4 + -3 = 1
        //2 z 4 = 2 - 4 = 4 + -2 = 2
        //3 z 4 = 3 - 4 = 4 + -1 = 3
        //4 z 4 = 4 - 4 = 4 + -0 = 4
        let countOfIncorrectAnswers = getCountOfCorrectAnswersByIndex(index) - maxPoints;
        return (maxPoints + countOfIncorrectAnswers)
    } else if (exerciseType === "Výběr mezi ANO/NE") {
        switch (getCountOfCorrectAnswersByIndex(index)) {
            case 4: return maxPoints;
            case 3: return 1;
            default: return 0;
        }
    } else if (exerciseType === "Seřazení") {
        if (getCountOfCorrectAnswersByIndex(index) / 2 == maxPoints) return maxPoints;
        else return 0;
    }
    else {
        return getCountOfCorrectAnswersByIndex(index); // returns points as number of correct answers
    }
}

const isAnswerCorrect = (index: number) => {
    const userAnswer = testAnswers.value[index];
    const correctAnswer = exercises.value[index].correct_answer;

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

const initializeTestAnswerArray = () => { //Array init to fill the testAnswers array with the correct count of empty strings
    for (let i = 1; i <= exerciseCount.value; i++) {
        testAnswers.value[i - 1] = Array(exercises.value[i - 1].correct_answer.length).fill("");
    }
}

let updateInterval: NodeJS.Timer | null = null;

const generateTest = async () => {
    if (selectedFilter.examSubject.length > 0) {
        exerciseCount.value = getExerciseCountBySubject(selectedFilter.examSubject[0]);
    }
    const { data, error } = await supabase
        .from('tests')
        .select('id')
        .eq('year', selectedFilter.examYear)
        .eq('type', selectedFilter.examType)
        .eq('subject', selectedFilter.examSubject)
        .eq('variant', selectedFilter.examVariant)
    if (error) {
        console.log(error);
        if (selectedFilter.examSubject.length < 1 || selectedFilter.examType.length < 1) {
            errorMessage.value = "Test se nepodařilo vygenerovat, zkuste vybrat vhodné filtrovací možnosti!"
            isTest.value = false;
        }
        return;
    }

    interface ExerciseDBData {
        number: number
    }

    for (let i = 1; i <= exerciseCount.value; i++) { //Fetches exercises
        const { data, error } = await supabase.rpc('getrandomexercisebyexercisenumber', {
            in_years: selectedFilter.examYear,
            in_subjects: selectedFilter.examSubject,
            in_variants: selectedFilter.examVariant,
            in_types: selectedFilter.examType,
            in_number: i,
        }).single();
        if (!(data as ExerciseDBData)?.number) {
            errorMessage.value = "Tento test není připraven, můžeš zkusit jiný nebo nehcat vygenerovat náhodně!";
            isTest.value = false;
            return;
        }
        if (data) {
            exercises.value.push(data);
            loadedExerciseCount.value++;
        }
        if (error) {
            console.log(error);
            return;
        }
    }

    initializeTestAnswerArray();
    isTest.value = true;
    updateInterval = setInterval(calculateRemainingTime, 1000);
}

const examOptions = reactive({
    examTypes: [
        { "id": "PZ", "title": "Přijímačky" },
        { "id": "MZ", "title": "Maturita" },
    ],
    examSubjects: [
        { "id": "CJL", "title": "Český jazyk a literatura", "exerciseCountPZ": 30, "exerciseCountMZ": 32, "timePZ": 60, "timeMZ": 85 },
        //{ "id": "MAT", "title": "Matematika" },
        //{ "id": "ANJ", "title": "Anglický jazyk" },
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

const getExerciseCountBySubject = (subject: string) => { //Returns the count of exercise count base on the JSON values above
    let filteredSubject = examOptions.examSubjects.filter((item) => item.id === subject);
    if (selectedFilter.examType[0] == "PZ") return filteredSubject[0].exerciseCountPZ;
    if (selectedFilter.examType[0] == "MZ") return filteredSubject[0].exerciseCountMZ;
    return 0;
}

const getTestDurationInMinutesBySubject = (subject: string) => { //Returns the count of exercise count base on the JSON values above
    let filteredSubject = examOptions.examSubjects.filter((item) => item.id === subject);
    if (selectedFilter.examType[0] == "PZ") return filteredSubject[0].timePZ;
    if (selectedFilter.examType[0] == "MZ") return filteredSubject[0].timeMZ;
    return 0;
}

onUnmounted(() => {
    clearInterval(updateInterval as any);
});
</script>

<style></style>