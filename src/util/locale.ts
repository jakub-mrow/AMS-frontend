import dayjs from "dayjs";

export const getUserLocale = () => {
  return navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
};

export const getDayjsLocale = () => {
  const userLocale = getUserLocale();
  return userLocale.includes("-") ? userLocale.split("-")[0] : userLocale;
};

export const loadLocale = () => {
  dayjs.locale(getDayjsLocale());
};

export const getDateFormatString = () => {
  const formatObj = new Intl.DateTimeFormat(getUserLocale()).formatToParts(
    new Date(),
  );

  return formatObj
    .map((obj) => {
      switch (obj.type) {
        case "day":
          return "DD";
        case "month":
          return "MM";
        case "year":
          return "YYYY";
        default:
          return obj.value;
      }
    })
    .join("");
};
