import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <ThreeCircles
        height="75vh"
        width="75vw"
        color="#4fa94d"
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#727478"
        innerCircleColor="#bbbfc4"
        middleCircleColor="#ebf0f7"
      />
    </div>
  );
};
