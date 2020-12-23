<template>
  <section>
    <div class="container">
      <h1 class="title">我是留言板</h1>
      <div class="message-wrap" v-for="message in messages" :key="message.id">
        <input
          type="button"
          class="btn update-btn"
          value="MODIFY"
          v-if="certification === 'true'"
          @click="modifyMessage"
        />
        <input
          type="button"
          class="btn del-btn"
          value="DELETE"
          v-if="certification === 'true'"
          @click="deleteMessageAction(message.id)"
        />
        <div class="message-info">
          <div class="author-name">{{ message.name }}</div>
          <div class="release-time">{{ message.time }}</div>
        </div>
        <div class="message-content">{{ message.message }}</div>

        <div class="modify-wrap">
          <form @submit.prevent="onSubmit">
            <h1 class="title">新增留言</h1>
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="message.name"
              />
            </div>
            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea
                class="form-control"
                id="message"
                rows="5"
                v-model="message.message"
              ></textarea>
            </div>
            <input type="submit" class="submit-btn" value="Submit" />
            <input type="reset" class="reset-btn" value="Reset" />
          </form>
        </div>
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
    ...mapActions([
      "getMessagesAction",
      "deleteMessageAction",
      "updateMessageAction",
    ]),
    modifyMessage() {},
    onSubmit() {
      if (this.name !== "" && this.message !== "") {
        const messageInfo = {
          name: this.name,
          message: this.message,
        };
        this.addMessageAction(messageInfo);
        this.name = "";
        this.message = "";
      } else {
        alert("Field cannot be empty!");
      }
    },
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
    .btn {
      position: absolute;
      top: 0;
      width: 80px;
      border: none;
      color: #fff;
      padding: 5px 10px;
      transition-duration: 0.1s;
      cursor: pointer;
    }
    .update-btn {
      right: 80px;
      background-color: #0aa;
      &:hover {
        background-color: #077;
      }
    }
    .del-btn {
      right: 0;
      background-color: #c00;
      &:hover {
        background-color: #900;
      }
    }
    .message-info {
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
.modify-wrap {
}
</style>
