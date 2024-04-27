import { HttpStatus } from "./constants.js";

const response = (res, httpStatus, obj) => {
  let ret = { msg: obj };
  if (httpStatus === HttpStatus.OK) {
    ret = obj;
  }
  res.status(httpStatus).json(ret);
};

export { response };
