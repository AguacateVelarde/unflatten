const assert = require("assert");
const _ = require("lodash");

function unflatten(obj) {
  const [key] = Object.keys(obj);
  const [value] = Object.values(obj);
  const deepKeys = key.split("_").reverse();

  let response = {};
  for (let index = 0; index < deepKeys.length; index++) {
    if (index === 0) {
      response[deepKeys[index]] = value;
    } else {
      response[deepKeys[index]] = Object.assign({}, response);
      delete response[deepKeys[index - 1]];
    }
  }
  return response;
}

const input = { my_name_is: "Carlos" };
const unflatt = unflatten(input);
const response = { my: { name: { is: "Carlos" } } };

assert(_.isEqual(unflatt, response));

const input2 = { not_has: "House" };
const unflatt2 = unflatten(input2);
const response2 = { not: { has: "House" } };
assert(_.isEqual(unflatt2, response2));
