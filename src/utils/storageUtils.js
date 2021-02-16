import store from 'store'

const USER_KEY = 'user'
export default {

    //?存储用户
    saveUser (user) {
        store.set(USER_KEY, user)
    },

    //?得到用户信息
    getUser (user) {
        return store.get(USER_KEY) || {}
    },

    //?删除用户
    removeUser (user) {
        store.remove(USER_KEY)
    }
}