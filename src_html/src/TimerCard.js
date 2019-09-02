import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import './BackgroundCard.css'
import { SocketContext } from './SocketContext'
import { withStyles } from '@material-ui/core/styles'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import TimerIcon from '@material-ui/icons/Timer'
import TimerOffIcon from '@material-ui/icons/TimerOff'
import Timer from 'react-compound-timer'
import { func } from 'prop-types'
const styles = {
  card: {
    maxWidth: (400 / 3) * 2,
    margin: 10
  },
  media: {
    height: (250 / 3) * 2
  },
  CardContent: {
    padding: 10
  }
}
export default class TimerCard extends Component {
  constructor(props) {
    super(props)
    // Don't call this.setState() here!
    this.state = { timer: 'running' }
    this.clickHandler = props.clickHandler
    this.timerState = 'STOPED'
  }

  onClick() {}

  render() {
    return (
      <Card>
        <div>
          <Timer lastUnit="s" startImmediately={false}>
            {({ start, resume, pause, stop, reset, _ }) => (
              <React.Fragment>
                <CardContent>
                  <Typography component="h1" variant="h5">
                    计时器
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    <Timer.Seconds /> S
                  </Typography>
                </CardContent>
                <div>
                  {this.timerState}
                  <IconButton
                    aria-label="reset"
                    onClick={() => {
                      console.log(this.timerState)
                      stop()
                      reset()
                      this.timerState = 'STOPED'
                    }}
                  >
                    <TimerOffIcon />
                  </IconButton>
                  <IconButton
                    aria-label="play/pause"
                    onClick={() => {
                      console.log(this.timerState)
                      if (this.timerState == 'PAUSED') {
                        resume()
                        this.timerState = 'PLAYING'
                      } else if (this.timerState == 'STOPED') {
                        start()
                        this.timerState = 'PLAYING'
                      } else if (this.timerState == 'PLAYING') {
                        pause()
                        this.timerState = 'PAUSED'
                      }
                    }}
                  >
                    <TimerIcon />
                  </IconButton>
                </div>
              </React.Fragment>
            )}
          </Timer>
        </div>
      </Card>
    )
  }

  btn_color() {
    if (!this.state.running) {
      return 'primary'
    } else {
      return 'secondary'
    }
  }

  btn_text() {
    if (!this.state.running) {
      return 'Go'
    } else {
      return 'Stop'
    }
  }
}
