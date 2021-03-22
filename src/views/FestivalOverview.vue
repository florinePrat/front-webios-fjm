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
                <h3>Here's the space named <b>{{space.name}}</b></h3>
                <h5> Number of table of the first zone : {{space.numberOfTable1}} <br> 
                Je te laisse trouver un template je vais me coucher, bonne nuit x)</h5>
            </div>

            <vs-button @click="activeAddSpace=!activeAddSpace" v-if="!space">
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



    </div>

</template>

<script>
    /*import SideBar from "@/components/SideBar";*/
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {getFestivalById} from "../utils/user/festivals/getFestivalById";
    import {addSpace} from "../utils/admin/space/addSpace";
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
            activeAddSpace : false
        }),

        beforeMount() {
            if(getCookie('token')){
                this.user = true
            }
            getFestivalById(this.$route.params.festivalId).then(res =>{
                console.log(res.data);
                this.festival = res.data;
                this.space = res.data.space
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
                        console.log(res.data)
                        this.notificationSucces('Space créé avec succès')
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
