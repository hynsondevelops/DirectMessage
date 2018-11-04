import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Login extends Component {
  constructor(props){
    super(props);
  }

  render() {
  if (this.props.loggedIn){
    return (
      <div>
      <div>Log In Sign Up</div>
      <div>
      <form>
  <label>
    Username:
    <input type="text" name="Username" onChange={e => {console.log(e); this.props.updateUserName(e.target.value)}} value={this.props.user.name} />
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
      <div> LogInButton </div>
    </div>
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
      <Button bsStyle="primary" onClick={e => {}}>Register</Button> 
      </div>
    </div>
      );
    }
  }
}

export default Login;    