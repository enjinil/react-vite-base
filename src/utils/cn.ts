export const cn = (...classNames: (string | null | undefined)[]) => {
  return classNames.filter(c => typeof c === 'string').join(' ')
}
