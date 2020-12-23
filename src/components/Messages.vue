<template>
  <section>
    <div class="container">
      <h1 class="title">我是留言板</h1>
      <div class="message-wrap" v-for="message in messages" :key="message.id">
        <input
          type="button"
          class="del-btn"
          value="DELETE"
          v-if="certification === 'true'"
          @click="deleteMessageAction(message.id)"
        />
        <div class="message-information">
          <div class="author-name">{{ message.name }}</div>
          <div class="release-time">{{ message.time }}</div>
        </div>
        <div class="message-content">{{ message.message }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { onMounted } from "vue";
export default {
  name: "Messages",
  props: ["certification"],
  methods: {
    ...mapActions(["getMessagesAction", "deleteMessageAction"]),
  },
  computed: {
    ...mapGetters(["messages"]),
  },
  mounted() {
    this.getMessagesAction();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 1000px;
  margin: 0 auto;
  .title {
    font-size: 35px;
    margin: 0 0 30px;
  }
  .message-wrap {
    position: relative;
    margin-bottom: 30px;
    padding: 30px;
    background: #abc;
    .del-btn {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #c00;
      border: none;
      color: #fff;
      padding: 5px 10px;
      transition-duration: 0.1s;
      cursor: pointer;
      &:hover {
        background-color: #900;
      }
    }
    .message-information {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .author-name {
        font-weight: 600;
      }
      .release-time {
        margin-left: 15px;
      }
    }
    .message-content {
      word-wrap: break-word;
    }
  }
}
</style>
