<template>
  <div class="about container">
    <div>
      <AlertMessage v-if="alert" :message="alert" />
      <h1 style="margin-bottom: 1em">Manage Customers</h1>
      <table class="table table-striped">
        <thead>
        </thead>
        <tbody>
          <tr v-for="list in lists" :key="list.id">
            <td>{{ customer.name }}</td>
            <td>#{{ customer.id }}</td>
            <td><button class="btn">view</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
import { State, list } from "../store/modules/list";
import AlertMessage from "./AlertMessage.vue";
export default defineComponent({
  components: { AlertMessage },
  setup() {
    const store = useStore();
    const lists = computed<list[]>(() => store.state.list.item);

    return { lists };
  },
});
</script>
