# bible-passage-picker

> A bible passage picker for your React app.

[![NPM](https://img.shields.io/npm/v/bible-passage-picker.svg)](https://www.npmjs.com/package/bible-passage-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bible-passage-picker
```

## Usage

```tsx
import React, {useState} from 'react'

import {BiblePassagePicker} from 'bible-passage-picker'
import 'bible-passage-picker/dist/index.css'
import {PassageValueType} from "../../src/types";

const App = () => {
  const [selectedPassage, setSelectedPassage] = useState<PassageValueType>({
    mode: 'single',
    single: {book: 'Genesis', chapter: 1, verse: 1},
    start: null,
    end: null
  });

  return <BiblePassagePicker value={selectedPassage} setValue={setSelectedPassage}/>
}

export default App

```

## License

MIT © [OlaAde](https://github.com/OlaAde)
