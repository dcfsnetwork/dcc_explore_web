import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import style from './index.module.scss'

interface EchartData {
  data: any
}

const Echart: React.FC<EchartData> = data => {
  const getChartOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#00c299',
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#7cffe3'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ])
        },
        data: data.data
      }
    ]
  }

  return (
    <>
      <div className={style.echart}>
        <div className="font-18">
          DCFS <span className="l-c font-16">&nbsp; TRANSACTION HISTORY LAST 14 DAYS</span>
        </div>
        <ReactEcharts option={getChartOption} style={{ height: '100%', marginLeft: 10 }} />
      </div>
    </>
  )
}

export default Echart
