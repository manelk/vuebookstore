import {
    Login
}
from '../api/auth.service'

export default {
    state: {
        currentUser: {},
        loggedIn: null
    },
    getters: {
        getCurrentUser(state) {
            return state.currentUser
        },
        getLoggedIn(state) {
            return state.loggedIn
        }
    },
    mutations: {
        setCurrentUser(state, output) {
            state.currentUser = output
        }
    },
    actions: {
        async loginAction(context, user) {
            let loggedInUser = await Login(user);
            context.commit('setCurrentUser', loggedInUser[0])
            return loggedInUser[0]
        },
        async logout(state) {
            state.currentUser = {};
            //context.commit("loggedIn", false);
            return localStorage.clear();
        }

    }
}