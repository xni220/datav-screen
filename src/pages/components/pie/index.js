import React, { useState, useEffect, useRef } from 'react';
import { useChartHook } from '@/hooks';
import * as echarts from 'echarts';
import { seriesData, backgroundData } from './data';
import './index.less';
export default function ChartPie() {
  const chartRef = useRef(null);
  const progressRef = useRef(null);
  const [pieChart, setPieChart] = useState(null);
  const [progressChart, setProgressChart] = useState(null);
  const [echartsInterval, setEchartsInterval] = useState(null);
  let currentEmphasisIndex = null;
  const total = seriesData.map((item) => item.value).reduce((a, b) => a + b, 0);
  useEffect(() => {
    renderPieChart();
    renderProgressChart();
  }, []);

  useEffect(() => {
    activeEcharts(-1);
  }, [pieChart]);

  const renderPieChart = () => {
    const option = getChartOption();
    let chartInstance = null;
    const chart = echarts.getInstanceByDom(chartRef.current);
    if (chart) {
      chartInstance = chart;
    } else {
      chartInstance = echarts.init(chartRef.current, 'dark');
    }
    setPieChart(chartInstance);
    chartInstance.setOption(option);
  };

  const renderProgressChart = () => {
    const option = getProgressOption();
    let chartInstance = null;
    const chart = echarts.getInstanceByDom(progressRef.current);
    if (chart) {
      chartInstance = chart;
    } else {
      chartInstance = echarts.init(progressRef.current, 'dark');
    }
    setProgressChart(chartInstance);
    chartInstance.setOption(option);
  };

  // 处理图表动效效果
  const activeEcharts = (currentIndex) => {
    // 数据长度
    let dataLength = seriesData.length;
    // 清空定时器
    clearTimeout(echartsInterval);
    // 加载定时器
    const interval = setTimeout(() => {
      // 取消高亮
      pieChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
      progressChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
      // 获取当前显示第几个数据，从0 开始。（取 显示次数除以数据长度的余数）
      currentIndex = (currentIndex + 1) % dataLength;
      currentEmphasisIndex = currentIndex;
      // 高亮图形
      pieChart.dispatchAction({
        type: 'highlight', //高亮当前图形
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
      progressChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
      // 显示tooltip提示框
      pieChart.dispatchAction({
        type: 'showTip', // 触发的行为
        seriesIndex: 0, // 触发的数据对应的坐标系（通常只有一个y轴，取0）
        dataIndex: currentIndex, // 第几个数据显示toolTip
      });

      // 进度条label的颜色变化
      const progressOption = getProgressOption();
      progressOption.yAxis[0].axisLabel = {
        fontSize: 14,
        textStyle: {
          color: function (value, index) {
            if (currentEmphasisIndex === index) {
              return '#fcde1f';
            } else {
              return '#fff';
            }
          },
        },
      };
      progressChart.setOption(progressOption);

      activeEcharts(currentIndex);
    }, 2000);
    setEchartsInterval(interval);
  };

  const getChartOption = () => {
    const option = {
      backgroundColor: 'transparent',
      color: ['#F5B820', '#38FFAF', '#52D7FF', '#4F94FF'],
      tooltip: {
        trigger: 'item',
        extraCssText:
          'background: rgb(38, 38, 38, 0.5); ;border: 1px solid #fff;',
        textStyle: {
          color: '#fff',
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '60%'],
          avoidLabelOverlap: false,
          left: '-8%',
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 0,
          },
          label: {
            show: true,
            position: 'center',
            formatter: (item) => {
              const percent = ((item.value / total) * 100).toFixed(2);
              return `{percent|${percent}%}\n{name|${item.name}}\n{value|${item.value}}`;
            },
            align: 'center',
            color: '#fff',
            verticalAlign: 'middle',
            textStyle: {
              fontSize: '0',
            },
          },
          emphasis: {
            label: {
              show: true,
              rich: {
                percent: {
                  fontSize: 20,
                  color: '#F5B820',
                  fontWeight: 600,
                  lineHeight: 28,
                  fontFamily: 'PingFangSC-Semibold, PingFang SC',
                },
                name: {
                  fontSize: 14,
                  color: '#fff',
                  fontWeight: 400,
                  lineHeight: 20,
                  fontFamily: 'PingFangSC-Regular, PingFang SC',
                },
                value: {
                  fontSize: 14,
                  color: '#fff',
                  fontWeight: 400,
                  lineHeight: 20,
                  fontFamily: 'PingFangSC-Regular, PingFang SC',
                },
              },
            },
          },
          labelLine: {
            show: false,
          },
          data: seriesData,
        },
      ],
    };
    return option;
  };

  const getProgressOption = () => {
    const option = {
      backgroundColor: 'transparent',
      xAxis: {
        type: 'value',
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      yAxis: [
        {
          // show: false,
          type: 'category',
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            fontSize: 14,
            textStyle: {
              color: '#fff',
            },
          },
          data: seriesData.map((item) => item.name),
          max: 10, // 关键：设置y刻度最大值，相当于设置总体行高
          inverse: true,
        },
      ],
      grid: {
        top: 40,
        right: 40,
        left: 50,
        height: 500,
      },
      series: [
        {
          name: '条',
          type: 'bar',
          barWidth: 10,
          data: seriesData.map((item) => item.value),
          barCategoryGap: 20,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
              color: function (params) {
                const colorList = [
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: 'rgba(0,123,255,0)',
                    },
                    {
                      offset: 1,
                      color: '#478DFF',
                    },
                  ]),
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: 'rgba(0,222,255,0)',
                    },
                    {
                      offset: 1,
                      color: '#1BD6FF',
                    },
                  ]),
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: 'rgba(95,224,166,0)',
                    },
                    {
                      offset: 1,
                      color: '#5FE0A6',
                    },
                  ]),
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: 'rgba(255,190,31,0)',
                    },
                    {
                      offset: 1,
                      color: '#FFBE1F',
                    },
                  ]),
                ];
                return colorList[params.dataIndex];
              },
            },
          },
          emphasis: {
            disabled: false,
            itemStyle: {
              color: '#fcde1f',
            },
            label: {
              show: true,
              position: 'right',
              align: 'left',
              formatter: function (params) {
                return seriesData[params.dataIndex].value;
              },
              color: '#fcde1f',
            },
          },
          zlevel: 1,
        },
        {
          name: '进度条背景',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          data: backgroundData,
          color: 'rgba(0,70,124,0.3)',
          itemStyle: {
            normal: {
              barBorderRadius: 10,
            },
          },

          barMinHeight: 30,
        },
      ],
    };
    return option;
  };

  return (
    <div className="flex-cont">
      <img src={require('@/assets/index/pie_circle.png')} />
      <div className="pie_chart" ref={chartRef}></div>
      <div className="progress_chart" ref={progressRef} />
    </div>
  );
}
