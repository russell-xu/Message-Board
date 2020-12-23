<template>
  <div class="management">
    <Messages certification="true" />
  </div>
</template>

<script>
// @ is an alias to /src
import Messages from "@/components/Messages.vue";
export default {
  name: "Management",
  components: {
    Messages,
  },
};
</script>

<style scoped lang="scss">
.management {
  padding: 60px 0;
}
</style>