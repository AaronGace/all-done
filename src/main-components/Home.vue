<template>

    <!-- Bloque oculto -->


    <blurHome id="blur" class="blur hidden"/>
        



 <!-- Pagina principal -->


  <header class="header-home">
    <div>
        <img src="../img/LOGO2.png" alt="logo">
        <a href="#">Crear</a>
        <p>00:00</p>
    </div>
  </header>

  <section class="section-home">
    <div class="left-home">

    </div>
    <div class="right-home">
        <div class="title">
            <h2>Mis tareas</h2>
        </div>
        <div class="section-articles">
            <div >
                <article >
                    <h3>PENDIENTE</h3>
                    <div @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent  class="task">
                        <a  v-for="tabla in tabla1" :key="tabla"  draggable="true" @dragstart="startDrag($event, tabla)" >{{ tabla.title }}</a>
                    </div>
                    
                </article>
                <article>
                    <H3>EN PROCESO</H3>
                    <div @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent class="task">
                        <a v-for="tabla in tabla2" :key="tabla" draggable="true" @dragstart="startDrag($event, tabla)" >{{ tabla.title }}</a>
                    </div>
                </article>
                <article>
                    <H3>TERMINADO</H3>
                    <div @drop="onDrop($event, 3)" @dragover.prevent @dragenter.prevent class="task">
                        <a v-for="tabla in tabla3" :key="tabla" draggable="true" @dragstart="startDrag($event, tabla)" >{{ tabla.title }}</a>
                    </div>
                </article>
            </div>
            <a href="#" v-on:click="viewTarea" class="add-task">+ Añadir tarea</a>
        </div>
        <div class="barraCarga">
            <div class="barra">
                <div>

                </div>
            </div>
            <p>Tareas completadas: <span id="tareasEnd">0</span></p>
        </div>
    </div>
  </section>

</template>



<script setup>
    import {ref} from "vue";
    import { supabase } from "../supabase";
    import { useUserStore } from "../store/user";
    import { useRouter } from "vue-router";
    import blurHome from "../components/blurHome.vue";

    const router = useRouter();
    const userStore = useUserStore();

    if(localStorage.getItem('logined') == null){
        router.push({ path: "/login" });
    }

    // Funciones de ocultación de bloques etc...



    function viewTarea() {

        const blur = document.getElementById("blur");

        blur.classList.remove("hidden");
    }

    // ----------------- Mostrar tareas ----------------------


    var tabla1 = ref([]);
    var tabla2 = ref([]);
    var tabla3 = ref([]);

    async function bbdd(value){
        var data = [];
        var data2 = [];
        var data3 = [];

        value.forEach(element => {
            if (element.user_id == localStorage.getItem('id')) {
                if (element.estate == 1) {
                    data.push(element);
                } 
                if (element.estate == 2) {
                    data2.push(element);
                } 
                if (element.estate == 3) {
                    data3.push(element);
                } 
            }
        });

        tabla1.value = data;
        tabla2.value = data2;
        tabla3.value = data3;

    }
    

    async function showTarea() {
        supabase.from('task').select('*')
        .then(response => {
            bbdd(response.data)
        })
        .catch(error => {
            console.log(error.response)
        });
    }
    showTarea();



    // --------------- Drag and Drop --------------------------

    function startDrag (event, item) {
        console.log(item)
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('itemID', item.id)
    }

    async function onDrop (event, estate) {
        const itemID = event.dataTransfer.getData('itemID')
        const estate2 = estate;
        console.log(itemID)
        // const item = this.tabla1.find((item) => item.id == itemID)
        // console.log(item)
        // item.estate = estate;

        const { error } = await supabase
        .from('task')
        .update({ estate: estate2 })
        .eq('id', itemID)

        showTarea()
    }

    
</script>

<style>

</style>