<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="exhibitor" v-else/>
        <!--<SideBar/>-->
        <br>
        <br>
        <br>
        <div class="is-half mr-6 ml-6">

            <vs-row>
                <vs-col w="8">
                    <h1>Exhibitors</h1>
                </vs-col>
            </vs-row>
            <br/>

            <div class="center">
                <vs-table  v-model="selected">
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
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors, 'email')">
                                Email MC
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors, 'tel')">
                                Tel MC
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors, 'statusTracking')">
                                Status
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors, 'present')">
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
                                :is-selected="!!selected.includes(exhibitor)"
                        >
                            <vs-td>
                                {{ exhibitor.name }}
                            </vs-td>
                            <vs-td>
                                {{ exhibitor.mainContact ? exhibitor.mainContact.email  : 'no email'}}
                            </vs-td>
                            <vs-td>
                                {{ exhibitor.mainContact ? exhibitor.mainContact.telMobile  : 'no tel mobile'}}
                            </vs-td>
                            <vs-td>
                                {{ exhibitor.suiviId.statusTraking }}
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
                                                <i class='bx bx-plus' @click="activecontact = !activecontact"/>
                                            </vs-avatar>
                                        </vs-col>
                                        <vs-col w="3">
                                            <i class='bx bx-phone-call mr-1'/>Tel fixe :
                                            {{ exhibitor.mainContact ? exhibitor.mainContact.telFixe : 'no data yet' }}
                                        </vs-col>
                                        <vs-col w="4">
                                            <i class='bx bx-map-pin mr-1'/>Addresse :
                                            {{ exhibitor.mainContact ? exhibitor.mainContact.address : 'no data yet'}}
                                        </vs-col>
                                        <vs-col w="3">
                                            <i class='bx bx-briefcase-alt-2 mr-1'/>Work :
                                            {{ exhibitor.mainContact ? exhibitor.mainContact.work : 'no data yet' }}
                                        </vs-col>
                                    </vs-row>
                                </div>
                                Booking :
                                <div class="box con-content" v-if="exhibitor.booking.length > 0">
                                    <vs-table >
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
                                <div v-else>
                                    <vs-button gradient block>
                                        Add booking
                                    </vs-button>
                                </div>
                                Game :
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
                                                        v-for="contact in selected[0].contacts" :key="contact._id"
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
                                            <vs-button gradient block @click="activeCreateContact = !activeCreateContact">
                                                Create new
                                            </vs-button>

                                        </div>
                                    </template>
                                </vs-dialog>

                                <vs-dialog overflow-hidden v-model="activeCreateContact">
                                    <template #header>
                                        <h4 class="not-margin">
                                            Add <b>Contact</b>
                                        </h4>
                                    </template>


                                    <div class="con-form ml-6 pl-6">
                                        <vs-input v-model="firstName" placeholder="First Name">
                                            <template #icon>
                                                <i class='bx bx-game'/>
                                            </template>
                                        </vs-input>
                                        <br/>
                                        <vs-input v-model="lastName" placeholder="Last Name">
                                            <template #icon>
                                                <i class='bx bx-ghost'/>
                                            </template>
                                        </vs-input>
                                        <br/>
                                        <vs-input v-model="email" placeholder="Email">
                                            <template #icon>
                                                @
                                            </template>
                                        </vs-input>
                                        <br/>
                                        <vs-input v-model="address" placeholder="Address">
                                            <template #icon>
                                                <i class='bx bx-map-pin'/>
                                            </template>
                                        </vs-input>
                                        <br/>
                                        <vs-input v-model="telMobile" placeholder="Tel Mobile">
                                            <template #icon>
                                                <i class='bx bxs-phone'/>
                                            </template>
                                        </vs-input>
                                        <br/>
                                        <vs-input v-model="telFixe" placeholder="Tel Fixe">
                                            <template #icon>
                                                <i class='bx bx-calculator'/>
                                            </template>
                                        </vs-input>
                                        <br/>
                                        <vs-input v-model="work" placeholder="Work">
                                            <template #icon>
                                                <i class='bx bx-wallet-alt'/>
                                            </template>
                                        </vs-input>
                                        <br/>
                                        <div class="flex" v-if="selected[0] && selected[0].mainContact">
                                            <vs-checkbox v-model="isMainContact">Main contact ?</vs-checkbox>
                                        </div>
                                    </div>


                                    <template #footer>
                                        <div class="footer-dialog">
                                            <vs-button block @click="addContact(selected[0]._id, selected[0].mainContact)">
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


            <vs-dialog blur v-model="active">
                <template #header>
                    <h4 class="not-margin">
                        Add <b>Exhibitor</b>
                    </h4>
                </template>


                <div class="con-form">
                    <vs-input v-model="exhibitorName" placeholder="Name">
                        <template #icon>
                            <i class='bx bx-note'/>
                        </template>
                    </vs-input>
                    <div class="flex">
                        <vs-checkbox v-model="publisherOnly">Publisher only ?</vs-checkbox>
                    </div>
                </div>

                <template #footer>
                    <div class="footer-dialog">
                        <vs-button block @click="addExhibitor()">
                            Create
                        </vs-button>

                    </div>
                </template>
            </vs-dialog>




        </div>


    </div>

</template>

<script>
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {addExhibitor} from "../utils/admin/Exhibitor/addExhibitor";
    import {getCurrentFestival} from "../utils/visitor/getCurrentFestival";
    import {getExhibitorsByCurrentFestival} from "../utils/admin/Exhibitor/getExhibitorByCurrentFestival";
    import {addContact} from "../utils/admin/contact/addContact";

    export default {
        name: 'Exhibitor',
        components: {
            UserNavbar,
            Navbar
        },
        data: () => ({
            editActive: false,
            activeCreateContact : false,
            edit: null,
            editProp: '',
            allCheck: false,
            page: 1,
            max: 3,
            selected: [],
            user: false,
            classPresent : "",
            active: false,
            exhibitorName : "",
            publisherOnly : false,
            activecontact: false,
            festival : null,
            exhibitors: [],
            search: '',
            firstName : '',
            lastName : '',
            email : '',
            address : '',
            telMobile : '',
            telFixe : '',
            work : '',
            isMainContact : false
        }),

        beforeMount() {
            if (getCookie('token')) {
                this.user = true
            }
            getCurrentFestival().then(res => {
                console.log(res.data);
                this.festival = res.data;
                getExhibitorsByCurrentFestival(this.festival._id).then(res =>{
                    console.log(res.data);
                    this.exhibitors = res.data
                })
            });

        },

        methods: {
            addExhibitor() {
                if(this.exhibitorName){
                    addExhibitor(this.exhibitorName, this.publisherOnly, this.festival._id).then(res => {
                        console.log(res.data);
                        this.exhibitors.push(res.data);
                        this.active = false
                    })
                }
            },
            addContact(publisherId, mainContact){
                console.log(publisherId, mainContact);
                if(!mainContact || this.isMainContact){
                    addContact(this.firstName, this.lastName, this.email, this.address, this.telMobile, this.telFixe, this.work, publisherId, true).then(res =>{
                    console.log(res.data)
                })
                }else{
                    addContact(this.firstName, this.lastName, this.email, this.address, this.telMobile, this.telFixe, this.work, publisherId, false).then(res =>{
                    console.log(res.data)
                })
                }
                this.activeCreateContact = false;
                this.activecontact = false;
                window.location.reload()
            }
        }


    }
</script>

