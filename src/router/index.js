import VueRouter from 'vue-router'
import {getCookie} from "../utils/cookie/cookie";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'FJM | Accueil',
        },
    },
    {
        path: '/festival',
        name: 'Festival',
        component: () => import('../views/Festivals.vue'),
        meta: {
            title: 'FJM | Festival',
        },
    },
    {
        path: '/festival/:festivalId',
        name: 'Festival Overview',
        component: () => import('../views/FestivalOverview.vue'),
        meta: {
            title: 'FJM | Festival Overview',
        },
    },
    {
        path: '/exhibitor',
        name: 'Exhibitor',
        component: () => import('../views/Exhibitors.vue'),
        meta: {
            title: 'FJM | Exhibitor',
        },
    },
    {
        path: '/games/:exhibitorId',
        name: 'Games of exhibitor',
        component: () => import('../views/Games.vue'),
        meta: {
            title: 'FJM | Games',
        },
    },

];


const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to,from,next)=>{
    document.title = to.meta.title;
    const token = getCookie('token');
    const admin = getCookie('admin');
    if(token == null && to.name !== 'Home'){
        return next({path : '/'});
    }else if(admin){
        return next();
    }else{
        return next();
    }
});

export default router
