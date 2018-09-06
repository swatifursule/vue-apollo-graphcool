<template>
    <div>
        <div>
            Search
            <!-- 1 -->
            <input type="text" v-model="searchText">
        </div>
        <link-item
                v-for="(link, index) in allLinks"
                :key="link.id"
                :link="link"
                :index="index">
        </link-item>
    </div>
</template>

<script lang="ts">
    // 2
    import { ALL_LINKS_SEARCH_QUERY } from '../constants/graphql';
    import LinkItem from './LinkItem';
    import { Component, Vue, Inject } from 'vue-property-decorator';

    @Component({
        components: {
            LinkItem,
        },
        apollo: {
            allLinks: {
                query: ALL_LINKS_SEARCH_QUERY,
                variables() {
                    return {
                        searchText: this.searchText
                    }
                },
                skip() {
                    return !this.searchText
                },
            },
        },
    })
    export default class Search extends Vue {

        public searchText: string = '';

        // 3


    }
</script>