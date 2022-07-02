/**
 * Passing a value this function simply checks if the value is
 * a truthy string or not, if it isn't it will return
 * false else it will return true.
 * @param v string | null | undefined
 * @return boolean
 */
export const isRequired = (v: string): boolean => {
  if (v === null || v === undefined) {
    return false;
  }
  if (!v.trim() || !v.trim().length) {
    return false;
  }
  return true;
};

/**
 * This value simply checks to see if a value maintains the
 * structure of a valid email addres.
 * @param v string | null | undefined
 * @return boolean
 */
export const isEmail = (v: string): boolean => {
  const rx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return rx.test(v);
};

/**
 * Passing a value to this function will check if the
 * value is a mobile phone number.
 * @param v string
 * @return boolean
 */
export const isMobilePhone = (v: string, intl: boolean = false): boolean => {
  if (intl) {
    return /^(234)([789][01][0-9][\d]{7})$/.test(v);
  }
  return /^(0|234)([789][01][0-9][\d]{7})$/.test(v);
};

/**
 * Passing a value to this function will check if the
 * value is a mobile phone number.
 * @param v string
 * @return boolean
 */
export const isMobilePhoneAny = (v: string): boolean => {
  return /^(0|[0-9]{3,4})([789][01][1-9][\d]{5,14})$/.test(v);
};

/**
 * Passing a value to this function will check if the
 * value meets the structure of a BVN.
 * @param v string
 * @return boolean
 */
export const isBvn = (v: string): boolean => {
  const rx = /[\d]{11}/gs;
  return rx.test(v);
};

/**
 * Passing a value to this function will check if the
 * value is a number or not.
 * @param v string
 * @return boolean
 */
export const isNumeric = (v: string): boolean => {
  const rx = /\d+/gm;
  return rx.test(v);
};

/**
 * Passing a value to this function will check if the
 * value has "username safe" characters.
 * A-Z, a-z, 0-9, and _- inbetween
 * @param v string
 * @return boolean
 */
export const isUsername = (v: string): boolean => {
  const rx = /^[\w]+(?:[-][\w]+)*$/;
  return rx.test(v);
};

/**
 * Passing a value to this function will check if the
 * value is greater than or equal to the passed length.
 * A-Z, a-z, 0-9, and _- inbetween
 * @param v string
 * @return boolean
 */
export const minLength = (length: number, v: string): boolean => {
  return v.trim().length >= length;
};

/**
 * Passing a value to this function will check if the
 * value contains at least one uppercase letter, number,
 * and special character
 * @param v string
 * @return boolean
 */
export const isStrongCharacterCombo = (v: string): boolean => {
  // uppercase letters
  if (!/[A-Z]+/gm.test(v)) {
    return false;
  }
  // numbers
  if (!/[0-9]+/gm.test(v)) {
    return false;
  }
  // spacial characters
  if (!/[^\w\s]+/gm.test(v)) {
    return false;
  }
  // lowercase letters
  if (!/[A-Z]+/gm.test(v)) {
    return false;
  }
  // at least 8 characters long
  if (v.length < 8) {
    return false;
  }
  return true;
};

/**
 * Passing a value to this function will check if value
 * and main are identital.
 * @param v string
 * @return boolean
 */
export const matches = (main: string, v: string) => {
  return main === v;
};

/**
 * Passing a value to this function will check if value
 * matches the structure of an account number.
 * @param v string
 * @return boolean
 */
export const isAccountNumber = (v: string) => {
  return isRequired(v) && isNumeric(v) && v.length === 10;
};

/**
 * Passing a value to this function will check if value is a valid date.
 * @param v string
 * @return boolean
 */
export const isValidDate = (v: any) => {
  if (typeof v === 'string' && !v.replace(/\s/, '').length) {
    return false;
  }
  const d = v instanceof Date ? v : new Date(v);
  return /invalid/i.test(String(d.getDay())) ? false : true;
};

export const isValidName = (v: string): boolean => {
  return /^([A-Za-zÀ-ÖØ-öø-ÿ.]((-|\s)?[A-Za-zÀ-ÖØ-öø-ÿ.]+))+$/.test(v.trim());
};

export const isDomain = (v: string) => {
  return /^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}(\.[a-zA-Z]{2,30})+)$/.test(
    v,
  );
};

export const isUrl = (v: string) => {
  return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
};
