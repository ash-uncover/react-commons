import { ICONS } from './IconUtils'

describe('IconUtils', () => {

  // #region ICONS constant
  describe('ICONS', () => {

    test('ICONS is an object', () => {
      // Declaration
      // Execution
      // Assertions
      expect(typeof ICONS).toBe('object')
    })

    test('ICONS.FAS_CHEVRON_LEFT equals ["fas", "chevron-left"]', () => {
      // Declaration
      // Execution
      // Assertions
      expect(ICONS.FAS_CHEVRON_LEFT).toEqual(['fas', 'chevron-left'])
    })

    test('ICONS.FAS_CHEVRON_RIGHT equals ["fas", "chevron-right"]', () => {
      // Declaration
      // Execution
      // Assertions
      expect(ICONS.FAS_CHEVRON_RIGHT).toEqual(['fas', 'chevron-right'])
    })

    test('ICONS.FAS_USER equals ["fas", "user"]', () => {
      // Declaration
      // Execution
      // Assertions
      expect(ICONS.FAS_USER).toEqual(['fas', 'user'])
    })

    test('ICONS.FAS_GEAR equals ["fas", "gear"]', () => {
      // Declaration
      // Execution
      // Assertions
      expect(ICONS.FAS_GEAR).toEqual(['fas', 'gear'])
    })

    test('ICONS.FAS_RIGHT_FROM_BRACKET equals ["fas", "right-from-bracket"]', () => {
      // Declaration
      // Execution
      // Assertions
      expect(ICONS.FAS_RIGHT_FROM_BRACKET).toEqual(['fas', 'right-from-bracket'])
    })

  })
  // #endregion

})
