import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Markdown from 'react-markdown';
import Moment from 'react-moment';
import _ from 'lodash';

import { POST_OBJECTS } from '../../constants';
import { postObjShape } from '../../propShapes';

import NiceSlider from '../niceSlider/niceSlider';


class Main extends Component {
  state = {
    selectedPostName: POST_OBJECTS[0].name,
    selectedLevel: 0,
  }

  setSelectedLevel = level => {
    this.setState({selectedLevel: level});
  }

  render() {
    const { selectedPostName, selectedLevel } = this.state;
    const selectedPost = _.find(POST_OBJECTS, {name: selectedPostName});
    const numLevels = selectedPost.content.length;
    return (
      <div className="main">
        <Post postObj={selectedPost}
              level={selectedLevel} />
        <LevelSelector numLevels={numLevels}
                       selectedLevel={selectedLevel}
                       setSelectedLevelFunc={this.setSelectedLevel} />
      </div>
    );
  }
}


export default Main;


class Post extends Component {
  render() {
    const { postObj, level } = this.props;
    const { title, author, content, timePosted } = postObj;
    const text = content[level];
    return (
      <div className="post-container">
        <h1> {title} </h1>
        <div className="post-metadata">
          <div> by {author} </div>
          <div>
            <Moment date={timePosted}
                    format="MMM D, YYYY" />
          </div>
        </div>
        <Markdown source={text} />
      </div>
    )
  }
}

Post.propTypes = {
  postObj: postObjShape.isRequired,
  level: PropTypes.number.isRequired,
}


class LevelSelector extends Component {
  numStepsPerValue = 100

  setSelectedLevel = val => {
    const { setSelectedLevelFunc } = this.props;
    console.log('val', val);
    setSelectedLevelFunc(val);
  }

  render() {
    const { numLevels, selectedLevel } = this.props;
    return (
      <div className="level-selector-container">
        <NiceSlider numValues={numLevels}
                    value={selectedLevel}
                    onChange={this.setSelectedLevel} />
      </div>
    )
  }
}
