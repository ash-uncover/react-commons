export type ButtonSemantic =
  | 'POSITIVE'
  | 'NEGATIVE'
  | 'WARNING'
  | 'ATTENTION'
  | 'PRINCIPAL'
  | 'TRANSPARENT'
  | 'DEFAULT'

export const ButtonSemantics: {
  POSITIVE: ButtonSemantic
  NEGATIVE: ButtonSemantic
  WARNING: ButtonSemantic
  ATTENTION: ButtonSemantic
  PRINCIPAL: ButtonSemantic
  TRANSPARENT: ButtonSemantic
  DEFAULT: ButtonSemantic
} = {
  POSITIVE: 'POSITIVE',
  NEGATIVE: 'NEGATIVE',
  WARNING: 'WARNING',
  ATTENTION: 'ATTENTION',
  PRINCIPAL: 'PRINCIPAL',
  TRANSPARENT: 'TRANSPARENT',
  DEFAULT: 'DEFAULT',
}