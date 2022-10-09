import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import WithdrawForm from './components/Withdraw';
import type { BillItem, BillParams } from './data';

import { addBill, queryBillMyList } from './service';

const BillList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<Partial<BillParams> | undefined>(undefined);
  //充值
  const [done, setDone] = useState<boolean>(false);
  //提现
  const [wVisible, setWVisible] = useState<boolean>(false);

    /** 国际化配置 */
    const intl = useIntl();

  const handleDone = () => {
    setDone(false);
    setWVisible(false);
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<BillItem>[] = [
    {
      title: <FormattedMessage id="pages.bill.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.bill.username" />,

      dataIndex: ['user', 'username'],
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.bill.name" />,

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
       
        Withdraw: {
          text: intl.formatMessage({
            id: 'pages.bill.type.withdraw',
          }),
        },
        Income: {
          text: intl.formatMessage({
            id: 'pages.bill.type.income',
          }),
        },
      },
    },
    {
      title: <FormattedMessage id="pages.bill.amount" />,

      dataIndex: 'amount',
      valueType: 'money',
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.bill.blance" />,

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
              key="withdraw"
              onClick={() => {
                setWVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.withdraw" />
            </Button>,
          ]}
          request={queryBillMyList}
          columns={columns}
          onChange={(pagination, filters: any, sorter: any) => {
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

        <WithdrawForm
          visible={wVisible}
          done={done}
          onDone={handleDone}
          onCancel={() => {
            setWVisible(false);
          }}
          onSubmit={async (value) => {
            if(value.amount < 100){
              message.error(intl.formatMessage({
                id: 'pages.bill.withdraw.amount.required',
              }));
              return;
            };
            const { status } = await addBill(value);
            if (status) {
              setWVisible(false);
              message.error(intl.formatMessage({
                id: 'pages.tip.success',
              }));
              if (actionRef.current) {
                actionRef.current.reloadAndRest?.();
              }
            }
            return;
          }}
        />
      </PageContainer>
    </div>
  );
};

export default BillList;
