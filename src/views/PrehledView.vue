<template>
    <Spinner :isLoading="isLoading"></Spinner>
    <div v-if="!isLoading" class="d-flex justify-content-center text-dark-emphasis">
        <Alert v-if="!userStore.isLoggedIn" message="Pro zobrazení přehledu se musíš přihlásit!" type="danger" class="mt-3">
        </Alert>
        <div v-else class="container d-flex flex-column">
            <div class="row my-2">

                <div v-if="answerCount.total" class="col-xl-3 col-md-6 my-2">
                    <div class="container p-3 bg-dark rounded-1 shadow h-100">
                        <div class=" mb-1 fs-6">
                            <i class="bi bi-send-plus"></i> Vyplněných cvičení
                        </div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="text-dark-emphasis">{{ answerCount.total }}</div>
                            <div class="fs-6 d-flex align-items-center" v-if="answerCountImprovementPercentage">
                                <div v-if="answerCountImprovementPercentage > 0">
                                    {{ answerCountImprovementPercentage.toFixed() }}%
                                    <i class="bi bi-caret-up-fill text-success"></i>
                                </div>
                                <div v-if="answerCountImprovementPercentage < 0">
                                    {{ answerCountImprovementPercentage.toFixed() }}%
                                    <i class="bi bi-caret-down-fill text-danger"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 my-2">
                    <div class="container p-3 bg-dark rounded-1 shadow h-100">
                        <div class=" mb-1 fs-6">
                            <i class="bi bi-file-earmark-text-fill"></i> Vyplněných testů
                        </div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">0</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 my-2">
                    <div class="container p-3 bg-dark rounded-1 shadow h-100">
                        <div class=" mb-1 fs-6">
                            <i class="bi bi-clipboard2-check-fill"></i> Úspěšnost
                        </div>
                        <div v-if="successRate" class="fs-6 d-flex flex-row justify-content-between">
                            <div class="fs-3">{{ successRate.toFixed(1) }}<span class="ms-1 fs-6">%</span></div>
                        </div>
                        <div v-else class="text-secondary text-center fst-italic mt-3">Žádná data</div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 my-2">
                    <div class="container p-3 bg-dark rounded-1 shadow h-100">
                        <div class=" mb-1 fs-6">
                            <i class="bi bi-check2-circle"></i> Nejúspěšnější skupina cvičení
                        </div>
                        <div v-if="bestExerciseGroup?.exercisegroup && bestExerciseGroup?.successRate"
                            class="fs-3 d-flex flex-row justify-content-between align-items-center">
                            <div class="">{{ bestExerciseGroup.exercisegroup }}</div>
                            <div class="fs-6 text-secondary">(<span class="text-success">{{
                                bestExerciseGroup.successRate.toFixed() }}%</span>)</div>
                        </div>
                        <div v-else class="text-secondary text-center fst-italic mt-3">Žádná data</div>
                    </div>
                </div>
            </div>

            <div>
                <div class="container p-3 bg-dark rounded-1 shadow">
                    <div class="mb-1 fs-6 d-flex justify-content-between">
                        <div><i class="bi bi-list-stars me-1"></i>Skupiny cvičení</div>
                        <div class="d-flex">
                            <input type="radio" value="PZ" @change="fetchAnsweredExerciseGroups"
                                v-model="exerciseGroupsFilter.examType" class="btn-check" name="examOptions" id="option1"
                                autocomplete="off" checked>
                            <label class="btn btn-sm" for="option1">PZ</label>

                            <input type="radio" value="MZ" @change="fetchAnsweredExerciseGroups"
                                v-model="exerciseGroupsFilter.examType" class="btn-check" name="examOptions" id="option2"
                                autocomplete="off">
                            <label class="btn btn-sm" for="option2">MZ</label>

                            <div>|</div>

                            <input type="radio" value="CJL" @change="fetchAnsweredExerciseGroups"
                                v-model="exerciseGroupsFilter.examSubject" class="btn-check" name="subjectOptions"
                                id="option3" autocomplete="off" checked>
                            <label class="btn btn-sm" for="option3">CJL</label>

                            <input type="radio" value="MAT" @change="fetchAnsweredExerciseGroups"
                                v-model="exerciseGroupsFilter.examSubject" class="btn-check" name="subjectOptions"
                                id="option4" autocomplete="off">
                            <label class="btn btn-sm" for="option4">MAT</label>

                            <input type="radio" value="ANJ" @change="fetchAnsweredExerciseGroups"
                                v-model="exerciseGroupsFilter.examSubject" class="btn-check" name="subjectOptions"
                                id="option5" autocomplete="off">
                            <label class="btn btn-sm" for="option5">ANJ</label>
                        </div>
                    </div>

                    <div v-if="exerciseGroupsArray.labels.length && exerciseGroupsArray.correct.length && exerciseGroupsArray.incorrect.length"
                        class="container d-flex flex-column flex-sm-row align-items-center">
                        <div class="">
                            <RadarGraph :labels="exerciseGroupsArray.labels" :correct-series="exerciseGroupsArray.correct"
                                :incorrect-series="exerciseGroupsArray.incorrect"></RadarGraph>
                        </div>
                        <div class="container" style="overflow: auto">
                            <div class="table-responsive">
                                <table class="table table-dark table-hover" style="font-size: 14px;">
                                    <thead class="text-center">
                                        <tr>
                                            <th v-for="label, index in exerciseGroupsArray.labels" :key="index" scope="col">
                                                {{
                                                    label }}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-center">
                                        <tr>
                                            <td v-for="label, index in exerciseGroupsArray.labels" :key="index">
                                                <span class="text-success">{{ exerciseGroupsArray.correct[index] }}</span>
                                                <span class="text-secondary fw-bold"> / </span>
                                                <span class="text-danger">{{ exerciseGroupsArray.incorrect[index] }}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="fw-bold" :class="{
                                                'text-success': getSuccessRateByLabel(label) >= 50,
                                                'text-danger': getSuccessRateByLabel(label) < 50,
                                            }" v-for="label, index in exerciseGroupsArray.labels" :key="index">{{
    getSuccessRateByLabel(label).toFixed() }}%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-secondary text-center fst-italic p-3">Nebyla nalezena žádná data odpovídající
                        zadaným filtrům</div>
                </div>

            </div>

            <div class="mt-3 container rounded-1 bg-dark">
                <HistoryTable></HistoryTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Spinner from '@/components/Spinner.vue';
import Alert from '@/components/Alert.vue';
import HistoryTable from '@/components/Overview/HistoryTable.vue'
import { useUserStore } from '@/stores/user';
import { supabase } from '@/supabase';
import { onMounted, onUpdated, onBeforeMount, ref, onBeforeUpdate, onServerPrefetch, onActivated, computed, reactive, watch } from 'vue';
import RadarGraph from '@/components/Overview/RadarGraph.vue'
import { right } from '@popperjs/core';
import { isForInStatement } from 'typescript';

interface ExerciseGroup {
    exercisegroup: string;
    iscorrect: boolean;
    count: number;
}



const userStore = useUserStore();
const isLoading = ref(false);
const exerciseGroupsFilter = reactive({
    examType: 'PZ',
    examSubject: 'CJL'
})
const answerCount = ref({
    total: 0,
    lastTwoWeeks: 0,
    lastWeek: 0,
    exerciseGroups: [] as ExerciseGroup[],
});

const exerciseGroupsArray = computed(() => {

    let correctGroup: Array<Number> = [];
    let incorrectGroup: Array<Number> = [];

    let allLabels = answerCount.value.exerciseGroups.map(groupItem => groupItem.exercisegroup); //MAP all labels
    let uniqueLabels: Array<String> = [];

    //PUSH label to array if is unique
    allLabels.forEach(label => {
        if (!uniqueLabels.includes(label)) {
            uniqueLabels.push(label);
        }
    });

    //PUSH (in)correct answer count to its array
    uniqueLabels.forEach((label => {
        const correctAnswerGroup = answerCount.value.exerciseGroups.find((group) => group.exercisegroup === label && group.iscorrect == true);
        const incorrectAnswerGroup = answerCount.value.exerciseGroups.find((group) => group.exercisegroup === label && group.iscorrect == false);
        if (correctAnswerGroup) { correctGroup.push(correctAnswerGroup.count); } else correctGroup.push(0);
        if (incorrectAnswerGroup) { incorrectGroup.push(incorrectAnswerGroup.count); } else incorrectGroup.push(0);
    }))

    //SHORTEN labels for better radar chart visibility
    const displayedLabels = uniqueLabels.map(label => {
        if (label.length > 20) {
            let currentLabel = label.split(' ');
            let firstTwoWords = currentLabel[0] + " " + currentLabel[1];
            return firstTwoWords;
        }
        return label;
    })

    return { correct: correctGroup, incorrect: incorrectGroup, labels: displayedLabels }
})

const successRate = computed(() => {
    let incorrectCount: number = 0;
    let correctCount: number = 0;
    exerciseGroupsArray.value.correct.forEach((value) => correctCount += +value);
    exerciseGroupsArray.value.incorrect.forEach((value) => incorrectCount += +value);
    return 100 * (correctCount / incorrectCount)
})

const getSuccessRateByLabel = (label: String) => {
    let wrongAnswerGroup = answerCount.value.exerciseGroups.find(group => group.exercisegroup === label && group.iscorrect == false);
    let rightAnswerGroup = answerCount.value.exerciseGroups.find(group => group.exercisegroup === label && group.iscorrect == true);
    if (!rightAnswerGroup) return 0;
    if (!wrongAnswerGroup) return 100;
    return 100 / (wrongAnswerGroup.count + rightAnswerGroup.count) * rightAnswerGroup.count;
}

const bestExerciseGroup = computed(() => { //method for getting the exercise with most right answers ratio
    let currentlyBest = answerCount.value.exerciseGroups[0];
    let currentlyBestSuccessRate = 0;
    if (answerCount.value.exerciseGroups.length > 0) {
        answerCount.value.exerciseGroups.forEach((group) => {
            if (group.iscorrect) {
                let groupsWithSameType = answerCount.value.exerciseGroups.filter(groupItem => groupItem.exercisegroup === group.exercisegroup);
                //console.log(groupsWithSameType);
                let group1 = groupsWithSameType[0];
                let group2 = groupsWithSameType[1] ? groupsWithSameType[1] : { count: 0 }; //IF group2 does not exist, set count to 0
                let successRate = (group1.count / group2.count) * 100;
                if (successRate > currentlyBestSuccessRate) {
                    currentlyBestSuccessRate = successRate;
                    currentlyBest = group1;
                }
            }

        })

        //SHORTEN text so it has better visibility
        if (currentlyBest.exercisegroup.length > 20) {
            let currentLabel = currentlyBest.exercisegroup.split(' ');
            let firstTwoWords = currentLabel[0] + " " + currentLabel[1];
            currentlyBest.exercisegroup = firstTwoWords;
        }

        return { exercisegroup: currentlyBest.exercisegroup, successRate: currentlyBestSuccessRate };
    }
})

const fetchAnsweredExerciseGroups = async () => {
    try {
        const { data, error } = await supabase.rpc('getcountexercisegroups', {
            user_id: userStore.id
        })
            .eq('subject', exerciseGroupsFilter.examSubject)
            .eq('examtype', exerciseGroupsFilter.examType)
        console.log(data)
        if (error) console.log(error);
        if (data) answerCount.value.exerciseGroups = data;
    } catch (error) {
        console.log(error);
    }
}

const fetchAnswerCount = async () => {

    //FETCH ANSWER COUNT
    const { count, error: countError } = await supabase
        .from('userAnswers')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userStore.id)
    if (countError) console.log(countError);
    if (count) answerCount.value.total = count;
}



const answerCountImprovementPercentage = computed(() => { //GET answer count improvement against last week
    const lastTwoWeeks = answerCount.value.lastTwoWeeks;
    const lastWeek = answerCount.value.lastWeek;

    const percentage = ((lastWeek - (lastTwoWeeks - lastWeek)) / (lastTwoWeeks - lastWeek)) * 100;

    if (typeof percentage === 'number' && percentage != Infinity) return percentage;
    else return lastWeek * 100;
})

const fetchAnswerCountImprovement = async () => { //FETCH answer count improvement against last week

    let dateFourteenDaysAgo = new Date();
    dateFourteenDaysAgo.setDate(dateFourteenDaysAgo.getDate() - 14);
    let dateSevenDaysAgo = new Date();
    dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

    const { count: lastWeekCount, error: lastWeekCountError } = await supabase
        .from('userAnswers')
        .select('*', { count: 'exact', head: true })
        .gte('generated_at', dateSevenDaysAgo.toISOString())
        .eq('user_id', userStore.id)
    if (lastWeekCountError) console.log(lastWeekCountError);
    if (lastWeekCount) answerCount.value.lastWeek = lastWeekCount;

    const { count: lastTwoWeeksCount, error: lastTwoWeeksCountError } = await supabase
        .from('userAnswers')
        .select('*', { count: 'exact', head: true })
        .gte('generated_at', dateFourteenDaysAgo.toISOString())
        .eq('user_id', userStore.id)
    if (lastTwoWeeksCountError) console.log(lastTwoWeeksCountError);
    if (lastTwoWeeksCount) answerCount.value.lastTwoWeeks = lastTwoWeeksCount;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

onMounted(async () => {
    isLoading.value = true;
    await sleep(500);
    await fetchAnswerCount();
    await fetchAnswerCountImprovement();
    await fetchAnsweredExerciseGroups();
    isLoading.value = false;
})
</script>

<style></style>