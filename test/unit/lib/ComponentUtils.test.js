import {
  buildClassName
} from 'lib/ComponentUtils'

describe('ComponentUtils', () => {
  describe('buildClassName', () => {
    test('when only a main class is sent', () => {
      const paramMain = 'mainClass'
      const result = buildClassName(paramMain)
      const expected = 'mainClass'

      expect(result).toEqual(expected)
    })
  })
})
