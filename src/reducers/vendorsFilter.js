export const vendorsFilter = {
	sortBy: "match",
	category: [],
	price: [],
	distance: [],
	page: 1
};

export const vendorsFilterReducer = (state, action) => {
	switch (action.type) {
		case "setVendorsFilterSort":
			return {
				...state,
				sortBy: action.payload
			};

		case "setVendorsFilterCategory":
			return {
				...state,
				category: action.payload
			};

		case "setVendorsFilterPrice":
			return {
				...state,
				price: action.payload
			};

		case "setVendorsFilterDistance":
			return {
				...state,
				distance: action.payload
			};

		default:
			return state;
	}
};
