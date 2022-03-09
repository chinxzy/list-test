<template>
  <div class="about container">
    <div>
      <table class="table table-striped">
        <tbody>
          <tr v-for="list in lists" :key="list.id">
            <td>
              <div class="d-flex justify-content-start">{{ list.name }}</div>
              <div class="d-flex justify-content-start"># {{ list.id }}</div>
            </td>
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
