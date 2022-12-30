import { defineStore } from 'pinia'
import axios from '../axios/axios'

export const useItems = defineStore({
    id: 'items',
    state: () => ({
        data: {
            total: 0,
            skip: 0,
            limit: 0,
            todos: []
        }
    }),
    getters: {
        getItems: state => state.todos
    },
    actions: {
        async fetchTodos(params) {
            const response = await axios({ url: 'todos', method: "GET", params })
            // console.log("response", response)
            this.data = response.data
        },
        addTodo(data) {
            return axios({ url: `todos/add`, method: "POST", data })
        },

        updateTodo({ id, data }) {
            return axios({ url: `todos/${id}`, method: "PUT", data })
        },
        deleteTodo(id) {
            return axios({ url: `todos/${id}`, method: "DELETE" })
        }

    }
})
