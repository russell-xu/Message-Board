import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    messages: []
  },
  actions: {
    getMessagesAction({ commit }) {
      axios.get('http://localhost:5000/getMessages')
        .then(function (response) {
          let payload = response.data;
          console.log(payload);
          commit('getMessages', payload);
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    addMessageAction({ commit }, payload) {
      let messages = [];
      axios.post('http://localhost:5000/postMessage', payload)
        .then(function (response) {
          messages = response.data;
          commit('addMessage', messages);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteMessageAction({ commit }, payload) {
      commit('deleteMessage', payload);
    }
  },
  mutations: {
    getMessages(state, payload) {
      state.messages = payload;
    },
    addMessage(state, payload) {
      state.messages = payload;
    },
    deleteMessage(state, payload) {
      const messages = JSON.parse(localStorage.getItem('messages'));
      const found = messages.find(element => element.id == payload);
      messages.splice(messages.indexOf(found), 1);
      localStorage.setItem('messages', JSON.stringify(messages));
      state.messages = messages
    }
  },
  getters: {
    getCount(state) {
      return state.message;
    }
  },
  modules: {}
});