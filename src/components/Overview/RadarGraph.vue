<template>
    <apexchart type="radar" height="100%" width="100%" :options="chartOptions" :series="series">
    </apexchart>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
const series = ref([{
    name: 'Series 1',
    data: [ "50", "10", "20", "3","10", "10", "20", "30", "40"],
}, {
    name: 'Series 2',
    data: ["10", "10", "20", "30", "40", "50", "10", "20", "3"],
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
        }
    },
    legend: {
        show: false
    },
    stroke: {
        width: 2
    },
    fill: {
        opacity: 0.1
    },
    markers: {
        size: 0
    },
    xaxis: {
        categories: ['Literatrura', '2012', '2013', '2014', '2015', '2016']
    },
    yaxis: {
        show: false
    }
})
</script>

<style></style>