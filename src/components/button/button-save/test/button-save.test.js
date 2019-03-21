import React from "react";
import { shallow, mount } from "enzyme";
import { render, fireEvent, cleanup } from "react-testing-library";
import SaveButton, { TOGGLE_VENDOR_SAVE, VENDOR_IS_SAVED } from "../index";
import renderer from "react-test-renderer";
import { MockClient } from '../../../../utils/testHelper'

const className = "btn-test";
const size = "small";
const id = "18";
const mocks = [
	{
		request: {
			query: VENDOR_IS_SAVED,
			variables: {id}
		},
		result: {
			data: {
				vendorIsSaved: { id, value: true }
			}
		}
	}
];

describe("<SaveButton />", () => {
	it("Test renders right", () => {
		const btn = renderer
			.create(
				<MockClient mocks={mocks}>
					<SaveButton
						type="vendor"
						id={id}
						className={className}
						size={size}
						border
					/>
				</MockClient>
			)
			.toJSON();
		expect(btn).toMatchSnapshot();
	});
});
