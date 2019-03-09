import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.css";

const inputStyle = {
  width: "50rem"
};

export const Message = ({ msg }) => (
  <small className="has-text-danger has-text-weight-light">{msg}</small>
);

export const TextField = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <div className="field">
      <label className="label">{props.label}:</label>
      <div className="control">
        <input className="input" {...field} {...props} style={inputStyle} />
      </div>
    </div>
  );
};

var Schema = Yup.object().shape({
  name: Yup.string().required("Name is required.")
});

class ParamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: this.props.initialValues
    };
  }

  render() {
    return (
      <div className="centered">
        <Formik
          initialValues={this.state.initialValues}
          onSubmit={(values, actions) => {
            console.log(values, actions);
            alert(JSON.stringify(values));
          }}
          validationSchema={Schema}
          render={({ props }) => (
            <Form>
              <p>{props && JSON.stringify(props.values)}</p>
              <div>
                <Field
                  type="text"
                  name="name"
                  component={TextField}
                  label="Schema name"
                  placeholder="Name of the schema"
                />
                <div>
                  <ErrorMessage
                    name="name"
                    render={msg => <Message msg={msg} />}
                  />
                </div>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ParamForm initialValues={{ name: "" }} />;
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
