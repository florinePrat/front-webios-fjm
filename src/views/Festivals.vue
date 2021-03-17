<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="festival" v-else/>
        <SideBar/>
        <br>
        <br>
        <br>
        <div class="is-half p-6 ml-6">

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
                        <vs-card @click="$router.push('/festival/' + festival._id)">
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
                                <vs-button class="btn-chat" primary v-if="festival.current">
                                    <!--@click="changeName(festival._id, festival.name)"-->
                                    current
                                </vs-button>
                                <vs-button class="btn-chat" shadow primary>
                                    <!--@click="changeName(festival._id, festival.name)"-->
                                    <i class='bx bx-cube-alt'/>
                                    {{festival.name}}
                                </vs-button>
                                <b-tooltip label="Delete search" type="is-primary is-light" position="is-top">
                                    <vs-button
                                            icon
                                            color="rgb(198, 35, 35)"
                                            gradient
                                    >
                                        <!--@click.stop="deleteFestival(festival._id)"-->
                                        <i class='bx bxs-trash'/>
                                    </vs-button>
                                </b-tooltip>
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
        </div>


    </div>

</template>

<script>
    import SideBar from "@/components/SideBar";
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {addFestival} from "../utils/admin/festivals/addFestival";
    import {getAllFestivals} from "../utils/user/festivals/getAllFestivals";

    export default {
        name: 'Festival',
        components: {
            UserNavbar,
            SideBar,
            Navbar
        },
        data: () => ({
            user: false,
            active: false,
            festivals: [],
            name: ''
        }),

        beforeMount() {
            if (getCookie('token')) {
                this.user = true
            }
            getAllFestivals().then(res => {
                console.log(res.data);
                this.festivals = res.data
            })
        },

        methods: {
            addFestival() {
                addFestival(this.name).then(res => {
                    console.log(res.data);
                    this.festivals.push(res.data)
                    this.active = false
                })
            }
        }


    }
</script>
