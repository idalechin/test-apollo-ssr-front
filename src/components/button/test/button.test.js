import React from "react";
import { shallow, mount } from "enzyme";
import {render, fireEvent, cleanup} from 'react-testing-library'
import Button from "../index";
import renderer from "react-test-renderer";
import testIcon from "./ic_star_black_24px.svg";
import activeTestIcon from "./ic_star_border_black_24px.svg";

afterEach(cleanup)

const btnText = "Check button";
const className = "btn-test";
const mockCallback = jest.fn();

describe('<Button />', () => {
  it("Test renders right", () => {
    const btn = renderer
      .create(
        <Button
          text={btnText}
          icon={testIcon}
          className={className}
          activeIcon={activeTestIcon}
          disable
          toggle
          onClick={() => console.log(btnText)}
        />
      )
      .toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("Test click", () => {
    const button = shallow(<Button onClick={mockCallback} />);
    button.find('button').simulate('click');
    expect(mockCallback.mock.calls.length).toEqual(1);
  });

  it("Test active click", () => {
    const {container} = render(<Button onClick={mockCallback} toggle={true}/>)
    const btn = container.firstChild

    expect(btn.classList.contains('active')).toBe(false)

    fireEvent.click(btn)

    expect(btn.classList.contains('active')).toBe(true)
  });
})
