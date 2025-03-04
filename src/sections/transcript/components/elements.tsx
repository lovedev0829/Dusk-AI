import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'center',
};

// ----------------------------------------------------------------------

type FormActionsProps = BoxProps & {
  loading?: boolean;
  disabled?: boolean;
  onReset: () => void;
};

export function FormActions({ sx, disabled, onReset, loading, ...other }: FormActionsProps) {
  return (
    <Box
      sx={[
        () => ({
          mt:2,
          mb: 3,
          gap: 2,
          display: 'flex',
          justifyContent: 'left',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <LoadingButton size="large" type="submit" variant="contained" loading={loading} color="primary">
        TRANSCRIBE
      </LoadingButton>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function FormGrid({ sx, children, ...other }: BoxProps) {
  return (
    <Box
      sx={[
        () => ({
          rowGap: 6,
          columnGap: 5,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

type FieldContainerProps = BoxProps & {
  label?: string;
  children: React.ReactNode;
};

export function FieldContainer({ sx, children, label = 'RHFTextField' }: FieldContainerProps) {
  return (
    <Box
      sx={[
        () => ({
          gap: 1,
          width: 1,
          display: 'flex',
          flexDirection: 'column',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        variant="caption"
        sx={[
          (theme) => ({
            textAlign: 'right',
            fontStyle: 'italic',
            color: 'text.disabled',
            fontSize: theme.typography.pxToRem(10),
          }),
        ]}
      >
        {label}
      </Typography>

      {children}
    </Box>
  );
}
