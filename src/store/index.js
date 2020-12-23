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
          const payload = response.data;
          commit('getMessages', payload);
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    addMessageAction({ commit }, payload) {
      axios.post('http://localhost:5000/addMessage', payload)
        .then(function (response) {
          const messages = response.data;
          commit('addMessage', messages);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteMessageAction({ commit }, payload) {
      axios.post('http://localhost:5000/deleteMessage', { id: payload })
        .then(function (response) {
          const messages = response.data;
          commit('deleteMessage', messages);
        })
        .catch(function (error) {
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