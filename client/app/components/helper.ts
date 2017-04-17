export function deepCopy<T>(obj: T): T {
  return <T>JSON.parse(JSON.stringify(obj));
}
