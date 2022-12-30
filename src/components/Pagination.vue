<template>

    <nav aria-label="...">
        <ul class="pagination">

            <template v-for="p of getPageCount" :key="p">

                <li class="page-item" :class="getCurrentPage == p ? 'active' : ''" @click="onPaginate(p)"
                    v-if="p === 1 && Math.abs(getCurrentPage - p) >= 3">
                    <a class="page-link">{{ p }}</a>
                </li>
                <li class="page-item" :class="getCurrentPage == p ? 'active' : ''"
                    v-if="p === 1 && Math.abs(getCurrentPage - p) >= 3 && getCurrentPage !== 4">
                    <span class="page-link">...</span>
                </li>
                <li class="page-item" :class="getCurrentPage == p ? 'active' : ''" @click="onPaginate(p)"
                    v-if="Math.abs(getCurrentPage - p) <= 2">
                    <a class="page-link">{{ p }}</a>
                </li>
                <li class="page-item" :class="getCurrentPage == p ? 'active' : ''"
                    v-if="p === getPageCount && Math.abs(getCurrentPage - p) >= 3">
                    <span class="page-link">...</span>
                </li>
                <li class="page-item" :class="getCurrentPage == p ? 'active' : ''" @click="onPaginate(p)"
                    v-if="p === getPageCount && Math.abs(getCurrentPage - p) >= 3">
                    <a class="page-link">{{ p }}</a>
                </li>

            </template>
        </ul>
    </nav>
</template>
  
<script>
export default {
    props: {
        total: {
            type: Number,
            required: true,
            default: 4
        },
        limit: {
            type: Number,
            required: true,
            default: 4
        },
        skip: {
            type: Number,
            required: true,
            default: 4
        }
    },

    computed: {
        getPageCount() {
            return Math.ceil(this.total / this.limit)
        },

        getCurrentPage() {
            return (this.skip / this.limit) + 1
        }
    },
    methods: {
        onPaginate(value) {
            console.log("onPaginate", value)
            this.$emit('onPaginate', value)
        }
    }

}
</script>
  

<style>
.active>.page-link {
    z-index: 1;
}
</style>
  
  
  