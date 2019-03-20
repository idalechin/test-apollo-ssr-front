import React from 'react';
import {shallow} from 'enzyme';
import Button from './index'
import renderer from 'react-test-renderer';
import testIcon from './Rolling.svg'

const btnText = 'Check button'
const className = 'btn-test'

it('Test Button renders right', () => {
  const btn = renderer
    .create(<Button text={btnText} icon={testIcon} className={className}/>)
    .toJSON();
  expect(btn).toMatchSnapshot();
});

it('Test Button text', () => {
  const button = shallow(<Button text={btnText}/>);
  expect(button.text()).toEqual(btnText);
})