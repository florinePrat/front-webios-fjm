<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="festival" v-else/>
        <!--<SideBar/>-->
        <br>
        <br>
        <br>
        <div class="is-half ml-6 mr-6">

            <vs-row>
                <vs-col w="8">
                    <h1>Festivals</h1>
                </vs-col>
            </vs-row>

            <br/>
            <div class="ml-6">
                <vs-row>
                    <vs-col w="4" vs-type="flex" vs-justify="center" vs-align="center">
                        <vs-card @click="active=!active">
                            <template #img>
                                <img src="../assets/card.png" alt="">
                            </template>
                        </vs-card>
                    </vs-col>
                    <vs-col w="4" v-for="festival in festivals" :key="festival._id" vs-type="flex" vs-justify="center"
                            vs-align="center">
                        <vs-card>
                            <template #title>
                                <b-taglist>
                                    <b-tag type="is-primary is-light"><i class='bx bx-game'/>
                                        <span class="span">
                                            {{festival && festival.gameBookedList ? festival.gameBookedList.length > 1 ? festival.gameBookedList.length + ' jeux' : festival.gameBookedList.length + ' jeu' : '0 jeu'}}
                                  </span></b-tag>
                                    <br>
                                    <b-tag type="is-primary is-light"><i class='bx bx-male'/>
                                        <span class="span">
                                            {{festival && festival.exhibitors ? festival.exhibitors.length > 1 ? festival.exhibitors.length + ' exposants' : festival.exhibitors.length + ' exposant' : '0 exposant'}}
                                  </span></b-tag>
                                    <b-tag type="is-primary is-light"><i class='bx bx-border-inner'/>
                                        <span class="span">
                                            {{festival && festival.space ? 'espaces OK' : "pas d'espace"}}
                                    </span></b-tag>
                                    <b-tag type="is-primary is-light"><i class='bx bx-category'/>
                                        <span class="span">
                                            {{festival && festival.zoneId ? festival.zoneId.length > 1 ? festival.zoneId.length + ' zones' : festival.zoneId.length + ' zones' : '0 zones'}}
                                    </span></b-tag>
                                </b-taglist>
                            </template>
                            <template #img>
                                <img src="../assets/headerCard3.png" alt="">
                            </template>
                            <template #text>
                                dans ce festival
                            </template>
                            <template #interactions>
                                    <vs-button shadow primary @click="$router.push('/festival/'+festival._id)"><i style="font-size:16px" class='bx bx-show-alt'/>
                                    </vs-button>
                                    <br>
                                <vs-button class="btn-chat" shadow primary  @click="activeChangeName=!activeChangeName;
                                keepId = festival._id;keepName = festival.name">
                                    <!--@click="changeName(festival._id, festival.name)"-->
                                    <i class='bx bx-cube-alt'/>
                                    {{festival.name}}
                                </vs-button>
                                    <vs-button class="btn-chat" shadow primary v-if="!festival.current && admin">
                                    <div @click="updateCurrentFestival(festival._id)">
                                    {{"festival en cours ?"}}
                                    </div>
                                </vs-button>
                                <vs-button class="btn-chat" primary v-if="festival.current">
                                    festival courant
                                </vs-button>
                            </template>
                        </vs-card>
                        <br/>
                    </vs-col>
                </vs-row>
            </div>


            <!--DIALOG !!-->
            <div class="center">
                <vs-dialog blur v-model="active">
                    <template #header>
                        <h4 class="not-margin">
                            Créer un <b>Festival</b>
                        </h4>
                        <br/>
                    </template>

                    <div class="con-form">
                        <br/>
                        <vs-input
                                label-placeholder="Nom du festival"
                                v-model="name"
                        >
                            <template #icon>
                                <i class='bx bx-add-to-queue'/>
                            </template>
                        </vs-input>
                        <br/>
                    </div>

                    <template #footer>
                        <div class="footer-dialog">
                            <vs-button gradient block @click="addFestival">
                                Créer
                            </vs-button>

                        </div>
                    </template>
                </vs-dialog>
            </div>

            <!--DIALOG modifyName !!-->
            <div class="center">
                <vs-dialog blur v-model="activeChangeName" v-if="admin">
                    <template #header>
                        <h4 class="not-margin">
                            Changer le <b>nom</b>
                        </h4>
                        <br/>
                    </template>

                    <div class="con-form">
                        <br/>
                        <vs-input
                                :label-placeholder="keepName"
                                v-model="name"
                        >
                            <template #icon>
                                <i class='bx bx-add-to-queue'/>
                            </template>
                        </vs-input>
                        <br/>
                    </div>

                    <template #footer>
                        <div class="footer-dialog">
                            <vs-button gradient block @click="updateFestival()">
                                Changer
                            </vs-button>

                        </div>
                    </template>
                </vs-dialog>
            </div>

        </div>


    </div>

</template>

<script>
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {addFestival} from "../utils/admin/festivals/addFestival";
    import {getAllFestivals} from "../utils/user/festivals/getAllFestivals";
    import {updateCurrentFestival} from "../utils/admin/festivals/updateCurrentFestival"
    import {updateFestival} from "../utils/admin/festivals/updateFestival"

    export default {
        name: 'Festival',
        components: {
            UserNavbar,
            Navbar
        },
        data: () => ({
            user: false,
            admin : false,
            active: false,
            activeChangeName: false,
            festivals: [],
            name: '',
            keepId: '',
            keepName:''
        }),

        beforeMount() {
            if (getCookie('token')) {
                this.user = true
            }
            if (getCookie('admin')) {
                this.admin = true
            }
            getAllFestivals().then(res => {
                console.log(res.data);
                this.festivals = res.data.reverse()
            }).catch(e =>{
                console.log(e);
                this.notificationErreur(e.response.data.error)
            })
        },

        methods: {
            addFestival() {
               if (this.name !== ''){
                   addFestival(this.name).then(res => {
                       console.log(res.data);
                       this.festivals.unshift(res.data);
                       this.active = false;
                       this.notificationSucces('Festival créé avec succès')
                   }).catch(e =>{
                    console.log(e);
                    this.notificationErreur(e.response.data.error)

                })
               } else{
                    this.notificationErreur('Vous ne pouvez pas créer un festival sans nom...')
               }
            },
            updateFestival() {
                console.log(this.name + this.keepId)
               if (this.name !== ''){
                   updateFestival(this.keepId, this.name).then(res => {
                       console.log(res.data);
                        getAllFestivals().then(res => {
                            this.festivals = res.data.reverse()
                        })
                       this.activeChangeName = false;
                       this.notificationSucces('Festival modifié avec succès')
                   }).catch(e =>{
                    console.log(e);
                    this.notificationErreur(e.response.data.error)

                })
               } else{
                    this.notificationErreur('Vous devez choisir un nom pour le festival...')
               }
            },
            updateCurrentFestival(id) {
                console.log(id)
                   updateCurrentFestival(id, true).then(res => {
                       console.log(res.data);
                    getAllFestivals().then(res => {
                        this.festivals = res.data.reverse()
                        })
                       this.notificationSucces('Festival courant changé avec succès')
                   }).catch(e =>{
                    console.log(e);
                    this.notificationErreur(e.response.data.error)
                })
            },
            notificationErreur(title) {
                this.$vs.notification({
                    progress: 'auto',
                    icon : `<i class='bx bxs-user-x'/>`,
                    color : 'danger',
                    position : 'top-center',
                    title: title,
                })
            },
            notificationSucces(title) {
                this.$vs.notification({
                    progress: 'auto',
                    icon : `<i class='bx bx-badge-check' />`,
                    color : 'primary',
                    position : 'top-center',
                    title: title,
                })
            },
        }


    }
</script>
