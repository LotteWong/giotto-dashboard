<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="!isEdit">Create App</span>
          <span v-if="isEdit">Update App</span>
        </div>
        <div style="margin-bottom: 50px">
          <el-form ref="form" :model="form">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="应用简要信息/App Info" name="1">
                <el-form-item label="App Id" :required="true" label-width="200px">
                  <el-input v-model="form.app_id" :disabled="isEdit" placeholder="Please input app id" />
                </el-form-item>
                <el-form-item label="App Name" :required="true" label-width="200px">
                  <el-input v-model="form.app_name" :disabled="isEdit" placeholder="Please input app name" />
                </el-form-item>
                <el-form-item label="Secret" label-width="200px">
                  <el-input v-model.number="form.secret" placeholder="Please input secret" />
                </el-form-item>
              </el-collapse-item>

              <el-collapse-item title="权限认证配置/Ip Auth" name="2">
                <el-form-item label="White Ips" label-width="200px">
                  <el-input
                    v-model="form.white_ips"
                    type="textarea"
                    placeholder="Please input white ips"
                    autosize=""
                  />
                </el-form-item>
                <el-form-item label="Black Ips" label-width="200px">
                  <el-input
                    v-model="form.black_ips"
                    type="textarea"
                    placeholder="Please input black ips"
                    autosize=""
                  />
                </el-form-item>
              </el-collapse-item>

              <el-collapse-item title="流量控制配置/Rate Limit" name="3">
                <el-form-item label="App Qpd Limit" label-width="200px">
                  <el-input v-model.number="form.qpd" placeholder="Please input app qpd limit" />
                </el-form-item>
                <el-form-item label="App Qps Limit" label-width="200px">
                  <el-input v-model.number="form.qps" placeholder="Please input app qps limit" />
                </el-form-item>
              </el-collapse-item>
            </el-collapse>

            <el-form-item style="margin-top: 30px;text-align:center">
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
import { createApp, showApp, updateApp } from '@/api/app'
export default {
  name: 'TcpService',
  data() {
    return {
      isEdit: false,
      isSubmit: false,
      isCancel: false,
      activeNames: ['1', '2', '3'],
      app_id: 0,
      form: {
        app_id: '',
        app_name: '',
        qpd: '',
        qps: '',
        secret: '',
        white_ips: '',
        black_ips: ''
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.isEdit = true
      this.app_id = id
      this.fetchFormData(id)
    }
  },
  methods: {
    fetchFormData(id) {
      showApp(id).then((response) => {
        this.form.app_id = response.data.app_id
        this.form.app_name = response.data.app_name
        this.form.qpd = response.data.qpd
        this.form.qps = response.data.qps
        this.form.secret = response.data.secret
        this.form.white_ips = response.data.white_ips.replace(
          /,/g,
          '\n'
        )
        this.form.black_ips = response.data.black_ips.replace(
          /,/g,
          '\n'
        )
      })
    },
    handleSubmit() {
      this.isSubmit = true
      const body = Object.assign({}, this.form)

      body.white_ips = body.white_ips.replace(/\n/g, ',')
      body.black_ips = body.black_ips.replace(/\n/g, ',')

      body.qpd = body.qpd === '' ? 0 : body.qpd
      body.qps = body.qps === '' ? 0 : body.qps

      console.log(body)
      if (this.isEdit) {
        updateApp(this.app_id, body)
          .then((response) => {
            this.isSubmit = false
            this.fetchFormData(this.app_id)
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
        createApp(body)
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
        app_id: '',
        app_name: '',
        qpd: '',
        qps: '',
        secret: '',
        white_ips: '',
        black_ips: ''
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
