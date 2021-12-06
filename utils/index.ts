export function getBackground(value: string) {
  return value.includes('unsplash')
    ? { backgroundImage: value }
    : { backgroundColor: value };
}
