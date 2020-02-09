import React from 'react';
import './App.css';
import messaging from './Messaging';
import Paho from 'paho-mqtt';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {connected: false, messages: []};
    messaging.register(this.handleMessage.bind(this));
  }

  render() {
    const connected = this.state.connected;
    const sendButton =
        connected ? <button onClick = {() => this.handleSendClick()}>
                        Send</button> : <button disabled>Send</button>;
                return (
			<div className='App'>
				<div class="video_container">

<video width="320" height="240" controls>
  <source src="video.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
Your browser does not support the video tag.
</video>

</div>



<div class="chatbox_container">

	<div class="chatbox_header">
	<p style="text-align:center;">Chatbox</p>
	</div>
	
	<div class="chatbox_inner">
		<div class="container">
		  <img src="./profile.png" alt="Avatar">
		  <p>Hello.</p>
		  <span class="time-right">11:00</span>
		</div>

		<div class="container darker">
		  <img src="./profile.png" alt="Avatar">
		  <p>Hey!</p>
		  <span class="time-left">11:01</span>
		</div>

		<div class="container">
		  <img src="./profile.png" alt="Avatar">
		  <p>Sweet!</p>
		  <span class="time-right">11:02</span>
		</div>

		<div class="container darker">
		  <img src="./profile.png" alt="Avatar">
		  <p>Nah</p>
		  <span class="time-left">11:05</span>
		</div>
	</div>
	<div class="send_messeage">
		<form>
		<input type="text" name="chat_input"><br><br>
		<input type="submit" value="Send">
		</form>
	</div>
				<ol>
					{
                                        this.state.messages.map((message, index) => {
      return <li key = {index}>{message}</li>
					})}
				</ol><
          /div>
		  );
	}

	handleMessage(message) {
		this.setState(state => {
			const messages = state.messages.concat(message.payloadString);
			return {
				messages,
				connected: state.connected,
			};
		  });
	}

	handleSendClick() {
		let message = new Paho.Message(JSON.stringify({text: "Hello"}));
		message.destinationName = "exampletopic";
		messaging.send(message);
	}

	handleConnectClick() {
		if (this.state.connected) {
			messaging.disconnect();
			this.setState({
				connected: false,
				messages: this.state.messages
			});
		} else {
			messaging.connectWithPromise().then(response => {
				console.log("Succesfully connected to Solace Cloud.", response);
				messaging.subscribe("exampletopic");
				this.setState({
					connected: true,
					messages: this.state.messages
				});
			}).catch(error => {
				console.log("Unable to establish connection with Solace Cloud, see above logs for more details.", error);
			});
		}
	}

}



export default App;
