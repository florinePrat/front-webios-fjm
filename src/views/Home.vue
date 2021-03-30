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
            <!-- <vs-row>
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
                                 <b-tag type="is-primary is-light"><i class='bx bx-time'/>
                                     <span class="span">
                                    {{game.gameId && game.gameId.duration}}''
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
             </vs-row>-->

            <img src="../../src/assets/headerCardGame.png">
            <div class="center mr-6">
                <vs-table>
                    <template #header>
                        <vs-input v-model="search" border placeholder="Search"/>
                    </template>
                    <template #thead>
                        <vs-tr>
                            <vs-th>
                                Name
                            </vs-th>
                            <vs-th>
                                Exhibitor
                            </vs-th>
                            <vs-th>
                                Category
                            </vs-th>
                            <vs-th>
                                Duration
                            </vs-th>
                        </vs-tr>
                    </template>
                    <template #tbody>
                        <vs-tr
                                v-for="game in $vs.getSearch(games, search)"
                                :key="game._id"
                        >
                            <vs-td>
                                {{ game.gameId.name }}
                            </vs-td>
                            <vs-td>
                                <i class='bx bx-book-reader'/>
                                {{game.exhibitorId && game.exhibitorId.name }}
                            </vs-td>
                            <vs-td>
                                <i class='bx bx-cube-alt'/>
                                {{ game.gameId && game.gameId.category}}
                            </vs-td>
                            <vs-td>
                                <i class='bx bx-time'/>
                                {{ game.gameId && game.gameId.duration}}''
                            </vs-td>

                            <!-- Click on a game -->
                            <template #expand>
                                <div class="con-content">
                                    <div>
                                        <b-taglist>
                                            <vs-button><i class='bx bx-game'/>
                                                <span class="span">
                                                    {{game && game.qtExhib > 1 ? game.qtExhib + ' jeux' : game.qtExhib + ' jeu' }}
                                                </span>
                                            </vs-button>
                                            <br>
                                            <vs-button><i class='bx bx-group'/>
                                                <span class="span">
                                                    De {{game.gameId && game.gameId.nbPlayersMin}} à {{game.gameId && game.gameId.nbPlayersMax}} joueurs
                                                </span>
                                            </vs-button>
                                            <br>
                                            <vs-button><i class='bx bx-male'/>
                                                <span class="span">
                                                    Age min : {{game.gameId && game.gameId.ageMin}} ans
                                                </span>
                                            </vs-button>

                                            <br>
                                            <vs-button :href="game.gameId.notice" target="_blank"><i
                                                    class='bx bx-link-alt'/>
                                                <span class="span">
                                                    {{game.gameId && game.gameId.notice}}
                                                </span>
                                            </vs-button>

                                            <br>
                                            <vs-button v-if="game.gameId.prototypeGame">
                                                <span class="span">
                                                    Prototype
                                                </span>
                                            </vs-button>

                                        </b-taglist>
                                        <br/>

                                        {{game.gameId && game.gameId.description}}
                                    </div>
                                </div>
                            </template>
                        </vs-tr>
                    </template>
                </vs-table>
            </div>
        <br/>
        <br/>
        <br/>
        </div>
    </div>

</template>

<script>
    /*import SideBar from "@/components/SideBar";*/
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {getCurrentFestival} from "../utils/visitor/getCurrentFestival";

    export default {
        name: 'Home',
        components: {
            UserNavbar,
            /*SideBar,*/
            Navbar
        },
        data: () => ({
            user: false,
            currentFestival: {},
            games: [
                {
                    '_id': "5544851441g44f1d22f",
                    'gameId':
                        {
                            "name": "Mon super jeu",
                            "ageMin": 5,
                            "duration": 50,
                            "nbPlayersMin": 2,
                            "nbPlayersMax": 15,
                            "category": 'Ma super categorie',
                            "description": "Le best jeu ever, fourni en unique exemplaire dans le monde",
                            "prototypeGame": true
                        },
                    'exhibitorId': {'name': 'Mon exhibitor 1'},
                    'zone': {'name': 'Ma zone 1'},
                    'qtExhib': 5
                },
            ],
            search: ""
        }),

        beforeMount() {
            if (getCookie('token')) {
                this.user = true
            }
            getCurrentFestival().then(res => {
                console.log(res.data);
                this.currentFestival = res.data;
                this.games = res.data.gameBookedList
            }).catch(e => {
                console.log(e);
                this.notificationErreur(e.response.data.error)
            });

        }


    }
</script>
