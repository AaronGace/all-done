<template>
        <section id="fondo" class="form-reg-section">
            <div>
                <div class="cross">
                    <a v-on:click="closeBlur" href="#"><img src="../img/close.png" alt="cross"></a>
                    
                </div>
                <div>
                    <label>Nombre</label>
                    <input id="name"  type="text" placeholder="Introduce tu nombre">
                </div>
                <div>
                    <label>Mail</label>
                    <input id="mail" type="mail" placeholder="Introduce tu mail">
                </div>
                <div>
                    <label>Fecha de nacimiento</label>
                    <input id="date" type="date" >
                </div>
                <div>
                    <label>Contraseña</label>
                    <input id="pass" type="password" placeholder="Ingresa tu contraseña">
                </div>
                <div>
                    <input id="pass2" type="password" placeholder="Confirma tu contraseña">
                </div>
                <span id="alert" class="alert"></span>
                <buttonlogin v-on:click="userReg" :texto="reg" />
            </div>
        </section>
</template>

<script setup>
    import buttonlogin from "../components/buttonlogin.vue";
    import {ref} from "vue";
    import { supabase } from "../supabase";

    const reg = ref("Registrarse");

    // Funcion rescatada del Login

    function viewLog() {
        const login = document.getElementById("login");
        const reg = document.getElementById("reg");
        const blur = document.getElementById("blur");

        login.className += " hidden";
        blur.className += " hidden";
        reg.classList.remove("hidden");
    }

    // Aqui ocultamos el registro

    function closeBlur() {
        const blur = document.getElementById("blur");

        blur.className += " hidden";
    }

    // PUSH registro

    function userReg() {
        const name = document.getElementById("name");
        const mail = document.getElementById("mail");
        const date = document.getElementById("date");
        const pass = document.getElementById("pass");
        const pass2 = document.getElementById("pass2");
        const alert = document.getElementById("alert");

        
        
        if (name.value == "" || mail.value == "" || date.value == "" || pass.value == "") {
            alert.innerHTML = "¡¡Tienes que rellenar todos los campos!!"
        }else{
            if (pass.value != pass2.value) {
                alert.innerHTML = "¡¡Las contraseñas no coinciden!!"
            }else{
                const newData = {
                name: name.value,
                mail: mail.value,
                date: date.value,
                password: pass.value
                }
                supabase
                .from('user')
                .insert(newData)
                .then(response => {
                console.log(response)
                })
                viewLog()
            }
        }
    }
</script>
