<template>
<div class="row">
<div class= "col-lg-6 col-md-6 col-sm-6">
  <div class="container">
    <div @click="active = !active">
      <div class="form-group disabled">
        <input
          type="text"
          class="form-control disbled"
          placeholder="Add or Search.."
          readonly
        />
      </div>
    </div>
    <form v-show="active">
      <div class="well">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="String to add"
            v-model="name"
          />
          <span class="input-group-text">
            <i class="fa-solid fa-xmark"></i>
            <i class="fa-solid fa-circle-plus" @click="AddCustomer"></i>
          </span>
        </div>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="string to search"
            v-model="searchQuery"
          />
          <span class="input-group-text">
            <i class="fa-solid fa-xmark"></i>
            <i class="fa-solid fa-circle-plus search"></i>
          </span>
        </div>
      </div>
    </form>
  </div>
  <div class="about container">
    <div>
      <div v-for="(list, index) in sortedList" :key="index">
        <div>
          <div class="d-flex justify-content-start">{{ list.name }}</div>
          <div class="d-flex justify-content-start">
            <i v-show="isMatchedItemIndex(index)" class="fa-solid fa-check">  
            </i> 
            <p class="ok" v-show="isMatchedItemIndex(index)">Exact match,</p># {{ list.id }}
          </div>
        </div>
        <div
          @mouseenter="setHoveredItemIndex(index)"
          @mouseleave="setHoveredItemIndex('')"
          class="d-flex justify-content-end time"
        >
          {{ list.time }}
          <i v-show="isHoveredItem(index)" class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  </div>
  </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
      <div class="value d-flex justify-content-start">
      <button class="btn" @click="setSortCategory('value')">Sort by value </button>
      </div>
      <div class="date  d-flex justify-content-start">
      <button class="btn" @click="setSortCategory('time')">Sort by time</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, Ref } from "vue";
import { useStore } from "../store";
import { State, list } from "../store/modules/list";

import AlertMessage from "./AlertMessage.vue";

type SortCategory = "value" | "time";

export default defineComponent({
  data() {
    return {
      active: false,
      remove: false,
    };
  },
  setup() {
    const store = useStore();
    const lists = computed<list[]>(() => store.state.list.item);
    const name = ref("");
    const time = ref("");
    const searchQuery = ref("");
    const hoveredItemIndex = ref("");
    const matchedItemIndex = ref("");
    const sortBy: Ref<SortCategory> = ref("value");
    //console.log(store)

    const AddCustomer = () => {
      if (name.value === "") {
        alert("you must fill all fields");
        return;
      }

      const item: list = {
        name: name.value,
        time: "9 minutes ago",
      };
      name.value = "";
      store.dispatch("list/AddCustomers", item);
    };

    const sortedList = computed<list[]>(() => {
      if (sortBy.value === "value") {
        return lists.value.sort((itemA: list, itemB: list) => {
        if(Number(itemA.id) < Number(itemB.id)) return -1;
        if(Number(itemA.id) > Number(itemB.id)) return 1;
        return 0;
      });
      }

      return lists.value.sort((itemA: list, itemB: list) => {
        if(itemA.time < itemB.time) return -1;
        if(itemA.time > itemB.time) return 1;
        return 0;
      });
    });

    const setHoveredItemIndex = (index = "") => {
      hoveredItemIndex.value = index;
    };

    const isHoveredItem = (name: string): boolean => {
      return hoveredItemIndex.value === name;
    };

    const saveMatchedItem = (searchQuery: string) => {
      const itemIndex = lists.value.findIndex((item) => item.name.toLowerCase() === searchQuery.toLowerCase());
      matchedItemIndex.value = String(itemIndex);
    };

    const isMatchedItemIndex = (index: number): boolean => {
      return matchedItemIndex.value === String(index);
    };

    const setSortCategory = (category: SortCategory) => {
      console.log('setting by: ', category)
      sortBy.value = category;
    };

    watch(() => searchQuery.value, ( searchString ) => {
      saveMatchedItem(searchString);
    })

   
    return {
      lists,
      name,
      AddCustomer,
      sortedList,
      searchQuery,
      setHoveredItemIndex,
      isHoveredItem,
      isMatchedItemIndex,
      setSortCategory
    };
  },
});
</script>
<style>
body{
 background-color: #DEE2E6 !important;
}
.disabled > input {
  border: 1px solid #fff;
  padding: 0.6em;
}
.input-group {
  margin: 2em 0em 2em 0em !important;
}
input {
  background-color: #f1f3f5 !important;
  border: 1px solid #f1f3f5 !important;
  padding: 0.6em !important;
}
span {
  background-color: #f1f3f5 !important;
  border: 1px solid #f1f3f5 !important;
  padding: 0.6em !important;
}
.fa-circle-plus {
  margin-left: 1em;
  color: #15aabf;
  font-size: 1.3em;
}
.fa-xmark {
  color: #fa5252;
  font-size: 1.3em;
}
.about {
  margin-top: 3em;
  font-size: 15px;
}
.about>div>div{
background: #FFFFFF00 0% 0% no-repeat padding-box;
box-shadow: 0px 0px 40px #f4f4f4 !important;
border-radius: 6px;
padding: 1em
}
.search {
  color: #adb5bd !important;
}
.time {
  position: relative;
  bottom: 2em;
}
.fa-trash-can {
  color: #fa5252;
  position: relative;
  top: 0.3em;
  margin-left: 2em;
}
.ok{
  font-size: 11px;
  color: #12B886;
  position: relative;
  top: 0.3em;
}
.fa-check{
  color: #12B886;
  position: relative;
  top: 0.2em;
  right: 1em
}
.value{
  position: relative;
  margin-top: 9em;
  margin-bottom: 2em
}
.value>.btn, .date>.btn{
  background-color: #fff
}
</style>