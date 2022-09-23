import React, { useState, useEffect, useRef, useMemo } from 'react';

import './index.less';

export default function (props) {
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [heightRatio, setHeightRatio] = useState(1);
  const [widthRatio, setWidthRatio] = useState(1);
  const [realScalType, setRealScalType] = useState(1);

  const { children, options } = props;
  const { width, height, scaleType } = options;

  const domRef = useRef(null);

  useEffect(() => {
    // if (scaleType === 'auto') {
    //   setRealScalType(1);
    // } else {
    //   setRealScalType(scaleType);
    // }
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', () => {
        resizeWindow();
      });
    };
  }, []);

  useEffect(() => {
    setScaleValue();
  }, [realScalType, clientHeight, clientWidth, heightRatio, widthRatio]);

  const resizeWindow = () => {
    const cHeight = document.documentElement.clientHeight;
    const cWidth = document.documentElement.clientWidth;
    setClientHeight(cHeight);
    setClientWidth(cWidth);
    setHeightRatio(Number(cHeight / height));
    setWidthRatio(Number(cWidth / width));

    if (scaleType === 'auto') {
      if (realScalType === 1 && scaleObj.height > clientHeight) {
        //以横向为准
        setRealScalType(2);
      } else if (realScalType === 2 && scaleObj.width > clientWidth) {
        setRealScalType(1);
      } else {
        setRealScalType(1);
      }
    } else {
      setRealScalType(scaleType);
    }
  };

  const scaleObj = useMemo(setScaleValue, [
    realScalType,
    clientWidth,
    clientHeight,
    widthRatio,
    heightRatio,
  ]);

  function setScaleValue() {
    let radio = width / height;
    if (realScalType == 1) {
      return {
        width: clientWidth, // 基于宽
        height: clientWidth / radio,
        widthRadio: widthRatio,
        heightRadio: widthRatio,
      };
    }

    if (realScalType == 2) {
      return {
        width: clientHeight * radio,
        height: clientHeight, // 基于高
        widthRadio: heightRatio,
        heightRadio: heightRatio,
      };
    }

    if (realScalType == 3) {
      return {
        width: clientWidth, // 全屏
        height: clientHeight,
        widthRadio: widthRatio,
        heightRadio: heightRatio,
      };
    }
  }

  return (
    <div
      ref={domRef}
      className="wrap-wrap"
      style={{ width: scaleObj.width + 'px', height: scaleObj.height + 'px' }}
    >
      <div
        className="main-content"
        style={{
          transformOrigin: 'left top',
          transform: `scale(${scaleObj.widthRadio},${scaleObj.heightRadio})`,
          WebkitTransform: `scale(${scaleObj.widthRadio},${scaleObj.heightRadio})`,
          MozTransform: `scale(${scaleObj.widthRadio},${scaleObj.heightRadio})`,
          OTransform: `scale(${scaleObj.widthRadio},${scaleObj.heightRadio})`,
          msTransform: `scale(${scaleObj.widthRadio},${scaleObj.heightRadio})`,
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
