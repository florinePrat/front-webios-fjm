<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="home" v-else/>
        <!--<SideBar/>-->
        <br>
        <br>
        <br>
        <vs-row>
            <vs-col offset="2" w="8">
                {{currentFestival.name}}
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
                                <b-tag type="is-primary is-light"><i class='bx bx-game'/>
                                    <span class="span">
                                    {{game && game.qtExhib > 1 ? game.qtExhib + ' jeux' : game.qtExhib + ' jeu' }}
                                  </span></b-tag>
                                <br>
                                <b-tag type="is-primary is-light"><i class='bx bx-group'/>
                                    <span class="span">
                                    De {{game.gameId && game.gameId.nbPlayersMin}} à {{game.gameId && game.gameId.nbPlayersMax}} joueurs
                                  </span></b-tag>
                                <br>
                                <b-tag type="is-primary is-light"><i class='bx bx-male'/>
                                    <span class="span">
                                    Age min : {{game.gameId && game.gameId.ageMin}} ans
                                  </span></b-tag>
                                <br>
                                <b-tag type="is-primary is-light"><i class='bx bx-cube-alt'/>
                                    <span class="span">
                                   {{game.gameId && game.gameId.category}}
                                  </span></b-tag>
                                <br/>
                                <b-tag type="is-primary is-light"><i class='bx bx-book-reader'/>
                                    <span class="span">
                                   {{game.exhibitorId && game.exhibitorId.name}}
                                  </span></b-tag>
                            </b-taglist>
                        </template>
                        <template #img>
                            <img src="../assets/headerCardGame.png" alt="">
                        </template>
                        <template #text>
                            {{game.gameId.description}}
                        </template>
                        <template #interactions>
                            <vs-button class="btn-chat" shadow primary>
                                <i class='bx bx-cube-alt'/>
                                {{game.gameId.name}}
                            </vs-button>
                            <vs-button class="btn-chat" primary v-if="game.prototypeGame">
                                Prototype
                            </vs-button>
                        </template>
                    </vs-card>
                    <br/>
                </vs-col>
            </vs-row>
        </div>



    </div>

</template>

<script>
    /*import SideBar from "@/components/SideBar";*/
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {getCurrentFestival} from "../utils/visitor/getCurrentFestival";
    import {getAllGames} from "../utils/user/gameBooking/getAllGames";
    export default {
        name: 'Home',
        components : {
            UserNavbar,
            /*SideBar,*/
            Navbar
        },
        data:() => ({
            user : false,
            currentFestival : {},
            games : [
                {'_id' : "5544851441g44f1d22f",
                    'gameId':
                        {"name": "Mon super jeu",
                        "ageMin" : 5,
                        "duration": 50,
                        "nbPlayersMin": 2,
                        "nbPlayersMax": 15,
                        "category" : 'Ma super categorie',
                        "description" : "Le best jeu ever, fourni en unique exemplaire dans le monde",
                        "prototypeGame" : true
                        },
                'exhibitorId': {'name' : 'Mon exhibitor 1'},
                'zone': {'name' : 'Ma zone 1'},
                'qtExhib' : 5
                },
            ]
        }),

        beforeMount() {
            if(getCookie('token')){
                this.user = true
            }
            getCurrentFestival().then(res=>{
                console.log(res.data);
                this.currentFestival = res.data;
            }).catch(e =>{
                console.log(e);
                this.notificationErreur(e.response.data.error)
                });

            getAllGames().then(res=>{
                console.log(res.data)
            }).catch(e =>{
                console.log(e);
                this.notificationErreur(e.response.data.error)
                })
        }


    }
</script>
