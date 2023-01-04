import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { COPYRIGHT_URL } from '../../config/constants';

export const Copyright = (props: any) => (
  <Typography variant='body2' color='text.secondary' align='center' {...props}>
    {'Copyright © '}
    <Link color='inherit' href={COPYRIGHT_URL}>
      Botkeeping
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);
