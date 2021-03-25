<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="festival" v-else/>
        <!--<SideBar/>-->
        <br>
        <br>
        <br>
        <vs-row>
        <vs-button shadow primary @click="$router.go(-1)"><i style="font-size:32px" class='fa fa-arrow-circle-left'/>
        </vs-button>
            <vs-col offset="2" w="8">
                {{festival.name}}
            </vs-col>
        </vs-row>

        <br/>
        <div class="ml-6 pl-6">
            Spaces :
            <vs-button v-if="!spaceEditMode && space !== null" shadow primary @click="editModeSpace()"><i class="fas fa-paint-brush"></i> </vs-button>
            <vs-button v-if="spaceEditMode" shadow primary @click="editModeSpace(); updateSpaceToFestival()"><i class="fas fa-check"></i> </vs-button>
            <br/>
            <br/>
            <div v-if="space">
                <vs-input
                        :disabled = "!spaceEditMode"
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
                                dark
                                type="number"
                                v-model="TotalNbTableSpace1"
                                state="dark"
                                label="Nombre de tables réservées" />
                        <br/>
                        <vs-input
                                :disabled = "!spaceEditMode"
                                primary
                                type="number"
                                v-model="space.numberOfTable1"
                                state="primary"
                                label="Number of table disponibles" />
                        <br/>
                        <vs-input
                                :disabled = "!spaceEditMode"
                                primary
                                type="number"
                                v-model="space.unitPriceOfTable1"
                                state="primary"
                                label="Unit price of table" />
                        <br/>
                        <vs-input
                                :disabled = "!spaceEditMode"
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
                                dark
                                type="number"
                                v-model="TotalNbTableSpace2"
                                state="dark"
                                label="Nombre de tables réservées" />
                        <br/>
                        <vs-input
                                :disabled = "!spaceEditMode"
                                primary
                                type="number"
                                v-model="space.numberOfTable2"
                                state="primary"
                                label="Number of table disponibles" />
                        <br/>
                        <vs-input
                                :disabled = "!spaceEditMode"
                                primary
                                type="number"
                                v-model="space.unitPriceOfTable2"
                                state="primary"
                                label="Unit price of table" />
                        <br/>
                        <vs-input
                                :disabled = "!spaceEditMode"
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
                                dark
                                type="number"
                                v-model="TotalNbTableSpace3"
                                state="dark"
                                label="Nombre de tables réservées" />
                        <br/>
                        <vs-input
                                :disabled = "!spaceEditMode"
                                primary
                                type="number"
                                v-model="space.numberOfTable3"
                                state="primary"
                                label="Number of table disponibles" />
                        <br/>
                        <vs-input
                                :disabled = "!spaceEditMode"
                                primary
                                type="number"
                                v-model="space.unitPriceOfTable3"
                                state="primary"
                                label="Unit price of table" />
                        <br/>
                        <vs-input
                                :disabled = "!spaceEditMode"
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
            <vs-button v-if="!zoneEditMode && zones.length>0" shadow primary @click="editModeZone()"><i class="fas fa-paint-brush"></i> </vs-button>
            <vs-button v-if="zoneEditMode" shadow primary @click="editModeZone()"><i class="fas fa-check"></i> </vs-button>
            <br/>
            <br/>
            <div v-if="zones">
                <vs-row>
                <vs-col w="4" v-for="zone in zones" :key="zone._id" vs-type="flex" vs-justify="center"
                            vs-align="center">
                <vs-row>
                <vs-input
                        :disabled = "!zoneEditMode"
                        primary
                        v-model="zone.name"
                        state="primary"
                        label="Zone : " />
                        <vs-button shadow primary @click="deleteZoneToFestival(zone._id)"><i class="fas fa-times"></i> </vs-button>
                </vs-row>     
                        <br/>
                </vs-col>
                
                </vs-row>
                <br/>
            </div>

            
            <vs-button @click="activeAddZone=!activeAddZone">
                Add Zone
            </vs-button>
            <br/>
            <div class="center content-inputs" v-if="activeAddZone">
               <vs-row>
                <vs-input
                        primary
                        v-model="nameZone"
                        state="primary"
                        placeholder="Name of zone" />

                <vs-button @click="addZoneToFestival()">
                    Add
                </vs-button>
                </vs-row>
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
    import {updateSpace} from "../utils/admin/space/updateSpace";
    import {addZone} from "../utils/admin/zone/addZone";
    import {deleteZone} from "../utils/admin/zone/deleteZone";
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
            nameZone : '',
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
            activeAddZone : false,
            TotalNbTableSpace1 : '',
            TotalNbTableSpace2 : '',
            TotalNbTableSpace3 : '',
            zoneEditMode : false,
            spaceEditMode : false
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

                if(res.data.space){
                    getAllBookingByFestival(this.$route.params.festivalId).then(res =>{
                        var totalBookings = new Map()
                        totalBookings.set("NbTableSpace1", 0)
                        totalBookings.set("NbTableSpace2", 0)
                        totalBookings.set("NbTableSpace3", 0)
                        totalBookings.set("nbM2Space1", 0)
                        totalBookings.set("nbM2Space2", 0)
                        totalBookings.set("nbM2Space3", 0)
                        res.data.forEach(booking => {
                            totalBookings.set("NbTableSpace1", totalBookings.get("NbTableSpace1") + booking.nbTableSpace1 )
                            totalBookings.set("NbTableSpace2", totalBookings.get("NbTableSpace2") + booking.nbTableSpace2 )
                            totalBookings.set("NbTableSpace3", totalBookings.get("NbTableSpace3") + booking.nbTableSpace3 )
                            totalBookings.set("nbM2Space1", totalBookings.get("nbM2Space1") + booking.nbM2Space1 )
                            totalBookings.set("nbM2Space2", totalBookings.get("nbM2Space2") + booking.nbM2Space2 )
                            totalBookings.set("nbM2Space3", totalBookings.get("nbM2Space3") + booking.nbM2Space3 )
                        });
                        this.TotalNbTableSpace1 = totalBookings.get("NbTableSpace1")
                        this.TotalNbTableSpace2 = totalBookings.get("NbTableSpace2")
                        this.TotalNbTableSpace3 = totalBookings.get("NbTableSpace3")
            })
            }
            }).catch(e =>{
                console.log(e);
                this.notificationErreur(e.response.data.error)
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
            updateSpaceToFestival(){
                if (this.space.name !== ''){
                    updateSpace(this.space.name, this.space.numberOfTable1, this.space.unitPriceOfTable1, this.space.m2Price1,
                    this.space.numberOfTable2, this.space.unitPriceOfTable2, this.space.m2Price2, this.space.numberOfTable3, this.space.unitPriceOfTable3,
                    this.space.m2Price3, this.space._id).then(res =>{
                        console.log(res.data);

                        this.notificationSucces('Space modifié avec succès')
                    }).catch(e =>{
                        console.log(e);
                        this.notificationErreur(e.response.data.error)
                    })
                }else{
                    this.notificationErreur('Vous ne pouvez pas créer un espace sans nom...')
               }
            },
            addZoneToFestival(){
                console.log(this.nameZone)
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
            }, deleteZoneToFestival(id){
                    deleteZone(id).then(res =>{

                        getFestivalById(this.$route.params.festivalId).then(res =>{
                            this.zones = res.data.zoneId;
                        })
                        console.log(res.data)

                        this.notificationSucces('Zone supprimé avec succès')
                    }).catch(e =>{
                        console.log(e);
                        this.notificationErreur(e.response.data.error)
                    })
                    // VERIFIER AUCUN JEU DANS LA ZONE
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
            editModeZone(){
            if(this.zoneEditMode){
                this.zoneEditMode = false;
            } else {
                this.zoneEditMode = true;
            }
        },
        editModeSpace(){
            if(this.spaceEditMode){
                this.spaceEditMode = false;
            } else {
                this.spaceEditMode = true;
            }
        },

        }


    }
</script>
