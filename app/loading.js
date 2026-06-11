import { RotatingLines } from 'react-loader-spinner';
import './loading.css';

export const Loading = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="backdrop">
      <div>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        {/* <Triangle
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass="" /> */}
      </div>
    </div>
  )
}

export default Loading;
