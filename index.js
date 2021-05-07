const assert = require("assert");
const _ = require("lodash");

function unflatten(obj) {
  const [key] = Object.keys(obj);
  const [value] = Object.values(obj);
  const deepKeys = key
    .split("_")
    .reverse()
    .filter((el) => el !== "");

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

const input3 = { hello_my_first_name_is: "Leo" };
const unflatt3 = unflatten(input3);
const response3 = { hello: { my: { first: { name: { is: "Leo" } } } } };
assert(_.isEqual(unflatt3, response3));

const input4 = { _: "Leo" };
const unflatt4 = unflatten(input4);
const response4 = {};
assert(_.isEqual(unflatt4, response4));

const input5 = { _my_name_is_: "Leo" };
const unflatt5 = unflatten(input5);
const response5 = { my: { name: { is: "Leo" } } };
assert(_.isEqual(unflatt5, response5));
