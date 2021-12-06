export function getBackground(value: string) {
  return value.includes('unsplash')
    ? {
        backgroundImage: `url("${value}"), linear-gradient(to top, #00b4db, #0083b0)`,
      }
    : { backgroundColor: value };
}
