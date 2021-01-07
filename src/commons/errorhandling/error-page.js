import React from 'react'
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class ErrorPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = event => {
        event.preventDefault();
        this.props.history.push("/");
    }

    render() {
        return (
            <div align='center'>
                <div align='center'>
                    <Button
                        onClick={this.handleLogin}
                        type="submit"
                        style={{backgroundColor: '#b50000', color: '#000000'}}>
                        Home page
                    </Button>
                </div>

                <img src="https://ih1.redbubble.net/image.1046954141.7254/st,small,845x845-pad,1000x1000,f8f8f8.jpg"
                     alt="Garfield Access Denied"/>
            </div>
        )
    }
}

export default withRouter(ErrorPage);
