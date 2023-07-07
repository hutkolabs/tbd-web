import { styled } from '@mui/material';
import { palette, PaletteProps, spacing, SpacingProps } from '@mui/system';
import styledComponents from 'styled-components';

const StyledFieldSet = styledComponents.fieldset<PaletteProps & SpacingProps>`
  ${palette}
  ${spacing}
`;

export const FieldSet = styled(StyledFieldSet)({
  border: 'none',
  padding: 0,
  margin: 0
});
