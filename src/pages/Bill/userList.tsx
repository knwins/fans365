import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import InvestForm from './components/InvestForm';
import type { BillItem, BillParams } from './data';

import { queryBillMyList } from './service';

const BillList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<Partial<BillParams> | undefined>(undefined);

  //充值
  const [iVisible, setiVisible] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  
  const handleDone = () => {
    setDone(false);
    setiVisible(false);

  };

  /** 国际化配置 */
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    // current: 1,
  };

  const columns: ProColumns<BillItem>[] = [
    {
      title: <FormattedMessage id="pages.bill.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      align: 'center',
      width: 'xs',
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.bill.name" />,
      width: 'xs',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
      fieldProps: { precision: 6 },
    },
    {
      title: <FormattedMessage id="pages.bill.type" />,

      dataIndex: 'type',
      valueType: 'select',
      hideInSearch: false,
      valueEnum: {
        Invest: {
          text: intl.formatMessage({
            id: 'pages.bill.type.invest',
          }),
        },
        Expense: {
          text: intl.formatMessage({
            id: 'pages.bill.type.expense',
          }),
        },
      },
    },
    {
      title: <FormattedMessage id="pages.bill.amount" />,
      width: 'xs',
      dataIndex: 'amount',
      valueType: 'money',
      hideInSearch: true,
      sorter: true,
    },

    {
      title: <FormattedMessage id="pages.bill.blance" />,
      width: 'xs',
      valueType: 'money',
      hideInSearch: true,
      dataIndex: 'blance',
    },

    {
      title: <FormattedMessage id="pages.bill.time.search" />,
      valueType: 'dateRange',
      hideInSearch: true,
      hideInTable: true,
    },
  ];

  return (
    <div>
      <PageContainer>
        <ProTable<BillItem, BillParams>
          headerTitle=""
          actionRef={actionRef}
          pagination={paginationProps}
          rowKey={(record) => record.id}
          params={params}
          search={{
            labelWidth: 80,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setiVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.invest" />
            </Button>,
          ]}
          request={queryBillMyList}
          columns={columns}
          onChange={(pagination, filters: any, sorter: any) => {
            console.log(pagination);
            if (sorter) {
              sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
              const billParams: BillParams = {
                sorter: sorter.order,
                filter: sorter.field,
              };
              setParams(billParams);
            }
          }}
        />

        <InvestForm
          visible={iVisible}
          done={done}
          onDone={handleDone}
          onCancel={() => {
            setiVisible(false);
          }}
        />
      </PageContainer>
    </div>
  );
};

export default BillList;
