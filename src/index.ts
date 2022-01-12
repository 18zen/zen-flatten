interface FlattenationOptions {
  keySeparator?: string;
}
const keySeparator: string = ".";
interface ProducedObject {
  [key: string]: any;
}

const flatten = (
  obj: any,
  options: FlattenationOptions = { keySeparator },
  prefix: string[] = [],
  current: ProducedObject = {}
): ProducedObject => {
  if (obj && obj instanceof Object) {
    for (const key of Object.keys(obj)) {
      flatten(obj[key], options, prefix.concat(key), current);
    }
  } else {
    current[prefix.join(options.keySeparator)] = obj;
  }
  return current;
};

const unflatten = (
  object: ProducedObject,
  options: FlattenationOptions = { keySeparator }
): Object => {
  let result = {};
  for (var flattenKey in object) {
    let keys = flattenKey.split(options.keySeparator || keySeparator);

    keys.reduce(
      (source: ProducedObject, key: string | never, index: number) =>
        source[key] ||
        (source[key] = isNaN(Number(keys[index + 1]))
          ? keys.length - 1 == index
            ? object[flattenKey]
            : {}
          : []),
      result
    );
  }
  return result;
};

export { flatten, unflatten };
