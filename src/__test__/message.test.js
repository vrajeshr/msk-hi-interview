import React from "react";
import ReactDOM from 'react-dom';

import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Message from '../Chat/Message'

describe("<Message />", () => {

  it('Component should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Message />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it("Contains proper tags given message", () => {
    const inputMesssage = "Hello world!"
    const key = 0
    const currentUser = "unitTester"

    const displayedMessage = shallow(<Message key={key} user={currentUser} message={inputMesssage} />);

    expect(displayedMessage.containsMatchingElement(
      <p className="usersName">
        unitTester
      </p>
    )).toBeTruthy()
  });
});
