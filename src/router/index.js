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
