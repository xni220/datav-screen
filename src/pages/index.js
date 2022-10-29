import React, { useState, useEffect, useRef } from 'react';
import { Container, Loading, TopHeader } from '@/components';
import { Carousel } from 'antd';
import ChartPie from './components/pie';
import ChartLiquid from './components/liquid';
import ChartLine from './components/line';
import {
  baseInfo,
  plantInfo,
  weatherInfo,
  progressInfo,
  claimInfo,
  selectOptions,
  stationOptions,
} from './data';
import './index.less';
import TheMap from '@/pages/components/map/index';
import { getLands, getDataList } from '@/pages/services/api';

const isDev = process.env.NODE_ENV === 'development';
const site_url = isDev ? 'https://test2.feinibuqu.cn' : window.location.origin;

const imgs = [
  require('@/assets/index/bg_size.png'),
  require('@/assets/index/bg_multiple.png'),
  require('@/assets/index/bg_plant.png'),
  require('@/assets/index/bg_file.png'),
];

export default function IndexPage() {
  const [ready, setReady] = useState(true);
  const [selectVal, setSelectVal] = useState('condition');
  const [choosedStation, setChoosedStation] = useState('condition');

  //数据
  const [dapingInfo, setDapingInfo] = useState(null);

  useEffect(async () => {
    setTimeout(() => {
      setReady(true);
      console.log('useEffect');
      document.title = '智慧农业大屏';
    }, 1000);
  }, []);

  useEffect(async () => {
    const { data } = await getDataList({ land_id: _get_('id') });
    setDapingInfo(data);
  }, []);

  const handleChange = () => {
    const selectDom = document.getElementById('index-select');
    const option = selectDom.options[selectDom.selectedIndex];
    setSelectVal(option.attributes[0].nodeValue);
  };
  const changeStation = () => {
    const selectDom = document.getElementById('station-select');
    const option = selectDom.options[selectDom.selectedIndex];
    setChoosedStation(option.attributes[0].nodeValue);
  };
  return (
    <div className="home">
      {!ready && <Loading>数据加载中...</Loading>}
      {ready && (
        <Container options={{ width: 1920, height: 1080, scaleType: 3 }}>
          <div className="main-wrap">
            <div className="header">
              <TopHeader />
            </div>
            <div className="cont-content">
              <div className="home-left">
                <div className="home-left-top">
                  <div className="cont-title">基地概况</div>
                  <div className="cont-body">
                    <div className="body-top">
                      <img
                        className="star"
                        src={require('@/assets/index/square_star.png')}
                      />
                      <img
                        className="light"
                        src={require('@/assets/index/square_light.png')}
                      />

                      <img
                        className="sun"
                        src={
                          site_url +
                          '/zy_public/tianqi/' +
                          dapingInfo?.weather?.detail?.weather_code +
                          '.png'
                        }
                      />
                      <div className="weather">
                        <div className="number">
                          {dapingInfo?.weather?.detail?.temperature}°C
                        </div>
                        <div className="text">
                          {dapingInfo?.weather?.detail?.weather}
                        </div>
                      </div>
                      <div className="date">
                        <span>{dapingInfo?.weather?.detail?.date}</span>
                        <img src={require('@/assets/index/divider.png')} />
                        <span>星期{dapingInfo?.weather?.detail?.week}</span>
                      </div>
                    </div>
                    <div className="body-bottom">
                      {dapingInfo?.landInfo?.map((item, index) => (
                        <div
                          className="cont-item"
                          key={item.label}
                          style={{
                            background: `url(${imgs[index]}) no-repeat
                            center / cover`,
                          }}
                        >
                          <div className="label">{item.label}</div>
                          <div className="value" style={{ color: item.color }}>
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="home-left-middle">
                  <div className="cont-title">种植情况参考</div>
                  <div className="cont-body">
                    {plantInfo.map((item) => (
                      <div className="cont-item" key={item.label}>
                        <img src={item.url} />
                        <div className="cont-text">
                          <div className="label">{item.label}</div>
                          <div className="value" style={{ color: item.color }}>
                            {item.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="home-left-bottom">
                  <div className="cont-title">智能设备</div>
                  <div className="cont-body">
                    <ChartPie />
                  </div>
                </div>
              </div>
              <div className="home-center">
                <div className="home-center-top">
                  <div className="cont-title-middle">产业基地</div>
                  <div className="cont-map">
                    <TheMap />
                  </div>
                </div>
                <div className="home-center-bottom">
                  <div className="cont-title-middle">农事任务</div>
                  <div className="cont-body">
                    <div className="cont-left">
                      <div className="cont-select">
                        <img src={require('@/assets/index/arrow_left.png')} />
                        <select
                          id="index-select"
                          onChange={handleChange}
                          value={selectVal}
                          className="index-select"
                        >
                          {selectOptions.map((item) => (
                            <option value={item.value} key={item.label}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                        <img src={require('@/assets/index/arrow_right.png')} />
                      </div>
                      {selectVal === 'monitor' ? (
                        <div className="cont-content">
                          <img src={require('@/assets/index/monitor.png')} />
                        </div>
                      ) : (
                        <div className="cont-content">
                          <div className="cont-liquid-chart">
                            <ChartLiquid />
                          </div>
                          <div className="btn">点击查明细</div>
                        </div>
                      )}
                    </div>
                    <div className="cont-right">
                      <div className="title">
                        <img src={require('@/assets/index/arrow_left.png')} />
                        <span>农事任务进度</span>
                        <img src={require('@/assets/index/arrow_right.png')} />
                      </div>
                      <div className="cont-content">
                        {progressInfo.map((item) => (
                          <div className="cont-item" key={item.label}>
                            <div className="label">{item.label}</div>
                            <div
                              className="value"
                              style={{ color: item.color }}
                            >
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-right">
                <div className="home-right-top">
                  <div className="cont-right-select">
                    <select
                      id="station-select"
                      onChange={changeStation}
                      value={choosedStation}
                      className="index-select"
                    >
                      {stationOptions.map((item) => (
                        <option value={item.value} key={item.label}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cont-title">气象站环境检测</div>
                  <div className="cont-body">
                    <Carousel
                      dotPosition="right"
                      autoplay
                      style={{ width: '100%', height: '100%' }}
                    >
                      <div>
                        <div className="cont-flex">
                          {weatherInfo.map((item) => (
                            <div className="cont-item" key={item.label}>
                              <img src={item.url} />
                              <div>
                                <div
                                  className="label"
                                  style={{ color: '#fcde1f' }}
                                >
                                  {item.label}
                                </div>
                                <div>
                                  <span className="value">{item.value} </span>
                                  <span className="unit">{item.unit}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="cont-flex">
                          {weatherInfo.map((item) => (
                            <div className="cont-item" key={item.label}>
                              <img src={item.url} />
                              <div>
                                <div
                                  className="label"
                                  style={{ color: '#fcde1f' }}
                                >
                                  {item.label}
                                </div>
                                <div>
                                  <span className="value">{item.value} </span>
                                  <span className="unit">{item.unit}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="cont-flex">
                          {weatherInfo.map((item) => (
                            <div className="cont-item" key={item.label}>
                              <img src={item.url} />
                              <div>
                                <div
                                  className="label"
                                  style={{ color: '#fcde1f' }}
                                >
                                  {item.label}
                                </div>
                                <div>
                                  <span className="value">{item.value} </span>
                                  <span className="unit">{item.unit}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Carousel>
                  </div>
                </div>
                <div className="home-right-middle">
                  <div className="cont-title">传感器近7天数据</div>
                  <div className="cont-body">
                    <ChartLine />
                  </div>
                </div>
                <div className="home-right-bottom">
                  <div className="cont-title">
                    认领菜地、认领家禽和溯源统计等情况
                  </div>
                  <div className="cont-body">
                    {claimInfo.map((item) => (
                      <div className="cont-item" key={item.label}>
                        <div className="label">{item.label}</div>
                        <img src={require('@/assets/index/circle_bg.png')} />
                        <div className="value" style={{ color: item.color }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
