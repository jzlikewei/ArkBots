import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "./BackgroundCard.css"
import { SocketContext } from './SocketContext'
import { withStyles } from '@material-ui/core/styles';
const styles = {
  card: {
    maxWidth: (400 / 3) * 2,
    margin: 10
  },
  media: {
    height: (250 / 3) * 2
  },
  CardContent: {

    padding: 10,
  }
}
export default class BackgroundCard extends Component {
  constructor(props) {
    super(props)
    // Don't call this.setState() here!
    this.state = {
      running: false,
      stage_key: 'f',
      start_key: 'g',
      empty_key: 'e',
      mission_time: 128,
    }
    this.clickHandler = props.clickHandler
  }

  onClick() {
    console.log('setting state to :' + (!this.state.running).toString())
    if (!this.state.running) {
      console.log(this.context)
      this.context.socket.send(JSON.stringify({
        cmd: "background_mode",
        stage_key: this.state.stage_key,
        start_key: this.state.start_key,
        empty_key: this.state.empty_key,
        mission_time: this.state.mission_time,
      }))
    }
    this.setState({ running: !this.state.running })

  }
  onChange(key, value) {
    var obj = {}
    obj[key] = value
    this.setState(obj);
  }
  render() {
    var image = null

    return (
      <Card style={styles.card}>


        <CardContent style={styles.CardContent}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                className="input"
                id="outlined-name"
                label="关卡快捷键"
                value={this.state.stage_key}
                onChange={e => this.onChange("stage_key", e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-name"
                label="开始快捷键"
                // value={values.name}
                value={this.state.start_key}
                onChange={e => this.onChange("start_key", e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id="outlined-name"
                label="空白快捷键"
                // value={values.name}
                value={this.state.empty_key}
                onChange={e => this.onChange("empty_key", e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-name"
                label="作战时间"
                // value={values.name}
                value={this.state.mission_time}
                onChange={e => this.onChange("mission_time", e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Button color={this.btn_color()} onClick={this.onClick.bind(this)}>
            {this.btn_text()}
          </Button>
        </CardContent>

      </Card>
    )
  }

  btn_color() {
    if (!this.state.running) {
      return "primary"
    } else {
      return "secondary"
    }
  }

  btn_text() {
    if (!this.state.running) {
      return "Go"
    } else {
      return "Stop"
    }
  }
}
BackgroundCard.contextType = SocketContext
