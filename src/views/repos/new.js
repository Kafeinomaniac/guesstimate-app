import React from 'react'
import t from 'tcomb-form'
import _ from 'lodash'

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'

let Form = t.form.Form;

let Repo = t.struct({
  name: t.Str,
  description: t.Str
});

export default React.createClass({
  getInitialState() {
    return {
      options: {
        hasError: false,
        error: <i> Important Error!</i>,
      },
      value: {
        name: "",
        description: ""
      },
    }
  },

  save() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    // if validation fails, value will be null
    if (value) {
      // value here is an instance of Person
      console.log(value);
    }
  },

  onChange(value) {
    let newOptions = this.state.options
    let errors = this.errors(value)
    newOptions = {
      hasError: errors.length!=0,
      error: <i> {errors.join('')} </i>,
    }
    this.setState({value: value, options:newOptions})
  },

  errors(value) {
    let errors = []
    let allRepos = _.map(app.me.repos.models, function(n) {return n.name})
    if (_.contains(allRepos, value.name)){
      errors.push('name not unique')
    }
    return errors
  },

  ready() {
    return this.state.value.name !== "" && this.state.value.description !== "";
  },

  onSubmit(e) {
    e.preventDefault()
    let repoName = this.state.value.name
    let repoDescription = this.state.value.description
    let newUrl = app.me.repos.create(repoName,repoDescription)
    app.router.history.navigate(newUrl)
  },

  onCancel(e){
    window.history.back()
  },

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Form
          type={Repo}
          options={this.state.options}
          value={this.state.value}
          onChange={this.onChange}
        />
      <ButtonToolbar>
        <button type='submit' className='btn btn-primary' disabled={this.state.options.hasError || !this.ready()}>Save</button>
        <button type='button' onClick={this.onCancel} className="btn btn-default">Cancel</button>
      </ButtonToolbar>
      </form>
    );
  }
});
