export function getBackground(value: string) {
  return value.includes('unsplash')
    ? { backgroundImage: `url("${value}")` }
    : { backgroundColor: value };
}
