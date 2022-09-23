import { useRef } from 'react';
import { useChartHook } from '@/hooks';
import * as echarts from 'echarts';
import './index.less';
import { useEffect } from 'react';
import { useState } from 'react';
import { path, pathColors, markDataList, mapInfoList } from './data';
export default function ChartMap() {
  const chartRef = useRef(null);
  const [id, setId] = useState('asf924sdfgs');

  useEffect(() => {
    var obj = document.getElementById('amapjs');
    if (obj) {
      // 先让它加载完
      setTimeout(() => initMap(), 1000);
    } else {
      var url =
        'https://webapi.amap.com/maps?v=1.4.14&key=9fc27ac1a7a356bcca532de7d5b080ae&plugin=AMap.CustomLayer&callback=onLoad';

      var jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      jsapi.id = 'amapjs';
      document.head.appendChild(jsapi);
      window.onLoad = function () {
        initMap();
      };
    }
    return () => {
      var obj = document.getElementById('amapjs');
      if (obj) {
        document.getElementsByTagName('head')[0].removeChild(obj);
      }
    };
  }, []);

  const initMap = () => {
    var map = new AMap.Map(id, {
      resizeEnable: true,
    });
    // 增加卫星图层;
    var satelliteLayer = new AMap.TileLayer.Satellite();
    map.add([satelliteLayer]);

    // 多边形绘制
    Object.keys(path).map((key, index) => {
      var polygon = new AMap.Polygon({
        path: path[key],
        strokeColor: pathColors[index].strokeColor,
        strokeWeight: 3,
        strokeOpacity: 1,
        fillOpacity: 0.4,
        fillColor: pathColors[index].fillColor,
        zIndex: 50,
        bubble: true,
      });
      map.add(polygon);
      const content = [
        `
          <div class="info-cont">
          <div class="title">太平(2021)</div>  
          <div class="cont-content">
              <img src="http://www.chlitchi.com/Files/Area/%E5%9D%AA%E7%94%B0%E9%95%87.jpg" />
              <div class="content">
                <div>种植面积</div>
                <div class="value-bottom">72150</div>
                <div>加工产量</div>
                <div>213213</div>
              </div>
              <div>
                <div>种植产值</div>
                <div class="value-bottom">72150</div>
                <div>加工产值</div>
                <div>72150</div>
              </div>
            </div>
          </div>
        `,
      ];

      const infoWindow = new AMap.InfoWindow({
        isCustom: true,
        content: content.join('<br>'),
      });
      polygon.on('mouseover', (e) => {
        infoWindow.open(map, [e.lnglat.lng, e.lnglat.lat]);
      });
      polygon.on('mouseout', () => {
        infoWindow.close();
      });
    });

    // 绘制点标记
    const markList = [];
    markDataList.map((data) => {
      const markIcon = new AMap.Icon({
        size: new AMap.Size(30, 30),
        image: data.img,
        imageSize: new AMap.Size(30, 30),
      });

      // 将 icon 传入 marker
      const mark = new AMap.Marker({
        position: new AMap.LngLat(...data.position),
        icon: markIcon,
        // offset: new AMap.Pixel(13, 30),
      });
      markList.push(mark);
    });

    // 将 markers 添加到地图
    map.add(markList);

    map.setFitView();
  };

  return (
    <div className="map-cont">
      <div className="map-chart" id={id}></div>
      <div className="map-info">
        {mapInfoList.map((item) => (
          <div className="info-item" key={item.name}>
            <img src={item.img} />
            <span>
              {item.name} ({item.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
