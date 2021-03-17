<template>
    <div>
        <Navbar v-if="!user"/>
        <UserNavbar active="home" v-else/>
        <!--<SideBar/>-->
        <br>
        <br>
        <br>
        <vs-row>
            <vs-col offset="2" w="8">
                {{currentFestival.name}}
            </vs-col>
        </vs-row>

    </div>

</template>

<script>
    /*import SideBar from "@/components/SideBar";*/
    import Navbar from "@/components/Navbar";
    import {getCookie} from "../utils/cookie/cookie";
    import UserNavbar from "../components/UserNavbar";
    import {getCurrentFestival} from "../utils/visitor/getCurrentFestival";
    export default {
        name: 'Home',
        components : {
            UserNavbar,
            /*SideBar,*/
            Navbar
        },
        data:() => ({
            user : false,
            currentFestival : {}
        }),

        beforeMount() {
            if(getCookie('token')){
                this.user = true
            }
            getCurrentFestival().then(res=>{
                console.log(res.data);
                this.currentFestival = res.data;
            })
        }


    }
</script>
