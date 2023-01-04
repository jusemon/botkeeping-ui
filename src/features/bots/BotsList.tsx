import * as React from 'react';
import axios from 'axios';
import qs from 'query-string';
import dayjs from 'dayjs';
import { Button, Grid } from '@mui/material';
import { Create as CreateIcon } from '@mui/icons-material';

import { API } from '../../config/constants';
import { BotResponse, Response } from '../../models/http';
import CustomTable, {
  CustomTableColumns,
  DetailsConfig,
} from '../ui/CustomTable';
import Title from '../ui/Title';
import { useNavigate } from 'react-router-dom';

const columns: CustomTableColumns = [
  {
    title: 'ID',
    property: 'id',
    props: {
      style: {
        width: 100,
      },
    },
  },
  { title: 'Name', property: 'name', props: {} },
  { title: 'Created At', property: 'createdAt', props: {} },
];

const details: DetailsConfig = {
  title: 'Tasks',
  property: 'tasks',
  columns: [
    { title: 'ID', property: 'id', props: {} },
    { title: 'Description', property: 'description', props: {} },
    { title: 'Duration', property: 'duration', props: {} },
    { title: 'Is Active?', property: 'isActive', props: {} },
    { title: 'Completed At', property: 'completedAt', props: {} },
  ],
};

export default function BotsList() {
  const [bots, setBots] = React.useState<ReadonlyArray<BotResponse>>([]);
  const [totalElements, setTotalElements] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const updatePagination = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  const getBots = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = qs.stringify(pagination);
      const response = await axios.get<Response<BotResponse>>(
        `${API}bots?` + params
      );
      const { data, totalElements: total } = response.data;
      setTotalElements(total);
      setBots(
        data.map((bot) => ({
          ...bot,
          createdAt: dayjs(bot.createdAt).format('L LT'),
          tasks: (bot.tasks || []).map((task) => ({
            ...task,
            isActive: task.isActive ? 'Yes' : 'No',
            completedAt: task.completedAt ? dayjs(task.completedAt).format('L LT') : '',
          })),
        }))
      );
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [setBots, setLoading, setTotalElements, pagination]);

  React.useEffect(() => {
    getBots();
  }, [getBots, pagination]);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs>
          <Title>Bots</Title>
        </Grid>
        <Grid item xs={2} textAlign={'end'}>
          <Button
            variant='outlined'
            startIcon={<CreateIcon />}
            onClick={() => navigate('/bots/create')}
          >
            New
          </Button>
        </Grid>
      </Grid>

      <CustomTable
        columns={columns}
        onPageChange={(page, pageSize) => updatePagination(page, pageSize)}
        rows={bots}
        totalElements={totalElements}
        isLoading={isLoading}
        details={details}
      ></CustomTable>
    </React.Fragment>
  );
}
