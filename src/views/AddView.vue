<template>
  <AddCustomer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddCustomer from "../components/AddCustomer.vue";
import { useStore } from "../store/index";

export default defineComponent({
  components: {
    AddCustomer,
  },
  setup() {
    const store = useStore();
  },
});
</script>

