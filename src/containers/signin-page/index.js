import React, { Component } from "react";
import { withFormik, Field } from "formik";
import Button from "../../components/button";
import TextInput from "../../components/form-elements/text-input";
import LogoIcon from "./bigdaymade_blue.svg";
import Loader from "../../components/loader";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import Cookies from "js-cookie";
import history from "../../history";

import { API_URI } from "../../constants";

import Icon from "../../components/icon";

import validator from "validator";

import "./style.scss";

const SIGNIN_USER = gql`
	mutation($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			token
		}
	}
`;

const Signin = ({ handleSubmit, valid, status, errors, serverError }) => {
	const hasErrors = errors && Object.keys(errors).length;
	const renderErrors = () => {
		if (!hasErrors && !serverError) return;

		const serverErrorMessage =
			typeof serverError === "object" ? serverError.message : serverError;

		if (errors)
			return (
				<span className="text-danger error">
					{errors.email || errors.password || null}
				</span>
			);
		if (serverErrorMessage)
			return <span className="text-danger error">{serverErrorMessage}</span>;
	};

	if (status === "loading") {
		return <Loader className="full-screen" />;
	}

	return (
		<div className="container">
			<div className="signin-page__body">
				<div className="signin-page__content">
					<p className="signin-page__logo-wrapper">
						<Icon id={LogoIcon} className="signin-page__logo" />
					</p>

					<p className="signin-page__desc">
						Where engaged couples <br /> come to make their big day happen.
					</p>

					<form
						className="signin-page__form"
						onSubmit={handleSubmit}
						noValidate
					>
						<fieldset className="signin-page__fieldset">
							<div className="signin-page__separator">
								<div className="signin-page__separator-line" />
								<span className="signin-page__separator-text">or</span>
							</div>
						</fieldset>

						<fieldset className="signin-page__fieldset">
							<div className="signin-page__text-input text-input--without-error">
								<Field
									component={TextInput}
									name="email"
									placeholder="Email"
									className="text-input__input--small "
								/>
							</div>
						</fieldset>

						<fieldset className="signin-page__fieldset">
							<div className="signin-page__text-input  text-input--without-error">
								<Field
									component={TextInput}
									name="password"
									type="password"
									placeholder="Password"
									className="text-input__input--small"
								/>
							</div>
						</fieldset>

						<fieldset className="signin-page__fieldset">
							<Button
								action="submit"
								text="Log In"
								className={`btn--modal btn--full-width ${
									hasErrors ? "disabled" : ""
								}`}
							/>
						</fieldset>
						{renderErrors()}
					</form>
				</div>
			</div>
		</div>
	);
};

export default compose(
	graphql(SIGNIN_USER, {
		options: {
			update: (proxy, { data }) => {
				const token = _.get(data, "signIn.token");
				token && Cookies.set("token", token);
				history.push("/");
			},
			refetchQueries: [
				{
					query: gql`
						query {
							fetchMe {
								id
							}
						}
					`
				}
			]
		}
	}),
	withFormik({
		mapPropsToValues: () => ({ email: "", password: "" }),

		validate: values => {
			let errors = {};
			if (!values.email) {
				errors.email = "Please, enter email";
			} else {
				if (!validator.isEmail(values.email)) {
					errors.email = "Please, enter valid email";
				}
			}

			if (!values.password) {
				errors.password = "Please enter password";
			}
			return errors;
		},

		handleSubmit: (values, { setSubmitting, props }) => {
			console.log("props: ", props);
			console.log("values: ", values);
			props.mutate({
				variables: values
			});
		},

		displayName: "AuthForm"
	})
)(Signin);
