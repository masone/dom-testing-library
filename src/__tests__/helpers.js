import {getDocument, newMutationObserver} from '../helpers'

describe('getDocument', () => {
  if (typeof document === 'undefined') {
    test('throws an error if window does not exist', () => {
      expect(() => getDocument()).toThrowError(
        /Could not find default container/,
      )
    })
  } else {
    test('returns global document if exists', () => {
      expect(getDocument()).toBe(document)
    })
  }
})

class DummyClass {
  constructor(args) {
    this.args = args
  }
}

describe('newMutationObserver', () => {
  if (typeof window === 'undefined') {
    it('instantiates mock MutationObserver if not availble on window', () => {
      expect(newMutationObserver(() => {}).observe).toBeDefined()
    })
  } else {
    it('instantiates from global MutationObserver if available', () => {
      const oldMutationObserver = window.MutationObserver
      window.MutationObserver = DummyClass

      try {
        expect(newMutationObserver('foobar').args).toEqual('foobar')
      } finally {
        window.MutationObserver = oldMutationObserver
      }
    })
  }
})
