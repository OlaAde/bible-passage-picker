import BibleBooks from "./assets/bible_books.json";
import {PassageValueType, VerseValueType} from "./types";

export function getPassageUrlInBibleGateway(selectedPassage: PassageValueType) {
  const {
    mode,
    single: selectedSinglePassage,
    start: selectedMultiplePassageStart,
    end: selectedMultiplePassageEnd
  } = selectedPassage;

  function generateSinglePassageUrl() {
    return `https://www.biblegateway.com/passage/?search=${selectedSinglePassage?.book} ${selectedSinglePassage?.chapter}:${selectedSinglePassage?.verse}&version=KJV`;
  }

  function generateMultiplePassageUrl() {
    return `https://www.biblegateway.com/passage/?search=${selectedMultiplePassageStart?.book} ${selectedMultiplePassageStart?.chapter}:${selectedMultiplePassageStart?.verse} - ${selectedMultiplePassageEnd?.book} ${selectedMultiplePassageEnd?.chapter}:${selectedMultiplePassageEnd?.verse}&version=KJV`;
  }

  if (mode === 'single' && isValidSinglePassageSelection(selectedSinglePassage)) {
    return generateSinglePassageUrl();
  }

  if (mode === 'multiple' && isValidMultiplePassageSelection(selectedMultiplePassageStart, selectedMultiplePassageEnd)) {
    return generateMultiplePassageUrl();
  }

  return '';
}

export function getBiblePassageSelectionToDisplay(selectedPassage: PassageValueType) {
  const {
    mode,
    single: selectedSinglePassage,
    start: selectedMultiplePassageStart,
    end: selectedMultiplePassageEnd
  } = selectedPassage;

  if (mode === 'single' && isValidSinglePassageSelection(selectedSinglePassage)) {
    return `${selectedSinglePassage?.book} ${selectedSinglePassage?.chapter}:${selectedSinglePassage?.verse}`;
  }

  if (mode === 'multiple' && isValidMultiplePassageSelection(selectedMultiplePassageStart, selectedMultiplePassageEnd)) {
    return `${selectedMultiplePassageStart?.book} ${selectedMultiplePassageStart?.chapter}:${selectedMultiplePassageStart?.verse} - ${selectedMultiplePassageEnd?.book} ${selectedMultiplePassageEnd?.chapter}:${selectedMultiplePassageEnd?.verse}`;
  }

  return '/';
}

export function isValidSinglePassageSelection(passage: VerseValueType | null) {
  return !(!passage || !passage.book || !passage.chapter || !passage.verse);
}

export function isValidMultiplePassageSelection(selectedMultiplePassageStart: VerseValueType | null, selectedMultiplePassageEnd: VerseValueType | null) {
  return isValidSinglePassageSelection(selectedMultiplePassageStart) && isValidSinglePassageSelection(selectedMultiplePassageEnd);
}

export function getBibleBook(name: string) {
  let found = BibleBooks.Genesis;
  for (const book of Object.values(BibleBooks))

    if (book['Long'] === name || book['Short'] === name || book['Short Variant'] === name || book['Shorter Single'] === name) {
      found = book;
      break;
    }

  return found;
}

export function getChaptersForSelectedBook(verse: VerseValueType | null) {
  if (!verse || !verse.book) {
    return [];
  }
  return [...Array(getBibleBook(verse!.book).no_of_chapters || 0).keys()].map(i => (i + 1).toString());
}

export function getVersesForSelectedChapter(verse: VerseValueType | null) {
  if (!verse || !verse.book || !verse.chapter) {
    return [];
  }
  return [...Array(getBibleBook(verse.book).chapters_to_number_of_verses[parseInt(verse.chapter) - 1]).keys()].map(i => (i + 1).toString());
}

