<template>
  <section>
    <div class="container">
      <form class="add-form" @submit.prevent="onSubmit">
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
        <input type="submit" class="btn submit-btn" value="Submit" />
        <input type="reset" class="btn reset-btn" value="Reset" />
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 1000px;
  margin: 0 auto;
  .add-form {
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
</style>
