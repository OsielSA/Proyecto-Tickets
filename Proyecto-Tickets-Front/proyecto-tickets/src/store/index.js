import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tickets: [],
    personl: [],
    categorias: []
  },
  mutations: {
    SET_TICKETS(state, tickets){
      state.tickets = tickets;
    },
    SET_PERSONAL(state, personal){
      state.personal = personal;
    },
    SET_CATEGORIAS(state, categorias){
      state.categorias = categorias;
    }
  },
  actions: {
    setTickets({commit}){
      axios.get('http://localhost:3000/Tickets')
      .then( response => {
        commit('SET_TICKETS', response.data)
      })
    },
    setPersonal({commit}){
      axios.get('http://localhost:3000/Personas')
      .then( response => {
        commit('SET_PERSONAL', response.data)
      })
    },
    setCategorias({commit}){
      axios.get('http://localhost:3000/Categorias')
      .then( response => {
        commit('SET_CATEGORIAS', response.data)
      })
    },
    crearPersona({commit}, {params, onComplete, onError}){
      axios.post('http://localhost:3000/Personas', params)
      .then(onComplete)
      .catch(onError)
    }
  },
  modules: {
  }
})
