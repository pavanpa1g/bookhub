import './index.css'

const SomethingWentWrong = ({tryAgain}) => {
  const onTryAgain = () => {
    tryAgain()
  }

  return (
    <div className="something-went-wrong-container">
      <img
        src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686476353/Group_7522_a5cyer.png"
        alt="failure view"
        className="something-went-wrong-image"
      />
      <p className="something-went-wrong-text">
        Something went wrong. Please try again
      </p>
      <button type="button" className="try-again-button" onClick={onTryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default SomethingWentWrong
