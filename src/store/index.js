import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    messages: []
  },
  actions: {
    getMessagesAction({ commit }) {
      axios.get('http://localhost:5000/getMessages')
        .then((response) => {
          const payload = response.data;
          commit('getMessages', payload);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    addMessageAction({ commit }, payload) {
      axios.post('http://localhost:5000/addMessage', payload)
        .then((response) => {
          const messages = response.data;
          commit('addMessage', messages);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateMessageAction({ commit }, payload) {
      axios.post('http://localhost:5000/updateMessage', payload)
        .then((response) => {
          const messages = response.data;
          commit('updateMessage', messages);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteMessageAction({ commit }, payload) {
      axios.post('http://localhost:5000/deleteMessage', { id: payload })
        .then((response) => {
          const messages = response.data;
          commit('deleteMessage', messages);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mutations: {
    getMessages(state, payload) {
      state.messages = payload;
    },
    addMessage(state, payload) {
      state.messages = payload;
    },
    updateMessage(state, payload) {
      state.messages = payload
    },
    deleteMessage(state, payload) {
      state.messages = payload
    }
  },
  getters: {
    messages(state) {
      return state.messages;
    }
  },
  modules: {}
});