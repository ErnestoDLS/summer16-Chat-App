import React from 'react'



export default React.createClass({
  getInitialState() {
    return {
      chatMessages: [
        {
          name: "",
          message: "",
          time: ""
        }
      ]
    }
  },
  componentDidMount() {
    window.setInterval(() => {
      this.getchatMessages()
    },2000)
  },
  getchatMessages() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e) => {
      var resp = JSON.parse(e.target.response);
      this.setState({
        chatMessages: resp
      });

    });
    xhr.open("GET","http://tiny-tiny.herokuapp.com/collections/ernesto__chatApp");
    xhr.send();
  },
  onSubmitMessageHandler(e){
    e.preventDefault();
    var chatMessageValue = this.refs.chatMessage.value;

    var newChatStringified = JSON.stringify({
      name: chatMessageValue
    });
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e) => {
      var resp = JSON.parse(e.target.response);
      this.getChatMessages();
    });
    xhr.open("POST","http://tiny-tiny.herokuapp.com/collections/ernesto__chatApp");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(newChatStringified);
  },
  render() {
    return (
      <section>
        <h1>Let's Chat App!</h1>

        <form method="POST"
              action="#"
              onSubmit={this.onSubmitMessageHandler}>
            <input type="text"
                   placeholder="Message me"
                   ref="message"/>
            <input type="submit" value="Send"/>
        </form>
      </section>
    )
  }
})
