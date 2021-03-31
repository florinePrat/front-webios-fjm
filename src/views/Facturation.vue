<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="facturation" v-else/>
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
                    <vs-col w="4" vs-type="flex" vs-justify="center" vs-align="center">
                        <vs-card>
                            <template #img>
                                <p> Total des facturations actuels 5€ </p>
                                
                            </template>
                        </vs-card>
                        </vs-col>
                        <vs-col w="4" vs-type="flex" vs-justify="center" vs-align="center">
                            <vs-card>
                            <template #img>
                                <p> Total prévus 10€ </p>
                            </template>
                        </vs-card>
                    </vs-col>
                    <vs-col w="4" vs-type="flex" vs-justify="center" vs-align="center">
                            <vs-card>
                            <template #img>
                                <p> Différence -5€ </p>
                            </template>
                        </vs-card>
                    </vs-col>
                </vs-row>

            <div class="center mr-6">
                <vs-table>
                    <template #header>
                        <vs-input v-model="search" border placeholder="Search"/>
                    </template>
                    <br/>
                    <template #thead>
                        <vs-tr>
                            <vs-th>
                                Name
                            </vs-th>
                            <vs-th>
                                Statut
                            </vs-th>
                            <vs-th>
                                Nombre de tables Medium
                            </vs-th>
                            <vs-th>
                                Nombre de tables Standard
                            </vs-th>
                            <vs-th>
                                Nombre de tables Premium
                            </vs-th>
                            <vs-th>
                                Prix payés
                            </vs-th>
                        </vs-tr>
                    </template>
                    <template #tbody>
                        <vs-tr
                                v-for="booking in $vs.getSearch(bookings, search)"
                                :key="booking._id"
                        >
                            <vs-td>
                                {{ booking.exhibitorId.name }}
                            </vs-td>
                            <vs-td>
                                <i class='bx bx-book-reader'/>
                                {{booking.paymentOK }}
                            </vs-td>
                            <vs-td>
                                <i class='bx bx-book-reader'/>
                                {{booking.nbTableSpace1 }}
                            </vs-td>
                            <vs-td>
                                <i class='bx bx-cube-alt'/>
                                {{booking.nbTableSpace2}}
                            </vs-td>
                            <vs-td>
                                <i class='bx bx-time'/>
                                {{booking.nbTableSpace3}}''
                            </vs-td>
                        </vs-tr>
                    </template>

                </vs-table>
            </div>
        </div>


    </div>

</template>

<script>
    /*import SideBar from "@/components/SideBar";*/
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {getCurrentFestival} from "../utils/visitor/getCurrentFestival";
    import {getAllBookingByFestival} from "../utils/admin/booking/getAllBookingByFestival";

    export default {
        name: 'Facturation',
        components: {
            UserNavbar,
            /*SideBar,*/
            Navbar
        },
        data: () => ({
            user: false,
            currentFestival: {},
            search: "",
            bookings: []
        }),

        beforeMount() {
            if (getCookie('token')) {
                this.user = true
            }
            getCurrentFestival().then(res => {
                console.log(res.data);
                this.currentFestival = res.data;

                getAllBookingByFestival(this.currentFestival._id).then(res =>{
                    console.log(res.data);
                    this.bookings = res.data
                }).catch(e =>{
                    console.log(e);
                });
            }).catch(e => {
                console.log(e);
                this.notificationErreur(e.response.data.error)
            });

        }


    }
</script>
