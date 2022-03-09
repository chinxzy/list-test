<template>
  <div class="container">
    <h1 class="page-header">Add Customer</h1>
    <form @submit.prevent="AddCustomer">
      <div class="well">
        <h4>Customer Info</h4>
        <div class="form-group">
          <label>First Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            v-model="name"
          />
        </div>
        
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { list } from "../store/modules/list";
import { useStore } from "../store";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const store = useStore();
    console.log(store);
    const name = ref("");

    const AddCustomer = async () => {
      if (
        name.value === ""
      ) {
        alert("you must fill all fields");
        return;
      }

      const item: list = {
        name: name.value,
      };
      name.value = "";
      await store.dispatch("customers/AddCustomers", item).then(()=>{
      useRouter().push({path: "/"})});
    };
    
    return {
      AddCustomer,
      name,
    };
  },
});
</script>
