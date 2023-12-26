<template>
    <span class="text-white">{{ exerciseToAdd }}</span>
    <div class="text-white">
        <br>

        <div>
            ID testu
            <input type="number" v-model="exerciseToAdd.test_id">
        </div>
        <br><br>

        <div>
            Typ Cvičení
            <select v-model="exerciseToAdd.type">
                <option value="Výběr z možností">Výběr z možností</option>
                <option value="Textová odpověď">Textová odpověď</option>
                <option value="Více textových odpovědí">Více textových odpovědí</option>
                <option value="Výběr mezi ANO/NE">Výběr mezi ANO/NE</option>
                <option value="Přiřazení">Přiřazení</option>
                <option value="Seřazení">Seřazení</option>
            </select>
        </div>
        <br><br>

        <div>
            Cislo cviceni
            <input type="number" v-model="exerciseToAdd.number">
        </div>
        <br><br>

        <div>
            Nadpis
            <input type="text" v-model="exerciseToAdd.title" class="w-75">
        </div>
        <br><br>

        <div>
            Popis (bez závorek)
            <input type="text" v-model="exerciseToAdd.description" class="w-75">
        </div>
        <br><br>

        <div class="text-white">
            Odpovědi<br>
            <div v-if="exerciseToAdd.type=='Seřazení'">
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[0]">0<br>
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[1]">1<br>
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[2]">2<br>
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[3]">3<br>
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[4]">4<br>
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[5]">5<br></div>
            <div v-else>
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[0]">0<br>
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[1]">1<br>
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[2]">2<br>
            <input type="text" class="w-75" v-model="exerciseToAdd.answers[3]">3<br></div>
            <button class="mt-1 btn btn-danger" @click="exerciseToAdd.answers = []">Vymazat</button>
        </div>
        <br><br>

        <div>
            Správná odpověď (číslo)<br>
            <div v-if="exerciseToAdd.type == 'Výběr z možností'">
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[0]">
            </div>
            <div v-else-if="exerciseToAdd.type == 'Výběr mezi ANO/NE'">
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[0]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[1]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[2]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[3]">
            </div>
            <div v-else-if="exerciseToAdd.type == 'Seřazení' || exerciseToAdd.type == 'Přiřazení'">
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[0]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[1]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[2]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[3]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[4]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[5]">
            </div>
            <div v-else>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[0]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[1]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[2]"><br>
                <input type="text" class="w-75" v-model="exerciseToAdd.correct_answer[3]"><br>
            </div>
            <button class="mt-1 btn btn-danger" @click="exerciseToAdd.correct_answer = []">Vymazat</button>
        </div>
        <br><br>

        <div>
            Tvrzení<br>
            <input type="text" v-model="exerciseToAdd.claims[0]" class="w-75"><br>
            <input type="text" v-model="exerciseToAdd.claims[1]" class="w-75"><br>
        </div>
        <button class="mt-1 btn btn-danger" @click="exerciseToAdd.claims = []">Vymazat</button>
        <br><br>

        <div v-show="exerciseToAdd.type == 'Přiřazení'">
            Věty<br>
            <input type="text" class="w-75" v-model="exerciseToAdd.sentences[0]"><br>
            <input type="text" class="w-75" v-model="exerciseToAdd.sentences[1]"><br>
            <input type="text" class="w-75" v-model="exerciseToAdd.sentences[2]"><br>
            <input type="text" class="w-75" v-model="exerciseToAdd.sentences[3]"><br>
            <input type="text" class="w-75" v-model="exerciseToAdd.sentences[4]"><br>
            <input type="text" class="w-75" v-model="exerciseToAdd.sentences[5]"><br>
            <button class="mt-1 btn btn-danger" @click="exerciseToAdd.sentences = []">Vymazat</button>
        </div>
        <br><br>

        <div>
            Body
            <input type="number" v-model="exerciseToAdd.points">
        </div>
        <br><br>

        <div>
            Skupina cvičení
            <select v-model="exerciseToAdd.group">
                <option value="Porozumění textu">Porozumění textu</option>
                <option value="Textová návaznost">Textová návaznost</option>
                <option value="Sloh">Sloh</option>
                <option value="Pravopis">Pravopis</option>
                <option value="Větné členy">Větné členy</option>
                <option value="Literatura">Literatura</option>
                <option value="Slovní druhy">Slovní druhy</option>
                <option value="Přímá × nepřímá řeč">Přímá × nepřímá řeč</option>
                <option value="Práce s definicí">Práce s definicí</option>
                <option value="Význam slov">Význam slov</option>
                <option value="Citově zabarvená slova">Citově zabarvená slova</option>
                <option value="Ustálená slovní spojení">Ustálená slovní spojení</option>
                <option value="Tvoření slov">Tvoření slov</option>
                <option value="Výstavba věty jednoduché a souvětí">Výstavba věty jednoduché a souvětí</option>
                <option value="Mluvnické kategorie">Mluvnické kategorie</option>
                <option value="Tvary slov">Tvary slov</option>
            </select>
        </div>
        <button class="btn btn-success" @click="handleSubmit">Odeslat</button>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive, ref } from 'vue';
import { supabase } from '@/supabase';
import router from '@/router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const exerciseToAdd = reactive({
    type: "",
    number: "",
    test_id: "",
    title: "",
    description: "",
    answers: [],
    correct_answer: [],
    claims: [],
    sentences: [],
    points: "",
    group: ""
})

const handleSubmit = async () => {
    if (userStore.email == 'drawingagatha@gmail.com') {
        const { error } = await supabase
            .from('exercises')
            .insert({
                type: exerciseToAdd.type,
                test_id: exerciseToAdd.test_id,
                number: exerciseToAdd.number,
                title: exerciseToAdd.title,
                description: exerciseToAdd.description,
                answers: exerciseToAdd.answers,
                correct_answer: exerciseToAdd.correct_answer,
                claims: exerciseToAdd.claims,
                sentences: exerciseToAdd.sentences,
                points: exerciseToAdd.points,
                group: exerciseToAdd.group
            })
        if (error) console.log(error);
        else {
            confirm("Uspesne nahrano!");
        }
    } else alert("Nemuzes pridavat cviceni!");
}
</script>

<style></style>