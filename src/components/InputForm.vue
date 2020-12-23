<template>
  <section>
    <div class="container">
      <form @submit.prevent="onSubmit">
        <h1 class="title">新增留言</h1>
        <div class="form-group">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" />
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
        <input type="submit" class="submit-btn" value="Submit" />
        <input type="reset" class="reset-btn" value="Reset" />
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "InputForm",
  data() {
    return {
      name: "",
      message: "",
    };
  },
  methods: {
    ...mapActions(["addMessageAction"]),
    onSubmit() {
      if (!localStorage.getItem("count")) {
        localStorage.setItem("count", 0);
      }
      const count = () => {
        const count = parseInt(localStorage.getItem("count")) + 1;
        localStorage.setItem("count", count);
        return count;
      };
      const dateTime = () => {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const dateTime = date + " " + time;
        return dateTime;
      };
      if (this.name !== "" && this.message !== "") {
        const messageInfo = {
          id: count(),
          name: this.name,
          time: dateTime(),
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
    ...mapState(["messages"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 1000px;
  margin: 0 auto;
  form {
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
    .submit-btn {
      font-size: 20px;
      background-color: #0b0;
      border: none;
      color: #fff;
      padding: 5px 10px;
      transition-duration: 0.1s;
      cursor: pointer;
      &:hover {
        background-color: #090;
      }
    }
    .reset-btn {
      margin-left: 20px;
      font-size: 20px;
      background-color: #777;
      border: none;
      color: #fff;
      padding: 5px 10px;
      transition-duration: 0.1s;
      cursor: pointer;
      &:hover {
        background-color: #333;
      }
    }
  }
}
</style>
