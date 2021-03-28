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

            <div class="center con-switch">
            <vs-switch v-model="active3" @click="changeGetExhibitor()">
                <template #off>
                    Exhibitors for all festivals
                </template>
                <template #on>
                    Exhibitors for current festival
                </template>
            </vs-switch>
            </div>

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
                            <vs-th v-if="!active3">
                                Add to current
                            </vs-th>
                        </vs-tr>
                    </template>
                    <template #tbody>
                        <vs-tr
                                :key="i"
                                v-for="(exhibitor, i) in $vs.getSearch(active3 ? exhibitors : Allexhibitors, search)"
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
                            <vs-td v-if="!active3" >
                                <div class="center">
                                    <vs-button @click="addToCurrentFestival(exhibitor._id)">Add </vs-button>
                                </div>
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
                                <div class="box con-content" v-if="exhibitor.booking.length > 0"  @click="updateBooking(exhibitor.booking[0]._id, exhibitor.booking[0].nbTableSpace1,
                                exhibitor.booking[0].nbTableSpace2, exhibitor.booking[0].nbTableSpace3, exhibitor.booking[0].nbM2Space1,exhibitor.booking[0].nbM2Space2,
                                exhibitor.booking[0].nbM2Space3,exhibitor.booking[0].animatorNeeded,exhibitor.booking[0].crSended,exhibitor.booking[0].invoiceSended,
                                exhibitor.booking[0].paymentOk,exhibitor.booking[0].putOnPlan)">
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
                                                    {{ exhibitor.booking[0].nbTableSpace1 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].nbTableSpace2 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].nbTableSpace3 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].nbM2Space1 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].nbM2Space2 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].nbM2Space3 }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].animatorNeeded }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].crSended }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].invoiceSended }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].paymentOk }}
                                                </vs-td>
                                                <vs-td>
                                                    {{ exhibitor.booking[0].putOnPlan }}
                                                </vs-td>
                                            </vs-tr>
                                        </template>
                                    </vs-table>

                                </div>
                                <div v-else>
                                    <vs-button gradient block v-if="active3" @click="openBookingPopup()">
                                        Add booking
                                    </vs-button>
                                </div>
                                Game :
                                <vs-row>
                                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                                        <vs-button block v-if="exhibitor.gameBookedList.length> 0" @click="$router.push('/games/' + exhibitor._id)">
                                            <i class='bx bx-show-alt'/>
                                            View games
                                        </vs-button>
                                    </vs-col>
                                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                                        <vs-button gradient block  @click="openBookingGamePopup()">
                                            <i class='bx bx-plus'/>
                                            Add games
                                        </vs-button>
                                    </vs-col>

                                </vs-row>

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
                                        <div class="footer-dialog" v-if="admin">
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

            <!--ADD EXHIBITOR POPUP-->
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


            <!--BOOKING POPUP-->
            <vs-dialog blur v-model="activeBooking">
                <template #header>
                    <h4 class="not-margin">
                        Add <b>Booking </b> to <i>{{selected[0].name}}</i>
                    </h4>
                </template>

                <br/>
                <div class="con-form">
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="nbTableSpace1" label-placeholder="nb tables for Premium">
                                <template #icon>
                                    <i class='bx bx-dice-1'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="nbM2Space1" label-placeholder="nb m2 for Premium">
                                <template #icon>
                                    <i class='bx bx-grid-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="nbTableSpace2" label-placeholder="nb tables for Medium">
                                <template #icon>
                                    <i class='bx bx-dice-2'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="nbM2Space2" label-placeholder="nb m2 for Medium">
                                <template #icon>
                                    <i class='bx bx-grid-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="nbTableSpace3" label-placeholder="nb tables for Standard">
                                <template #icon>
                                    <i class='bx bx-dice-3'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="nbM2Space3" label-placeholder="nb m2 for Standard">
                                <template #icon>
                                    <i class='bx bx-grid-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <div class="flex">
                        <vs-checkbox v-model="animatorNeeded">Need animator ?</vs-checkbox>
                    </div>
                </div>

                <template #footer>
                    <div class="footer-dialog">
                        <vs-button block @click="addBooking(selected[0]._id)">
                            Add
                        </vs-button>

                    </div>
                </template>
            </vs-dialog>

            <!--UPDATE BOOKING POPUP-->
            <vs-dialog blur v-model="activeUpdateBooking">
                <template #header>
                    <h4 class="not-margin">
                        Update <b>Booking </b>
                    </h4>
                </template>

                <br/>
                <div class="con-form">
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="upDatenbTableSpace1" label-placeholder="nb tables for Premium" >
                                <template #icon>
                                    <i class='bx bx-dice-1'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="upDatenbM2Space1" label-placeholder="nb m2 for Premium">
                                <template #icon>
                                    <i class='bx bx-grid-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="upDatenbTableSpace2" label-placeholder="nb tables for Medium">
                                <template #icon>
                                    <i class='bx bx-dice-2'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="upDatenbM2Space2" label-placeholder="nb m2 for Medium">
                                <template #icon>
                                    <i class='bx bx-grid-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="upDatenbTableSpace3" label-placeholder="nb tables for Standard">
                                <template #icon>
                                    <i class='bx bx-dice-3'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="upDatenbM2Space3" label-placeholder="nb m2 for Standard">
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
                                <vs-checkbox v-model="upDatecrSended">CR envoyé ?</vs-checkbox>
                            </div>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <div class="flex">
                                <vs-checkbox v-model="upDateinvoiceSended">Facture envoyé ?</vs-checkbox>
                            </div>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <div class="flex">
                                <vs-checkbox v-model="upDatepaymentOk">Payment ok ?</vs-checkbox>
                            </div>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <div class="flex">
                                <vs-checkbox v-model="upDateputOnPlan">Placé ?</vs-checkbox>
                            </div>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <div class="flex">
                        <vs-checkbox v-model="upDateanimatorNeeded">Need animator ?</vs-checkbox>
                    </div>
                </div>

                <template #footer>
                    <div class="footer-dialog">
                        <vs-button block @click="sendUpdateBooking(selected[0]._id)">
                            Update
                        </vs-button>

                    </div>
                </template>
            </vs-dialog>


            <!--BOOKING GAME POPUP-->
            <vs-dialog blur v-model="activeBookingGame">
                <template #header>
                    <h4 class="not-margin">
                        Add <b>Game </b> to <i>{{selected[0].name}}</i>
                    </h4>
                </template>

                <br/>
                <div class="con-form">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <vs-input shadow warn icon-after v-model="name" label-placeholder="name">
                            <template #icon>
                                <i class='bx bx-rename'/>
                            </template>
                        </vs-input>
                    </vs-col>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="ageMin" label-placeholder="age min">
                                <template #icon>
                                    <i class='bx bxs-baby-carriage'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn icon-after v-model="notice" label-placeholder="link of notice">
                                <template #icon>
                                    <i class='bx bx-link-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="duration" label-placeholder="duration">
                                <template #icon>
                                    <i class='bx bx-time'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="nbPlayersMin" label-placeholder="nb player min">
                                <template #icon>
                                    <i class='bx bx-user-minus'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="nbPlayersMax" label-placeholder="nb player max">
                                <template #icon>
                                    <i class='bx bxs-user-plus'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn icon-after v-model="category" label-placeholder="category">
                                <template #icon>
                                    <i class='bx bx-grid-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <vs-input shadow warn icon-after v-model="description" label-placeholder="description">
                            <template #icon>
                                <i class='bx bx-align-left'/>
                            </template>
                        </vs-input>
                    </vs-col>
                    <br/>
                    <div class="flex">
                        <vs-checkbox v-model="prototypeGame">Prototype ?</vs-checkbox>
                    </div>
                </div>

                <template #footer>
                    <div class="footer-dialog">
                        <vs-button block @click="activeBookingGamePart2=!activeBookingGamePart2">
                            Next
                        </vs-button>

                    </div>
                </template>
            </vs-dialog>

            <!--BOOKING GAME PART 2 POPUP-->
            <vs-dialog blur v-model="activeBookingGamePart2">
                <template #header>
                    <h4 class="not-margin">
                        Add <b>Booking </b> to <i>{{name}}</i>
                    </h4>
                </template>

                <br/>
                <div class="con-form">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <b-field >
                            <b-select
                                    placeholder="Select zone"
                                    icon="user"
                                    icon-pack="fas"
                                    v-model="zoneId"
                            >
                                <option v-for="zone in festival.zoneId"
                                        :key="zone._id" :value="zone._id">{{zone.name}}</option>
                            </b-select>
                        </b-field>
                    </vs-col>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="qtExhib" label-placeholder="Quantité exposé">
                                <template #icon>
                                    <i class='bx bxs-baby-carriage'/>
                                </template>
                            </vs-input>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-input shadow warn type="number" icon-after v-model="qtSend" label-placeholder="Quantité envoyé">
                                <template #icon>
                                    <i class='bx bx-link-alt'/>
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-checkbox v-model="tombola">Tombola ?</vs-checkbox>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-checkbox v-model="dotation">Donnation ?</vs-checkbox>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-checkbox v-model="putOnPlan">Placé ?</vs-checkbox>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                            <vs-checkbox v-model="bringByExhibitor">Apporté par l'exposant ?</vs-checkbox>
                        </vs-col>
                    </vs-row>
                    <br/>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <vs-input shadow warn icon-after v-model="comment" label-placeholder="Commentaire">
                            <template #icon>
                                <i class='bx bx-align-left'/>
                            </template>
                        </vs-input>
                    </vs-col>
                </div>

                <template #footer>
                    <div class="footer-dialog">
                        <vs-button block @click="sendBookingGame(selected[0]._id, selected[0].booking[0]._id)">
                            Valider
                        </vs-button>

                    </div>
                </template>
            </vs-dialog>

           <!--
               'statusTraking'"

                        pas de réponse

                        en discussion

                        présent

                        liste de jeux demandée

                        liste de jeux reçue

                        absent
             -->


        </div>


    </div>

</template>

<script>
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {addExhibitor} from "../utils/admin/Exhibitor/addExhibitor";
    import {getCurrentFestival} from "../utils/visitor/getCurrentFestival";
    import {getAllExhibitors} from "../utils/admin/Exhibitor/getAllExhibitors";
    import {addContact} from "../utils/admin/contact/addContact";
    import {addBooking} from "../utils/admin/booking/addBooking";
    import {getExhibitorsByfestivaId} from "../utils/admin/Exhibitor/getExhibitorsByFestivalId";
    import {addExistingExhibitor} from "../utils/admin/Exhibitor/addExistingExhibitorToCurrentFestival";
    import {addBookingGame} from "../utils/admin/bookingGame/addBookingGame";
    import {updateBooking} from "../utils/admin/booking/updateBooking";

    export default {
        name: 'Exhibitor',
        components: {
            UserNavbar,
            Navbar
        },
        data: () => ({
            activeCreateContact : false,
            editActive: false,
            edit: null,
            editProp: {},
            allCheck: false,
            page: 1,
            max: 3,
            selected: [],
            user: false,
            admin: false,
            classPresent : "",
            active: false,
            exhibitorName : "",
            publisherOnly : false,
            activecontact: false,
            activeBooking: false,
            activeBookingGame: false,
            activeBookingGamePart2: false,
            activeUpdateBooking: false,
            festival : null,
            exhibitors: [],
            Allexhibitors: [],
            search: '',
            firstName : '',
            lastName : '',
            email : '',
            address : '',
            telMobile : '',
            telFixe : '',
            work : '',
            isMainContact : false,
            nbTableSpace1 : null,
            nbTableSpace2 : null,
            nbTableSpace3 : null,
            nbM2Space1 : null,
            nbM2Space2 : null,
            nbM2Space3 : null,
            animatorNeeded : false,
            active3 : true,
            name : '',
            ageMin : '',
            notice : '',
            duration : '',
            nbPlayersMin : '',
            nbPlayersMax : '',
            category : '',
            description : '',
            prototypeGame : false,
            zoneBooking : '',
            qtExhib : '',
            qtSend : '',
            tombola :false,
            dotation :false,
            putOnPlan :false,
            bringByExhibitor :false,
            zoneId : '',
            comment : '',
            upDatenbTableSpace1 : '',
            upDatenbTableSpace2 : '',
            upDatenbTableSpace3 : '',
            upDatenbM2Space1 : '',
            upDatenbM2Space2 : '',
            upDatenbM2Space3 : '',
            upDateanimatorNeeded : '',
            upDatecrSended : '',
            upDateinvoiceSended : '',
            upDatepaymentOk : '',
            upDateputOnPlan : '',
            upDatedBookingId : ''
        }),

        beforeMount() {
            if (getCookie('token')) {
                this.user = true
            }
            if (getCookie('admin')) {
                this.admin = true
            }
            getCurrentFestival().then(res => {
                console.log(res.data);
                this.festival = res.data;
                getAllExhibitors().then(res =>{
                    console.log(res.data);
                    this.Allexhibitors = res.data.reverse()
                }).catch(e =>{
                    console.log(e);
                });
                getExhibitorsByfestivaId(this.festival._id).then(res =>{
                    console.log(res.data.exhibitors);
                    this.exhibitors = res.data.exhibitors.reverse()
                }).catch(e =>{
                    console.log(e);
                })

            }).catch(e =>{
                    console.log(e);
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
            },
            addBooking(exhibitorId){
                if(this.nbTableSpace1 || this.nbTableSpace2 || this.nbTableSpace3 || this.nbM2Space1 || this.nbM2Space2 || this.nbM2Space3){
                    addBooking(this.nbTableSpace1, this.nbTableSpace2, this.nbTableSpace3, this.nbM2Space1, this.nbM2Space2, this.nbM2Space3, this.animatorNeeded, this.festival._id, exhibitorId).then(res =>{
                        console.log(res.data);
                        getExhibitorsByfestivaId(this.festival._id).then(res =>{
                            console.log(res.data.exhibitors);
                            this.exhibitors = res.data.exhibitors
                        }).catch(e =>{
                            console.log(e);
                        })
                    });
                    this.activeBooking = false
                }
                this.$router.go() // à enlever 
            },
            changeGetExhibitor() {
                if(!this.active3){
                    getExhibitorsByfestivaId(this.festival._id).then(res =>{
                        console.log(res.data.exhibitors);
                        this.exhibitors = res.data.exhibitors.reverse()
                    }).catch(e =>{
                        console.log(e);
                    })
                }else{
                    getAllExhibitors().then(res =>{
                        console.log(res.data);
                        this.Allexhibitors = res.data.reverse()
                    }).catch(e =>{
                        console.log(e);
                    });
                }
            },
            addToCurrentFestival(exhibitorId){
                addExistingExhibitor(this.festival._id, exhibitorId).then(res=>{
                    console.log(res.data);
                    this.notificationSucces('Bien ajouté au festival courant')
                }).catch(e=>{
                    this.notificationErreur(e.response.data.error)
                })
            },
            sendBookingGame(exhibitorId, bookingId){
                console.log(this.name, this.ageMin, this.duration, this.category, this.notice, this.prototypeGame, this.nbPlayersMin,
                    this.nbPlayersMax, this.description, exhibitorId, this.festival._id, bookingId, this.zoneId, this.qtExhib,
                    this.qtSend, this.tombola, this.dotation, this.comment, this.putOnPlan, this.bringByExhibitor);
                addBookingGame(this.name, this.ageMin, this.duration, this.category, this.notice, this.prototypeGame, this.nbPlayersMin,
                    this.nbPlayersMax, this.description, exhibitorId, this.festival._id, bookingId, this.zoneId, this.qtExhib,
                    this.qtSend, this.tombola, this.dotation, this.comment, this.putOnPlan, this.bringByExhibitor).then(res =>{
                        console.log(res.data);
                        this.activeBookingGame = false;
                    this.activeBookingGamePart2 = false;
                    this.notificationSucces('reservation crée avec succes');
                    getExhibitorsByfestivaId(this.festival._id).then(res =>{
                        console.log(res.data.exhibitors);
                        this.exhibitors = res.data.exhibitors.reverse()
                    }).catch(e =>{
                        console.log(e);
                    })
                }).catch(e=>{
                    this.notificationErreur('error : ', e.response.data.error)
                })
            },
            openBookingPopup(){
                if(this.festival.space){
                    this.activeBooking=!this.activeBooking;
                }else{
                    this.notificationErreur('Ajoutez d abord une space au festival');
                    this.$router.push('/festival/' + this.festival._id)
                }
            },
            openBookingGamePopup(){
                if(this.festival.zoneId){
                    this.activeBookingGame=!this.activeBookingGame
                }else{
                    this.notificationErreur('Ajoutez d abord une zone au festival');
                    this.$router.push('/festival/' + this.festival._id)
                }
            },
            updateBooking(updatedBookingId, nbTableSpace1,nbTableSpace2,nbTableSpace3,nbM2Space1,nbM2Space2,nbM2Space3,animatorNeeded,crSended,invoiceSended,paymentOk,putOnPlan){
                if(this.admin){
                    this.upDatenbTableSpace1 = nbTableSpace1;
                    this.upDatenbTableSpace2 = nbTableSpace2;
                    this.upDatenbTableSpace3 = nbTableSpace3;
                    this.upDatenbM2Space1 = nbM2Space1;
                    this.upDatenbM2Space2 = nbM2Space2;
                    this.upDatenbM2Space3 = nbM2Space3;
                    this.upDateanimatorNeeded = animatorNeeded;
                    this.upDatecrSended = crSended;
                    this.upDateinvoiceSended = invoiceSended;
                    this.upDatepaymentOk = paymentOk;
                    this.upDateputOnPlan = putOnPlan;
                    this.upDatedBookingId = updatedBookingId;

                    this.activeUpdateBooking =!this.activeUpdateBooking;
                }else{
                    this.notificationErreur("Désolé vous n'avez pas les droits de modifications")
                }

            },

            sendUpdateBooking(){
                updateBooking(this.upDatedBookingId, this.upDatenbTableSpace1, this.upDatenbTableSpace2, this.upDatenbTableSpace3, this.upDatenbM2Space1, this.upDatenbM2Space2,
                this.upDatenbM2Space3, this.upDateanimatorNeeded, this.upDatecrSended, this.upDateinvoiceSended, this.upDatepaymentOk, this.upDateputOnPlan).then(res=>{
                    console.log(res.data);
                    this.activeUpdateBooking = false;
                    window.location.reload()
                }).catch(e=>{
                    this.notificationErreur(e.response.data.error)
                })
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

