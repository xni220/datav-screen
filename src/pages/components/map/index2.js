import { useChartHook } from '@/hooks';
import './index.less';
import { useImperativeHandle, useEffect, useRef, forwardRef } from 'react';
import { useState } from 'react';
import { path, markDataList, mapInfoList } from './data';

const ChartMap = (props, ref) => {
  const chartRef = useRef(null);
  const [id, setId] = useState('asf924sdfgs');

  useImperativeHandle(ref, () => ({
    initMap: initMap,
  }));

  useEffect(() => {
    var obj = document.getElementById('amapjs');
    if (obj) {
      // 先让它加载完
      setTimeout(() => initMap(), 1000);
    } else {
      var url =
        'https://webapi.amap.com/maps?v=1.4.15&key=9fc27ac1a7a356bcca532de7d5b080ae&plugin=AMap.CustomLayer&callback=onLoad';

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
    å;
    var satelliteLayer = new AMap.TileLayer.Satellite();
    map.add([satelliteLayer]);
    var polygonArr = [
      [116.403322, 39.920255],
      [116.410703, 39.897555],
      [116.402292, 39.892353],
      [116.389846, 39.891365],
    ];
    var polygon = new AMap.Polygon({
      map: map,
      path: polygonArr, //设置多边形边界路径
      strokeColor: '#FF33FF', //线颜色
      strokeOpacity: 0.2, //线透明度
      strokeWeight: 3, //线宽
      fillColor: '#1791fc', //填充色
      fillOpacity: 0.35, //填充透明度
    });
    map.setFitView();

    let content = [
      `
        <div style="width: 270px;height: 130px;background: black;opacity: 0.7;color: #fff;border-radius: 8px;padding: 10px;">
          <div style="display: flex; font-size: 16px; margin-top: 10px">
            <img style="width: 80px; height: 80px" src="require('')" />
            <div style="margin: 0 20px">
              <div>种植面积</div>
              <div>72150</div>
              <div>加工产量</div>
              <div>213213</div>
            </div>
            <div>
              <div>种植产值</div>
              <div>72150</div>
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
      // offset: new AMap.Pixel(-15, -25),
    });
    polygon.on('mouseover', (e) => {
      console.log('mouseover', e);
      infoWindow.open(map, [e.lnglat.lng, e.lnglat.lat]);
    });
    polygon.on('mouseout', () => {
      console.log('mouseout');
      infoWindow.close();
    });
  };

  return (
    <div className="map-cont">
      <div className="map-chart" id={id}></div>
    </div>
  );
};

export default forwardRef(ChartMap);
