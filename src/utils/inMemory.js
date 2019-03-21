import _get from "lodash/get";
export function getID(obj) {
	switch (obj.__typename) {
		case "Image":
			return `${obj.src}_${obj.__typename}`;
		case "Images":
			return `${_get(obj, "big.src") || _get(obj, "normal.src")}_${
				obj.__typename
			}`;
		default:
			return `${obj.id}_${obj.__typename}`;
	}
}
