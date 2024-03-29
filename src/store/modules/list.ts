import axios from "axios";
import { apiData } from "../../services/axiosService";
import { Module, Commit } from "vuex";
import { State as Rootstate } from "../index";
import { MutationTypes } from "../types";
import { ActionTypes } from "../types";
import { RouterLink, useRouter } from "vue-router";

export interface list {
  id?: number;
  name: string;
  time: string;
}

export interface State {
  item: list[];
}

const url = apiData.url_base;
const key = apiData.api_key;
const router = useRouter;
const customers: Module<State, Rootstate> = {
  namespaced: true,

  state: () => ({
    item: [],
  }),

  mutations: {
    [MutationTypes.SetItems](state: State, item: list[]) {
      state.item = item;
    },
    [MutationTypes.AddItems](state: State, item: list) {
      state.item.unshift(item);
    },
  },

  actions: {
    async getCustomers({ commit }: { commit: Commit }) {
      try {
        const { data } = await axios.get("https://my-json-server.typicode.com/chinxzy/lists/list");
        commit(MutationTypes.SetItems, data);
        
      } catch (e) {
        console.log("error: ", e);
      }
    },
    async AddCustomers({ commit }: { commit: Commit }, payload: list[]) {
      try {
        const { data } = await axios.post(
          "https://my-json-server.typicode.com/chinxzy/lists/list",
          payload
        );
        commit(MutationTypes.AddItems, data);
      } catch (e) {
        console.log("error: ", e);
      }
    },
  },
};

export default customers;
