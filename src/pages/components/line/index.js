import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { lineData } from './data';
import './index.less';
export default function ChartLine() {
  const chartRef = useRef(null);
  const [myChart, setMyChart] = useState(null);
  const [echartsInterval, setEchartsInterval] = useState(null);

  useEffect(() => {
    renderChart();
  }, []);

  useEffect(() => {
    activeEcharts(-1);
  }, [myChart]);

  const renderChart = () => {
    const option = getChartOption();
    let chartInstance = null;
    const chart = echarts.getInstanceByDom(chartRef.current);
    if (chart) {
      chartInstance = chart;
    } else {
      chartInstance = echarts.init(chartRef.current, 'dark');
    }
    setMyChart(chartInstance);
    chartInstance.setOption(option);
  };

  const activeEcharts = (currentIndex) => {
    // 数据长度
    let dataLength = lineData.xAxisData.length;
    // 清空tooltip定时器
    clearTimeout(echartsInterval);
    // 加载tooltip定时器
    const interval = setTimeout(() => {
      // 获取当前显示第几个数据，从0 开始。（取 显示次数除以数据长度的余数）
      currentIndex = (currentIndex + 1) % dataLength;
      // echarts的触发图表行为
      myChart.dispatchAction({
        type: 'showTip', // 触发的行为
        seriesIndex: 0, // 触发的数据对应的坐标系（通常只有一个y轴，取0）
        dataIndex: currentIndex, // 第几个数据显示toolTip
      });
      activeEcharts(currentIndex);
    }, 2000);
    setEchartsInterval(interval);
  };

  const getSeriesOption = () => {
    // 组装series data
    const series = [];
    lineData.seriesData.map((item) => {
      series.push({
        name: item.name,
        type: 'line',
        data: item.data,
        symbol: 'none',
        smooth: true,
      });
    });
    return series;
  };

  const getChartOption = () => {
    const option = {
      backgroundColor: 'transparent',
      color: ['#61D8FF', '#61FF79', '#FFE061', '#FFAA61', '#6195FF'],
      tooltip: {
        trigger: 'axis',
        extraCssText:
          'background: rgb(38, 38, 38, 0.5); ;border: 1px solid #fff;',
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        data: lineData.seriesData.map((item) => item.name),
        icon: 'rect',
        itemWidth: 18,
        itemHeight: 2,
        itemGap: 40,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: lineData.xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: getSeriesOption(),
    };
    return option;
  };

  return <div className="line_chart" ref={chartRef}></div>;
}
