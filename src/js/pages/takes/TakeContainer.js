import React, { Component } from 'react';
import TakePropTypes from "./components/TakePropTypes";
import axios from 'axios';
import config from "../../../config/config";
import {Button, Grid, Segment} from "semantic-ui-react";
import _ from 'lodash';
import Take from "./components/Take";


class TakeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            ratingLoading: false
        };
    }

    onMarkedForExportToggled () {
        var markedForExport = !this.props.take.take.is_export;

        axios.patch(config.apiUrl + 'takes/' + this.props.take.take.id + '/', {
            "is_export": markedForExport
        }).then((results) => {
            //update this take in state using the update method in ChapterContainer
            var updatedTake = _.cloneDeep(this.props.take);
            updatedTake.take = results.data;
            this.props.updateTakeInState(updatedTake);
        });
    }

    onRatingSet (newRating) {
        this.setState({ratingLoading: true});
        axios.patch(config.apiUrl + 'takes/' + this.props.take.take.id + '/',
            {"rating": newRating}
        ).then((results) => {
            //update this take in state using the update method in ChapterContainer
            var updatedTake = _.cloneDeep(this.props.take);
            updatedTake.take = results.data;
            this.props.updateTakeInState(updatedTake);
            this.setState({ratingLoading: false});
        });
    }

    onDeleteTake () {
        console.log("onDeleteTake");
        var self = this;
        axios.delete(config.apiUrl + 'takes/' + this.props.take.take.id + '/')
            .then(function(result) {
                self.props.deleteTakeFromState(self.props.take.take.id);
            }).catch(function(exception) {
                console.log(exception);
        });

    }

    render () {

        return (
            <Take count={this.props.count}
                  take={this.props.take.take}
                  author={this.props.take.user}
                  ratingLoading={this.state.ratingLoading}
                  onRatingSet={this.onRatingSet.bind(this)}
                  onMarkedForExportToggled={this.onMarkedForExportToggled.bind(this)}
                  source={this.props.source}
                  addToListenList={this.props.addToListenList}
                  onDeleteTake={this.onDeleteTake.bind(this)}
            />
                //other events that require requesting the server would go here
        );
    }
}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;