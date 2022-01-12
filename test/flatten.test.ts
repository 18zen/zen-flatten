import { flatten, unflatten } from "../src";

test("flatten must flat object", () => {
  const obj = {
    1: {
      2: "2",
      3: { 4: "4" },
    },
  };
  const flattenObj = {
    "1.2": "2",
    "1.3.4": "4",
  };

  expect(flatten(obj)).toStrictEqual(flattenObj);
});

test("unflatten must unflat object", () => {
  const obj = {
    S1: {
      "2S": "2",
      S3: { S4: "4" },
    },
  };
  const flattenObj = {
    "S1.2S": "2",
    "S1.S3.S4": "4",
  };

  // DEPT : if keys are primitives  , unflatten dosnt work properly
  expect(unflatten(flattenObj, { keySeparator: "." })).toStrictEqual(obj);
});
