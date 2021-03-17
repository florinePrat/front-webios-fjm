<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="exhibitor" v-else/>
        <SideBar/>
        <br>
        <br>
        <br>
        <div class="is-half p-6 ml-6">

            <vs-row>
                <vs-col w="8">
                    <h1>Exhibitors</h1>
                </vs-col>
            </vs-row>
            <br/>

            <div class="center">
                <vs-table>
                    <template #header>
                        <vs-input v-model="search" border placeholder="Search" />
                    </template>

                    <template #thead>
                        <vs-tr class="grid">
                            <vs-button gradient @click="active=!active">
                                <i class='bx bx-plus'/>
                            </vs-button>
                        </vs-tr>
                        <vs-tr>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors, 'name')">
                                Name
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors.mainContact, 'email')">
                                Email MC
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors.mainContact, 'tel')">
                                Tel MC
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors.suiviId, 'statusTracking')">
                                Status
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors.suiviId, 'present')">
                                Present
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors, 'publisherOnly')">
                                Publisher Only
                            </vs-th>
                        </vs-tr>
                    </template>
                    <template #tbody>
                        <vs-tr
                                :key="i"
                                v-for="(exhibitor, i) in $vs.getSearch(exhibitors, search)"
                                :data="exhibitor"
                        >
                            <vs-td>
                                {{ exhibitor.name }}
                            </vs-td>
                            <vs-td>
                                {{ exhibitor.mainContact.email }}
                            </vs-td>
                            <vs-td>
                                {{ exhibitor.mainContact.telMobile }}
                            </vs-td>
                            <vs-td>
                                {{ exhibitor.suiviId.statusTracking }}
                            </vs-td>
                            <vs-td>
                                <i class='bx bx-x-circle' v-if="!exhibitor.suiviId.present" />
                                <i class='bx bx-check-double' v-else />
                            </vs-td>
                            <vs-td>
                                {{ exhibitor.publisherOnly ? 'yes' : 'no' }}
                            </vs-td>

                            <template #expand>
                                Main contact :
                                <div class="box con-content">
                                    <vs-row>
                                        <vs-col w="2">
                                            <vs-avatar>
                                                <i class='bx bxs-show' @click="activecontact = !activecontact"/>
                                            </vs-avatar>
                                        </vs-col>
                                        <vs-col w="3">
                                            <i class='bx bx-phone-call mr-1'/>Tel fixe :
                                            {{ exhibitor.mainContact.telFixe }}
                                        </vs-col>
                                        <vs-col w="4">
                                            <i class='bx bx-map-pin mr-1'/>Addresse :
                                            {{ exhibitor.mainContact.address }}
                                        </vs-col>
                                        <vs-col w="3">
                                            <i class='bx bx-briefcase-alt-2 mr-1'/>Work :
                                            {{ exhibitor.mainContact.work }}
                                        </vs-col>
                                    </vs-row>
                                </div>
                                Booking :
                                <div class="box con-content">

                                    <vs-table>
                                        <template #thead>
                                            <vs-tr>
                                                <vs-th>
                                                    nbTableSpace1
                                                </vs-th>
                                                <vs-th>
                                                    nbTableSpace2
                                                </vs-th>
                                                <vs-th>
                                                    nbTableSpace3
                                                </vs-th>
                                                <vs-th>
                                                   nbM2Space1
                                                </vs-th>
                                                <vs-th>
                                                    nbM2Space2
                                                </vs-th>
                                                <vs-th>
                                                    nbM2Space3
                                                </vs-th>
                                                <vs-th>
                                                    animator needed
                                                </vs-th>
                                                <vs-th>
                                                    cr sended
                                                </vs-th>
                                                <vs-th>
                                                    invoce sended
                                                </vs-th>
                                                <vs-th>
                                                    payment Ok
                                                </vs-th>
                                                <vs-th>
                                                    put on plan
                                                </vs-th>
                                            </vs-tr>
                                        </template>
                                        <template #tbody>
                                            <vs-tr>
                                                <vs-td>
                                                    {{ exhibitor.booking.nbTableSpace1 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.nbTableSpace2 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.nbTableSpace3 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.nbM2Space1 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.nbM2Space2 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.nbM2Space3 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.animatorNeeded }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.crSended }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.invoiceSended }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.paymentOk }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking.putOnPlan }}
                                                </vs-td>
                                            </vs-tr>
                                        </template>
                                    </vs-table>

                                </div>
                                <vs-button gradient block>
                                    View games
                                </vs-button>
                            </template>

                            <!--DIALOG !!-->
                            <div class="center">
                                <vs-dialog blur v-model="activecontact">
                                    <template #header>
                                        <h4 class="not-margin">
                                            View all <b>contacts</b>
                                        </h4>
                                        <br/>
                                    </template>


                                    <div class="con-form">
                                        <vs-table>
                                            <template #thead>
                                                <vs-tr>
                                                    <vs-th>
                                                        First Name
                                                    </vs-th>
                                                    <vs-th>
                                                        Last Name
                                                    </vs-th>
                                                    <vs-th>
                                                        Email
                                                    </vs-th>
                                                    <vs-th>
                                                        Tel Fixe
                                                    </vs-th>
                                                    <vs-th>
                                                        Tel Mobile
                                                    </vs-th>
                                                    <vs-th>
                                                        Addresse
                                                    </vs-th>
                                                    <vs-th>
                                                        Work
                                                    </vs-th>
                                                </vs-tr>
                                            </template>
                                            <template #tbody>
                                                <vs-tr
                                                        v-for="contact in exhibitor.contacts" :key="contact._id"
                                                >
                                                    <vs-td>
                                                        {{ contact.firstName }}
                                                    </vs-td>
                                                    <vs-td>
                                                        {{ contact.lastName }}
                                                    </vs-td>
                                                    <vs-td>
                                                        {{ contact.email }}
                                                    </vs-td>
                                                    <vs-td>
                                                        {{ contact.telFixe }}
                                                    </vs-td>
                                                    <vs-td>
                                                        {{ contact.telMobile }}
                                                    </vs-td>
                                                    <vs-td>
                                                        {{ contact.address }}
                                                    </vs-td>
                                                    <vs-td>
                                                        {{ contact.work }}
                                                    </vs-td>
                                                </vs-tr>
                                            </template>
                                        </vs-table>
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
                        </vs-tr>

                    </template>

                </vs-table>
            </div>



            <br/>
            <!--<div class="ml-6">
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
                                    &lt;!&ndash;@click="changeName(festival._id, festival.name)"&ndash;&gt;
                                    current
                                </vs-button>
                                <vs-button class="btn-chat" shadow primary>
                                    &lt;!&ndash;@click="changeName(festival._id, festival.name)"&ndash;&gt;
                                    <i class='bx bx-cube-alt'/>
                                    {{festival.name}}
                                </vs-button>
                                <b-tooltip label="Delete search" type="is-primary is-light" position="is-top">
                                    <vs-button
                                            icon
                                            color="rgb(198, 35, 35)"
                                            gradient
                                    >
                                        &lt;!&ndash;@click.stop="deleteFestival(festival._id)"&ndash;&gt;
                                        <i class='bx bxs-trash'/>
                                    </vs-button>
                                </b-tooltip>
                            </template>
                        </vs-card>
                        <br/>
                    </vs-col>
                </vs-row>
            </div>-->



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
        name: 'Exhibitor',
        components: {
            UserNavbar,
            SideBar,
            Navbar
        },
        data: () => ({
            editActive: false,
            edit: null,
            editProp: '',
            allCheck: false,
            page: 1,
            max: 3,
            selected: [],
            user: false,
            classPresent : "",
            active: false,
            activecontact: false,
            exhibitors: [
                {
                    "_id": 1,
                    "mainContact" : {
                        "email" : "Sincere@april.biz",
                        "telMobile": "000000 0000 0000",
                        "telFixe": "000000 0000 0000",
                        "address" : "tettetetefvczge rue 3694 nvielae",
                        "work" : "dev"
                    },
                    "contacts" : [
                        {
                            "_id" : "2",
                            "firstName" : "Oui",
                            "lastName" : "Oui",
                            "email" : "Sincere@april.biz",
                            "telMobile": "000000 0000 0000",
                            "telFixe": "000000 0000 0000",
                            "address" : "tettetetefvczge",
                            "work" : "dev"
                        },
                        {
                            "_id" : "3",
                            "firstName" : "Non",
                            "lastName" : "Non",
                            "email" : "Sincere@april.biz",
                            "telMobile": "000000 0000 0000",
                            "telFixe": "000000 0000 0000",
                            "address" : "tettetetefvczge",
                            "work" : "dev"
                        },
                    ],
                    "name": "Leanne Graham",
                    "suiviId" : {
                        "statusTracking": "en cours",
                        "present": true,
                        "datContact1" : Date.now(),
                        "datContact2" : Date.now(),
                    },
                    "publisherOnly": true,
                    "booking" : {
                        "_id" : "3",
                        "nbTableSpace1" : 5,
                        "nbTableSpace2" : 5,
                        "nbTableSpace3" : 5,
                        "nbM2Space1" : 5,
                        "nbM2Space2" : 5,
                        "nbM2Space3" : 5,
                        "animatorNeeded" : true,
                        "crSended" : false,
                        "invoiceSended" : false,
                        "paymentOk" : false,
                        "putOnPlan" : false,

                    },
                    "games" : {
                        "name" : 'tonton flingueur'
                    },
                },
                {
                    "_id": 2,
                    "mainContact" : {
                        "email" : "Sinbgrspril.biz",
                        "telMobile": "00111 0000 0000",
                        "telFixe": "000000 01111000",
                        "address" : "ooooooooooooooooooooooo",
                        "work" : "deffffv"
                    },
                    "contacts" : [
                        {
                            "_id" : "5",
                            "firstName" : "Non",
                            "lastName" : "Non",
                            "email" : "Sincere@april.biz",
                            "telMobile": "000000 0000 0000",
                            "telFixe": "000000 0000 0000",
                            "address" : "tettetetefvczge",
                            "work" : "dev"
                        },
                        {
                            "_id" : "8",
                            "firstName" : "Non",
                            "lastName" : "Non",
                            "email" : "Sincere@april.biz",
                            "telMobile": "000000 0000 0000",
                            "telFixe": "000000 0000 0000",
                            "address" : "tettetetefvczge",
                            "work" : "dev"
                        },
                    ],
                    "name": "Ganine Graham",
                    "suiviId" : {
                        "statusTracking": "en cours",
                        "present": false,
                        "datContact1" : Date.now(),
                        "datContact2" : Date.now(),
                    },
                    "publisherOnly": true,
                    "booking" : {
                        "_id" : "4",
                        "nbTableSpace1" : 5,
                        "nbTableSpace2" : 5,
                        "nbTableSpace3" : 5,
                        "nbM2Space1" : 5,
                        "nbM2Space2" : 5,
                        "nbM2Space3" : 5,
                        "animatorNeeded" : true,
                        "crSended" : false,
                        "invoiceSended" : false,
                        "paymentOk" : false,
                        "putOnPlan" : false,

                    },
                    "games" : {
                        "name" : 'tonton flingueur'
                    },
                },
            ],
            search: '',
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
                if(this.name){
                    addFestival(this.name).then(res => {
                        console.log(res.data);
                        this.festivals.push(res.data)
                        this.active = false
                    })
                }
            }
        }


    }
</script>
