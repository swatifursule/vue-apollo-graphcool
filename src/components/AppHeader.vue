<template>
    <div class="flex pa1 justify-between nowrap orange">
        <div class="flex flex-fixed black">
            <div class="fw7 mr1">Post News</div>
            <router-link to="/" class="ml1 no-underline black">new</router-link>
            <div class="ml1">|</div>
            <router-link to="/top" class="ml1 no-underline black">top</router-link>

            <div class="ml1">|</div>
            <router-link to="/search" class="ml1 no-underline black">search</router-link>
            <div class="flex" v-if="userId">
                <div class="ml1">|</div>
                <router-link to="/create" class="ml1 no-underline black">submit</router-link>
            </div>
        </div>
        <div class="flex flex-fixed">
            <div v-if="userId" class="ml1 pointer black" @click="logout()">logout</div>
            <router-link v-else to="/login" class="ml1 no-underline black">login</router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Inject } from 'vue-property-decorator';
    import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/settings';

    @Component
    export default class AppHeader extends Vue {
        public get userId() {
            return this.$root.$data.userId;
        }
        public logout() {
            localStorage.removeItem(GC_USER_ID);
            localStorage.removeItem(GC_AUTH_TOKEN);
            this.$root.$data.userId = localStorage.getItem(GC_USER_ID);
        }
    }
</script>