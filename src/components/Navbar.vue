
<template>
    <div class="center examplex">
        <vs-navbar text-white color="primary" center-collapsed v-model="active">
            <template #left>
                <img src="../../public/logoFJM.png" width="50" alt="">
            </template>
            <template #right>
                <vs-navbar-item :active="active == 'home'" id="home">
                    Home
                </vs-navbar-item>

                <vs-button
                        color="rgb(23, 201, 100)"
                        gradient
                        @click="login=!login"
                >
                    <i class="bx bxs-log-in-circle"/> Se connecter
                </vs-button>

                <div class="center">
                    <vs-dialog blur v-model="login">
                        <template #header>
                            <h4 class="not-margin">
                                Bienvenue au <b>Festival du Jeu de Montpellier</b>
                            </h4>
                        </template>

                        <div class="is-center">
                            <vs-row justify="center">
                                <vs-col w="8">
                                    <vs-input v-model="email" placeholder="Email">
                                        <template #icon>
                                            @
                                        </template>
                                    </vs-input>
                                    <br>
                                    <vs-input type="password" v-model="password" placeholder="Mot de passe">
                                        <template #icon>
                                            <i class='bx bxs-lock'/>
                                        </template>
                                    </vs-input>
                                    <br>
                                </vs-col>
                            </vs-row>

                        </div>


                        <template #footer>
                            <div class="footer-dialog">
                                <vs-button block gradient @click="log()">
                                    Connexion
                                </vs-button>
                            </div>
                        </template>
                    </vs-dialog>
                </div>


            </template>
        </vs-navbar>
    </div>
</template>
<script>
    import {login} from '../utils/user/login'
    import {getCookie, setCookie} from "../utils/cookie/cookie";
    export default {

        data:() => ({
            active: 'home',
            login: false,
            email: '',
            password: '',
            admin : false
        }),
        beforeMount() {
            if(getCookie('admin')){
                this.admin = getCookie('admin')
            }
        },

        methods : {
            log(){
                login(this.email, this.password).then(res =>{
                    console.log(res.data);
                    this.login=false;
                    setCookie('admin', res.data.user.admin, 999999999);
                    setCookie('token', res.data.token, 999999999);
                    setCookie('name', res.data.user.email.split('@')[0], 999999999);
                    window.location.reload();

                })
            }
        }
    }
</script>


