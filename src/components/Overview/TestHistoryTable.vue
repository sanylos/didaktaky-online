<template>
    <div class="mx-1 my-3 fs-6 d-flex justify-content-between">
        <div><i class="bi bi-clock-history"></i> Historie testů</div>
        <div class="d-flex">
            <input type="checkbox" value="PZ" v-model="filter.examType" class="btn-check" id="option12" autocomplete="off"
                checked>
            <label class="btn btn-sm me-1" :class="{
                'btn-outline-light': filter.examType.includes('PZ'),
                'btn-dark': !filter.examType.includes('PZ')
            }" for="option12">PZ</label>

            <input type="checkbox" value="MZ" v-model="filter.examType" class="btn-check" id="option13" autocomplete="off">
            <label class="btn btn-sm me-1" :class="{
                'btn-outline-light': filter.examType.includes('MZ'),
                'btn-dark': !filter.examType.includes('MZ')
            }" for="option13">MZ</label>

            <div class="me-1">|</div>

            <input type="checkbox" value="CJL" v-model="filter.examSubject" class="btn-check" id="option9"
                autocomplete="off" checked>
            <label class="btn btn-sm me-1" :class="{
                'btn-outline-light': filter.examSubject.includes('CJL'),
                'btn-dark': !filter.examType.includes('CJL')
            }" for="option9">CJL</label>

            <input type="checkbox" value="MAT" v-model="filter.examSubject" class="btn-check" id="option10"
                autocomplete="off">
            <label class="btn btn-sm me-1" :class="{
                'btn-outline-light': filter.examSubject.includes('MAT'),
                'btn-dark': !filter.examType.includes('MAT')
            }" for="option10">MAT</label>

            <input type="checkbox" value="ANJ" v-model="filter.examSubject" class="btn-check" id="option11"
                autocomplete="off">
            <label class="btn btn-sm me-1" :class="{
                'btn-outline-light': filter.examSubject.includes('ANJ'),
                'btn-dark': !filter.examType.includes('ANJ')
            }" for="option11">ANJ</label>
        </div>
    </div>
    <div v-if="filteredTests.length">
        <div class="table-responsive" style="max-height: 500px;">
            <table class="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col" class="bg-secondary-subtle">ID</th>
                        <th scope="col" class="bg-secondary-subtle">TYP ZKOUŠKY</th>
                        <th score="col" class="bg-secondary-subtle">PŘEDMĚT</th>
                        <th scope="col" class="bg-secondary-subtle">ZÍSKANÝCH BODŮ</th>
                        <th scope="col" class="bg-secondary-subtle">MAXIMUM BODŮ</th>
                        <th scope="col" class="bg-secondary-subtle">ÚSPĚŠNOST</th>
                        <th scope="col" class="bg-secondary-subtle">ČAS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="test, index in filteredTests" :key="index">
                        <td class="bg-secondary-subtle">
                            {{ test?.id }}
                        </td>
                        <td class="bg-secondary-subtle">
                            <span v-if="test?.type == 'PZ'">PŘIJÍMACÍ</span>
                            <span v-if="test?.type == 'MZ'">MATURITNÍ</span>
                        </td>
                        <td class="bg-secondary-subtle">
                            {{ test?.subject }}
                        </td>
                        <td class="bg-secondary-subtle">
                            {{ test?.points }}
                        </td>
                        <td class="bg-secondary-subtle">
                            {{ test?.maxPoints }}
                        </td>
                        <td class="bg-secondary-subtle">
                            {{ ((test?.points / test?.maxPoints) * 100).toFixed(1) }} %
                        </td>
                        <td class="bg-secondary-subtle">
                            <span class="text-success">{{
                                getTimeRangeOfDate(test?.created_at,
                                    test?.submitted_at) }}s</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center mb-3 fs-6">
            <a href="javascript:;" @click="fetchMoreData">Zobrazit více</a>
        </div>
    </div>
    <div v-else class="text-secondary text-center fst-italic p-3 mb-3">Nebyla nalezena žádná data odpovídající
        zadaným filtrům</div>
</template>

<script setup lang="ts">
import { supabase } from '@/supabase';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, reactive, ref } from 'vue';

const userStore = useUserStore();
const tests: any = ref([]);
const pagination = ref(0);
const filter = reactive({
    examType: ['PZ', 'MZ'],
    examSubject: ['CJL', 'MAT', 'ANJ']
})

const filteredTests = computed(() => {
    return tests.value.filter((item: any) => filter.examSubject.includes(item.subject) && filter.examType.includes(item.type))
})

const fetchMoreData = async () => {
    try {
        const { data, error: dataError } = await supabase
            .from('userTests')
            .select('*')
            .eq('user_id', userStore.id)
            .order('created_at', { ascending: false })
            .range(pagination.value, pagination.value + 9)
        if (dataError) console.log(dataError);
        else {
            tests.value.push(...data);
            pagination.value += 10;
        }
    } catch (error) {
        console.log(error);
    }
}

const getTimeRangeOfDate = (from: string, to: string) => {
    const startDate = new Date(from);
    const endDate = new Date(to);
    return ((endDate.getTime() - startDate.getTime()) / 1000).toString();
}

onMounted(() => {
    fetchMoreData();
})
</script>

<style></style>