<template>

    <!-- Bloque oculto -->

    <blurLogin id="blur" class="blur hidden" @callParentMethod="viewLog"/>
        
    <!-- Pagina principal -->


    <section class="login-section">
        <section class="login-block">
            <div class="slider-login">
                <img src="../img/PNGPOINT.png" draggable="false" alt="Image points">
            </div>
            <div id="login" class="form-login">
                <div class="frame-login">
                    <div class="up-frame">
                        <img src="../img/LOGO.png" alt="logo">
                        <h1>ALL DONE</h1>
                    </div>
                    <div class="bottom-login">
                        <a v-on:click="viewReg"  class="button-reg" href="javascript:">Registrarse</a>
                        <buttonlogin v-on:click="viewLog" :texto="login" />
                    </div>
                </div>
            </div>


            <div id="reg" class="form-login hidden">
                <div class="frame-login">
                    <div class="up-frame">
                        <img src="../img/LOGO.png" alt="logo">
                        <h1>ALL DONE</h1>
                    </div>
                    <div class="bottom-login">
                        <input id="login-mail" type="mail" placeholder="Correo electrónico">
                        <input id="login-pass" type="password" placeholder="Contraseña">
                    </div>
                    <div class="login-extra">
                        <buttonlogin v-on:click="loginSession" :texto="login" />
                        <p>¿Todavía no tienes una cuenta? <a v-on:click="viewReg" href="#">Regístrate aquí</a></p>
                    </div>
                </div>
            </div>
        </section>
    </section>



 
    
</template>

<script setup>
    import {ref} from "vue";
    import { supabase } from "../supabase";
    import { useUserStore } from "../store/user";
    import { useRouter } from "vue-router";

    import blurLogin from "../components/blurLogin.vue";
    import buttonlogin from "../components/buttonlogin.vue";



    const router = useRouter();
    const userStore = useUserStore();
    const login = ref("Iniciar sesión");

    if(localStorage.getItem('logined') != null){
        router.push({ path: "/" });
    }


    userStore.loginCheck();
    // Funciones de ocultación de bloques etc...


    function viewLog() {
        const login = document.getElementById("login");
        const reg = document.getElementById("reg");
        const blur = document.getElementById("blur");

        login.className += " hidden";
        blur.className += " hidden";
        reg.classList.remove("hidden");
    }

    function viewReg() {
        const login = document.getElementById("login");
        const reg = document.getElementById("reg");
        const blur = document.getElementById("blur");

        reg.className += " hidden";
        login.classList.remove("hidden");
        blur.classList.remove("hidden");
    }


    


    // ----------- LOGIN ---------------

    function bbdd(bd,mail,pass){
        bd.forEach(element => {
            console.log(element.name)
            if (element.mail == mail) {
                if (element.password == pass) {
                    localStorage.setItem('logined', true);
                    localStorage.setItem('id', element.id);
                    router.push({ path: "/" });
                }else{
                }
            }
        });
        console.log(pass);
    }
    function loginSession() {
        const mail = document.getElementById("login-mail");
        const pass = document.getElementById("login-pass");


        supabase.from('user').select('*')
        .then(response => {
            bbdd(response.data,mail.value,pass.value)
        })
        .catch(error => {
            console.log(error.response)
        });
    }
    



</script>

<style>

</style>