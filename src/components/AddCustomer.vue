<template>
  <div class="container">
    <div @click="active = !active">
      <div class="form-group disabled">
        <input type="text" class="form-control disbled" placeholder="Add or Search.." readonly/>
      </div>
    </div>
    <form @submit.prevent="AddCustomer" v-show="active">
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
              <i class="fa-solid fa-circle-plus" type="submit"></i>
            </span>
        </div>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="string to search" />
          <span class="input-group-text">
            <i class="fa-solid fa-xmark"></i>
            <i class="fa-solid fa-circle-plus"></i>
            </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { list } from "../store/modules/list";
import { useStore } from "../store";
import { useRouter } from "vue-router";
export default defineComponent({
  data() {
    return {
      active: false,
    };
  },
  setup() {
    const store = useStore();
    console.log(store);
    const name = ref("");

    const AddCustomer = () => {
      if (name.value === "") {
        alert("you must fill all fields");
        return;
      }

      const item: list = {
        name: name.value,
      };
      name.value = "";
      store.dispatch("list/AddCustomers", item);
    };

    return {
      AddCustomer,
      name,
    };
  },
});
</script>

<style>


.disabled>input{
  border: 1px solid #fff;
  padding: 0.6em;
}
.input-group{
  margin: 2em 0em 2em 0em !important;
}
input{
  background-color: #F1F3F5 !important;
  border: 1px solid #F1F3F5 !important;
  padding: 0.6em !important;
}
span{
  background-color: #F1F3F5 !important;
  border: 1px solid #F1F3F5 !important;
  padding: 0.6em !important;
}
.fa-circle-plus{
  margin-left: 1em;
  color: #15AABF;
  font-size: 1.3em
}
.fa-xmark{
  color: #FA5252;
  font-size: 1.3em
}

</style>