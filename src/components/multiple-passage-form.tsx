import React from 'react';
import {Autocomplete, Box, TextField} from "@mui/material";
import BibleBooks from "../assets/bible_books.json";
import {getChaptersForSelectedBook, getVersesForSelectedChapter} from "../utils";
import {PassageValueType} from "../types";

type MultiplePassageFormProps = React.ComponentPropsWithoutRef<'div'> & {
  selectedPassage: PassageValueType
  onSelectMultiplePassageStartBook: (_event: any, book: string) => void
  onSelectMultiplePassageStartChapter: (_event: any, chapter: string) => void
  onSelectMultiplePassageStartVerse: (_event: any, verse: string) => void
  onSelectMultiplePassageEndBook: (_event: any, book: string) => void
  onSelectMultiplePassageEndChapter: (_event: any, chapter: string) => void
  onSelectMultiplePassageEndVerse: (_event: any, verse: string) => void
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
            '& > *': {
              m: 1,
            },
          }}
          className={"mb-6"}
          {...props}
        >
          <Autocomplete
            options={Object.keys(BibleBooks)}
            sx={{width: 150}}
            value={selectedPassage?.start?.book}
            onChange={onSelectMultiplePassageStartBook}
            renderInput={(params) => <TextField {...params}
                                                label="Book"
                                                variant="outlined"/>}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
          className={"mb-6"}
          {...props}
        >
          <Autocomplete
            options={getChaptersForSelectedBook(selectedPassage.start)}
            sx={{width: 150}}
            value={selectedPassage?.start?.chapter?.toString()}
            onChange={onSelectMultiplePassageStartChapter}
            renderInput={(params) => <TextField {...params}
                                                label="Chapter"
                                                variant="outlined"/>}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
          className={"mb-6"}
          {...props}
        >
          <Autocomplete
            options={getVersesForSelectedChapter(selectedPassage.start)}
            sx={{width: 150}}
            value={selectedPassage?.start?.verse?.toString()}
            onChange={onSelectMultiplePassageStartVerse}
            renderInput={(params) => <TextField {...params}
                                                label="Verse"
                                                variant="outlined"/>}
          />
        </Box>
      </div>
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
          className={"mb-6"}
          {...props}
        >
          <Autocomplete
            options={Object.keys(BibleBooks)}
            sx={{width: 150}}
            value={selectedPassage?.end?.book}
            onChange={onSelectMultiplePassageEndBook}
            renderInput={(params) => <TextField {...params}
                                                label="Book"
                                                variant="outlined"/>}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
          className={"mb-6"}
          {...props}
        >
          <Autocomplete
            options={getChaptersForSelectedBook(selectedPassage.end)}
            sx={{width: 150}}
            value={selectedPassage?.end?.chapter?.toString()}
            onChange={onSelectMultiplePassageEndChapter}
            renderInput={(params) => <TextField {...params}
                                                label="Chapter"
                                                variant="outlined"/>}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
          className={"mb-6"}
          {...props}
        >
          <Autocomplete
            options={getVersesForSelectedChapter(selectedPassage.end)}
            sx={{width: 150}}
            value={selectedPassage?.end?.verse?.toString()}
            onChange={onSelectMultiplePassageEndVerse}
            renderInput={(params) => <TextField {...params}
                                                label="Verse"
                                                variant="outlined"/>}
          />
        </Box>
      </div>
    </div>
  );
};

export default MultiplePassageForm;
