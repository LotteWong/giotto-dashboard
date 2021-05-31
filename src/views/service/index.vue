<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyword"
        placeholder="Service Name / Service Desc"
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
      <router-link :to="'/service/http'">
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-edit"
        >
          Create Http Service
        </el-button>
      </router-link>
      <!-- <router-link :to="'/service/tcp'">
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-edit"
        >
          Create Tcp Service
        </el-button>
      </router-link> -->
      <!-- <router-link :to="'/service/grpc'">
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-edit"
        >
          Create Grpc Service
        </el-button>
      </router-link> -->
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
      <el-table-column label="Service Name" min-width="100px">
        <template slot-scope="{ row }">
          <span>{{ row.service_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Service Desc" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.service_desc }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Service Type" min-width="70px">
        <template slot-scope="{ row }">
          <span>{{ row.service_type | serviceTypeFilter }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Address" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.service_addr }}</span>
        </template>
      </el-table-column>
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
      <!-- <el-table-column label="Total Node" min-width="30px">
        <template slot-scope="{ row }">
          <span>{{ row.total_node }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <router-link :to="'/flow/service/' + row.id">
            <el-button type="success" size="mini"> Monitor </el-button>
          </router-link>
          <router-link
            v-if="row.service_type === 0"
            :to="'/service/http/' + row.id"
          >
            <el-button type="primary" size="mini"> Edit </el-button>
          </router-link>
          <router-link
            v-if="row.service_type === 1"
            :to="'/service/tcp/' + row.id"
          >
            <el-button type="primary" size="mini"> Edit </el-button>
          </router-link>
          <router-link
            v-if="row.service_type === 2"
            :to="'/service/grpc/' + row.id"
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
import { listServices, deleteService } from '@/api/service'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const serviceTypeOptions = [
  { key: '0', display_name: 'Http' },
  { key: '1', display_name: 'Tcp' },
  { key: '2', display_name: 'Grpc' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const serviceTypeKeyValue = serviceTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ServiceList',
  components: { Pagination },
  directives: { waves },
  filters: {
    serviceTypeFilter(type) {
      return serviceTypeKeyValue[type]
    }
  },
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
      listServices(this.listQuery).then((response) => {
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
          deleteService(row.id).then((response) => {
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
