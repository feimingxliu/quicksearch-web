<script>
import { getIndices } from '../api/index'

export default {
  data() {
    return {
      value: '',
      currentIndex: '',
      options: [],
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
    indexChange(index) {
      console.log(`current index: ${this.currentIndex}`)
    },
  },
}
</script>

<template>

  <el-select v-model="currentIndex" @visible-change="fetchIndices" @change="indexChange"
    placeholder="Please Select Index">
    <el-option v-for="item in options" :key="item" :label="item" :value="item" />
  </el-select>

</template>