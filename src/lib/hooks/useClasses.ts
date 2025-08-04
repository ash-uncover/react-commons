import React from 'react'

export const useClasses = (classes: (string | undefined)[]) => {
  const classArray: string[] = toClassArray(classes)
  const [classesString, setClassesString] = React.useState<string>(classArray.join(' '))
  const [classBuilder] = React.useState<ClassBuilder>(new ClassBuilder(classArray, setClassesString))
  return {
    classBuilder,
    classes: classesString
  }
}

type ClassDefinition = string | (string | undefined)[] | undefined

function toClassArray(arg: ClassDefinition): string[] {
  if (Array.isArray(arg)) {
    return arg.reduce((acc: string[], s) => {
      acc.push(...toClassArray(s))
      return acc
    }, [])
  }
  return (arg || '').split(' ').filter(s => s)
}

// #region ClassBuilder
class ClassBuilder {

  // #region > Attributes
  #classMap: { [key: string]: boolean } = {}
  #listener: (value: string) => void
  // #endregion

  // #region > Constructor
  constructor(classBase: ClassDefinition, listener: (value: string) => void) {
    toClassArray(classBase).forEach(c => {
      this.#classMap[c] = true
    })
    this.#listener = listener
  }
  // #endregion

  // #region > Public Methods
  add(className: ClassDefinition) {
    toClassArray(className).forEach(c => {
      this.#classMap[c] = true
    })
    this.notify()
  }
  remove(className: ClassDefinition) {
    toClassArray(className).forEach(c => {
      delete this.#classMap[c]
    })
    this.notify()
  }
  toggle(className: ClassDefinition) {
    toClassArray(className).forEach(c => {
      if (this.#classMap[c]) {
        this.remove(c)
      } else {
        this.add(c)
      }
    })
  }
  set(className: ClassDefinition, active: boolean) {
    toClassArray(className).forEach(c => {
      if (active) {
        this.add(c)
      } else {
        this.remove(c)
      }
    })
  }
  // #endregion

  // #region > Private Methods
  private getClassName() {
    return Object.keys(this.#classMap).join(' ')
  }
  private notify() {
    this.#listener(this.getClassName())
  }
  // #endregion
}
// #endregion
