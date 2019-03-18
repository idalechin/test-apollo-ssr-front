import React, { Component } from "react";
import AnimateHeight from "react-animate-height";
import { RadioGroup } from "react-radio-group";
import _groupBy from "lodash/groupBy";
import canUseDom from "can-use-dom";

import CustomCheckbox from "../../form-elements/custom-checkbox/index";
import Icon from "../../icon/index";
import ArrowIcon from "./arrow-up.svg";
import FilterIcon from "./funnel.svg";
import RadioButton from "../../form-elements/radio-button";
import SortDropdown from "../../dropdown/sort";

import {
	PRICE_LEVEL_LIST,
	DISTANCE_lIST,
	VENDORS_SORT
} from "../../../constants";
import "./style.scss";
import history from "../../../history";

export default class VendorsSidebar extends Component {
	constructor(props) {
		super(props);

    const { categories } = props;

		this.state = {
			show: false,
			categories: categories
				? categories.filter(item => {
						if (
							item.category !== "Venues" &&
							item.category !== "Ceremony Venues"
						)
							return item;
				  })
				: null,
			categoriesState: "closed",
			locationsState: "closed",
			budgetState: "closed",
			distanceState: "closed",
			activeState: null
		};
	}

	componentWillReceiveProps(newProps) {
		const { categories } = newProps;

		// Remove venues from categories, because we have standalone venues section
		const categoriesWithoutVenue = categories
			? categories.filter(item => {
					if (item.category !== "Venues" && item.category !== "Ceremony Venues")
						return item;
			  })
			: null;

		this.setState({ categories: categoriesWithoutVenue });

		this.onToggleSection = this.onToggleSection.bind(this);
	}

	onToggleSection(section, type) {
		if (type === "header") {
			this.setState({
				[section]: this.state[section] === "closed" ? "short_list" : "closed"
			});
		}

		if (type === "toggle") {
			this.setState({
				[section]:
					this.state[section] === "short_list" ? "full_list" : "short_list"
			});
		}

		if (section === "locationsState") {
			this.setState({ activeState: null });
		}
	}

	onToggleFilter() {
		this.setState({ show: !this.state.show });
	}

	onOptionSelected(place) {
		const { filters, filterFields, geo } = this.props;
		if (place && place.city) {
			this.props.geoSetCurrent(place);
			this.props.fetchVendors(filters);
			if (canUseDom && window && window.analytics) {
				window.analytics.track("VENDORS_GEO_ENTRY", { place });
			}
		}
	}

	renderFilterSection({
		stateKey,
		arrayName,
		array,
		sectionTitle,
		initialArray,
		type,
		handler
	}) {
		const sectionState = this.state[stateKey];

		if (initialArray && initialArray.length) {
			const getHeight = () => {
				if (sectionState === "closed") {
					return 0;
				} else {
					return "auto";
				}
			};

			return (
				<div className="vendors-sidebar__section">
					<div
						className="vendors-sidebar__section-header"
						onClick={() => this.onToggleSection(stateKey, "header")}
					>
						<h3 className="vendors-sidebar__section-title">{sectionTitle}</h3>
						<Icon
							id={ArrowIcon}
							className={`vendors-sidebar__section-arrow ${
								sectionState === "closed" ? "" : "open"
							}`}
						/>
					</div>
					<AnimateHeight duration={300} height={getHeight()}>
						<ul className="vendors-sidebar__list">
							{this.renderSectionList({
								type,
								array,
								arrayName,
								initialArray,
								handler
							})}
						</ul>
					</AnimateHeight>
				</div>
			);
		}
	}

	renderSectionList({ type, array, arrayName, initialArray, handler }) {
		switch (type) {
			case "radio":
				return this.renderRadioSection(initialArray, array, arrayName, handler);

			default:
				return this.renderSectionItems(array, arrayName, initialArray, handler);
		}
	}

	renderSectionItems(array, arrayName, initialArray, handler) {
		return initialArray.map((item, index) =>
			this.renderSectionItem(array, arrayName, item, index, handler)
		);
	}

	renderSectionItem(array, arrayName, item, index, handler) {
		return (
			<div className="vendors-sidebar__item" key={index}>
				<CustomCheckbox
					className="vendors-sidebar__item-checkbox"
					id={item.id || item.value}
					label={item.long_name || item.label || item.category}
					checked={false}
					size="small"
					array={array}
					onChange={({ array }) => handler(array)}
				/>
			</div>
		);
	}

	renderRadioSection(initialArray, array, arrayName, handler) {
		const defaultValue = () => {
			switch (arrayName) {
				case "categories":
					return "all";
				case "distance":
					return 25;
			}
		};

		const selectedValue = array && array.length ? array[0] : defaultValue();

		if (!initialArray || !initialArray.length) return null;

		const groupedArray = _groupBy(initialArray, "type");

		return (
			<RadioGroup
				name={arrayName}
				selectedValue={selectedValue}
				onChange={val => this.handleRadioChange(val, arrayName, handler)}
			>
				{arrayName === "categories" && (
					<RadioButton
						className="vendors-sidebar__radio"
						size="small"
						value={"all"}
						label={"All"}
					/>
				)}
				{arrayName === "categories"
					? Object.keys(groupedArray).map(el => {
							if (el) return this.renderRadioButtonGroup(groupedArray[el], el);
					  })
					: initialArray.map(this.renderRadioButton.bind(this))}
			</RadioGroup>
		);
	}

	renderRadioButtonGroup(array, title) {
		return (
			<div className="vendors-sidebar__radio-group" key={title}>
				<div className="vendors-sidebar__radio-group-title">{title}</div>
				<div className="vendors-sidebar__radio-group-list">
					{array.map(this.renderRadioButton.bind(this))}
				</div>
			</div>
		);
	}

	renderRadioButton(item, i) {
		return (
			<RadioButton
				className="vendors-sidebar__radio"
				size="small"
				value={item.id}
				label={item.category || item.label}
				key={i}
			/>
		);
	}

	handleRadioChange(val, arrayName, handler) {
		const value = val === "all" ? [] : [val];
		handler(value);
	}

	onChangeSort(value) {
		const { setSortBy } = this.props;
		history.push(`/vendors/1`);
		setSortBy(value);
	}

	render() {
		const { categories, show } = this.state;
		const {
			filterCategory,
			setFilterCategory,
			filterPrice,
			setFilterPrice,
			filterDistance,
			setFilterDistance,
			sortBy
		} = this.props;

		return (
			<div
				className={`vendors-sidebar__wrapper ${
					show ? "vendors-sidebar__show" : ""
				}`}
			>
				<div className="vendors-sidebar__filter">
					<div
						className="vendors-sidebar__filter-button"
						onClick={this.onToggleFilter.bind(this)}
					>
						<Icon className="vendors-sidebar__filter-icon" id={FilterIcon} />
						<span>Filter</span>
					</div>
				</div>
				<SortDropdown
					array={VENDORS_SORT}
					value={sortBy}
					onOptionSelected={val => this.onChangeSort(val.value)}
				/>
				{this.renderFilterSection({
					stateKey: "distanceState",
					arrayName: "distance",
					array: filterDistance,
					sectionTitle: "Distance",
					initialArray: DISTANCE_lIST,
					type: "radio",
					handler: setFilterDistance
				})}
				{this.renderFilterSection({
					stateKey: "categoriesState",
					arrayName: "categories",
					array: filterCategory,
					sectionTitle: "Categories",
					initialArray: categories,
					type: "radio",
					handler: setFilterCategory
				})}
				{this.renderFilterSection({
					stateKey: "budgetState",
					arrayName: "price_level",
					array: filterPrice,
					sectionTitle: "Budget",
					initialArray: PRICE_LEVEL_LIST.short,
					handler: setFilterPrice
				})}
			</div>
		);
	}
}
