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
          @click="modifyMessage(message.id, message.name, message.message)"
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
      </div>
      <div class="modal" :style="displayModal">
        <div class="modify-wrap">
          <form class="update-form" @submit.prevent="onSubmit">
            <input
              type="button"
              class="btn cancel-btn"
              value="X"
              @click="cancelModal"
            />
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="name"
              />
            </div>
            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea
                class="form-control"
                id="message"
                rows="5"
                v-model="message"
              ></textarea>
            </div>
            <input type="submit" class="btn submit-btn" value="Submit" />
            <input
              type="reset"
              class="btn reset-btn"
              value="Reset"
              @click="resetInput"
            />
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
  data() {
    return {
      id: "",
      name: "",
      message: "",
      displayModal: {
        display: "none",
      },
    };
  },
  methods: {
    ...mapActions([
      "getMessagesAction",
      "updateMessageAction",
      "deleteMessageAction",
    ]),
    modifyMessage(id, name, message) {
      this.id = id;
      this.name = name;
      this.message = message;
      this.displayModal = { display: "block" };
    },
    cancelModal() {
      this.displayModal = { display: "none" };
    },
    resetInput() {
      this.name = "";
      this.message = "";
    },
    onSubmit() {
      if (this.name !== "" && this.message !== "") {
        const messageInfo = {
          id: this.id,
          name: this.name,
          message: this.message,
        };
        this.updateMessageAction(messageInfo);
        alert("Modify the message successfully!");
        this.displayModal = { display: "none" };
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
      background: #0aa;
      &:hover {
        background: #077;
      }
    }
    .del-btn {
      right: 0;
      background: #c00;
      &:hover {
        background: #900;
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
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.4);
  .modify-wrap {
    background: #fefefe;
    margin: 15% auto 0;
    padding: 40px;
    border: 1px solid #888;
    box-sizing: border-box;
    width: 800px;
    .update-form {
      position: relative;
      .title {
        font-size: 30px;
        margin: 0 0 10px;
      }
      .form-group {
        margin-bottom: 20px;
        label {
          font-size: 20px;
          display: block;
        }
        .form-control {
          width: 100%;
          font-size: 20px;
          display: block;
          padding: 10px;
          box-sizing: border-box;
        }
        textarea {
          resize: none;
        }
      }
      .btn {
        font-size: 20px;
        border: none;
        color: #fff;
        padding: 5px 10px;
        transition-duration: 0.1s;
        cursor: pointer;
      }
      .cancel-btn {
        position: absolute;
        top: -20px;
        right: -20px;
        background: #c00;
        &:hover {
          background: #900;
        }
      }
      .submit-btn {
        background: #0b0;
        &:hover {
          background: #090;
        }
      }
      .reset-btn {
        margin-left: 20px;
        background: #777;
        cursor: pointer;
        &:hover {
          background: #333;
        }
      }
    }
  }
}
</style>
