<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="chartData" />
  </div>
</template>

<script>
import Chart from '../components/LineFlow'
import { showApp, getAppFlow } from '@/api/app'

export default {
  name: 'LineChart',
  components: { Chart },
  data() {
    return {
      chartData: {
        title: 'App Flow',
        todayFlow: [],
        yesterdayFlow: []
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.app_id = id
    this.fetchChartData(id)
  },
  methods: {
    fetchChartData(id) {
      getAppFlow(id).then((flow) => {
        showApp(id).then((detail) => {
          this.chartData = {
            title: detail.data.app_id + "'s App Flow",
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

