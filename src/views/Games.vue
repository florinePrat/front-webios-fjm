<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="exhibitor" v-else/>
        <br>
        <br>
        <br>
        <vs-row>
            <vs-col offset="2" w="8">
                {{exhibitor.name}}
            </vs-col>
        </vs-row>

        <br/>
        <div class="ml-6">
        <vs-row>
            <vs-col w="4" v-for="game in games" :key="game._id" vs-type="flex" vs-justify="center"
                    vs-align="center">
                <vs-card>
                    <template #title>
                        <b-taglist>

                            <b-tag type="is-primary is-light"><i class='bx bx-group'/>
                                <span class="span">
                                De {{game && game.nbPlayersMin}} à {{game && game.nbPlayersMax}} joueurs
                              </span></b-tag>
                            <br>
                            <b-tag type="is-primary is-light"><i class='bx bx-male'/>
                                <span class="span">
                                Age min : {{game && game.ageMin}} ans
                              </span></b-tag>
                            <br>
                            <b-tag type="is-primary is-light"><i class='bx bx-cube-alt'/>
                                <span class="span">
                               {{game && game.category}}
                              </span></b-tag>
                            <br/>
                            <b-tag type="is-primary is-light"><i class='bx bx-time'/>
                                <span class="span">
                               {{game && game.duration}}''
                              </span></b-tag>
                            <br/>
                            <b-tag type="is-primary is-light"><i class='bx bx-book-reader'/>
                                <span class="span">
                               {{exhibitor.name}}
                              </span></b-tag>

                        </b-taglist>
                    </template>
                    <template #img>
                        <img src="../assets/headerCardGame.png" alt="">
                    </template>
                    <template #text>
                        {{game.description}}
                    </template>
                    <template #interactions>
                        <vs-button class="btn-chat" shadow primary>
                            <i class='bx bx-cube-alt'/>
                            {{game.name}}
                        </vs-button>
                        <vs-button class="btn-chat" primary v-if="game.prototypeGame">
                            Prototype
                        </vs-button>
                    </template>
                </vs-card>
                <br/>
            </vs-col>
        </vs-row>
            <div/>
        </div>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import UserNavbar from "../components/UserNavbar";
    import {getCookie} from "../utils/cookie/cookie";
    import {getCurrentFestival} from "../utils/visitor/getCurrentFestival";
    import {getExhibitorsById} from "../utils/admin/Exhibitor/getExhibitorsById";

    export default {
        name: "Games",
        components : {
            UserNavbar,
            /*SideBar,*/
            Navbar
        },
        data:() => ({
            user : false,
            currentFestival : {},
            games : [],
            search : "",
            exhibitor : {},
            bookingGame : {}
        }),

        beforeMount() {
            if(getCookie('token')){
                this.user = true
            }
            getExhibitorsById(this.$route.params.exhibitorId).then(res=>{
                console.log(res.data);
                this.exhibitor = res.data;
                this.bookingGame = res.data.gameBookedList;
                this.booking = res.data.booking;
                this.games = res.data.gameList
            });
            getCurrentFestival().then(res=>{
                console.log(res.data);
                this.currentFestival = res.data;
            }).catch(e =>{
                console.log(e);
                this.notificationErreur(e.response.data.error)
            });

        }

    }
</script>
