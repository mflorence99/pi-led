const cache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
  if (cache[<string>label])
    throw new Error(`Action type "${label}" is not unique`);
  cache[<string>label] = true;
  return <T>label;
}
