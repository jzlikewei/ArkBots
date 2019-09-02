import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 2
  },
  title: {
    flexGrow: 1
  }
}

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.backHandler = this.props.backHandler
  }
  goBack() {
    this.backHandler()
  }
  render() {
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              style={styles.menuButton}
              color="inherit"
              aria-label="back"
              onClick={
                this.props.page != 'root' ? this.goBack.bind(this) : null
              }
            >
              {this.props.page != 'root' ? <ArrowBackIcon /> : null}
            </IconButton>
            <Typography variant="h6" style={styles.title}>
              ArkBots
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
