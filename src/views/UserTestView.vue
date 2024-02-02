<template>
    <div class="text-white">{{ test }}</div>
</template>

<script setup lang="ts">
import { supabase } from '@/supabase';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const userData = useUserStore();
const router = useRoute();
const test = ref({});

const fetchUserTest = async () => {
    try {
        const { data, error } = await supabase
            .from('userTests')
            .select('*')
            .eq('id', router.params.id)
            .single();
        if (error) {
            console.log(error);
            return
        } else {
            test.value = data;
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    fetchUserTest();
})
</script>

<style></style>