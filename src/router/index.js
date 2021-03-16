import VueRouter from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'Accueil',
        },
    },

];


const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

/*router.beforeEach((to,from,next)=>{
    document.title = to.meta.title;
    const token = getCookie('token');
    if(token == null && to.name !== 'Home' && to.name !== 'Credentials'){
        if(to.name === 'Share') {
            setCookie('sharePackageLink', window.location.href, 10)
        }else{
            return next({path : '/'});
        }
    }
    else{
        return next();
    }
});*/

export default router
