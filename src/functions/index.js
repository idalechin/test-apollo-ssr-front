import React from "react";
import _findIndex from "lodash/findIndex";
import _slice from "lodash/slice";
import _find from "lodash/find";
import _get from "lodash/get";
import moment from "moment";
import {
	dateFormat,
	dateFormatTime,
	dateFormatWithTime,
	MEDIA_SDK_URL
} from "../constants";
import canUseDom from "can-use-dom";

export function getBackModalRoute(routes, type) {
	const modalRouteIndex = _findIndex(routes, { path: type });
	const backRouteArray = _slice(routes, 1, modalRouteIndex);
	const pathArray = [];

	backRouteArray.forEach(item => {
		pathArray.push(item.path);
	});

	return "/" + pathArray.join("/");
}

export function setLinkLocation(pathname, link) {
	return pathname === "/" ? link : pathname + link;
}

export function objectToArray(object) {
	return Object.keys(object).map(key => object[key]);
}

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateRandomID() {
	return (
		"_" +
		Math.random()
			.toString(36)
			.substr(2, 9)
	);
}

export function scrollTo(element, to, duration) {
	if (duration <= 0 || !element) return;
	const difference = to - element.scrollTop;
	const perTick = (difference / duration) * 10;

	setTimeout(() => {
		element.scrollTop = element.scrollTop + perTick;
		if (element.scrollTop === to) return;
		scrollTo(element, to, duration - 10);
	}, 10);
}

// Get place object from google.getDetails() object
export function getFormattedPlace(place) {
	if (place) {
		const state = _find(place.address_components, component =>
			component.types.includes("administrative_area_level_1")
		);
		const city = _find(place.address_components, component =>
			component.types.includes("locality")
		);
		const zipCode = _find(place.address_components, component =>
			component.types.includes("postal_code")
		);

		const placeObject = {
			place_id: place.place_id,
			lat: place.geometry ? place.geometry.location.lat() : null,
			lng: place.geometry ? place.geometry.location.lng() : null,
			address: getAddress(place),
			city: city ? city.long_name : null,
			state: state ? state.short_name : null,
			zip_code: zipCode ? zipCode.long_name : null
		};
		return place.place_id ? placeObject : null;
	}
}

// Get address object from vendor, venue or wedding
export function getAddressObject(target) {
	return {
		place_id: target.place_id,
		lat: target.lat,
		lng: target.lng,
		address: target.address,
		city: target.city,
		state: target.state,
		zip_code: target.zip_code
	};
}

// Get house number and street from google.getDetails() object
export function getAddress(place) {
	const streetNumber = _find(place.address_components, component =>
		component.types.includes("street_number")
	);
	const route = _find(place.address_components, component =>
		component.types.includes("route")
	);

	const address = () => {
		if (streetNumber && route) {
			return `${streetNumber.long_name} ${route.long_name}`;
		} else if (streetNumber && !route) {
			return streetNumber.long_name;
		} else if (!streetNumber && route) {
			return route.long_name;
		} else {
			return null;
		}
	};

	return address();
}

// Get address from place object
export function getAddressFromObject(placeObject) {
	if (placeObject && typeof placeObject === "object") {
		let addressArray = [];
		placeObject.address && addressArray.push(placeObject.address);
		placeObject.city && addressArray.push(placeObject.city);
		placeObject.state && addressArray.push(placeObject.state);

		return addressArray.length ? addressArray.join(", ") : null;
	}
}

// Get city and state from place object
export function getCityFromObject(placeObject) {
	if (placeObject && typeof placeObject === "object") {
		let addressArray = [];
		placeObject.city && addressArray.push(placeObject.city);
		placeObject.state && addressArray.push(placeObject.state);

		return addressArray.length ? addressArray.join(", ") : null;
	}
}

export function addItemToArray(array, item, index) {
	let newArray = array && array.length ? array.slice() : [];
	newArray.splice(index, 0, item);
	return newArray;
}

export function removeItemFromArray(array, index) {
	let newArray = array && array.length ? array.slice() : [];
	newArray.splice(index, 1);
	return newArray;
}

export const setThumbnailSize = (src, width, height) =>
	src.replace("200x120", `${width}x${height || width * 0.66}`);

export const dateToLocal = date => {
	return date
		.local()
		.parseZone()
		.format();
};

export const dateToLocalFormat = (date, showTime) => {
	return moment(date)
		.parseZone()
		.format(showTime ? dateFormatWithTime : dateFormat);
};

export const timeToLocalFormat = date => moment(date).format(dateFormatTime);

export const getSlug = text => {
	if (text) return text.split(" ").join("-");
};
export const getVendorUrl = (vendor, type) => {
	if (vendor) return `/${type}/${vendor.slug}`;
};
export const getWeddingUrl = wedding => {
	if (wedding) return `/wedding/${wedding.slug}`;
};
export const getCollectionUrl = collection => {
	if (collection) return `/collection/${collection.slug}`;
};
export const getAvgRespTime = time => {
	const HOUR = 60 * 60 * 1000;
	const DAY = 24 * HOUR;

	if (time < HOUR) {
		return "1 hour";
	} else if (time < DAY) {
		return "1 day";
	} else if (time < DAY * 3) {
		return "1-3 days";
	} else {
		return "More than 3 days";
	}
};

export const checkOnlyDigits = str => {
	const reg = /^\d+$/;
	return reg.test(str);
};

export const renderFormErrors = formErrors => {
	let errors = formErrors;

	if (!errors) return null;

	if (errors.specific_fields) {
		errors = {
			...errors,
			...errors.specific_fields
		};

		delete errors.specific_fields;
	}

	let errorsAsArray = [];
	for (const err in errors) {
		if (errors.hasOwnProperty(err)) {
			errorsAsArray.push(errors[err]);
		}
	}

	return errorsAsArray.map((error, index) => <p key={index}>{error}</p>);
};

export const getPricingString = num => {
	if (!num) return null;
	const pricingArray = [];
	for (let i = 0; i < num; i++) {
		pricingArray.push("$");
	}
	return pricingArray.length ? pricingArray.join("") : null;
};

export const getVendorImage = vendor => {
	if (!vendor) return false;
	const cover = _get(vendor, "cover.images.normal.src", null);
	const userpic = _get(vendor, "user.userpic.images.normal_x2.src", null);
	const yelp = _get(vendor, "yelp.image", null);
	const firstMedia =
		vendor && vendor.media && vendor.media.length
			? _get(vendor.media[0], "images.normal_x2.src", null)
			: null;

	if (cover) return cover;
	if (userpic) return userpic;
	if (yelp) return yelp;
	if (firstMedia) return firstMedia;
};

export const checkIsAdmin = user => {
	const role = user && _get(user, "role.title", null);
	const isAdmin = role && role === "admin";
	const isSuperAdmin = role && role === "superadmin";
	return isAdmin || isSuperAdmin;
};

export const getWeddingSeason = date => {
	if (!date) return null;

	const month = +moment(date).format("M");

	if (month === 12 || month === 1 || month === 2) {
		return "Winter";
	} else if (month > 2 && month < 3) {
		return "Spring";
	} else if (month > 5 && month < 9) {
		return "Summer";
	} else if (month > 8 && month < 12) {
		return "Fall";
	}
};

export const getWeddingDescription = (wedding, addHashtag = false) => {
	if (!wedding) return null;

	const pinterestRegexp = /(?:(?:http|https):\/\/)?(?:www.|ru.)?pinterest.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?([\w\-]*)?/;
	const weddingAddress = wedding.address ? wedding.address : null;
	const venueAddress = getCityFromObject(wedding.venue);
	const address = weddingAddress ? weddingAddress : venueAddress;
	const season = getWeddingSeason(_get(wedding, "date", null));
	const weddingStyle = _get(wedding, "style.name", null);
	const venue = _get(wedding, "venue.title", null);
	let pinHashtags = [];
	if (wedding && wedding.vendors && wedding.vendors.length)
		wedding.vendors.map(vendor => {
			const pinURL =
				vendor.pinterest &&
				vendor.pinterest[vendor.pinterest.length - 1] === "/"
					? vendor.pinterest.slice(0, -1)
					: vendor.pinterest;
			if (pinURL) {
				const profile = pinURL.match(pinterestRegexp);
				profile && pinHashtags.push(profile[1]);
			}
		});
	const hashtags =
		pinHashtags && pinHashtags.length ? ` #${pinHashtags.join(" #")}` : "";

	return `${weddingStyle ? weddingStyle + " " : ""}${
		season ? season + " " : ""
	}Wedding${venue ? " at " + venue : ""}${address ? " in " + address : ""}${
		addHashtag ? hashtags : ""
	}`;
};

export const trimCoord = coordInt => {
	if (!coordInt) return coordInt;

	const coord = coordInt.toString();
	if (!coord || !coord.length) return coord;

	const coordArr = coord.split(".");
	const minutes = coordArr[1].slice(0, 1);

	return `${coordArr[0]}.${minutes}`;
};

export function getImageFromSource(data) {
	const value = data && data.value ? data.value : {};
	const firstMedia = value.media && value.media.length ? value.media[0] : null;

	if (data && data.type) {
		switch (data.type) {
			case "wedding":
				return _get(value, "couple_pic.images.normal", null);
			case "collection":
				return _get(firstMedia, "images.normal", null);
			case "media":
				return _get(value, "images.normal", null);
		}
	}

	return null;
}

export function getUrlFromSource(data) {
	const value = data && data.value ? data.value : {};

	if (data && data.type) {
		switch (data.type) {
			case "wedding":
				return `/wedding/${value.slug}`;
			case "collection":
				return `/collection/${value.slug}`;
			case "media":
				return `/photo/${value.id}`;
		}
	}

	return ``;
}

export function getMediaFromSource(data) {
	const value = data && data.value ? data.value : {};
	const media = data && data.type === "media" ? value : value.media;

	if (!media || !media.length) return null;

	return media.filter(item => !item.isVideo);
}

export function getTitleFromSource(data) {
	const value = data && data.value ? data.value : {};

	if (data && data.type) {
		switch (data.type) {
			case "wedding":
				return `${value.groom_name} & ${value.bride_name}`;
			case "collection":
				return value.title;
			case "media":
				return value.wedding
					? `${value.wedding.groom_name} & ${value.wedding.bride_name}`
					: null;
		}
	}

	return null;
}

export function getDescFromSource(data, addHashtag = false) {
	const value = data && data.value ? data.value : null;

	if (data && data.type && value) {
		switch (data.type) {
			case "wedding":
				return getWeddingDescription(value, addHashtag);
			case "collection":
				return value.description
					? value.description
					: `Explore collection '${value.title}' on BigDayMade`;
			case "media":
				return value.wedding
					? `Explore media from ${value.wedding.groom_name} & ${
							value.wedding.bride_name
					  }'s wedding on BigDayMade`
					: null;
		}
	}

	return null;
}

export function getReviewList(data) {
	let reviews = [];

	if (!data) return false;
	if (data.reviews && data.reviews.length) {
		const formatedReviews = data.reviews.map(review => {
			const firstName = _get(review, "user.first_name", null);
			const lastName = _get(review, "user.last_name", null);
			const userName = () => {
				if (firstName && lastName)
					return `${firstName} ${lastName ? lastName.slice(0, 1) : ""}.`;
				if (firstName) return `${firstName}`;
				if (lastName) return `${lastName.slice(0, 1)}.`;
				return "User";
			};
			return {
				text: review.description,
				user_image: _get(review, "user.userpic.images.small.src", null),
				user_name: userName(),
				rating: review.avg_rate
			};
		});
		reviews = formatedReviews;
	}

	if (data.yelp_reviews && data.yelp_reviews.length) {
		reviews = [...reviews, ...data.yelp_reviews];
	}

	return reviews.slice(0, 3);
}

export function manageArray(item, array) {
	if (!array || !array.length) return [item];

	if (_find(array, { id: item.id })) {
		const index = _findIndex(array, { id: item.id });
		return removeItemFromArray(array, index);
	}

	const index = array.length + 1;
	return addItemToArray(array, item, index);
}

export function getFoursquarePlace(geo) {
	const currentGeo = _get(geo, "currentGeo", null);
	const defaultGeo = _get(geo, "defaultGeo", null);
	let nearArr = [];

	if (currentGeo && currentGeo.city) nearArr.push(currentGeo.city);
	if (currentGeo && currentGeo.state) nearArr.push(currentGeo.state);

	return nearArr.length
		? nearArr.join(",")
		: `${defaultGeo.city},${defaultGeo.state}`;
}

export function getMosaicMedia(media) {
	if (!media || !media.length) return;
	const mosaicMedia = media.filter(m => m.mosaic_media);
	return mosaicMedia && mosaicMedia.length ? mosaicMedia : null;
}

export function getFBUsername(url) {
	const urlArray = url.split("/").slice(3);
	let username = null;
	if (urlArray && urlArray[0] === "pages") {
		username = `${urlArray[1]}_${urlArray[2]}`;
	} else {
		username = urlArray[0];
	}
	return username;
}

export function getFBAddress(loc) {
	if (!loc) return null;
	const { city, country, street, state } = loc;
	let addressArray = [];
	country && addressArray.push(country);
	state && addressArray.push(state);
	city && addressArray.push(city);
	street && addressArray.push(street);

	return addressArray.length ? addressArray.join(", ") : null;
}

export function formatInstagramMedia(media) {
	if (!media || !media.length || !Array.isArray(media)) return null;

	return media.map(item => {
		return {
			id: _get(item, "caption.id", null),
			notNative: true,
			images: {
				normal: {
					src: _get(item, "images.low_resolution.url", null),
					height: _get(item, "images.low_resolution.height", null),
					width: _get(item, "images.low_resolution.url", null)
				},
				normal_x2: {
					src: _get(item, "images.standard_resolution.url", null),
					height: _get(item, "images.standard_resolution.height", null),
					width: _get(item, "images.standard_resolution.url", null)
				},
				big: {
					src: _get(item, "images.standard_resolution.url", null),
					height: _get(item, "images.standard_resolution.height", null),
					width: _get(item, "images.standard_resolution.url", null)
				}
			}
		};
	});
}

export function getMediaBySize({
	url,
	width,
	height,
	imageWidth,
	imageHeight,
	resize
}) {
	if (!url || !width || !height) return url;

	const hasOriginalSize = imageHeight && imageWidth;

	let newWidth = width;
	let newHeight = height;

	if (hasOriginalSize) {
		const maxRatio = Math.max(width / imageWidth, height / imageHeight);
		const minRatio = Math.min(width / imageWidth, height / imageHeight);
		const ratio = resize === "cover" ? maxRatio : minRatio;
		newWidth = imageWidth * ratio;
		newHeight = imageHeight * ratio;
	}

	const urlNoProtocol = url.replace(/^https?\:\/\//i, "");
	const imageArray = urlNoProtocol.split("/");

	if (!imageArray.length) return url;

	const key = imageArray[imageArray.length - 1];

	return `${MEDIA_SDK_URL}/${Math.round(newWidth)}x${Math.round(
		newHeight
	)}/${key}`;
}
