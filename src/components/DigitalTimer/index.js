// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeInSeconds: 0, timerLimitInMinutes: 25}

  onIncrementTimer = () => {
    const {timerLimitInMinutes} = this.state
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecrementTimer = () => {
    const {timerLimitInMinutes} = this.state
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
    }))
  }

  renderTimeLimitControl = () => {
    const {timerLimitInMinutes, timeInSeconds} = this.state
    const isButtonsDisabled = timeInSeconds > 0

    return (
      <div>
        <p>Set Timer Limit</p>
        <div>
          <button
            type="button"
            onClick={this.onDecrementTimer}
            disabled={isButtonsDisabled}
          >
            -
          </button>
          <p>{timerLimitInMinutes}</p>
          <button
            type="button"
            onClick={this.onIncrementTimer}
            disabled={isButtonsDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onReset = () => {
    clearInterval(this.intervalID)
    this.setState({
      isTimerRunning: false,
      timerLimitInMinutes: 25,
      timeInSeconds: 0,
    })
  }

  incrementTimeInSeconde = () => {
    const {timeInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      clearInterval(this.intervalID)
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds + 1}))
    }
  }

  startOrPauseTimer = () => {
    const {isTimerRunning, timeInSeconds, timerLimitInMinutes} = this.state
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    const isTimerCompleted = timeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      clearInterval(this.intervalID)
    } else {
      this.intervalID = setInterval(this.incrementTimeInSeconde, 1000)
    }
  }

  renderTimerControl = () => {
    const {isTimerRunning} = this.state
    const startPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div>
        <button type="button" onClick={this.startOrPauseTimer}>
          <img src={startPauseImgUrl} alt={startPauseAltText} />
          <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button type="button" onClick={this.onReset}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
        </button>
      </div>
    )
  }

  getTimer = () => {
    const {timeInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="display-container">
            <div className="timer-display-container">
              <h1>{this.getTimer()}</h1>
              <p>{labelText}</p>
            </div>
          </div>
          <div className="control-containers">
            {this.renderTimerControl()}
            {this.renderTimeLimitControl()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
