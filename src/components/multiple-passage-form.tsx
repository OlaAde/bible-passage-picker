import React, {ChangeEvent} from 'react';
import {Box, NativeSelect, OutlinedInput} from "@mui/material";
import BibleBooks from "../assets/bible_books.json";
import {getChaptersForSelectedBook, getVersesForSelectedChapter} from "../utils";
import {PassageValueType} from "../types";

type MultiplePassageFormProps = React.ComponentPropsWithoutRef<'div'> & {
  selectedPassage: PassageValueType
  onSelectMultiplePassageStartBook: (event: ChangeEvent<HTMLSelectElement>) => void
  onSelectMultiplePassageStartChapter: (event: ChangeEvent<HTMLSelectElement>) => void
  onSelectMultiplePassageStartVerse: (event: ChangeEvent<HTMLSelectElement>) => void
  onSelectMultiplePassageEndBook: (event: ChangeEvent<HTMLSelectElement>) => void
  onSelectMultiplePassageEndChapter: (event: ChangeEvent<HTMLSelectElement>) => void
  onSelectMultiplePassageEndVerse: (event: ChangeEvent<HTMLSelectElement>) => void
}

const MultiplePassageForm = ({
                               selectedPassage,
                               onSelectMultiplePassageStartBook,
                               onSelectMultiplePassageStartChapter,
                               onSelectMultiplePassageStartVerse,
                               onSelectMultiplePassageEndBook,
                               onSelectMultiplePassageEndChapter,
                               onSelectMultiplePassageEndVerse,
                               ...props
                             }: MultiplePassageFormProps) => {
  return (
    <div style={{display: 'flex'}}>
      <div style={{marginRight: 8}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 280,
            '& > *': {
              m: 1,
            },
          }}
          {...props}
        >
          <NativeSelect
            style={{width: '95%'}}
            value={selectedPassage?.start?.book}
            onChange={onSelectMultiplePassageStartBook}
            input={<OutlinedInput label="Book"/>}
          >
            {Object.keys(BibleBooks).map(book => <option key={book} value={book}>{book}</option>)}
          </NativeSelect>

        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 280,
            '& > *': {
              m: 1,
            },
          }}
          {...props}
        >
          <NativeSelect
            style={{width: '95%'}}
            value={selectedPassage?.start?.chapter || ""}
            onChange={onSelectMultiplePassageStartChapter}
            input={<OutlinedInput label="Chapter"/>}
          >
            <option value={""}>Select</option>
            {getChaptersForSelectedBook(selectedPassage.start).map(chapter => <option key={chapter} value={chapter}>{chapter}</option>)}
          </NativeSelect>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 280,
            '& > *': {
              m: 1,
            },
          }}
          {...props}
        >
          <NativeSelect
            style={{width: '95%'}}
            value={selectedPassage?.start?.verse || ""}
            onChange={onSelectMultiplePassageStartVerse}
            input={<OutlinedInput label="Verse"/>}
          >
            <option value={""}>Select</option>
            {getVersesForSelectedChapter(selectedPassage.start).map(verse => <option key={verse}
                                                                                      value={verse}>{verse}</option>)}
          </NativeSelect>
        </Box>
      </div>
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 280,
            '& > *': {
              m: 1,
            },
          }}
          {...props}
        >
          <NativeSelect
            style={{width: '95%'}}
            value={selectedPassage?.end?.book}
            onChange={onSelectMultiplePassageEndBook}
            input={<OutlinedInput label="Book"/>}
          >
            {Object.keys(BibleBooks).map(book => <option key={book} value={book}>{book}</option>)}
          </NativeSelect>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 280,
            '& > *': {
              m: 1,
            },
          }}
          {...props}
        >
          <NativeSelect
            style={{width: '95%'}}
            value={selectedPassage?.end?.chapter || ""}
            onChange={onSelectMultiplePassageEndChapter}
            input={<OutlinedInput label="Chapter"/>}
          >
            <option value={""}>Select</option>
            {getChaptersForSelectedBook(selectedPassage.end).map(chapter => <option key={chapter}
                                                                                       value={chapter}>{chapter}</option>)}
          </NativeSelect>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 280,
            '& > *': {
              m: 1,
            },
          }}
          {...props}
        >
          <NativeSelect
            style={{width: '95%'}}
            value={selectedPassage?.end?.verse || ""}
            onChange={onSelectMultiplePassageEndVerse}
            input={<OutlinedInput label="Verse"/>}
          >
            <option value={""}>Select</option>
            {getVersesForSelectedChapter(selectedPassage.end).map(verse => <option key={verse}
                                                                                      value={verse}>{verse}</option>)}
          </NativeSelect>
        </Box>
      </div>
    </div>
  );
};

export default MultiplePassageForm;
