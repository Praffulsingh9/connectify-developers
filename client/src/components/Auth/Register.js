import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your ConnectifyDev account
              </p>
              <form noValidate onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="Name"
                  error={errors.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                  error={errors.email}
                  onChange={this.onChange}
                  info="This site uses Gravatar so if you want a profile image use a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="New Password"
                  error={errors.password}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  placeholder="Confirm Password"
                  error={errors.password2}
                  onChange={this.onChange}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
