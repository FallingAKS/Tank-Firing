import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/HomePage.vue';
import Pve from '../views/Pve.vue';
import Pvp from '../views/Pvp.vue';
import Pvpve from '../views/Pvpve.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/pve',
        component: Pve
    },
    {
        path: '/pvp',
        component: Pvp
    },
    {
        path: '/pvpve',
        component: Pvpve
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
