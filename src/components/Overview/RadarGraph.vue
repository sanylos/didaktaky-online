<template>
    <apexchart type="radar" height="100%" width="100%" :options="chartOptions" :series="series">
    </apexchart>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const props = defineProps({
    correctSeries: Array,
    incorrectSeries: Array,
    labels: Array
})

const series = ref([{
    name: 'Series 1',
    data: props.incorrectSeries,//[ "50", "10", "20", "3","10", "10", "20", "30", "40"],
}, {
    name: 'Series 2',
    data: props.correctSeries,//["10", "10", "20", "30", "40", "50", "10", "20", "3"],
},
])
const chartOptions = reactive({
    chart: {
        toolbar: {
            show: false
        },
        type: 'radar',
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
        },
        sparkline: {
            enabled: true
        }
    },
    legend: {
        show: false
    },
    stroke: {
        width: 1,
        colors: ["crimson", "#2AAA8A"]
    },
    fill: {
        opacity: 0.5,
        colors: ['#dc143c', '#2AAA8A']
    },
    markers: {
        size: 0
    },
    xaxis: {
        categories: props.labels,//['Literatrura', '2012', '2013', '2014', '2015', '2016']
        labels: {
            show: true,
            style: {
                fontSize: "8px",
            },
        }
    },
        yaxis: {
        show: false
    }
})
</script>

<style></style>