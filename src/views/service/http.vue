<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="!isEdit">Create Http Service</span>
          <span v-if="isEdit">Update Http Service</span>
        </div>
        <div style="margin-bottom: 50px">
          <el-form ref="form" :model="form">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="服务简要信息/Service Info" name="1">
                <el-form-item label="Service Name" :required="true" label-width="200px">
                  <el-input v-model="form.service_name" :disabled="isEdit" placeholder="Please input service name" />
                </el-form-item>
                <el-form-item label="Service Desc" label-width="200px">
                  <el-input v-model="form.service_desc" placeholder="Please input service description" />
                </el-form-item>
              </el-collapse-item>

              <el-collapse-item title="协议接入配置/Protocol Rule" name="2">
                <el-form-item label="Rule" :required="true" label-width="200px">
                  <el-input
                    v-model="form.rule"
                    placeholder="Please input rule"
                    class="input-with-select"
                    :disabled="isEdit"
                  >
                    <el-select
                      slot="prepend"
                      v-model="form.rule_type"
                      placeholder="Please select rule type"
                      style="width: 100px"
                      :disabled="isEdit"
                    >
                      <el-option label="Prefix" :value="0" />
                      <el-option label="Domain" :value="1" />
                    </el-select>
                  </el-input>
                </el-form-item>
                <el-form-item label="Enable Https" label-width="200px">
                  <el-switch
                    v-model="form.need_https"
                    :active-value="1"
                    :inactive-value="0"
                  />
                  <span style="color: #606266; font-weight: 700; margin-left: 50px">
                    Enable WebSocket
                  </span>
                  <el-switch
                    v-model="form.need_websocket"
                    :active-value="1"
                    :inactive-value="0"
                  />
                </el-form-item>
                <el-form-item label="Url Rewrite" label-width="200px">
                  <el-input
                    v-model="form.url_rewrite"
                    type="textarea"
                    placeholder="Please input url rewrite"
                    autosize=""
                  />
                </el-form-item>
                <el-form-item label="Header Transform" label-width="200px">
                  <el-input
                    v-model="form.header_transform"
                    type="textarea"
                    placeholder="Please input header transform"
                    autosize=""
                  />
                </el-form-item>
                <el-form-item label="Strip Uri" label-width="200px">
                  <!-- <span style="color: #606266; font-weight: 700; margin-left: 50px">
                    Enable Strip Uri
                  </span> -->
                  <el-switch
                    v-model="form.need_strip_uri"
                    active-text="Yes"
                    inactive-text="No"
                    :active-value="1"
                    :inactive-value="0"
                  />
                </el-form-item>
              </el-collapse-item>

              <el-collapse-item title="权限认证配置/Ip Auth" name="3">
                <el-form-item label="Enable Auth" label-width="200px">
                  <el-switch
                    v-model="form.open_auth"
                    :active-value="1"
                    :inactive-value="0"
                  />
                </el-form-item>
                <el-form-item label="Ip White List" label-width="200px">
                  <el-input
                    v-model="form.white_list"
                    type="textarea"
                    placeholder="Please input ip white list"
                    autosize=""
                  />
                </el-form-item>
                <el-form-item label="Ip Black List" label-width="200px">
                  <el-input
                    v-model="form.black_list"
                    type="textarea"
                    placeholder="Please input ip black list"
                    autosize=""
                  />
                </el-form-item>
              </el-collapse-item>

              <el-collapse-item title="流量控制配置/Rate Limit" name="4">
                <el-form-item label="Service Host Flow Limit" label-width="200px">
                  <el-input v-model.number="form.service_host_flow_limit" placeholder="Please input service host flow limit" />
                </el-form-item>
                <el-form-item label="Service Host Flow Interval" label-width="200px">
                  <el-input v-model.number="form.service_host_flow_interval" placeholder="Please input service host flow interval" />
                </el-form-item>
                <el-form-item label="Client Ip Flow Limit" label-width="200px">
                  <el-input v-model.number="form.client_ip_flow_limit" placeholder="Please input client ip flow limit" />
                </el-form-item>
                <el-form-item label="Client Ip Flow Interval" label-width="200px">
                  <el-input v-model.number="form.client_ip_flow_interval" placeholder="Please input client ip flow interval" />
                </el-form-item>
              </el-collapse-item>

              <el-collapse-item title="负载均衡配置/Load Balance" name="5">
                <el-form-item label="Round Type" :required="true" label-width="200px">
                  <el-radio-group v-model="form.round_type">
                    <el-radio :label="0">random</el-radio>
                    <el-radio :label="1">round robin</el-radio>
                    <el-radio :label="2">weight round robin</el-radio>
                    <el-radio :label="3">consistent hash</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="Ip List" label-width="200px">
                  <el-input
                    v-model="form.ip_list"
                    type="textarea"
                    placeholder="Please input ip list"
                    autosize=""
                  />
                </el-form-item>
                <el-form-item label="Weight List" label-width="200px">
                  <el-input
                    v-model="form.weight_list"
                    type="textarea"
                    placeholder="Please input weight list"
                    autosize=""
                  />
                </el-form-item>
              </el-collapse-item>

              <el-collapse-item title="反向代理配置/Reverse Proxy" name="6">
                <el-form-item label="Upstream Connect Timeout" label-width="200px">
                  <el-input v-model.number="form.upstream_connect_timeout" placeholder="Please input upstream connect timeout" />
                </el-form-item>
                <el-form-item label="Upstream Header Timeout" label-width="200px">
                  <el-input v-model.number="form.upstream_header_timeout" placeholder="Please input upstream header timeout" />
                </el-form-item>
                <el-form-item label="Upstream Idle Timeout" label-width="200px">
                  <el-input v-model.number="form.upstream_idle_timeout" placeholder="Please input upstream idle timeout" />
                </el-form-item>
                <el-form-item label="Upstream Max Idle" label-width="200px">
                  <el-input v-model.number="form.upstream_max_idle" placeholder="Please input upstream max idle" />
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
import {
  createHttpService,
  showService,
  updateHttpService
} from '@/api/service'
export default {
  name: 'HttpService',
  data() {
    return {
      isEdit: false,
      isSubmit: false,
      isCancel: false,
      activeNames: ['1', '2', '3', '4', '5', '6'],
      service_id: 0,
      form: {
        black_list: '',
        client_ip_flow_limit: '',
        client_ip_flow_interval: '',
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
        service_host_flow_interval: '',
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
        this.form.client_ip_flow_interval =
          response.data.access_control.client_ip_flow_interval
        this.form.header_transform = response.data.http_rule.header_transform.replace(
          /,/g,
          '\n'
        )
        this.form.ip_list = response.data.load_balance.ip_list.replace(
          /,/g,
          '\n'
        )
        this.form.need_https = response.data.http_rule.need_https
        this.form.need_strip_uri = response.data.http_rule.need_strip_uri
        this.form.need_websocket = response.data.http_rule.need_websocket
        this.form.open_auth = response.data.access_control.open_auth
        this.form.round_type = response.data.load_balance.round_type
        this.form.rule = response.data.http_rule.rule
        this.form.rule_type = response.data.http_rule.rule_type
        this.form.service_desc = response.data.info.service_desc
        this.form.service_host_flow_limit =
          response.data.access_control.service_host_flow_limit
        this.form.service_host_flow_interval =
          response.data.access_control.service_host_flow_interval
        this.form.service_name = response.data.info.service_name
        this.form.upstream_connect_timeout =
          response.data.load_balance.upstream_connect_timeout
        this.form.upstream_header_timeout =
          response.data.load_balance.upstream_header_timeout
        this.form.upstream_idle_timeout =
          response.data.load_balance.upstream_idle_timeout
        this.form.upstream_max_idle =
          response.data.load_balance.upstream_max_idle
        this.form.url_rewrite = response.data.http_rule.url_rewrite.replace(
          /,/g,
          '\n'
        )
        this.form.weight_list = response.data.load_balance.weight_list.replace(
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

      body.url_rewrite = body.url_rewrite.replace(/\n/g, ',')
      body.header_transform = body.header_transform.replace(/\n/g, ',')
      body.white_list = body.white_list.replace(/\n/g, ',')
      body.black_list = body.black_list.replace(/\n/g, ',')
      body.ip_list = body.ip_list.replace(/\n/g, ',')
      body.weight_list = body.weight_list.replace(/\n/g, ',')

      body.service_host_flow_limit =
        body.service_host_flow_limit === '' ? 0 : body.service_host_flow_limit
      body.service_host_flow_interval =
        body.service_host_flow_interval === '' ? 0 : body.service_host_flow_interval
      body.client_ip_flow_limit =
        body.client_ip_flow_limit === '' ? 0 : body.client_ip_flow_limit
      body.client_ip_flow_interval =
        body.client_ip_flow_interval === '' ? 0 : body.client_ip_flow_interval
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
      if (this.isEdit) {
        updateHttpService(this.service_id, body)
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
        client_ip_flow_interval: '',
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
        service_host_flow_interval: '',
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
