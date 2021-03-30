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
                            <vs-button class="fas fa-paint-brush" shadow primary  @click="activeGameEdit=!activeGameEdit;keepId = game._id;updateGameBooking(game._id, game.zone[0], game.qtExhib[0], game.qtSend[0], game.received[0], game.putOnPlan[0], game.tombola[0], game.dotation[0], game.isCallback[0], game.isCallbackDone[0], game.callbackPrice[0], game.comment[0], game.bringByExhibitor[0])">
                                </vs-button>
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
        </div>


        <!--UPDATE BOOKINGGAME POPUP-->
            <vs-dialog blur v-model="activeGameEdit">
                <template #header>
                    <h4 class="not-margin">
                        Update <b>Game</b>
                    </h4>
                </template>

                <br/>
                <div class="con-form">
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn icon-after v-model="updatedZone" label-placeholder="Zone" >
                                <template #icon>
                                    <i class='bx bx-dice-1'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="updatedQtExhib" label-placeholder="nb jeux apportés">
                                <template #icon>
                                    <i class='bx bx-grid-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="updatedQtSend" label-placeholder="nb jeux envoyés">
                                <template #icon>
                                    <i class='bx bx-dice-2'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="updatedCallbackPrice" label-placeholder="Prix du retour">
                                <template #icon>
                                    <i class='bx bx-grid-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <div class="flex">
                                <vs-checkbox v-model="updatedPutOnPlan">Placé ?</vs-checkbox>
                            </div>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <div class="flex">
                                <vs-checkbox v-model="updatedReceived">Reçu ?</vs-checkbox>
                            </div>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <div class="flex">
                                <vs-checkbox v-model="updatedTombola">Tombola ?</vs-checkbox>
                            </div>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <div class="flex">
                                <vs-checkbox v-model="updatedDotation">Donnation ?</vs-checkbox>
                            </div>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <div class="flex">
                                <vs-checkbox v-model="updatedIsCallback">Retour ?</vs-checkbox>
                            </div>
                        </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <div class="flex">
                                <vs-checkbox v-model="updatedIsCallbackDone">Retour effectué ?</vs-checkbox>
                            </div>
                        </vs-col>
                    </vs-row>
                    <div class="flex">
                        <vs-input shadow warn icon-after v-model="updatedComment" label-placeholder="Commentaire">
                            <template #icon>
                                <i class='bx bx-dice-3'/>
                            </template>
                        </vs-input>
                    </div>
                    <div class="flex">
                        <vs-checkbox v-model="updatedBringByExhibitor">Apporté par l'exposant ?</vs-checkbox>
                    </div>
                </div>

                <template #footer>
                    <div class="footer-dialog">
                        <!--
                        <vs-button block @click="sendUpdateBooking(selected[0]._id)">
                            Update
                        </vs-button>
                        -->
                    </div>
                </template>
            </vs-dialog>
            <br/>
            <br/>
            <br/>
            <br/>
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
            bookingGame: [],
            activeGameEdit : false,
            // GameBooking attributes
            zone: '',
            qtExhib: null,
            qtSend: null,
            received: false,
            putOnPlan: false,
            tombola: false,
            dotation: false,
            isCallback: false,
            isCallbackDone: false,
            callbackPrice: null,
            comment: '',
            bringByExhibitor: false,
            dateAdd: null, // inutile ?
            // GameBooking attributes updated
            updatedZone: '',
            updatedQtExhib: null,
            updatedQtSend: null,
            updatedReceived: false,
            updatedPutOnPlan: false,
            updatedTombola: false,
            updatedDotation: false,
            updatedIsCallback: false,
            updatedIsCallbackDone: false,
            updatedCallbackPrice: null,
            updatedComment: '',
            updatedBringByExhibitor: false,
            updatedGameBookingId: '',
            updatedDateAdd: null, //inutile ?

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

        },

        methods : {
            updateGameBooking(gameBookingId, zone,qtExhib,qtSend,received,putOnPlan,tombola,dotation,isCallback,isCallbackDone,callbackPrice,comment,bringByExhibitor){
                console.log("IN updateGameBooking, here's the zone:", zone)
                if(this.admin){
                    this.updatedZone = zone;
                    this.updatedQtExhib = qtExhib;
                    this.updatedQtSend = qtSend;
                    this.updatedReceived = received;
                    this.updatedPutOnPlan = putOnPlan;
                    this.updatedTombola = tombola;
                    this.updatedDotation = dotation;
                    this.updatedIsCallback = isCallback;
                    this.updatedIsCallbackDone = isCallbackDone;
                    this.updatedCallbackPrice = callbackPrice;
                    this.updatedComment = comment;
                    this.updatedBringByExhibitor = bringByExhibitor;
                    this.updatedDateAdd = new Date();
                    this.updatedGameBookingId = gameBookingId;

                    this.activeGameEdit =!this.activeGameEdit;
                }else{
                    this.notificationErreur("Désolé vous n'avez pas les droits de modifications")
                }

            },
/*
            sendUpdateBooking(){
                updateBooking(this.upDatedBookingId, this.upDatenbTableSpace1, this.upDatenbTableSpace2, this.upDatenbTableSpace3, this.upDatenbM2Space1, this.upDatenbM2Space2,
                this.upDatenbM2Space3, this.upDateanimatorNeeded, this.upDatecrSended, this.upDateinvoiceSended, this.upDatepaymentOk, this.upDateputOnPlan).then(res=>{
                    console.log(res.data);
                    this.activeUpdateBooking = false;
                    window.location.reload()
                }).catch(e=>{
                    this.notificationErreur(e.response.data.error)
                })
            }, */

        }

    }
</script>
