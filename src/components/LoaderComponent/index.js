import Loader from 'react-loader-spinner'

import './index.css'

const LoaderComponent = () => (
  <div className="loader-container" testid="loader">
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  </div>
)

export default LoaderComponent
