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
    this.setState({name: e.target.value});
    this.props.handleParamsChange({[this.state.name]: this.state.value});
  }

  handleValueChange(value) {
    this.setState({value});
    this.props.handleParamsChange({[this.state.name]: this.state.value});
  }

  render() {
    const name = this.state.schemaName;
    const value = this.state.value;
    return (
      <fieldset>
        <label>
          Parameter Name:
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
      params: {},
    };
    this.handleSchemaNameChange = this.handleSchemaNameChange.bind(this);
    this.handleParamsChange = this.handleParamsChange.bind(this);
  }

  handleSchemaNameChange(e) {
    this.setState({schemaName: e.target.value});
  }

  handleParamsChange(params) {
    var newparams = Object.assign(this.state.params, params);
    this.setState({params: newparams});
  }

  render() {
    const schemaName = this.state.schemaName;
    const paramstring = JSON.stringify(this.state.params);
    return (
      <fieldset>
        <h1>paramTools UI</h1>
        <label>
        Schema Name:
        <input
          type="text"
          name="name"
          value={schemaName}
          onChange={this.handleSchemaNameChange} />
        </label>
        <p>{paramstring}</p>
        <Param handleParamsChange={this.handleParamsChange}/>
        <Param handleParamsChange={this.handleParamsChange}/>
      </fieldset>
    );
  }
}


// ========================================

ReactDOM.render(
  <Schema />,
  document.getElementById('root')
);