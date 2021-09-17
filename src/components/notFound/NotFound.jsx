import React from "react";

/* export default class NotFound extends React.Component {
  state = {
    redirect: false,
	};
	timeout = 0;

  componentDidMount = () => {
    this.timeout = setTimeout(() => this.setState({ redirect: true }), 3000);
	};
	
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="NotFound">
        <h2>😳 Ooops, that route doesn't exist 😳</h2>
        <p>Redirecting you to the home...</p>
        <img src="https://c.tenor.com/gts-YRWmFvMAAAAd/yoda-dab.gif" alt="" />
      </div>
    );
  }
} */
export default class NotFound extends React.Component {
  timeout = 0;

  componentDidMount = () => {
    this.timeout = setTimeout(() => this.props.history.replace("/"), 3000);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <div className="NotFound">
        <h2>😳 Ooops, that route doesn't exist 😳</h2>
        <p>Redirecting you to the home...</p>
        <img src="https://c.tenor.com/gts-YRWmFvMAAAAd/yoda-dab.gif" alt="" />
      </div>
    );
  }
}
