import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message } from 'antd';
import React, { useRef, useState } from 'react';
import type { TSTaskItem, TSTaskParams } from './data';
import { getTSTaskList, removeTSTask } from './service';

const TSTask: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<Partial<TSTaskParams> | undefined>(undefined);

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  /**
   * 删除节点
   *
   * @param selectedRows
   */

  const handleRemove = async (selectedRows: TSTaskItem) => {
    if (!selectedRows) return true;
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
      );
      const { status, info } = await removeTSTask({
        id: selectedRows.id,
      });
      loadingHiddle();
      if (status) {
        message.success(info);
        actionRef.current?.reload?.();
        return true;
      }
      return false;
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );
      return false;
    }
  };

  const columns: ProColumns<TSTaskItem>[] = [
    {
      title: <FormattedMessage id="pages.tstask.createTime" />,
      dataIndex: 'time',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      align: 'center',
      width: '120px',
    },
    {
      title: <FormattedMessage id="pages.tstask.link" />,
      dataIndex: ['orders', 'link'],
      hideInSearch: true,
      valueType: 'text',
      width: '280px',
    },

    {
      title: <FormattedMessage id="pages.tstask.username" />,
      dataIndex: ['bind', 'username'],
      hideInSearch: true,
      valueType: 'text',
      width: '40px',
    },
    {
      title: 'uuid',
      dataIndex: ['bind', 'uuid'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: '40px',
    },

    {
      title: <FormattedMessage id="pages.tstask.info" />,
      dataIndex: 'info',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: '220px',
    },
    {
      title: <FormattedMessage id="pages.tstask.status" />,
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: '80px',
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      width: '80px',
      render: (_, record) => [
        <a
          key="delete"
          onClick={() => {
            handleRemove(record);
          }}
        >
          <FormattedMessage id="pages.delete" />
        </a>,
      ],
    },
  ];

  return (
    <div>
      <PageContainer>
        <ProTable<TSTaskItem, TSTaskParams>
          headerTitle=""
          actionRef={actionRef}
          rowKey={(record) => record.id}
          search={false}
          params={params}
          pagination={paginationProps}
          onChange={(pagination, filters: any, sorter: any) => {
            if (sorter) {
              sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
              const goodsTypeParams: TSTaskParams = {
                sorter: sorter.order,
                filter: sorter.field,
              };
              setParams(goodsTypeParams);
            }
          }}
          request={getTSTaskList}
          columns={columns}
        />
      </PageContainer>
    </div>
  );
};
export default TSTask;
