import _ from "lodash-es";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

export function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str; // valid date
}

export const getDDMMYYY = (param) => {
  if (param instanceof dayjs) {
    return param.format("DD/MM/YYYY");
  }
  return dayjs(param).format("DD/MM/YYYY");
};

export const includesFileType = (params) => {
  let isFileType = false;
  Object.keys(params).map((k) => {
    if (params[k] instanceof File) {
      isFileType = true;
    }
  });

  return isFileType;
};

export const getFormData = (params) => {
  const fd = new FormData();
  Object.keys(params).map((key) => {
    fd.append(key, params[key]);
  });

  return fd;
};

export function getValueFromObject(object, key) {
  return _.has(object, key) ? object[key] : "";
}

export const getFormattedDate = (date) => {
  return dayjs(date).format("DD-MM-YYYY HH:MM A");
};

export function promiseAllWithProgress(proms, progress_cb) {
  let d = 0;
  progress_cb(0);
  for (const p of proms) {
    p.then(() => {
      d++;
      progress_cb((d * 100) / proms.length);
    });
  }
  return Promise.all(proms);
}
