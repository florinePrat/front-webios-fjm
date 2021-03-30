<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="exhibitor" v-else/>
        <br>
        <br>
        <br>
        <vs-button shadow primary @click="$router.go(-1)"><i style="font-size:32px" class='fa fa-arrow-circle-left'/> </vs-button>
        <vs-row>
            <vs-col offset="2" w="8">
                {{exhibitor.name}}
            </vs-col>
        </vs-row>

        <br/>
        <div class="ml-6">
            <vs-row>
                <vs-col w="4" v-for="game in bookingGame" :key="game._id" vs-type="flex" vs-justify="center"
                        vs-align="center">
                    <vs-card>
                        <template #title>
                            <b-taglist>
                                Booking : {{new Date(game.dateAdd).toLocaleString('fr-FR')}}
                                <vs-row>
                                    <vs-button flat><i class='bx bx-search-alt-2'/>
                                        <span class="span">
                                        Zone : {{game.zone.name}}
                                    </span>
                                    </vs-button>
                                    <br/>
                                    <vs-button flat><i class='bx bx-game'/>
                                        <span class="span">
                                        {{game && game.qtExhib > 1 ? game.qtExhib + ' jeux exposés' : game.qtExhib + ' jeu exposé' }}
                                    </span>
                                    </vs-button>
                                    <vs-button flat><i class='bx bx-game'/>
                                        <span class="span">
                                        {{game && game.qtSend > 1 ? game.qtSend + ' jeux apportés' : game.qtSend + ' jeu apporté' }}
                                    </span>
                                    </vs-button>
                                    <br/>
                                    <vs-button flat>Reçu :
                                        <span class="span">
                                            <i class='bx bx-x-circle' v-if="!game.received" />
                                            <i class='bx bx-check-double' v-else />
                                        </span>
                                    </vs-button>
                                    <vs-button flat>Placé :
                                        <span class="span">
                                            <i class='bx bx-x-circle' v-if="!game.putOnPlan" />
                                            <i class='bx bx-check-double' v-else />
                                        </span>
                                    </vs-button>
                                    <br/>
                                    <vs-button flat>Tombola :
                                        <span class="span">
                                            <i class='bx bx-x-circle' v-if="!game.tombola" />
                                            <i class='bx bx-check-double' v-else />
                                        </span>
                                    </vs-button>
                                    <vs-button flat>Don :
                                        <span class="span">
                                            <i class='bx bx-x-circle' v-if="!game.dotation" />
                                            <i class='bx bx-check-double' v-else />
                                        </span>
                                    </vs-button>
                                    <br/>
                                    <vs-button flat>A retourner :
                                        <span class="span">
                                            <i class='bx bx-x-circle' v-if="!game.isCallback" />
                                            <i class='bx bx-check-double' v-else />
                                        </span>
                                    </vs-button>
                                    <vs-button flat v-if="game.isCallback">Retourné :
                                        <span class="span">
                                            <i class='bx bx-x-circle' v-if="!game.isCallbackDone" />
                                            <i class='bx bx-check-double' v-else />
                                        </span>
                                    </vs-button>
                                    <vs-button flat v-if="game.isCallback">Prix de retour :
                                        <span class="span">
                                            <i class='bx bx-x-circle' v-if="!game.callbackPrice" />
                                            <i class='bx bx-check-double' v-else />
                                        </span>
                                    </vs-button>
                                    <br/>
                                    <vs-button flat>
                                        <span class="span">
                                           Commentaire :  {{game.comment}}
                                        </span>
                                    </vs-button>
                                </vs-row>
                                Game :
                                <vs-row><br/>
                                    <vs-button flat><i class='bx bx-group'/>
                                        <span class="span">
                                        De {{game.gameId && game.gameId.nbPlayersMin}} à {{game.gameId && game.gameId.nbPlayersMax}} joueurs
                                    </span>
                                    </vs-button>
                                    <br/>
                                    <vs-button flat><i class='bx bx-male'/>
                                        <span class="span">
                                        Age min : {{game.gameId && game.gameId.ageMin}} ans
                                    </span>
                                    </vs-button>

                                    <br/>
                                    <vs-button flat><i class='bx bxs-time'/>
                                        <span class="span">
                                        {{game.gameId && game.gameId.duration}}''
                                    </span>
                                    </vs-button>

                                    <br/>
                                    <vs-button flat :href="game.gameId.notice" target="_blank"><i
                                            class='bx bx-link-alt'/>
                                        <span class="span">
                                        {{game.gameId && game.gameId.notice}}
                                    </span>
                                    </vs-button>

                                    <br/>
                                    <vs-button flat v-if="game.gameId.prototypeGame">
                                    <span class="span">
                                        Prototype
                                    </span>
                                    </vs-button>
                                </vs-row>


                            </b-taglist>
                        </template>
                        <template #img>
                            <img src="../assets/headerCardGame.png" alt="">
                        </template>
                        <template #text>
                            <vs-button flat>
                                <span class="span">
                                    {{game.gameId.description}}
                                </span>
                            </vs-button>

                        </template>
                        <template #interactions>
                            <vs-button class="btn-chat" shadow primary>
                                <i class='bx bx-cube-alt'/>
                                {{game.gameId.name}}
                            </vs-button>
                        </template>
                    </vs-card>
                    <br/>
                </vs-col>
            </vs-row>
            <div/>

            <!--<div class="con-form ml-6 mr-6 pr-6">
                <br/>
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <vs-input shadow warn type="number" icon-after v-model="bookingGame.qtExhib" label-placeholder="Quantité exposé">
                            <template #icon>
                                <i class='bx bxs-baby-carriage'/>
                            </template>
                        </vs-input>
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <vs-input shadow warn type="number" icon-after v-model="bookingGame.qtSend" label-placeholder="Quantité envoyé">
                            <template #icon>
                                <i class='bx bx-link-alt'/>
                            </template>
                        </vs-input>
                    </vs-col>
                </vs-row>
                <br/>
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <vs-checkbox v-model="bookingGame.tombola">Tombola ?</vs-checkbox>
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <vs-checkbox v-model="bookingGame.dotation">Donnation ?</vs-checkbox>
                    </vs-col>
                </vs-row>
                <br/>
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <vs-checkbox v-model="bookingGame.putOnPlan">Placé ?</vs-checkbox>
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <vs-checkbox v-model="bookingGame.bringByExhibitor">Apporté par l'exposant ?</vs-checkbox>
                    </vs-col>
                </vs-row>
                <br/>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                    <vs-input shadow warn icon-after v-model="bookingGame.comment" label-placeholder="Commentaire">
                        <template #icon>
                            <i class='bx bx-align-left'/>
                        </template>
                    </vs-input>
                </vs-col>
            </div>-->
            <br/>
            <br/>
            <br/>
            <br/>

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
        components: {
            UserNavbar,
            /*SideBar,*/
            Navbar
        },
        data: () => ({
            user: false,
            currentFestival: null,
            games: [],
            search: "",
            exhibitor: null,
            bookingGame: []
        }),

        beforeMount() {
            if (getCookie('token')) {
                this.user = true
            }
            getExhibitorsById(this.$route.params.exhibitorId).then(res => {
                this.exhibitor = res.data;
                this.bookingGame = res.data.gameBookedList;
                console.log(this.bookingGame)
            });
            getCurrentFestival().then(res => {
                this.currentFestival = res.data;
            }).catch(e => {
                console.log(e);
                this.notificationErreur(e.response.data.error)
            });

        }

    }
</script>
