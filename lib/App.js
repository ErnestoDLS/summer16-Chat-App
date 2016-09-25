import React from 'react'



export default React.createClass({
  getInitialState() {
    return {
      users: []
    }
  },
  getDefaultProps() {
    return {
      source: "http://tiny-tiny.herokuapp.com/collections/ernesto_chat"
    }
  }
})
