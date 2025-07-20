import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

export function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };  

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      color='default'
      slotProps={{ 'aria-label': 'controlled' ,}}
    />
  );
}
