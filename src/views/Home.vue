<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar v-else/>
        <SideBar/>
        <br>
        <br>
        <br>
        <vs-row>
            <vs-col offset="2" w="8">
                Festival du jeu
            </vs-col>
        </vs-row>

    </div>

</template>

<script>
    import SideBar from "@/components/SideBar";
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    export default {
        name: 'Home',
        components : {
            UserNavbar,
            SideBar,
            Navbar
        },
        data:() => ({
            user : false,
        }),

        beforeMount() {
            if(getCookie('token')){
                this.user = true
            }
        }


    }
</script>
