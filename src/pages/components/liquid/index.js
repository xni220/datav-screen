import { useRef } from 'react';
import { useChartHook } from '@/hooks';
import * as echarts from 'echarts';
import './index.less';
export default function ChartLiquid() {
  const data = [0.75];
  const chartRef = useRef(null);
  const getChartOption = () => {
    const option = {
      series: {
        type: 'liquidFill',
        data: data,
        radius: '80%',
        waveAnimation: true,
        outline: {
          show: false,
        },
        backgroundStyle: {
          color: 'rgb(54,140,211,0.2)',
          borderColor: 'rgb(54,140,211,0.2)',
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#3DD7D8',
            },
            {
              offset: 1,
              color: '#2572B9',
            },
          ]),
        },
        label: {
          show: true,
          color: '#fff',
          baseline: 'middle',
          fontSize: '24px',
          fontWeight: 500,
        },
      },
    };
    return option;
  };

  const chartoption = getChartOption();
  useChartHook(chartRef, chartoption);

  return <div className="liquid-chart" ref={chartRef}></div>;
}
