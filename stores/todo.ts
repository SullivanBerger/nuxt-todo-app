import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

interface TodoState {
    todoItems: TodoItem[]
}

interface TodoItem {
    id: string,
    label: string,
    isDone: boolean,
    createdAt: Date,
    updatedAt: Date
}

interface TodoAdd {
    label: string
}

interface TodoUpdate {
    label?: string,
    isDone?: boolean
}

const state = (): TodoState => {
    return {
        todoItems: []
    };
};

const getters = {
    getTodoById: (state: TodoState) => {
        return (id: string) => {
            state.todoItems.find((item) => !!item && (item as TodoItem).id === id);
        };
    },
    getSortedTodos: (state: TodoState) => {
        return [...state.todoItems].sort(
            (a, b) =>
                new Date(a!.createdAt).getTime() - new Date(b!.createdAt).getTime()
        );
    },
};

export const useTodoStore = defineStore("todo", {
    state: state,
    getters: getters,
    actions: {
        add(partialTodo: TodoAdd) {
            const todo: TodoItem = {
                id: uuid(),
                ...partialTodo,
                isDone: false,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            this.todoItems.push(todo);
        },
        update(id: string, updatedTodo: TodoUpdate) {
            this.todoItems = this.todoItems.map((item: TodoItem) => {
                return item.id === id ? {...item, ...updatedTodo, updatedAt: new Date()} : item;
            });
        },
        remove(id: string) {
            this.todoItems = this.todoItems.filter((item: TodoItem) => item.id !== id);
        }
    }
});