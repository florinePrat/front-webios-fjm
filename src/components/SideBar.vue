<template>
    <div class="hidden">
        <vs-sidebar
                fixed
                hover-expand
                v-model="actives"
                open
        >
            <template #logo>
                <img
                        src="../../public/logoFJM.png"
                        alt=""
                >
            </template>
            <vs-sidebar-item @click="isActive('home')" id="home" to="/" >
                <template #icon>
                    <i class='bx bx-home'/>
                </template>
                Home
            </vs-sidebar-item>

            <template #footer>
                <vs-row justify="space-between">
                    <vs-avatar history primary>
                        <template #text>
                            {{admin ? name : 'Invit'}}
                        </template>
                    </vs-avatar>
                </vs-row>

            </template>
        </vs-sidebar>

    </div>
</template>
<script>

    import {getCookie} from "../utils/cookie/cookie";

    export default {
        data:() => ({
            projects : [],
            actives: 'home',
            admin : false,
            name:'',
            active: false,
            input1: '',
            input2: '',
            checkbox1: false
        }),

        beforeMount() {
            if(getCookie('admin') && getCookie('name')){
                this.admin = getCookie('admin');
                this.name = getCookie('name')
            }
        },

        methods : {
            isActive(id){
                this.actives = id
            },
        },

        mounted() {
            this.name = window.localStorage.getItem('name');

        },
    }
</script>


