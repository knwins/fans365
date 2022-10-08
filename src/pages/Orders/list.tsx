import {
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProProvider,
  ProTable,
} from '@ant-design/pro-components';

import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Divider, Drawer, message, Modal } from 'antd';
import type { FC } from 'react';
import { useContext, useRef, useState } from 'react';
import AuditModal from './components/AuditModal';
import type { OrdersItem, OrdersParams, TweetItem, TweetParams } from './data.d';
import { ordersList, removeOrders, tweetList, updateOrders } from './service';
import styles from './style.less';

export type PageParams = {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
};

export const OrdersList: FC = () => {
  const [done, setDone] = useState<boolean>(false);

  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<Partial<OrdersParams> | undefined>(undefined);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<OrdersItem>();

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    //current: 1,
  };

  const showAuditModal = (item: OrdersItem) => {
    handleUpdateModalVisible(true);
    setCurrentRow(item);
  };

  /**
   * 更新
   *
   * @param fields
   */

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleUpdate = async (fields: OrdersParams, currentRow?: OrdersItem) => {
    const loadingShow = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingShow();
    try {
      const { status } = await updateOrders({
        ...currentRow,
        ...fields,
      });
      if (status) {
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );
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

  /**
   * 删除
   *
   * @param selectedRows
   */

  const handleRemove = async (selectedRows: OrdersItem) => {
    const loadingShow = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingShow();
    if (!selectedRows) return true;

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
        try {
          await removeOrders({
            id: selectedRows.id,
          });
          message.success(
            intl.formatMessage({
              id: 'pages.tip.success',
            }),
          );
          actionRef.current?.reload?.();
          return true;
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
    return false;
  };

  const ivalues = useContext(ProProvider);

  const columns: ProColumns<OrdersItem>[] = [
    {
      title: <FormattedMessage id="pages.orders.key" />,
      dataIndex: 'key',
      valueType: 'text',
      hideInDescriptions: true,
      hideInTable: true,
      
      width: 60,
    },

    {
      title: <FormattedMessage id="pages.orders.id" />,
      dataIndex: 'id',
      valueType: 'digit',
      hideInDescriptions: true,
      hideInSearch: true,
      align: 'center',
      width: 100,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.orders.linkid" />,
      dataIndex: 'linkid',
      valueType: 'text',
      hideInSearch: true,
      hideInTable:true,
      width: 150,
    },
    {
      title: <FormattedMessage id="pages.orders.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      ellipsis: true,
      width: 150,
    },

    {
      title: <FormattedMessage id="pages.orders.goodsName" />,
      fieldProps: { size: 'small' },
      dataIndex: ['goods', 'name'],
      valueType: 'text',
      width: 320,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.orders.username" />,
      dataIndex: ['user', 'username'],
      valueType: 'text',
      hideInSearch: true,
      ellipsis: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="pages.orders.link" />,
      dataIndex: 'link',
      valueType: 'text',
      hideInSearch: true,
      fieldProps: { size: 'small' },
      width: 280,
      hideInTable: true,
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.orders.fee" />,
      dataIndex: 'fee',
      valueType: 'money',
      hideInSearch: true,
      width: 100,
      align: 'right',
    },
    {
      title: <FormattedMessage id="pages.orders.startCount" />,
      dataIndex: 'startCount',
      valueType: 'digit',
      hideInSearch: true,
      width: 70,
      align: 'center',
    },

    {
      title: <FormattedMessage id="pages.orders.quantity" />,
      dataIndex: 'quantity',
      valueType: 'digit',
      hideInForm: true,
      hideInSearch: true,
      width: 70,
      align: 'center',
    },

    {
      title: <FormattedMessage id="pages.orders.finishedQty" />,
      dataIndex: 'finishedQty',
      valueType: 'digit',
      hideInForm: true,
      hideInSearch: true,
      align: 'center',
      width: 70,
    },

    {
      title: <FormattedMessage id="pages.orders.tstaskCount" />,
      dataIndex: 'tstaskCount',
      valueType: 'digit',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      align: 'center',
      width: 70,
    },

    {
      title: <FormattedMessage id="pages.orders.status" />,
      dataIndex: 'status',
      valueType: 'select',
      hideInSearch: false,
      align: 'center',
      width: 120,
      valueEnum: {
        Waiting: {
          text: intl.formatMessage({
            id: 'pages.orders.status.waiting',
          }),
        },
        Progress: {
          text: intl.formatMessage({
            id: 'pages.orders.status.progress',
          }),
        },
        PartiallyCompleted: {
          text: intl.formatMessage({
            id: 'pages.orders.status.partiallyCompleted',
          }),
        },
        Completed: {
          text: intl.formatMessage({
            id: 'pages.orders.status.completed',
          }),
        },
        Canceled: {
          text: intl.formatMessage({
            id: 'pages.orders.status.canceled',
          }),
        },
        ERROR: {
          text: intl.formatMessage({
            id: 'pages.orders.status.error',
          }),
        },
      },
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      width: 100,
      align: 'center',
      render: (_, record) => [
        <a
          key="audit"
          onClick={(e) => {
            e.preventDefault();
            showAuditModal(record);
          }}
        >
          <FormattedMessage id="pages.audit" />
        </a>,
        <a
          key="delete"
          onClick={(e) => {
            e.preventDefault();
            handleRemove(record);
          }}
        >
          <FormattedMessage id="pages.delete" />
        </a>,
      ],
    },
  ];

  const proDescriptionsItem: ProDescriptionsItemProps<OrdersItem, 'price' | 'day' | 'people'>[] = [
    {
      title: <FormattedMessage id="pages.orders.link" />,
      dataIndex: 'link',
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.orders.linkid" />,
      dataIndex: 'linkid',
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.orders.type" />,
      dataIndex: ['goods', 'name'],
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.orders.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },

    {
      title: <FormattedMessage id="pages.orders.price" />,
      dataIndex: ['goods', 'price'],
      valueType: 'price',
    },

    {
      title: <FormattedMessage id="pages.orders.days.label" />,
      dataIndex: ['goods', 'days'],
      valueType: 'day',
    },

    {
      title: <FormattedMessage id="pages.orders.quantity" />,
      dataIndex: 'quantity',
      valueType: 'people',
    },

    {
      title: <FormattedMessage id="pages.orders.finishedQty" />,
      dataIndex: 'finishedQty',
      valueType: 'people',
    },

    {
      title: <FormattedMessage id="pages.orders.tstaskCount" />,
      dataIndex: 'tstaskCount',
      valueType: 'people',
    },
   
  ];

  const tcolumns: ProColumns<TweetItem>[] = [
    {
      title: <FormattedMessage id="pages.tweet.content" />,
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch: true,
      ellipsis: true,
      width: '80%',
    },

    {
      title: <FormattedMessage id="pages.tweet.useCount" />,
      dataIndex: 'useCount',
      valueType: 'digit',
      tooltip: <FormattedMessage id="pages.tweet.useCount.tip2" />,
      hideInSearch: true,
      ellipsis: true,
      width: '20%',
    },
  ];

  const tparams: TweetParams = {
    ordersId: currentRow?.id,
  };

  const handleDone = () => {
    setDone(false);
    handleUpdateModalVisible(false);
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <ProTable<OrdersItem, OrdersParams>
            headerTitle=""
            actionRef={actionRef}
            pagination={paginationProps}
            rowKey={(record) => record.id}
            params={params}
            search={{
              labelWidth: 180,
              split: true,
            }}
            request={ordersList}
            columns={columns}
            onChange={(pagination, filters: any, sorter: any) => {
              console.log(pagination);
              if (sorter) {
                sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
                const goodsParams: OrdersParams = {
                  sorter: sorter.order,
                  filter: sorter.field,
                };
                setParams(goodsParams);
              }
            }}
          />
        </div>
      </PageContainer>

      <AuditModal
        done={done}
        visible={updateModalVisible}
        current={currentRow}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
          }
        }}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <>
            <ProProvider.Provider
              value={{
                ...ivalues,
                valueTypeMap: {
                  people: {
                    render: (text) => (
                      <span>
                        {text}
                        <FormattedMessage id="pages.people" />
                      </span>
                    ),
                  },
                  day: {
                    render: (text) => (
                      <span>
                        {text}
                        <FormattedMessage id="pages.day" />
                      </span>
                    ),
                  },
                  price: {
                    render: (text) => <span>{'¥' + Number((text / 1000) * 0.7).toFixed(3)}</span>,
                  },
                },
              }}
            >
              <ProDescriptions<OrdersItem, 'price' | 'day' | 'people'>
                column={1}
                title={currentRow?.goods.name}
                request={async () => ({
                  data: currentRow || {},
                })}
                params={{
                  id: currentRow?.id,
                }}
                columns={proDescriptionsItem}
              />
            </ProProvider.Provider>

            {currentRow.goodsTypeId == '4' ||
            currentRow.goodsTypeId == '15' ||
            currentRow.goodsTypeId == '16' ||
            currentRow.goodsTypeId == '17' ? (
              <ProTable<TweetItem, TweetParams>
                headerTitle={intl.formatMessage({
                  id: 'pages.orders.tweet.title',
                })}
                search={false}
                options={false}
                className="tweet_table"
                params={tparams}
                rowKey={(record) => record.id}
                request={tweetList}
                columns={tcolumns}
              />
            ) : (
              ''
            )}
          </>
        )}
      </Drawer>
    </div>
  );
};

export default OrdersList;
