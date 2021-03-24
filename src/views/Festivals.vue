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
                                    {{festival && festival.exhibitors ? festival.exhibitors.length > 1 ? festival.exhibitors.length + ' exhibitors' : festival.exhibitors.length + ' exhibitor' : '0 exhibitor'}}
                                  </span></b-tag>
                                </b-taglist>
                            </template>
                            <template #img>
                                <img src="../assets/headerCard3.png" alt="">
                            </template>
                            <template #text>
                                In this festival
                            </template>
                            <template #interactions>
                                    <vs-button shadow primary @click="$router.push('/festival/'+festival._id)"><i class='bx bx-show-alt'/>
                                    </vs-button>
                                    <br>
                                <vs-button class="btn-chat" shadow primary  @click="activeChangeName=!activeChangeName;keepId = festival._id">
                                    <!--@click="changeName(festival._id, festival.name)"-->
                                    <i class='bx bx-cube-alt'/>
                                    {{festival.name}}
                                </vs-button>
                                    <vs-button class="btn-chat" shadow primary v-if="!festival.current">
                                    <div @click="updateCurrentFestival(festival._id)">
                                    {{"set current"}}
                                    </div>
                                </vs-button>
                                <vs-button class="btn-chat" primary v-if="festival.current">
                                    current
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
                            Create a <b>Festival</b>
                        </h4>
                        <br/>
                    </template>

                    <div class="con-form">
                        <br/>
                        <vs-input
                                label-placeholder="New festival's name"
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
                                Create
                            </vs-button>

                        </div>
                    </template>
                </vs-dialog>
            </div>

            <!--DIALOG modifyName !!-->
            <div class="center">
                <vs-dialog blur v-model="activeChangeName">
                    <template #header>
                        <h4 class="not-margin">
                            Change <b>name</b>
                        </h4>
                        <br/>
                    </template>

                    <div class="con-form">
                        <br/>
                        <vs-input
                                label-placeholder="New festival's name"
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
                                Change
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
            active: false,
            activeChangeName: false,
            festivals: [],
            name: '',
            keepId: ''
        }),

        beforeMount() {
            if (getCookie('token')) {
                this.user = true
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
