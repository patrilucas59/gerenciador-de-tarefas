import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

export default function ControlledCheckbox() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };  

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      slotProps={{ 'aria-label': 'controlled' }}
    />
  );
}