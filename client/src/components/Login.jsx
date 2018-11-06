import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Login extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props.user)
    let user = this.props.user
    console.log(this.props.user.token)
  if (this.props.user.token != undefined){
    return (
      <h3> Welcome, {this.props.user.name} </h3>
      );
    }
  else {
    return (
      <div>
      <div>Log In Sign Up</div>
      <div>
      <form>
  <label>
    Username:
    <input type="text" name="Username" onChange={this.props.updateUserName} value={this.props.user.name} />
  </label>
</form>
      </div>
      <div>
      <form>
  <label>
    Password:
    <input type="text" name="Password" onChange={this.props.updateUserPassword} value={this.props.user.password} />
  </label>

</form>
      </div>
      <div>
      <form>
  <label>
    Confirm Password:
    <input type="text" name="Confirm" onChange={this.props.updatePasswordConfirmation} value={this.props.user.passwordConfirm} />
  </label>
  
</form>
      </div>
      <div>
      <form>
  <label>
    Email:
    <input type="text" name="Email" onChange={this.props.updateUserEmail} value={this.props.user.email} />
  </label>
</form>
      </div>
      <div>  
      <Button bsStyle="primary" onClick={(e) => this.props.loginUser(user)}>Login</Button> 
      </div>
    </div>
      );
    }
  }
}

export default Login;    