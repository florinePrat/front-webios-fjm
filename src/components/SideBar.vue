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
                        src="../../public/logo.png"
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
                            {{name}}
                        </template>
                    </vs-avatar>
                </vs-row>

            </template>
        </vs-sidebar>
    </div>
</template>
<script>

    export default {
        data:() => ({
            projects : [],
            actives: 'home',
            name:''
        }),

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


