import React from 'react'



export default React.createClass({
  removeButton() {
    <li clickHandler={this.removeChatMessage}>X</li>
  },


  getInitialState() {
    return {
      chatMessages: [
        {
          name: "",
          message: ""
        }
      ]
    }
  },
  removeChatMessage: function() {
    this.setState({ chatMessages: false });
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
    xhr.open("GET","http://tiny-tiny.herokuapp.com/collections/ernesto_chat");
    xhr.send();
  },
  onSubmitMessageHandler(e){
    e.preventDefault();
    var chatMessageValue = this.refs.chatMessage.value;

    var newChatStringified = JSON.stringify({
      user: "Guest",
      message: chatMessageValue

    });
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e) => {
      var resp = JSON.parse(e.target.response);
      this.getChatMessages();
      this.refs.chatMessageValue.value= "";
    });

    xhr.open("POST","http://tiny-tiny.herokuapp.com/collections/ernesto_chat");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(newChatStringified);
  },
  render() {
    return (
      <section>
        <header className="app__header">
          <h1>Lets Chat App!</h1>
        </header>
        <ul className="app__container">
          {this.state.chatMessages.map((message, i) => {
            return <li key={i}
                       className="app__log">
                       <h3 className="app__user">{message.user}</h3>
                       <button onClick={this.props.clickHandler}> X </button>
                       <p className="app__message">{message.message}</p>
            </li>
          }).reverse()}
        </ul>
        <form method="POST"
              action="#"
              onSubmit={this.onSubmitMessageHandler}>
            <input type="text"
                   className="input__bar"
                   placeholder="Message me"
                   ref="chatMessage"/>
            <input type="submit" value="Send"/>
        </form>
      </section>
    )
  }
})
