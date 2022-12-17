export type PassageValueType = {
  mode: PassageModeType
  single: VerseValueType | null
  start: VerseValueType | null
  end: VerseValueType | null
}

export type VerseValueType = {
  book?: string
  chapter?: number
  verse?: number
}


export type PassageModeType = 'single' | 'multiple'
