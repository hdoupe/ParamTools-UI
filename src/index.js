import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Value extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.handleValueChange(e.target.value)
  }

  render() {
    const value = this.props.value;
    return (
      <fieldset>
        <label> Value:
          <input value={value} onChange={this.handleChange}/>
        </label>
      </fieldset>
    );
  }
}

class Param extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleNameChange(e) {
    console.log("name change bef: " + JSON.stringify(this.state));
    this.setState(
      {name: e.target.value},
      () => this.props.handleParamChange(this.props.value, {[this.state.name]: this.state.value})
    );
    console.log("name change aft: " + JSON.stringify(this.state));
  }

  handleValueChange(value) {
    console.log("value change bef: " + JSON.stringify(this.state) + " " + value);
    this.setState(
      {value},
      () => this.props.handleParamChange(this.props.value, {[this.state.name]: this.state.value})
    );
    console.log("value change aft: " + JSON.stringify(this.state) + " " + value);
  }

  render() {
    const name = this.state.schemaName;
    const value = this.state.value;
    return (
      <fieldset>
        <label>
          Parameter Name {this.props.value}:
          <input type="text" name="name" value={name} onChange={this.handleNameChange} />
        </label>
        <Value handleValueChange={this.handleValueChange} value={value}/>
      </fieldset>
    );
  }
}

class Schema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schemaName: "",
      params: [],
    };
    this.handleSchemaNameChange = this.handleSchemaNameChange.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);
  }

  handleSchemaNameChange(e) {
    this.setState({schemaName: e.target.value});
  }

  handleParamChange(i, param) {
    var params = this.state.params;
    params[i] = param;
    console.log("bef: " + JSON.stringify(params))
    this.setState({params: params});
    console.log("aft: " + JSON.stringify(this.state.params));
  }

  render() {
    const schemaName = this.state.schemaName;
    const paramstring = JSON.stringify(this.state.params);
    return (
      <fieldset>
        <h1>ParamTools UI</h1>
        <label>
        Schema Name:
        <input
          type="text"
          name="name"
          value={schemaName}
          onChange={this.handleSchemaNameChange} />
        </label>
        <p>{paramstring}</p>
        <Param handleParamChange={this.handleParamChange} value="0"/>
        <Param handleParamChange={this.handleParamChange} value="1"/>
      </fieldset>
    );
  }
}


// ========================================

ReactDOM.render(
  <Schema />,
  document.getElementById('root')
);