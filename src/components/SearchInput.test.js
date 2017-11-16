import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from './SearchInput';

const wrapper = shallow(<SearchInput />);

describe.only('SearchInput Component', () => {
  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
