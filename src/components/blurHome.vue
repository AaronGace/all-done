<template>
    <section id="fondo" class="form-tarea-section">
            <div>
                <div class="cross">
                    <a v-on:click="closeBlur" href="#"><img src="../img/close.png" alt="cross"></a>
                    
                </div>
                <div>
                    <label>Nombre</label>
                    <input id="name"  type="text" placeholder="Introduce la tarea">
                </div>
                
                <span id="alert" class="alert"></span>
                <buttonlogin v-on:click="getTarea" :texto="reg" />
            </div>
        </section>
</template>

<script setup>
    import buttonlogin from "../components/buttonlogin.vue";
    import {ref} from "vue";
    import { supabase } from "../supabase";

    const reg = ref("Crear tarea");

    

    // Funciones de ocultación de bloques etc...


    function closeBlur() {
        const blur = document.getElementById("blur");

        blur.className += " hidden";
    }

    // ------------------ Recibir tarea --------------------

    function getTarea() {
    const name = document.getElementById("name");
    const id = localStorage.getItem('id');


    if (name.value == "" ) {
        alert.innerHTML = "¡¡Tienes que rellenar el campo!!"
    }else{
        
        const newData = {
        user_id: id,
        title: name.value,
        estate: 1,
        }

        supabase
        .from('task')
        .insert(newData)
        .then(response => {
        console.log(response)
        })

        closeBlur()
        location.reload();
        
        
    }
    }
</script>

<style lang="scss" scoped>

</style>