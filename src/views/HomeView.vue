<template>
  <customer-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomerView from "../components/CustomerView.vue";
import { useStore } from "../store/index";

export default defineComponent({
  components: {
    CustomerView,
  },
  setup() {
    const store = useStore();
    console.log(store);
    store.dispatch("list/getCustomers");
  },
})
</script>

