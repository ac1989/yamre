import React from 'react';
import { shallow } from 'enzyme';
import { InputDynamic } from './InputDynamic';

const wrapper = shallow(<InputDynamic />);

describe.only('InputDynamic Component', () => {
  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
