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
                        <vs-tr>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors, 'name')">
                                Name
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors, 'email')">
                                Email
                            </vs-th>
                            <vs-th sort @click="exhibitors = $vs.sortData($event ,exhibitors, 'id')">
                                Id
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
                                {{ exhibitor.email }}
                            </vs-td>
                            <vs-td>
                                {{ exhibitor.id }}
                            </vs-td>

                            <template #expand>
                                <div class="con-content">
                                    <vs-row>
                                        <vs-col w="2">
                                            <vs-avatar>
                                                <i class='bx bx-cool' v-if="!exhibitor.publisherOnly" />
                                                <i class='bx bx-confused' v-else />
                                            </vs-avatar>
                                            <p>
                                                {{ exhibitor.name }}
                                            </p>
                                        </vs-col>
                                        <vs-col w="2">

                                        </vs-col>
                                        <vs-col w="2">
                                            <vs-button flat icon>
                                                <i class='bx bx-lock-open-alt' />
                                            </vs-button>
                                        </vs-col>
                                        <vs-col w="2">
                                            <vs-button flat icon>
                                                Send Email
                                            </vs-button>
                                        </vs-col>
                                        <vs-col w="2">
                                            <vs-button border danger>
                                                Remove User
                                            </vs-button>
                                        </vs-col>
                                    </vs-row>
                                </div>
                            </template>


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


            <!--DIALOG !!-->
           <!-- <div class="center">
                <vs-dialog blur v-model="active">
                    <template #header>
                        <h4 class="not-margin">
                            Create a <b>Festival</b>
                        </h4>
                        <br/>
                    </template>


                    <div class="con-form">
                        <br/>
                        <vs-input
                                label-placeholder="New festival's name"
                                v-model="name"
                        >
                            <template #icon>
                                <i class='bx bx-add-to-queue'/>
                            </template>
                        </vs-input>
                        <br/>
                    </div>

                    <template #footer>
                        <div class="footer-dialog">
                            <vs-button gradient block @click="addFestival">
                                Create
                            </vs-button>

                        </div>
                    </template>
                </vs-dialog>
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
            active: false,
            exhibitors: [
                {
                    "id": 1,
                    "name": "Leanne Graham",
                    "username": "Bret",
                    "email": "Sincere@april.biz",
                    "website": "hildegard.org",
                    "publisherOnly": true,
                },
                {
                    "id": 2,
                    "name": "Ervin Howell",
                    "username": "Antonette",
                    "email": "Shanna@melissa.tv",
                    "website": "anastasia.net",
                    "publisherOnly": false,
                },
                {
                    "id": 3,
                    "name": "Clementine Bauch",
                    "username": "Samantha",
                    "email": "Nathan@yesenia.net",
                    "website": "ramiro.info",
                    "publisherOnly": false,
                }
            ],
            name: '',
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
                addFestival(this.name).then(res => {
                    console.log(res.data);
                    this.festivals.push(res.data)
                    this.active = false
                })
            }
        }


    }
</script>
