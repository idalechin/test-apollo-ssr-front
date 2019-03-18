import React, { Component } from "react";
import { NavLink, Link, withRouter, matchPath } from "react-router-dom";
import _get from "lodash/get";
import viewport from "viewport-dimensions";
import universal from 'react-universal-component'

import LogoIcon from "./logo_small_blue.svg";
import LogoBigIcon from "./bigdaymade_blue.svg";
import Icon from "../icon";
import LoginBtn from "./loginBtn";

import history from "../../history";
import { menuLinks } from "../../constants";
import "./style.scss";

const HomeComponent = universal(import('../../containers/Home'))
const VendorsComponent = universal(import('../../containers/vendors'))
const VenuesComponent = universal(import('../../containers/venues'))
const SigninComponent = universal(import('../../containers/signin-page'))

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showMobileSearch: false
		};
	}

	componentDidMount(){
		HomeComponent.preload()
		VendorsComponent.preload()
		VenuesComponent.preload()
		SigninComponent.preload()
	}

	renderNav() {
		const { location } = this.props;
		return (
			<nav className="header__nav full-screen--sm">
				<ul className="header__nav-list">
					<li className="header__nav-item">
						<NavLink
							to={menuLinks.venues}
							className={location.pathname.match("/venues") ? "active" : ""}
						>
							Venues
						</NavLink>
					</li>
					<li className="header__nav-item">
						<NavLink
							to={menuLinks.vendors}
							className={location.pathname.match(/^\/vendors/) ? "active" : ""}
						>
							Vendors
						</NavLink>
					</li>
				</ul>
			</nav>
		);
	}

	renderLeft() {
		const { searchAutocomplete, showDropdown, value } = this.props;

		return (
			<div className="header__side header__side--left">
				<Link
					className="full-screen--sm header__logo-wrapper"
					to={menuLinks.mainPage}
				>
					<Icon id={LogoIcon} className="header__logo" />
				</Link>
				<Link
					className="mobile mobile--sm full-screen--xxs-md"
					to={menuLinks.mainPage}
				>
					<Icon id={LogoBigIcon} className="header__logo" />
				</Link>
				<Link className="mobile mobile--xxs-md" to={menuLinks.mainPage}>
					<Icon id={LogoIcon} className="header__logo " />
				</Link>
				{this.renderNav()}
			</div>
		);
	}

	renderRightMenu() {
		return (
			<div className="flex header__sign-menu">
				<LoginBtn/>
			</div>
		);
	}

	renderRight() {
		const {
			location,
			user,
			searchAutocomplete,
			showDropdown,
			value,
		} = this.props;
		const { pathname } = history.location;
		const width = viewport.width();		

		return (
			<div className="header__side header__side--right">
				{this.renderRightMenu()}
			</div>
		);
	}

	render() {
		const {
			blur,
		} = this.props;
		const { showMobileSearch } = this.state;
		const { pathname } = history.location;

		return (
			<header className={`header ${blur ? "header--blur" : ""}`}>
				<div className="container container--header">
					<div className="header__wrapper">
						{this.renderLeft()}
						{this.renderRight()}
					</div>
				</div>
			</header>
		);
	}
}

export default withRouter(Header);
