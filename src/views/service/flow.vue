<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="chartData" />
  </div>
</template>

<script>
import Chart from '../components/flowchart/LineFlow'
import { showService, getServiceFlow } from '@/api/service'

export default {
  name: 'LineChart',
  components: { Chart },
  data() {
    return {
      chartData: {
        title: 'Service Flow',
        todayFlow: [],
        yesterdayFlow: []
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.service_id = id
    this.fetchChartData(id)
  },
  methods: {
    fetchChartData(id) {
      getServiceFlow(id).then((flow) => {
        showService(id).then((detail) => {
          this.chartData = {
            title: detail.data.info.service_name + "'s Service Flow",
            todayFlow: flow.data.today_flow,
            yesterdayFlow: flow.data.yesterday_flow
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

