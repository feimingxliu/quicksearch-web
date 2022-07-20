<script>
import { getIndices, search } from '../api/index'

export default {
  data() {
    return {
      options: [],
      currentIndex: '',
      currentQuery: '',
      searchResults: {},
    }
  },
  methods: {
    async fetchIndices(show) {
      if (show) {
        let indices = await getIndices()
        indices.push("*")
        this.options = indices
      }
    },
    async search() {
      console.log("Searching")
      let res = await search(this.currentIndex, this.currentQuery)
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

  <el-row :gutter="10">
    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
      <div class="grid-content ep-bg-purple">
        <el-select v-model="currentIndex" @visible-change="fetchIndices" @change="indexChange"
          placeholder="Please Select Index">
          <el-option v-for="item in options" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="grid-content ep-bg-purple-light">
        <el-input v-model="currentQuery" @change="queryChange" placeholder="Search QueryStringQuery" />
      </div>
    </el-col>
    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
      <div class="grid-content ep-bg-purple">
        <el-button type="primary" @click="search" :icon="Search">Search</el-button>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="10">
    <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="18">
      <div class="grid-content ep-bg-purple-light">
        <json-viewer :value="searchResults" copyable boxed></json-viewer>
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