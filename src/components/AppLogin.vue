<template>
    <div>
        <h4 class='mv3'>{{login ? 'Login' : 'Sign Up'}}</h4>
        <div class='flex flex-column'>
            <input
                    v-show="!login"
                    v-model="name"
                    type="text"
                    placeholder="Your name">
            <input
                    v-model="email"
                    type="text"
                    placeholder="Your email address">
            <input
                    v-model="password"
                    type="password"
                    placeholder="Password">
        </div>
        <div class='flex mt3'>
            <div
                    class='pointer mr2 button'
                    @click="confirm()">
                {{login ? 'login' : 'create account'}}
            </div>
            <div
                    class='pointer button'
                    @click="login = !login">
                {{login ? 'need to create an account?' : 'already have an account?'}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/settings';
    import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from '../constants/graphql';
    import { Component, Vue, Inject } from 'vue-property-decorator';

    @Component
    export default class AppLogin extends Vue {
        public email: string = '';
        public login: boolean = true;
        public name: string =  '';
        public password: string = '';

        public confirm(): void {
            const { name, email, password } = this.$data;
            if (this.login) {
                this.$apollo.mutate({
                    mutation: SIGNIN_USER_MUTATION,
                    variables: {
                        email,
                        password,
                    },
                }).then((result) => {
                    const id = result.data.signinUser.user.id;
                    const token = result.data.signinUser.token;
                    this.saveUserData(id, token);
                }).catch((error) => {
                    alert(error);
                });
            } else {
                this.$apollo.mutate({
                    mutation: CREATE_USER_MUTATION,
                    variables: {
                        name,
                        email,
                        password,
                    },
                }).then((result) => {
                    const id = result.data.signinUser.user.id;
                    const token = result.data.signinUser.token;
                    this.saveUserData(id, token);
                }).catch((error) => {
                    alert(error);
                });
            }
            this.$router.push({path: '/'});
        }

        public saveUserData(id, token): void {
            localStorage.setItem(GC_USER_ID, id);
            localStorage.setItem(GC_AUTH_TOKEN, token);
            this.$root.$data.userId = localStorage.getItem(GC_USER_ID);
        }
    }
</script>