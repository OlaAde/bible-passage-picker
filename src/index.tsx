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


  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [selectedPassage, setSelectedPassage] = useState(value || {mode: 'single', single: {}, start: {}, end: {}});

  const handleShowPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const showBiblePassagePicker = Boolean(anchorEl);
  const id = showBiblePassagePicker ? 'simple-popover' : undefined;


  const onSetPassage = (passage: PassageValueType) => {
    setSelectedPassage(passage);
    setValue(passage);
    handleClosePopover();
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
      <Button variant="text" id={id}
              onClick={handleShowPopover}>{getPassageUrlInBibleGateway(selectedPassage) ? 'Edit Passage' : 'Select Passage'}</Button>
      {getPassageUrlInBibleGateway(selectedPassage) &&
        <Button variant="text" href={getPassageUrlInBibleGateway(selectedPassage)} target={'_blank'}>Preview
          Selection</Button>}
    </div>
    <Popover
      open={showBiblePassagePicker}
      onClose={handleClosePopover}
      anchorEl={anchorEl}
    >
      <Grid item xs={12} md={6} maxWidth={400}>
        <VersePicker onDismiss={handleClosePopover} onSetPassage={onSetPassage} selectedPassage={selectedPassage}/>
      </Grid>
    </Popover>
  </Grid>
}
