<template>

    <div class="z-3 my-overlay position-absolute">
        <div class="my-modal z-3 card p-3">
            <h4 class="text-center text-bold">{{ editData ? 'Edit Task' : 'Add Task' }}</h4>
            <hr />

            <div class="my-1">
                <label class="mb-1">Title: </label>
                <input v-model="data.title" class="form-control" type="text" placeholder="Default input"
                    aria-label="default input example">
            </div>
            <div class="my-1">
                <label>Status</label>
                <div class="form-check form-switch my-1">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                        v-model="data.completed">
                </div>
            </div>
            <div class="d-flex justify-content-end align-items-end">
                <button class="btn btn-secondary mx-2" @click="$emit('hideModal')">
                    Cancel
                </button>
                <button class="btn btn-primary" @click="onSubmit">
                    Add
                </button>
            </div>
        </div>
    </div>
</template>


<script >
import { mapActions } from 'pinia'
import { useItems } from '../store/index'
// import { notify } from "@kyvg/vue3-notification";

export default {

    data() {
        return {
            data: {
                title: "",
                completed: false,
                userId: 5
            }
        }
    },
    props: {
        editData: {
            type: Object,
            required: true
        }
    },

    methods: {
        ...mapActions(useItems, ['addTodo', 'updateTodo']),

        async onSubmit() {
            try {
                if (this.editData?.id) {
                    await this.updateTodo({ data: this.data, id: this.editData?.id })
                }
                else {
                    await this.addTodo(this.data)
                }

                this.$emit('hideModal')

                this.$emit('refresh')

                this.$notify({
                    title: "Successfully!",
                    type: 'success'
                });
            } catch (error) {
                this.$notify({
                    title: "Error occured",
                    type: 'error'
                });
            }
        }



    },
    mounted() {
        if (this.editData?.id) {
            this.data.title = this.editData.todo
            this.data.completed = this.editData.completed
        }
        else {
            this.data.title = ''
            this.data.completed = false
        }
    }
}
</script>

<style scoped>
.my-overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(1, 1, 1, 0.6);

}

.my-modal {
    width: 45%;
    margin: 0 auto;
    position: absolute;
    top: 25%;
    right: 30%;
}
</style>