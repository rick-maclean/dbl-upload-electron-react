var React = require('react');

var LoginSubcomponent = React.createClass({


  localHandleLogin: function (e) {
    e.preventDefault();  //need to prevent the default behavior of the onSubmit button with this
            //normal behavior is to cause a reload and sending of the information to a server
    //note we will be acccessing the input fields via the ref attributes
    // eg ref="inputOwnerName"
    //note it receives an event handler  e
    //(note all functions have e passed to it but we might not use it as in localToggleAptDisplay)
    var tempLoginCredentials = {
      userName: this.refs.inputEmail.value,
      password: this.refs.inputPassword.value
    } //tempLoginCredentials
    //this.prop.subUsername = this.refs.inputEmail.value;
    //this.prop.subPassword = this.refs.inputPassword.value

    this.props.subHandleLogin(tempLoginCredentials);  //pass tempItem to this prop in main
  }, //localHandleLogin


   render: function() {
    return(
      <div className="panel panel-primary">
        <div className="panel-heading apt-addheading">Sign in with DBL account</div>
        <br/><p><i>Please enter your DBL log-in credentials.</i></p>
        <div className="panel-body">
          <form className="form-signin form-horizontal" onSubmit={this.localHandleLogin}>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="inputEmail">Username</label>
              <div className="col-sm-9">
                <input type="email" className="form-control"
                  id="inputEmail" ref="inputEmail" placeholder="Email address" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="inputPassword">Password</label>
              <div className="col-sm-9">
                <input type="password" className="form-control"
                  id="inputPassword" ref="inputPassword" placeholder="Password" />
              </div>
            </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary pull-right">Sign In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    ) // return
  } // render
}); // LoginSubcomponent

module.exports = LoginSubcomponent;
