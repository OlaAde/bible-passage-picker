export type PassageValueType = {
  mode: PassageModeType
  single: VerseValueType | null
  start: VerseValueType | null
  end: VerseValueType | null
}

export type VerseValueType = {
  book?: string
  chapter?: string
  verse?: string
}


export type PassageModeType = 'single' | 'multiple'
