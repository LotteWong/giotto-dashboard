<template>
  <div class="dashboard-editor-container">
    <panel-group :data="panelGroupData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import PanelGroup from '../components/dashboard/PanelGroup'
import LineChart from '../components/dashboard/LineChart'
import RaddarChart from '../components/dashboard/RaddarChart'
import PieChart from '../components/dashboard/PieChart'
import BarChart from '../components/dashboard/BarChart'
// import TransactionTable from './components/dashboard/TransactionTable'
// import TodoList from './components/dashboard/TodoList'
// import BoxCard from './components/dashboard/BoxCard'
import { getStatistics, getTotalFlow, getServicePercentage } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      panelGroupData: {
        service_count: 0,
        app_count: 0,
        current_qpd: 0,
        current_qps: 0
      },
      lineChartData: {
        title: 'Total Flow',
        todayFlow: [],
        yesterdayFlow: []
      },
      pieChartData: {
        title: 'Service Percentage',
        legend: ['Http', 'Tcp', 'Grpc'],
        series: [
          { value: 0, name: 'Http' },
          { value: 0, name: 'Tcp' },
          { value: 0, name: 'Grpc' }
        ]
      }
    }
  },
  created() {
    this.fetchPanelGroupData()
    this.fetchLineChartData()
    this.fetchServicePercentageData()
  },
  methods: {
    fetchPanelGroupData() {
      getStatistics().then((response) => {
        this.panelGroupData = response.data
      })
    },
    fetchLineChartData() {
      getTotalFlow().then((response) => {
        this.lineChartData.todayFlow = response.data.today_flow
        this.lineChartData.yesterdayFlow = response.data.yesterday_flow
      })
    },
    fetchServicePercentageData() {
      getServicePercentage().then((response) => {
        this.pieChartData.legend = response.data.legends
        let i
        for (i = 0; i < response.data.records.length; i++) {
          this.pieChartData.series[i] = {
            value: response.data.records[i].service_count,
            name: response.data.records[i].service_legend
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
