import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tickets: [],
    ticket: {},
    personal: [],
    persona: {},
    categorias: []
  },
  mutations: {
    SET_TICKETS(state, tickets){
      state.tickets = tickets;
    },
    SET_TICKET(state, ticket){
      state.ticket = ticket;
    },
    SET_PERSONAL(state, personal){
      state.personal = personal;
    },
    SET_PERSONA(state, persona) {
      state.persona = persona;
    },
    SET_CATEGORIAS(state, categorias){
      state.categorias = categorias;
    },
    
  },
  actions: {
    //TICKETS
    setTickets({commit}){
      axios.get('http://localhost:3000/Tickets')
      .then( response => {
        commit('SET_TICKETS', response.data)
      })
    },
    crearTicket({commit}, {params, onComplete, onError}){
      console.log(params)
      axios.post('http://localhost:3000/Tickets', params)
      .then(onComplete)
      .catch(onError)
    },
    obtenerTicket({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/Tickets/${id}`)
      .then( response => {
        commit('SET_TICKET', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    editarTicket({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/Tickets/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    editarTicketEstatus({commit}, {id, params, onComplete, onError} ) {

      axios.put(`http://localhost:3000/TicketEstatus/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarTicket({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Tickets/${id}`)
      .then(onComplete)
      .catch(onError)
    },

    //PERSONAL
    setPersonal({commit}){
      axios.get('http://localhost:3000/Personas')
      .then( response => {
        commit('SET_PERSONAL', response.data)
      })
    },
    crearPersona({commit}, {params, onComplete, onError}){
      axios.post('http://localhost:3000/Personas', params)
      .then(onComplete)
      .catch(onError)
    },
    obtenerPersona({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/Personas/${id}`)
      .then( response => {
        commit('SET_PERSONA', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    editarPersona({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/Personas/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarPersona({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Personas/${id}`)
      .then(onComplete)
      .catch(onError)
    },

    //CATEGORIAS
    setCategorias({commit}){
      axios.get('http://localhost:3000/Categorias')
      .then( response => {
        commit('SET_CATEGORIAS', response.data)
      });
    },
    crearCategoria({commit}, {params, onComplete, onError}){
      axios.post('http://localhost:3000/Categorias', params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarCategoria({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Categorias/${id}`)
      .then(onComplete)
      .catch(onError)
    },
  },
  modules: {
  }
})
