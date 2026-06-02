import { RotatingLines } from 'react-loader-spinner';

export const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
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
  )
}

export default Loading;
