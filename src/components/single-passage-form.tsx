import React, {ChangeEvent} from 'react';
import {Box, NativeSelect, OutlinedInput} from "@mui/material";
import BibleBooks from "../assets/bible_books.json";
import {PassageValueType} from "../types";
import {getChaptersForSelectedBook, getVersesForSelectedChapter} from "../utils";

type SinglePassageFormProps = React.ComponentPropsWithoutRef<'div'> & {
  selectedPassage: PassageValueType,
  onSelectSinglePassageBook: (event: ChangeEvent<HTMLSelectElement>) => void
  onSelectSinglePassageChapter: (event: ChangeEvent<HTMLSelectElement>) => void
  onSelectSinglePassageVerse: (event: ChangeEvent<HTMLSelectElement>) => void
}


const SinglePassageForm = ({
                             selectedPassage,
                             onSelectSinglePassageBook,
                             onSelectSinglePassageChapter,
                             onSelectSinglePassageVerse,
                             ...props
                           }: SinglePassageFormProps) => {


  return (
    <div style={{display: 'flex'}}>
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
            value={selectedPassage?.single?.book?.toString()}
            onChange={onSelectSinglePassageBook}
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
            value={selectedPassage?.single?.chapter?.toString() || ""}
            onChange={onSelectSinglePassageChapter}
            input={<OutlinedInput label="Chapter"/>}
          >
            <option value={""}>Select</option>
            {getChaptersForSelectedBook(selectedPassage.single).map(chapter => <option key={chapter}
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
            value={selectedPassage?.single?.verse?.toString() || ""}
            onChange={onSelectSinglePassageVerse}
            input={<OutlinedInput label="Verse"/>}
          >
            <option value={""}>Select</option>
            {getVersesForSelectedChapter(selectedPassage.single).map(verse => <option key={verse}
                                                                                      value={verse}>{verse}</option>)}
          </NativeSelect>
        </Box>
      </div>
    </div>
  );
};

export default SinglePassageForm;
