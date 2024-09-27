import * as React from 'react';
import axios from 'axios';

import { API } from '../../config/constants';
import { Response, TaskResponse } from '../../models/http';
import CustomTable, { CustomTableColumns } from '../ui/CustomTable';
import Title from '../ui/Title';

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
  {
    title: 'Description',
    property: 'description',
    props: {},
  },
  {
    title: 'Duration (ms)',
    property: 'duration',
    props: {
      align: 'right',
      style: {
        width: 120,
      },
    },
  },
  {
    title: 'Is Active?',
    property: 'isActive',
    props: {
      align: 'center',
      style: {
        width: 100,
      },
    },
  },
];

export default function TasksList() {
  const [tasks, setTasks] = React.useState<ReadonlyArray<TaskResponse>>([]);
  const [totalElements, setTotalElements] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const updatePagination = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  const getTasks = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Response<TaskResponse>>(`${API}tasks`, {
        params: pagination,
      });
      const { data, totalElements: total } = response.data;
      setTotalElements(total);
      setTasks(
        data.map((d) => ({ ...d, isActive: d.isActive ? 'Yes' : 'No' }))
      );
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [setTasks, setLoading, setTotalElements, pagination]);

  React.useEffect(() => {
    getTasks();
  }, [getTasks, pagination]);

  return (
    <React.Fragment>
      <Title>Tasks</Title>
      <CustomTable
        columns={columns}
        onPageChange={(page, pageSize) => updatePagination(page, pageSize)}
        rows={tasks}
        totalElements={totalElements}
        isLoading={isLoading}
      ></CustomTable>
    </React.Fragment>
  );
}
