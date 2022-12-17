import * as React from 'react'
import {PassageValueType} from './types'
import {useState} from "react";
import {getBiblePassageSelectionToDisplay, getPassageUrlInBibleGateway} from "./utils";
import {Button, Grid, Popover, Typography} from "@mui/material";
import VersePicker from "./components/verse-picker";

type BiblePassagePickerProps = React.ComponentPropsWithoutRef<'div'> & {
  value: PassageValueType
  setValue: (value: PassageValueType) => void
}

export const BiblePassagePicker = ({
                                     value,
                                     setValue,
                                     ...props
                                   }: BiblePassagePickerProps) => {


  const [showBiblePassagePicker, setShowBiblePassagePicker] = useState(false);
  const [selectedPassage, setSelectedPassage] = useState(value || {mode: 'single', single: {}, start: {}, end: {}});

  const onDismiss = () => {
    setShowBiblePassagePicker(false);
  }

  const onSetPassage = (passage: PassageValueType) => {
    setSelectedPassage(passage);
    setValue(passage);
    setShowBiblePassagePicker(false);
  }

  return <Grid item xs={12} md={6}  {...props}>
    <div style={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{marginLeft: 8}}>
        <Typography variant="subtitle1">
          {getBiblePassageSelectionToDisplay(selectedPassage)}
        </Typography>
      </div>
      <Button variant="text"
              onClick={() => setShowBiblePassagePicker(true)}>{getPassageUrlInBibleGateway(selectedPassage) ? 'Edit Passage' : 'Select Passage'}</Button>
      {getPassageUrlInBibleGateway(selectedPassage) &&
        <Button variant="text" href={getPassageUrlInBibleGateway(selectedPassage)} target={'_blank'}>Preview
          Selection</Button>}
    </div>
    <Popover
      open={showBiblePassagePicker}
      onClose={onDismiss}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"

    >
      <Grid item xs={12} md={6} maxWidth={400}>
        <VersePicker onDismiss={onDismiss} onSetPassage={onSetPassage} selectedPassage={selectedPassage}/>
      </Grid>
    </Popover>
  </Grid>
}
