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
import BackgroundCard from './BackgroundCard'
import TimerCard from './TimerCard'
const styles = {
  card: {
    maxWidth: (400 / 3) * 2,
    margin: 10
  },
  media: {
    height: (250 / 3) * 2
  },
  CardContent: {
    height: 26,
    padding: 10
  }
}
class Menu extends Component {
  constructor(props) {
    super(props)
    // Don't call this.setState() here!
    this.state = { init: 0 }
    this.clickHandler = props.clickHandler
  }
  onClick() {
    if (!this.props.clickable) {
      return
    }
    console.log('click from Menu,will call parent onclick')
    this.clickHandler(this.props.page)
  }
  render() {
    if (this.props.page == 'background_card') {
      return <BackgroundCard />
    } else if (this.props.page == 'timer_card') {
      return <TimerCard />
    } else {
      var image = null
      if (this.props.image) {
        image = (
          <CardMedia
            style={styles.media}
            image={this.props.image}
            title="Contemplative Reptile"
          />
        )
      }

      return (
        <Card style={styles.card} onClick={this.onClick.bind(this)}>
          <CardActionArea>
            {image}
            <CardContent style={styles.CardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )
    }
  }
}
export default Menu
