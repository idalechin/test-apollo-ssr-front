export const required = message => value => (value ? undefined : message)
export const number =  message => value => value && isNaN(Number(value)) ? message : undefined;
export const minValue = (min, message) => value => value && value < min ? message : undefined;
export const maxValue = (max, message) => value => value && value > max ? message : undefined;