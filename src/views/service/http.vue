<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Create Http Service</span>
        </div>
        <div style="margin-bottom: 50px">
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="Service Name" :required="true">
              <el-input v-model="form.service_name" />
            </el-form-item>
            <el-form-item label="Service Desc">
              <el-input v-model="form.service_desc" />
            </el-form-item>
            <el-form-item label="Rule" :required="true">
              <el-input
                v-model="form.rule"
                placeholder="Please input rule"
                class="input-with-select"
              >
                <el-select
                  slot="prepend"
                  v-model="form.rule_type"
                  placeholder="Please select rule type"
                  style="width: 100px"
                >
                  <el-option label="Prefix" :value="0" />
                  <el-option label="Domain" :value="1" />
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="Enable Https">
              <el-switch
                v-model="form.need_https"
                :active-value="1"
                inactive-value="0"
              />
              <span style="color: #606266; font-weight: 700; margin-left: 50px">
                Enable Strip Uri
              </span>
              <el-switch
                v-model="form.need_strip_uri"
                :active-value="1"
                :inactive-value="0"
              />
              <span style="color: #606266; font-weight: 700; margin-left: 50px">
                Enable Websocket
              </span>
              <el-switch
                v-model="form.need_websocket"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="Url Rewrite">
              <el-input
                v-model="form.url_rewrite"
                type="textarea"
                placeholder="Please input url rewrite"
                autosize=""
              />
            </el-form-item>
            <el-form-item label="Header Transform">
              <el-input
                v-model="form.header_transform"
                type="textarea"
                placeholder="Please input header transform"
                autosize=""
              />
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
            <el-form-item label="Service Host Flow Limit">
              <el-input
                v-model.number="form.service_host_flow_limit"
              />
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
            <el-form-item label="Upstream Connect Timeout">
              <el-input
                v-model.number="form.upstream_connect_timeout"
              />
            </el-form-item>
            <el-form-item label="Upstream Header Timeout">
              <el-input
                v-model.number="form.upstream_header_timeout"
              />
            </el-form-item>
            <el-form-item label="Upstream Idle Timeout">
              <el-input v-model.number="form.upstream_idle_timeout" />
            </el-form-item>
            <el-form-item label="Upstream Max Idle">
              <el-input v-model.number="form.upstream_max_idle" />
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
import { createHttpService } from '@/api/service'
export default {
  name: 'CreateHttpService',
  data() {
    return {
      isSubmit: false,
      isCancel: false,
      form: {
        black_list: '',
        client_ip_flow_limit: undefined,
        header_transform: '',
        ip_list: '',
        need_https: 0,
        need_strip_uri: 0,
        need_websocket: 0,
        open_auth: 1,
        round_type: 0,
        rule: '',
        rule_type: 0,
        service_desc: '',
        service_host_flow_limit: '',
        service_name: '',
        upstream_connect_timeout: '',
        upstream_header_timeout: '',
        upstream_idle_timeout: '',
        upstream_max_idle: '',
        url_rewrite: '',
        weight_list: '',
        white_list: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      this.isSubmit = true
      const body = Object.assign({}, this.form)

      body.url_rewrite = body.url_rewrite.replace(/\n/g, ',')
      body.header_transform = body.header_transform.replace(/\n/g, ',')
      body.white_list = body.white_list.replace(/\n/g, ',')
      body.black_list = body.black_list.replace(/\n/g, ',')
      body.ip_list = body.ip_list.replace(/\n/g, ',')
      body.weight_list = body.weight_list.replace(/\n/g, ',')

      body.service_host_flow_limit =
        body.service_host_flow_limit === '' ? 0 : body.service_host_flow_limit
      body.client_ip_flow_limit =
        body.client_ip_flow_limit === '' ? 0 : body.client_ip_flow_limit
      body.upstream_connect_timeout =
        body.upstream_connect_timeout === ''
          ? 0
          : body.upstream_connect_timeout
      body.upstream_header_timeout =
        body.upstream_header_timeout === '' ? 0 : body.upstream_header_timeout
      body.upstream_idle_timeout =
        body.upstream_idle_timeout === '' ? 0 : body.upstream_idle_timeout
      body.upstream_max_idle =
        body.upstream_max_idle === '' ? 0 : body.upstream_max_idle

      console.log(body)
      createHttpService(body)
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
    },
    handleCancel() {
      this.isCancel = true
      this.resetFormData()
      this.isCancel = false
    },
    resetFormData() {
      this.form = {
        black_list: '',
        client_ip_flow_limit: undefined,
        header_transform: '',
        ip_list: '',
        need_https: 0,
        need_strip_uri: 0,
        need_websocket: 0,
        open_auth: 1,
        round_type: 0,
        rule: '',
        rule_type: 0,
        service_desc: '',
        service_host_flow_limit: '',
        service_name: '',
        upstream_connect_timeout: '',
        upstream_header_timeout: '',
        upstream_idle_timeout: '',
        upstream_max_idle: '',
        url_rewrite: '',
        weight_list: '',
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
