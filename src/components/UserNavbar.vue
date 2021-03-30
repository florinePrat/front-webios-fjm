
<template>
    <div class="center examplex">
        <vs-navbar text-white color='primary' center-collapsed v-model="active">
            <template #left>
                <img src="../../public/logoFJM.png" width="60" alt="" class="pr-3">
                FJM
            </template>
            <template #right>
                <vs-navbar-item :active="active == 'home'" to="/" id="home">
                    Home
                </vs-navbar-item>
                <vs-navbar-item v-if="user" :active="active == 'festival'" id="festival" to="/festival" >
                    Festivals
                </vs-navbar-item>
                <vs-navbar-item v-if="user" :active="active == 'exhibitor'" id="exhibitor" to="/exhibitor" >
                    Exhibitors
                </vs-navbar-item>
                <vs-navbar-item v-if="admin" :active="active == 'facturation'" id="facturation" to="/facturation" >
                    Facturation
                </vs-navbar-item>

                <vs-button v-if="admin"
                        color="rgb(23, 201, 100)"
                        @click="signup=!signup"
                >
                    <i class="bx bxs-log-in-circle"/> Add collaborator
                </vs-button>

                <vs-button
                        color="rgb(23, 201, 100)"
                        gradient
                        @click="logout()"
                >
                    <i class="bx bxs-log-in-circle"/> Logout
                </vs-button>
                <div class="center">
                    <vs-dialog blur v-model="signup">
                        <template #header>
                            <h4 class="not-margin">
                                Welcome to <b>FJM</b>
                            </h4>
                        </template>

                        <div class="is-center">
                            <vs-row justify="center">
                                <vs-col w="8">

                                    <vs-input border warn type="email" v-model="email" label-placeholder="Email">
                                        <template #icon>
                                            @
                                        </template>
                                    </vs-input>
                                    <br>
                                    <vs-input color="#7d33ff" border warn type="password" v-model="password" label-placeholder="Password">
                                        <template #icon>
                                            <i class='bx bx-lock-open-alt'/>
                                        </template>
                                    </vs-input>

                                    <br>
                                    <div class="flex">
                                        <vs-checkbox v-model="adminCreation">Admin account ?</vs-checkbox>
                                    </div>
                                </vs-col>
                            </vs-row>

                        </div>


                        <template #footer>
                            <div class="footer-dialog">
                                <vs-button block gradient @click="log()">
                                    Create account
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
    import {signup} from '../utils/admin/signup'
    import {eraseCookie, getCookie} from "../utils/cookie/cookie";
    export default {
        props:{
            active: String
        },
        data:() => ({
            signup: false,
            email: '',
            password: '',
            admin : false,
            adminCreation : false,
            user : false
        }),
        beforeMount() {
            if(getCookie('admin')){
                this.admin = true
            }
            if(getCookie('token')){
                this.user = true
            }
        },

        methods : {
            logout(){
              eraseCookie('token');
              eraseCookie('admin');
              eraseCookie('name');
              window.location.reload()
            },
            log(){
                signup(this.email, this.password, this.adminCreation).then(res =>{
                    console.log(res.data);
                    console.log("this account is created");
                    this.signup=false;
                    this.succes();
                }).catch(e =>{
                    console.log(e);
                    this.signup=false;
                    this.failure();
                })
            },
            succes() {
                this.$vs.notification({
                    progress: 'auto',
                    icon : `<i class='bx bx-badge-check' />`,
                    color : 'primary',
                    position : 'top-center',
                    title: 'Utilisateur crée avec succes',
                })
            },
            failure() {
                this.$vs.notification({
                    progress: 'auto',
                    icon : `<i class='bx bxs-user-x' />`,
                    color : 'danger',
                    position : 'top-center',
                    title: 'Erreur lors de l\'enregistrement de cet utilisateur',
                })
            }
        }
    }
</script>


