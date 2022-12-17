import React, {useState} from 'react';
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import BibleBooks from "../assets/bible_books.json";
import ModeToggle from "./mode-toggle";
import {getBibleBook, getBiblePassageSelectionToDisplay, getPassageUrlInBibleGateway} from "../utils";
import {PassageModeType, PassageValueType, VerseValueType} from "../types";

type VersePickerProps = React.ComponentPropsWithoutRef<'div'> & {
  onDismiss: () => void
  onSetPassage: (passage: PassageValueType) => void
  selectedPassage: PassageValueType
}

const VersePicker = ({onDismiss, onSetPassage, selectedPassage: initialSelectedPassage, ...props}: VersePickerProps) => {
  const [selectedPassage, setSelectedPassage] = useState(initialSelectedPassage);

  const mode = selectedPassage.mode || 'single';

  const switchMode = (mode: PassageModeType) => {
    setSelectedPassage(selectedPassage => {
      return {...selectedPassage, mode};
    });
  }

  const getChaptersForSelectedBook = (verse: VerseValueType | null) => {
    if (!verse || !verse.book) {
      return [];
    }
    return [...Array(getBibleBook(verse!.book).no_of_chapters || 0).keys()].map(i => (i + 1));
  }

  const getVersesForSelectedChapter = (verse: VerseValueType | null) => {
    if (!verse || !verse.book || !verse.chapter) {
      return [];
    }
    return [...Array(getBibleBook(verse.book).chapters_to_number_of_verses[verse.chapter - 1]).keys()].map(i => (i + 1));
  }

  const onSelectSinglePassageBook = (_event: any, book: string) => {
    setSelectedPassage({...selectedPassage, single: {book}});
  }

  const onSelectSinglePassageChapter = (_event: any, chapter: string) => {
    setSelectedPassage(passage => ({
      ...passage,
      single: {...passage.single, chapter: parseInt(chapter), verse: undefined}
    }))
  }

  const onSelectSinglePassageVerse = (_event: any, verse: string) => {
    setSelectedPassage(passage => ({...passage, single: {...passage.single, verse: parseInt(verse)}}))
  }


  const onSelectMultiplePassageStartBook = (_event: any, book: string) => {
    setSelectedPassage({...selectedPassage, start: {book}});
  }

  const onSelectMultiplePassageStartChapter = (_event: any, chapter: string) => {
    setSelectedPassage(passage => ({
      ...passage,
      start: {...passage.start, chapter: parseInt(chapter), verse: undefined}
    }))
  }

  const onSelectMultiplePassageStartVerse = (_event: any, verse: string) => {
    setSelectedPassage(passage => ({...passage, start: {...passage.start, verse: parseInt(verse)}}))
  }


  const onSelectMultiplePassageEndBook = (_event: any, book: string) => {
    setSelectedPassage({...selectedPassage, end: {book}});
  }

  const onSelectMultiplePassageEndChapter = (_event: any, chapter: string) => {
    setSelectedPassage(passage => ({...passage, end: {...passage.end, chapter: parseInt(chapter), verse: undefined}}))
  }

  const onSelectMultiplePassageEndVerse = (_event: any, verse: string) => {
    setSelectedPassage(passage => ({...passage, end: {...passage.end, verse: parseInt(verse)}}));
  }


  const onDone = () => {
    if (!getBiblePassageSelectionToDisplay(selectedPassage)) {
      return;
    }
    onSetPassage(selectedPassage)
  }


  function SinglePassageForm() {
    return <div style={{display: 'flex'}}>
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
            sx={{width: 280}}
            value={selectedPassage?.single?.book}
            onChange={onSelectSinglePassageBook}
            renderInput={(params) => <TextField {...params} value={selectedPassage?.single?.book}
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
            options={getChaptersForSelectedBook(selectedPassage.single).map(option => option.toString())}
            sx={{width: 280}}
            value={selectedPassage?.single?.chapter?.toString()}
            onChange={onSelectSinglePassageChapter}
            renderInput={(params) => <TextField {...params} value={selectedPassage?.single?.chapter?.toString()}
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
            options={getVersesForSelectedChapter(selectedPassage.single).map(option => option.toString())}
            sx={{width: 280}}
            value={selectedPassage?.single?.verse?.toString()}
            onChange={onSelectSinglePassageVerse}
            renderInput={(params) => <TextField {...params} value={selectedPassage?.single?.verse?.toString()}
                                                label="Verse"
                                                variant="outlined"/>}
          />
        </Box>
      </div>
    </div>;
  }

  function MultiplePassageForm() {
    return <div style={{display: 'flex'}}>
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
            renderInput={(params) => <TextField {...params} value={selectedPassage?.start?.book}
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
            options={getChaptersForSelectedBook(selectedPassage.start).map(option => option.toString())}
            sx={{width: 150}}
            value={selectedPassage?.start?.chapter?.toString()}
            onChange={onSelectMultiplePassageStartChapter}
            renderInput={(params) => <TextField {...params} value={selectedPassage?.start?.chapter?.toString()}
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
            options={getVersesForSelectedChapter(selectedPassage.start).map(option => option.toString())}
            sx={{width: 150}}
            value={selectedPassage?.start?.verse?.toString()}
            onChange={onSelectMultiplePassageStartVerse}
            renderInput={(params) => <TextField {...params} value={selectedPassage?.start?.verse?.toString()}
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
            renderInput={(params) => <TextField {...params} value={selectedPassage?.end?.book}
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
            options={getChaptersForSelectedBook(selectedPassage.end).map(option => option.toString())}
            sx={{width: 150}}
            value={selectedPassage?.end?.chapter?.toString()}
            onChange={onSelectMultiplePassageEndChapter}
            renderInput={(params) => <TextField {...params} value={selectedPassage?.end?.chapter?.toString()}
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
            options={getVersesForSelectedChapter(selectedPassage.end).map(option => option.toString())}
            sx={{width: 150}}
            value={selectedPassage?.end?.verse?.toString()}
            onChange={onSelectMultiplePassageEndVerse}
            renderInput={(params) => <TextField {...params} value={selectedPassage?.end?.verse?.toString()}
                                                label="Verse"
                                                variant="outlined"/>}
          />
        </Box>
      </div>
    </div>;
  }

  const isNotValidSelection = !getPassageUrlInBibleGateway(selectedPassage);

  return (
    <div>
      <ModeToggle className={'mb-6'} mode={mode} switchMode={switchMode}/>
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
        {mode === 'multiple' && <MultiplePassageForm/>}
        {mode === 'single' && <SinglePassageForm/>}
      </Box>

      {getPassageUrlInBibleGateway(selectedPassage) && <Box
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
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Typography variant="subtitle1">
            {getBiblePassageSelectionToDisplay(selectedPassage)}
          </Typography>
          <Button variant="text" href={getPassageUrlInBibleGateway(selectedPassage)} target={'_blank'}>Preview
            Selection</Button>
        </div>
      </Box>}
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
        <div style={{display: 'flex'}}>
          <Button variant="outlined" style={{marginRight: 8}} onClick={onDismiss}>Dismiss</Button>
          <Button variant="outlined" style={{marginLeft: 8}} disabled={isNotValidSelection}
                  onClick={onDone}>Done</Button>
        </div>
      </Box>


    </div>
  );
};

export default VersePicker;
