<template>
  <div class="login">
    <div class="con">
      <h1 class="dl">登录</h1>
      <el-input class="input" clearable></el-input>
      <el-input class="input" clearable show-password></el-input>
      <div class="btn-box">
        <el-button type="primary" @click="login" class="dlan">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push("/index");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303d60);
}
.con {
  width: 400px;
  background: cyan;
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.dl {
  text-align: center;
  font-size: 30px;
  line-height: 60px;
}
.input {
  margin-top: 20px;
}
.dlan {
  width: 400px;
  margin-top: 20px;
}
.btn-box{
  text-align: center;
}
</style>