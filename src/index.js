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
    const value = this.props.valueobject["value"];
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
      value: {value: ''},
    };
    console.log("key " + this.props.ix);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleNameChange(e) {
    this.setState(
      {name: e.target.value},
      () => this.props.handleParamChange(this.props.ix, this.state)
    );
  }

  handleValueChange(value) {
    this.setState(
      {value: {value: value}},
      () => this.props.handleParamChange(this.props.ix, this.state)
    );
  }

  render() {
    const name = this.state.schemaName;
    const value = this.state.value;
    return (
      <fieldset>
        <label>
          Parameter Name {this.props.ix}:
          <input type="text" name="name" value={name} onChange={this.handleNameChange} />
        </label>
        <Value handleValueChange={this.handleValueChange} valueobject={value}/>
      </fieldset>
    );
  }
}

class Schema extends React.Component {
  constructor(props) {
    super(props);
    this.handleSchemaNameChange = this.handleSchemaNameChange.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);
    this.handleAddParam = this.handleAddParam.bind(this);
    this.state = {
      schemaName: "",
      params: [],
      paramitems: [
        <Param handleParamChange={this.handleParamChange} ix="0" key="0"/>,
        <Param handleParamChange={this.handleParamChange} ix="1" key="1"/>,
      ],
    };
  }

  handleSchemaNameChange(e) {
    this.setState({schemaName: e.target.value});
  }

  handleParamChange(i, param) {
    var params = this.state.params;
    params[i] = param;
    this.setState({params: params});
  }

  handleAddParam(e) {
    this.setState((state, props) => {
      const n = this.state.paramitems.length;
      let paramitems = this.state.paramitems;
      paramitems.push(
        <Param handleParamChange={this.handleParamChange} ix={n} key={n.toString()}/>
      );
      return {
        paramitems: paramitems,
      };
    });
    console.log(this.state.paramitems);
    console.log("length: " + this.state.paramitems.length);
  }

  render() {
    const schemaName = this.state.schemaName;
    const paramstring = JSON.stringify(this.state.params, null, 4);
    let paramitems = this.state.paramitems;
    console.log("param length: " + paramitems.length);
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
        <pre><code className="jsonparams">{paramstring}</code></pre>
        {paramitems}
        <button onClick={this.handleAddParam}>Add Parameter</button>
      </fieldset>
    );
  }
}


// ========================================

ReactDOM.render(
  <Schema />,
  document.getElementById('root')
);