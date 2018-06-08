import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../App.css";

class KeywordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.callback(this.state.keyword);
  }

  handleChange(event) {
    this.setState({ keyword: event.target.value });
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={2} />
          <Grid item xs={20}>
            <form className="keywordForm" onSubmit={this.handleSubmit}>
              <TextField
                id="keyword"
                label="keyword"
                value={this.state.keyword}
                onChange={this.handleChange}
                margin="normal"
              />
              <Button type="submit" value="Submit">
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default KeywordForm;
