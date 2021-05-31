<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyword"
        placeholder="App Id / App Name"
        style="width: 250px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
      <router-link :to="'/app'">
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-edit"
        >
          Create App
        </el-button>
      </router-link>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" align="center" width="50">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name" min-width="100px">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="App Id" min-width="100px">
        <template slot-scope="{ row }">
          <span>{{ row.app_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Secret" min-width="200px">
        <template slot-scope="{ row }">
          <span>{{ row.secret }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Qps Limit" min-width="50px">
        <template slot-scope="{ row }">
          <span>{{ row.qps }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Qpd Limit" min-width="50px">
        <template slot-scope="{ row }">
          <span>{{ row.qpd }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Qps" min-width="50px">
        <template slot-scope="{ row }">
          <span>{{ row.real_qps }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Qpd" min-width="50px">
        <template slot-scope="{ row }">
          <span>{{ row.real_qpd }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="White Ips" min-width="100px">
        <template slot-scope="{ row }">
          <span>{{ row.white_ips }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Black Ips" min-width="100px">
        <template slot-scope="{ row }">
          <span>{{ row.black_ips }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <router-link :to="'/flow/app/' + row.id">
            <el-button type="success" size="mini"> Monitor </el-button>
          </router-link>
          <router-link
            :to="'/app/' + row.id"
          >
            <el-button type="primary" size="mini"> Edit </el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listApps, deleteApp } from '@/api/app'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AppList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        keyword: '',
        page_index: 1,
        page_size: 20
      },
      temp: {
        id: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listApps(this.listQuery).then((response) => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page_index = 1
      this.getList()
    },
    handleDelete(row, index) {
      this.$confirm('The record will be deleted. Are you sure?', 'Attention', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          deleteApp(row.id).then((response) => {
            this.getList()

            this.$notify({
              title: 'Success',
              message: 'Delete Successfully',
              type: 'success',
              duration: 2000
            })
          })
        })
        .catch(() => {
          this.$notify({
            title: 'Success',
            message: 'Delete is canceled',
            type: 'info',
            duration: 2000
          })
        })
    }
  }
}
</script>
