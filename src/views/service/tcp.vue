<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="!isEdit">Create Tcp Service</span>
          <span v-if="isEdit">Update Tcp Service</span>
        </div>
        <div style="margin-bottom: 50px">
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="Service Name" :required="true">
              <el-input v-model="form.service_name" :disabled="isEdit" />
            </el-form-item>
            <el-form-item label="Service Desc">
              <el-input v-model="form.service_desc" />
            </el-form-item>
            <el-form-item label="Port" :required="true">
              <el-input v-model.number="form.port" :disabled="isEdit" />
            </el-form-item>
            <el-form-item label="Enable Auth">
              <el-switch
                v-model="form.open_auth"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="Ip White List">
              <el-input
                v-model="form.white_list"
                type="textarea"
                placeholder="Please input ip white list"
                autosize=""
              />
            </el-form-item>
            <el-form-item label="Ip Black List">
              <el-input
                v-model="form.black_list"
                type="textarea"
                placeholder="Please input ip black list"
                autosize=""
              />
            </el-form-item>
            <el-form-item label="White Host Name">
              <el-input
                v-model="form.white_host_name"
                type="textarea"
                placeholder="Please input white host name"
                autosize=""
              />
            </el-form-item>
            <el-form-item label="Service Host Flow Limit">
              <el-input v-model.number="form.service_host_flow_limit" />
            </el-form-item>
            <el-form-item label="Client Ip Flow Limit">
              <el-input v-model.number="form.client_ip_flow_limit" />
            </el-form-item>
            <el-form-item label="Round Type">
              <el-radio-group v-model="form.round_type">
                <el-radio :label="0">random</el-radio>
                <el-radio :label="1">round robin</el-radio>
                <el-radio :label="2">weight round robin</el-radio>
                <el-radio :label="3">consistent hash</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Ip List" :required="true">
              <el-input
                v-model="form.ip_list"
                type="textarea"
                placeholder="Please input ip list"
                autosize=""
              />
            </el-form-item>
            <el-form-item label="Weight List" :required="true">
              <el-input
                v-model="form.weight_list"
                type="textarea"
                placeholder="Please input weight list"
                autosize=""
              />
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                :disabled="isSubmit"
                @click="handleSubmit"
              >Submit</el-button>
              <el-button
                type="danger"
                :disabled="isCancel"
                @click="handleCancel"
              >Cancel</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { createTcpService, showService, updateTcpService } from '@/api/service'
export default {
  name: 'TcpService',
  data() {
    return {
      isEdit: false,
      isSubmit: false,
      isCancel: false,
      service_id: 0,
      form: {
        black_list: '',
        client_ip_flow_limit: '',
        forbid_list: '',
        ip_list: '',
        open_auth: 1,
        port: '',
        round_type: 0,
        service_desc: '',
        service_host_flow_limit: '',
        service_name: '',
        weight_list: '',
        white_host_name: '',
        white_list: ''
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.isEdit = true
      this.service_id = id
      this.fetchFormData(id)
    }
  },
  methods: {
    fetchFormData(id) {
      showService(id).then((response) => {
        this.form.black_list = response.data.access_control.black_list.replace(
          /,/g,
          '\n'
        )
        this.form.client_ip_flow_limit =
          response.data.access_control.client_ip_flow_limit
        this.form.ip_list = response.data.load_balance.ip_list.replace(
          /,/g,
          '\n'
        )
        this.form.open_auth = response.data.access_control.open_auth
        this.form.port = response.data.tcp_rule.port
        this.form.round_type = response.data.load_balance.round_type
        this.form.service_desc = response.data.info.service_desc
        this.form.service_host_flow_limit =
          response.data.access_control.service_host_flow_limit
        this.form.service_name = response.data.info.service_name
        this.form.weight_list = response.data.load_balance.weight_list.replace(
          /,/g,
          '\n'
        )
        this.form.white_host_name = response.data.access_control.white_host_name.replace(
          /,/g,
          '\n'
        )
        this.form.white_list = response.data.access_control.white_list.replace(
          /,/g,
          '\n'
        )
      })
    },
    handleSubmit() {
      this.isSubmit = true
      const body = Object.assign({}, this.form)

      body.white_list = body.white_list.replace(/\n/g, ',')
      body.black_list = body.black_list.replace(/\n/g, ',')
      body.white_host_name = body.white_host_name.replace(/\n/g, ',')
      body.ip_list = body.ip_list.replace(/\n/g, ',')
      body.weight_list = body.weight_list.replace(/\n/g, ',')

      body.port = body.port === '' ? 0 : body.port
      body.service_host_flow_limit =
        body.service_host_flow_limit === '' ? 0 : body.service_host_flow_limit
      body.client_ip_flow_limit =
        body.client_ip_flow_limit === '' ? 0 : body.client_ip_flow_limit

      console.log(body)
      if (this.isEdit) {
        updateTcpService(this.service_id, body)
          .then((response) => {
            this.isSubmit = false
            this.fetchFormData(this.service_id)
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
          .catch(() => {
            this.isSubmit = false
          })
      } else {
        createTcpService(body)
          .then((response) => {
            this.isSubmit = false
            this.resetFormData()
            this.$notify({
              title: 'Success',
              message: 'Create Successfully',
              type: 'success',
              duration: 2000
            })
          })
          .catch(() => {
            this.isSubmit = false
          })
      }
    },
    handleCancel() {
      this.isCancel = true
      this.resetFormData()
      this.isCancel = false
    },
    resetFormData() {
      this.form = {
        black_list: '',
        client_ip_flow_limit: '',
        forbid_list: '',
        ip_list: '',
        open_auth: 1,
        port: '',
        round_type: 0,
        service_desc: '',
        service_host_flow_limit: '',
        service_name: '',
        weight_list: '',
        white_host_name: '',
        white_list: ''
      }
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item {
  min-height: 100px;
}
</style>
