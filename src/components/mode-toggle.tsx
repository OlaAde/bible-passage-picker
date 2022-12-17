import React from 'react';
import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {PassageModeType} from "../types";

const modes = [{key: 'single', name: 'Single Verse'}, {key: 'multiple', name: 'Multiple Verses'}];

type ModeToggleProps = React.ComponentPropsWithoutRef<'div'> & {
  mode: PassageModeType
  switchMode: (mode: PassageModeType) => void
}


const ModeToggle = ({mode, switchMode, ...props}: ModeToggleProps) => {
  function handleChange(_event: any, newMode: PassageModeType) {
    if (newMode) {
      switchMode(newMode);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
      {...props}
    >
      <ToggleButtonGroup
        color="primary"
        value={mode}
        exclusive
        onChange={handleChange}
      >
        {modes.map(item => <ToggleButton key={item.key} value={item.key}>{item.name}</ToggleButton>)}
      </ToggleButtonGroup>
    </Box>
  );
};

export default ModeToggle;
