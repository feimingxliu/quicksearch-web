<script>
import { login, getIndices, search } from '../api/index'
import { ElDialog, ElForm, ElFormItem, ElButton, ElRow, ElCol, ElSelect, ElOption, ElInput, ElMessage } from 'element-plus'

export default {
  components: {
    ElDialog, ElForm, ElFormItem, ElButton, ElRow, ElCol, ElSelect, ElOption, ElInput,
  },
  data() {
    return {
      loginVisible: false,
      isLogin: false,
      loginForm: {
        username: '',
        password: '',
      },
      options: [],
      currentIndex: '',
      currentQuery: '',
      searchResults: {},
    }
  },
  mounted() {
    let username = window.sessionStorage.getItem('quicksearch_username')
    let password = window.sessionStorage.getItem('quicksearch_password')
    if (username && password) {
      this.loginVisible = false
      this.isLogin = true
    } else {
      this.loginVisible = true
      this.isLogin = false
    }
  },
  methods: {
    async login() {
      let res = await login(this.loginForm.username, this.loginForm.password)
      if (res.success) {
        ElMessage({
          message: 'Login Successful!',
          type: 'success',
        })
        window.sessionStorage.setItem('quicksearch_username', this.loginForm.username)
        window.sessionStorage.setItem('quicksearch_password', this.loginForm.password)
        this.loginVisible = false
        this.isLogin = true
      } else {
        ElMessage.error("username or password is incorrect!")
        this.loginVisible = true
      }
    },
    logout() {
      window.sessionStorage.removeItem('quicksearch_username')
      window.sessionStorage.removeItem('quicksearch_password')
      this.loginVisible = true
      this.isLogin = false
    },
    async fetchIndices(show) {
      if (show) {
        let indices = null
        try {
          indices = await getIndices()
        } catch (err) {
          ElMessage.error(err.message)
        }
        indices.push("*")
        this.options = indices
      }
    },
    async search() {
      console.log("Searching")
      let res
      try {
        res = await search(this.currentIndex, this.currentQuery)
      } catch (err) {
        ElMessage.error(err.message)
      }
      //console.log(res)
      this.searchResults = res
    },
    indexChange(index) {
      console.log(`current index: ${this.currentIndex}`)
    },
    queryChange(query) {
      console.log(`current query: ${this.currentQuery}`)
      this.search()
    }
  },
}
</script>

<template>

  <el-dialog v-model="loginVisible" :show-close="true" title="Login First!" width="30%" center>

    <el-form label-position="left" label-width="100px" :model="loginForm" style="max-width: 460px">
      <el-form-item label="Username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="login">Login</el-button>
      </span>
    </template>
  </el-dialog>

  <el-row :gutter="2">
    <el-col :span="6">
      <div class="grid-content ep-bg-purple">
        <el-select v-model="currentIndex" @visible-change="fetchIndices" @change="indexChange"
          placeholder="Please Select Index">
          <el-option v-for="item in options" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content ep-bg-purple-light">
        <el-input v-model="currentQuery" @change="queryChange" placeholder="Search QueryStringQuery" />
      </div>
    </el-col>
    <el-col :span="3">
      <div class="grid-content ep-bg-purple">
        <el-button type="primary" @click="search" :icon="Search">Search</el-button>
      </div>
    </el-col>
    <el-col :span="3">
      <div class="grid-content ep-bg-purple">
        <el-button v-if="!isLogin" @click="loginVisible = true">Login</el-button>
        <el-button v-if="isLogin" @click="logout">Logout</el-button>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="2">
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-light">
        <json-viewer :value="searchResults" expand-depth="2" copyable boxed></json-viewer>
      </div>
    </el-col>

  </el-row>

</template>

<style>
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>