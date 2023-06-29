import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import type { BillItem, BillParams } from './data';

import { addBill, queryBillList, removeBill, updateBill } from './service';

const BillList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createVisible, setCreateVisible] = useState<boolean>(false);

  /** 分布更新窗口的弹窗 */
  const [updateVisible, setUpdateVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<BillItem>();
  const [params, setParams] = useState<Partial<BillParams> | undefined>(undefined);

  /** 国际化配置 */
  const intl = useIntl();

  const handleAdd = async (fields: BillItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      const { status } = await addBill({
        ...fields,
      });
      if (status) {
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );
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

  /**
   * 删除节点
   *
   * @param selectedRows
   */

  const handleRemove = (selectedRows: BillItem) => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'pages.tip.title',
      }),
      content: intl.formatMessage({
        id: 'pages.tip.content',
      }),
      okText: intl.formatMessage({
        id: 'pages.tip.ok',
      }),
      cancelText: intl.formatMessage({
        id: 'pages.tip.cancel',
      }),
      onOk: async () => {
        if (!selectedRows) return true;
        try {
          const loadingHidde = message.loading(
            intl.formatMessage({
              id: 'pages.tip.loading',
            }),
          );

          const { status, info } = await removeBill({
            id: selectedRows.id,
          });

          if (status) {
            loadingHidde();
            message.success(info);
            if (actionRef.current) {
              actionRef.current.reload();
            }
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
      },
    });
  };

  const handleDone = () => {
    setCreateVisible(false);
    setUpdateVisible(false);
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
      hideInSearch: true,
      align: 'center',
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
        Invest: {
          text: intl.formatMessage({
            id: 'pages.bill.type.invest',
          }),
        },
        Withdrawing: {
          text: intl.formatMessage({
            id: 'pages.bill.type.withdrawing',
          }),
        },
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
        Expense: {
          text: intl.formatMessage({
            id: 'pages.bill.type.expense',
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

    {
      title: <FormattedMessage id="pages.bill.username.search" />,
      valueType: 'text',
      dataIndex: 'userName',
      hideInTable: true,
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,

      render: (_, record) => {
        if (record.type === 'Withdrawing') {
          return [
            <a
              key="delete"
              onClick={() => {
                handleRemove(record);
              }}
            >
              <FormattedMessage id="pages.delete" />
            </a>,
            <a
              key="withdraw"
              onClick={() => {
                setCurrentRow(record);
                setUpdateVisible(true);
              }}
            >
              <FormattedMessage id="pages.withdraw" />
            </a>,
          ];
        } else {
          return [
            <a
              key="delete"
              onClick={() => {
                handleRemove(record);
              }}
            >
              <FormattedMessage id="pages.delete" />
            </a>,
          ];
        }
      },
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
                setCreateVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.new" />
            </Button>,
          ]}
          request={queryBillList}
          columns={columns}
          onChange={(pagination, filters: any, sorter: any) => {
            // console.log(pagination);
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
        <CreateForm
          visible={createVisible}
          onCancel={() => {
            setCreateVisible(false);
          }}
          onDone={handleDone}
          onSubmit={async (value) => {
            const success = await handleAdd(value as BillItem);
            if (success) {
              setCreateVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />

        <UpdateForm
          visible={updateVisible}
          onCancel={() => {
            setUpdateVisible(false);
          }}
          current={currentRow || {}}
          onDone={handleDone}
          onSubmit={async (value) => {
            const { status } = await updateBill(value, currentRow);
            if (status) {
              setUpdateVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
                return true;
              }
            }
            return true;
          }}
        />
      </PageContainer>
    </div>
  );
};

export default BillList;
