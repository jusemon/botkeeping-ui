import { useState, Fragment } from 'react';
import axios, { AxiosError } from 'axios';
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { Cancel as CancelIcon, Save as SaveIcon } from '@mui/icons-material';

import { API } from '../../config/constants';
import { BotResponse, PostBotRequestBody } from '../../models/http';
import Title from '../ui/Title';
import { useNavigate } from 'react-router-dom';

export default function BotsForm() {
  const [errors, setErrors] = useState<ReadonlyArray<string>>([]);
  const [open, setOpen] = useState(false);
  const [bot, setBot] = useState<PostBotRequestBody>({
    name: '',
  });
  const [botResponse, setBotResponse] = useState<BotResponse>();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setOpen(false);
    navigate('/bots');
  };

  const saveBot = async () => {
    setLoading(true);
    try {
      const { name } = bot;
      const response = await axios.post<BotResponse>(`${API}bots`, {
        name,
      });
      setBotResponse(response.data);
      setOpen(true); // open alert
      // Close drawer here;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data.message) {
        const { message } = e.response?.data;
        setErrors([...errors.filter((e) => e !== message), message]);
      }
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      {errors &&
        errors.map((error, index) => (
          <Alert
            severity='error'
            onClose={() => setErrors([...errors.filter((_, i) => i !== index)])}
          >
            {error}
          </Alert>
        ))}

      <Title>Create Bot</Title>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='name'
            label='Name'
            variant='outlined'
            value={bot.name}
            onChange={({ target: { value } }) => setBot({ name: value })}
          />
        </Grid>
        <Grid item xs />
        <Grid item xs={2} textAlign={'end'}>
          <Button
            variant='outlined'
            startIcon={<CancelIcon />}
            onClick={() => navigate('/bots')}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={2} textAlign={'end'}>
          <Button
            variant='contained'
            startIcon={<SaveIcon />}
            onClick={() => saveBot()}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <Dialog
        open={open}
        onClose={handleAlertClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{''}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            The bot has been saved with the following tasks:
            {botResponse?.tasks.map((t) => (
              <Fragment key={t.id}>
                <br />- {t.description}
              </Fragment>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
