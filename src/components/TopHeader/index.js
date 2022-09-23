import { useClockHook } from '@/hooks';
import { useState } from 'react';
import './index.less';

export default function (props) {
  const { date, time } = useClockHook();
  const [leftChoosed, switchLeftChoosed] = useState(false);
  const [rightChoosed, switchRightChoosed] = useState(false);

  const handleClickLeft = () => {
    switchLeftChoosed(true);
  };

  const handleClickRight = () => {
    switchRightChoosed(true);
  };

  return (
    <div className="top-header">
      <div
        className={`subtitle subtitle-left ${
          leftChoosed ? 'left-choosed' : 'left-no-choose'
        }`}
        onClick={handleClickLeft}
      >
        xxxx系统
      </div>
      <div className="header-title">智慧农业大数据检测中心</div>
      <div
        className={`subtitle subtitle-right ${
          rightChoosed ? 'right-choosed' : 'right-no-choose'
        }`}
        onClick={handleClickRight}
      >
        xxxx系统
      </div>
      <div className="time">
        <span>{date} </span>
        <span>{time}</span>
      </div>
      <div className="header-light" />
    </div>
  );
}
