import { TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type removeTaskAC = {
    type: 'REMOVE-TASK'
    todolistId:string
    taskId: string

}
export type addTaskAC = {
    type: 'ADD-TASK',
    title: string
    todolistId:string
}
export type changeTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS',
    taskId:string,
    isDone:boolean,
    todolistId:string
}
export type changeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE',
    taskId:string,
    title:string,
    todolistId:string
}


type ActionsType = removeTaskAC | addTaskAC|changeTaskStatusAC|changeTaskTitleAC|AddTodolistActionType|RemoveTodolistActionType ;

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filtered = tasks.filter(t=>t.id!==action.taskId)
            stateCopy[action.todolistId]=filtered
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let task = todolistTasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let task = todolistTasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.title;
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId]=[]
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (todolistId: string, taskId:string): removeTaskAC => {
    return { type: 'REMOVE-TASK', todolistId:todolistId,taskId: taskId}
}
export const addTaskAC = (title: string, todolistId:string): addTaskAC => {
    return { type: 'ADD-TASK', title: title, todolistId:todolistId}
}
export const changeTaskStatusAC = (taskId:string, isDone:boolean, todolistId:string): changeTaskStatusAC => {
    return { type: 'CHANGE-TASK-STATUS', taskId:taskId, isDone:isDone, todolistId:todolistId}
}
export const changeTaskTitleAC = (taskId:string, title:string, todolistId:string): changeTaskTitleAC => {
    return { type: 'CHANGE-TASK-TITLE', taskId:taskId, title:title, todolistId:todolistId}
}
