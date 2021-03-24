<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="festival" v-else/>
        <!--<SideBar/>-->
        <br>
        <br>
        <br>
        <vs-row>
            <vs-col offset="2" w="8">
                {{festival.name}}
            </vs-col>
        </vs-row>

        <br/>
        <div class="ml-6 pl-6">
            Spaces :
            <br/>
            <br/>
            <div v-if="space">
                <vs-input
                        disabled
                        primary
                        v-model="space.name"
                        state="primary"
                        label="name" />
                <br/>
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Premium
                        <br/>
                        <br/>
                        <vs-input
                                disabled
                                primary
                                type="number"
                                v-model="space.numberOfTable1"
                                state="primary"
                                label="Number of table" />
                        <br/>
                        <vs-input
                                disabled
                                primary
                                type="number"
                                v-model="space.unitPriceOfTable1"
                                state="primary"
                                label="Unit price of table" />
                        <br/>
                        <vs-input
                                disabled
                                primary
                                type="number"
                                v-model="space.m2Price1"
                                state="primary"
                                label="Price of m2" />
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Medium
                        <br/>
                        <br/>
                        <vs-input
                                disabled
                                primary
                                type="number"
                                v-model="space.numberOfTable2"
                                state="primary"
                                label="Number of table" />
                        <br/>
                        <vs-input
                                disabled
                                primary
                                type="number"
                                v-model="space.unitPriceOfTable2"
                                state="primary"
                                label="Unit price of table" />
                        <br/>
                        <vs-input
                                disabled
                                primary
                                type="number"
                                v-model="space.m2Price2"
                                state="primary"
                                label="Price of m2" />
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Standard
                        <br/>
                        <br/>
                        <vs-input
                                disabled
                                primary
                                type="number"
                                v-model="space.numberOfTable3"
                                state="primary"
                                label="Number of table" />
                        <br/>
                        <vs-input
                                disabled
                                primary
                                type="number"
                                v-model="space.unitPriceOfTable3"
                                state="primary"
                                label="Unit price of table" />
                        <br/>
                        <vs-input
                                disabled
                                primary
                                type="number"
                                v-model="space.m2Price3"
                                state="primary"
                                label="Price of m2" />
                    </vs-col>
                </vs-row>
            </div>

            <vs-button @click="activeAddSpace=!activeAddSpace" v-if="!space" >
                Add Space
            </vs-button>

            <div class="center content-inputs" v-if="activeAddSpace">
                <br/>
                <vs-input
                        primary
                        v-model="name"
                        state="primary"
                        placeholder="Name of space" />
                <br/>
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Premium
                        <vs-input
                                primary
                                type="number"
                                v-model="numberOfTable1"
                                state="primary"
                                placeholder="Number of table" />
                        <br/>
                        <vs-input
                                primary
                                type="number"
                                v-model="unitPriceOfTable1"
                                state="primary"
                                placeholder="Unit price of table" />
                        <br/>
                        <vs-input
                                primary
                                type="number"
                                v-model="m2Price1"
                                state="primary"
                                placeholder="Price of m2" />
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Medium
                        <vs-input
                                primary
                                type="number"
                                v-model="numberOfTable2"
                                state="primary"
                                placeholder="Number of table" />
                        <br/>
                        <vs-input
                                primary
                                type="number"
                                v-model="unitPriceOfTable2"
                                state="primary"
                                placeholder="Unit price of table" />
                        <br/>
                        <vs-input
                                primary
                                type="number"
                                v-model="m2Price2"
                                state="primary"
                                placeholder="Price of m2" />
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Standard
                        <vs-input
                                primary
                                type="number"
                                v-model="numberOfTable3"
                                state="primary"
                                placeholder="Number of table" />
                        <br/>
                        <vs-input
                                primary
                                type="number"
                                v-model="unitPriceOfTable3"
                                state="primary"
                                placeholder="Unit price of table" />
                        <br/>
                        <vs-input
                                primary
                                type="number"
                                v-model="m2Price3"
                                state="primary"
                                placeholder="Price of m2" />
                    </vs-col>
                </vs-row>

                <br/>
                <vs-button @click="addSpaceToFestival()">
                    Add
                </vs-button>
            </div>

        </div>

        <!-- ZONE -->
        <div class="ml-6 pl-6">
            <br/>
            <br/>
            Zones :
            <br/>
            <br/>
            <div v-if="zones">
                <vs-row>
                <vs-col w="4" v-for="zone in zones" :key="zone._id" vs-type="flex" vs-justify="center"
                            vs-align="center">
                <vs-input
                        disabled
                        primary
                        v-model="zone.name"
                        state="primary"
                        label="Zone : " />
                        <br/>
                </vs-col>
                </vs-row>
                <br/>
            </div>

            <vs-button @click="activeAddZone=!activeAddZone">
                Add Zone
            </vs-button>

            <div class="center content-inputs" v-if="activeAddZone">
                <br/>
                <vs-input
                        primary
                        v-model="nameZone"
                        state="primary"
                        placeholder="Name of zone" />
                <br/>

                <br/>
                <vs-button @click="addZoneToFestival()">
                    Add
                </vs-button>
            </div>

        </div>



    </div>

</template>

<script>
    /*import SideBar from "@/components/SideBar";*/
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {getFestivalById} from "../utils/user/festivals/getFestivalById";
    import {addSpace} from "../utils/admin/space/addSpace";
    import {addZone} from "../utils/admin/zone/addZone";
    import {getAllBookingByFestival} from "../utils/admin/booking/getAllBookingByFestival";

    export default {
        name: 'Home',
        components : {
            UserNavbar,
            /*SideBar,*/
            Navbar
        },
        data:() => ({
            user : false,
            festival : {},
            zones : [],
            space : {},
            name : '',
            numberOfTable1 : '',
            unitPriceOfTable1 : '',
            m2Price1 : '',
            numberOfTable2 : '',
            unitPriceOfTable2 : '',
            m2Price2 : '',
            numberOfTable3 : '',
            unitPriceOfTable3 : '',
            m2Price3 : '',
            activeAddSpace : false,
            activeAddZone : false
        }),

        beforeMount() {
            if(getCookie('token')){
                this.user = true
            }
            getFestivalById(this.$route.params.festivalId).then(res =>{
                console.log(res.data);
                this.festival = res.data;
                this.space = res.data.space;
                this.zones = res.data.zoneId;
            }).catch(e =>{
                console.log(e);
                this.notificationErreur(e.response.data.error)
                })
            getAllBookingByFestival(this.$route.params.festivalId).then(res =>{
                console.log("all bookings ");
                console.log(res.data);
            })
            
        },

        methods : {
            addSpaceToFestival(){
                if (this.name !== ''){
                    addSpace(this.name, this.$route.params.festivalId, this.numberOfTable1, this.unitPriceOfTable1, this.m2Price1,
                    this.numberOfTable2, this.unitPriceOfTable2, this.m2Price2, this.numberOfTable3, this.unitPriceOfTable3,
                    this.m2Price3).then(res =>{
                        console.log(res.data);
                        //this.space = res.data.space;
                        /*
                        getFestivalById(this.$route.params.festivalId).then(res =>{
                            this.space = res.data.space;
                        })*/
                        this.$router.go() 
                        this.notificationSucces('Space créé avec succès')
                    }).catch(e =>{
                        console.log(e);
                        this.notificationErreur(e.response.data.error)
                    })
                }else{
                    this.notificationErreur('Vous ne pouvez pas créer un espace sans nom...')
               }
            },
            addZoneToFestival(){
                if (this.nameZone !== ''){
                    addZone(this.nameZone, this.$route.params.festivalId).then(res =>{
                        
                        getFestivalById(this.$route.params.festivalId).then(res =>{
                            this.zones = res.data.zoneId;
                        })
                        console.log(res.data)

                        this.notificationSucces('Zone créé avec succès')
                    }).catch(e =>{
                        console.log(e);
                        this.notificationErreur(e.response.data.error)
                    })
                }else{
                    this.notificationErreur('Vous ne pouvez pas créer une zone sans nom...')
               }
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
