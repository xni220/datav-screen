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
        智慧农业
      </div>
      <div className="header-title">{window.pageConfig.title}</div>
      <div
        className={`subtitle subtitle-right ${
          rightChoosed ? 'right-choosed' : 'right-no-choose'
        }`}
        onClick={handleClickRight}
      >
        智慧农业
      </div>
      <div className="time">
        <span>{date} </span>
        <span>{time}</span>
      </div>
      <div className="header-light" />
    </div>
  );
}
