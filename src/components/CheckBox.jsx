import Checkbox from '@mui/material/Checkbox';

export function ControlledCheckbox({ checked, onChange }) {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      color='default'
      slotProps={{ 'aria-label': 'controlled' }}
    />
  );
}
