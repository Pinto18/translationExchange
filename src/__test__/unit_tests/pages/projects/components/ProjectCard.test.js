/*global describe it expect jest*/
import React from 'react';
import {shallow} from 'enzyme';
import ProjectCard from '../../../../../js/pages/projects/components/ProjectCard';

describe('Project Card Test Suite', () => {
  const mockProps = {
    bookName: 'genesis',
    version: 'ulb',
    history: [],
    dateModified: '5/1/18',
    language: 'eng',
    txt: {
      review: 'review',
    },
    mode: 'chunk',
    getChapters: jest.fn(),

  };

  const wrapper = shallow(<ProjectCard {...mockProps} />);

  it('should render the component correctly', () => {
    expect(wrapper.find('Card'));
    expect(wrapper.find('InformationContainer'));
    expect(wrapper.find('ButtonContainer'));
  });

  it( 'should handle the onClick(reviewProject) function', () => {
    wrapper.find('Card').simulate('click');
    expect(mockProps.history.length).toEqual(1);
    expect(wrapper.instance().props.getChapters.mock.calls.length).toEqual(1);

  });

});
