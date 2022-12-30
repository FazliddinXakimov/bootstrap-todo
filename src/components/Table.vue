<script setup>
import Modal from './Modal.vue'
import { useItems } from '../store/index'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue';
import Pagination from './Pagination.vue';
import { nextTick } from 'process';

const store = useItems();
const { data } = storeToRefs(store)

let filter = reactive(
    {
        limit: 5,
        skip: 0,
    }
)

let editData = null;
let isShowModal = ref(false)


const setEditData = (value) => {
    editData = value

    nextTick(() => {
        isShowModal.value = true
    })

    console.log("editData", editData)
}

const addData = () => {
    editData = null

    nextTick(() => {
        isShowModal.value = true
    })
}

const hideModal = () => {
    editData = null

    nextTick(() => {
        isShowModal.value = false
    })
}

const refresh = () => {
    store.fetchTodos(filter)

}

const deleteTodo = async (id) => {
    await store.deleteTodo(id)
    store.fetchTodos(filter)
}

onMounted(() => {
    try {
        store.fetchTodos(filter)
    } catch (error) {
        console.log("error", error)
    }
})

const onPaginate = (value) => {
    filter.skip = filter.limit * (value - 1)
    store.fetchTodos(filter)
}


</script>

<template>
    <Modal :editData="editData" v-if="isShowModal" @hideModal='hideModal' @refresh="refresh" />
    <div class="container mt-3">
        <div class="d-flex justify-content-end align-items-center mb-3" data-bs-toggle="modal"
            data-bs-target="#staticBackdrop">
            <button class="btn btn-primary" @click="addData">
                + Task
            </button>
        </div>
        <table class="table">
            <thead class="table-light">
                <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col" class="text-center">Title</th>
                    <th scope="col" class="text-center">Status</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in data.todos" :key="todo.id">
                    <th scope="row" class="text-center">{{ todo.id }}</th>
                    <td class="text-center">{{ todo.todo }}</td>
                    <td class="text-center">{{ todo.completed }}</td>
                    <th scope="row" class="text-center">
                        <button @click="setEditData(todo)" class="btn btn-sm btn-warning m-1" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">
                            <vue-feather type="edit-2" size="16"></vue-feather>
                        </button>
                        <button class="btn btn-sm btn-danger " @click="deleteTodo(todo.id)">
                            <vue-feather type="trash-2" size="16"></vue-feather>
                        </button>
                    </th>
                </tr>

            </tbody>
        </table>
        <Pagination :total="data.total" :skip="filter.skip" :limit="filter.limit" @onPaginate="onPaginate" />
    </div>
</template>