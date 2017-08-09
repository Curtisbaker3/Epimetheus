import React from 'react';
import { TextField, RaisedButton, AppBar, Chip } from 'material-ui';
import { Meteor } from 'meteor/meteor';

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            userId: null,
            name: null
        };
    }

    handleClick() {
        var name = document.getElementById('name').value;
        Meteor.call('registerUser', name, this.callThisWhenFinished.bind(this));
    }

    callThisWhenFinished(error, userId) {
        if (error) {
            console.log('Error: ', error.message);
        } else {
            this.setState({
                userId: userId,
                name: document.getElementById('name').value
            });
        }
    }

    render() {
        return (
            <div>
                <AppBar title="Epimetheus" />
                {this.renderNameEntry()}
            </div>
        );
    }

    renderNameEntry() {
        if (!this.state.name) {
            return (
                <div>
                    <TextField id="name" />
                    <RaisedButton primary={true} label="Join Game" onClick={e => this.handleClick(e)} />
                </div>
            );
        } else {
            return <Chip>{ this.state.name }</Chip>
        }
    }
}