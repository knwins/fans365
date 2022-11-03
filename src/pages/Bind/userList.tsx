import { PlusOutlined } from '@ant-design/icons';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import { queryCurrent } from '../Account/service';
import UpdateModal from './components/UpdateModal';
import type { BindItem, BindParams } from './data';
import { addBind, getBindMyList, removeBind, updateBind } from './service';

const Bind: React.FC = () => {
  const [done, setDone] = useState<boolean>(false);
  //edit/add
  const [visible, setVisible] = useState<boolean>(false);
  //show
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Partial<BindItem> | undefined>(undefined);
  const [params, setParams] = useState<Partial<BindParams> | undefined>(undefined);

  /** 国际化配置 */
  const intl = useIntl();

  const { data: currentUser } = useRequest(() => {
    return queryCurrent();
  });

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  /**
   * 添加节点
   *
   * @param fields
   */

  const handleSubmit = async (fields: BindItem) => {
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
      );

      const action = fields?.id ? 'update' : 'add';
      if (action == 'add') {
        const { status, info } = await addBind({ ...fields });
        loadingHiddle();
        if (status) {
          message.success(info);
          setVisible(false);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
        return;
      } else if (action == 'update') {
        const { status, info } = await updateBind({ ...fields });
        loadingHiddle();
        if (status) {
          message.success(info);
          setVisible(false);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
        return;
      }
      return;
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );
      setVisible(false);
      return;
    }
  };

  /**
   * 删除节点
   *
   * @param selectedRows
   */

  const handleRemove = async (selectedRows: BindItem) => {
    const loadingHiddle = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );

    if (!selectedRows) return true;
    try {
      const { status, info } = await removeBind({
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

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrentRow(undefined);
  };

  const columns: ProColumns<BindItem>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.bind.username',
      }),
      dataIndex: 'username',
      valueType: 'text',
      align: 'center',
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
      title: intl.formatMessage({
        id: 'pages.bind.telephone',
      }),
      dataIndex: 'telephone',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 180,
      sorter: true,
    },
   
    {
      title: intl.formatMessage({
        id: 'pages.bind.regtime',
      }),
      dataIndex: 'regtime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 180,
      sorter: true,
    },

    {
      title: intl.formatMessage({
        id: 'pages.bind.runtime',
      }),
      dataIndex: 'runtime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 180,
      hideInTable: true,
      sorter: true,
    },
    {
      title: 'UUID',
      dataIndex: 'uuid',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: intl.formatMessage({
        id: 'pages.bind.type',
      }),
      dataIndex: 'type',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.bind.level',
      }),
      dataIndex: 'level',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      sorter: true,
    },

    {
      title: intl.formatMessage({
        id: 'pages.bind.status',
      }),
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      sorter: true,
    },

    {
      title: intl.formatMessage({
        id: 'pages.bind.followersCount',
      }),
      dataIndex: 'followersCount',
      hideInSearch: true,
      valueType: 'digit',
      width: '60',
    },

    {
      title: intl.formatMessage({
        id: 'pages.bind.tweetCount',
      }),
      dataIndex: 'tweetCount',
      hideInSearch: true,
      valueType: 'digit',
      width: '60',
    },
    {
      title: intl.formatMessage({
        id: 'pages.bind.day.follow.count',
      }),
      dataIndex: 'dayFollowCount',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'digit',
      width: '60',
    },
    {
      title: intl.formatMessage({
        id: 'pages.bind.day.like.count',
      }),
      dataIndex: 'dayLikeCount',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'digit',
      width: '60',
    },
    {
      title: intl.formatMessage({
        id: 'pages.bind.day.retweet.count',
      }),
      dataIndex: 'dayRetweetCount',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'digit',
      width: '60',
    },
    {
      title: intl.formatMessage({
        id: 'pages.bind.day.quote.count',
      }),
      dataIndex: 'dayQuoteCount',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'digit',
      width: '60',
    },

    {
      title: intl.formatMessage({
        id: 'pages.bind.day.replay.count',
      }),
      dataIndex: 'dayReplayCount',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'digit',
      width: '60',
    },

    {
      title: intl.formatMessage({
        id: 'pages.option',
      }),
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions:true,
      render: (_, record) => {
        return [
          <a
            key="edit"
            onClick={() => {
              setVisible(true);
              setCurrentRow(record);
            }}
          >
            <FormattedMessage id="pages.edit" />
          </a>,

          <a
            key="delete"
            onClick={() => {
              handleRemove(record);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.delete" />
          </a>,
        ];
      },
    },
  ];

  return (
    <div>
      <PageContainer>
        <ProTable<BindItem, BindParams>
          headerTitle=""
          actionRef={actionRef}
          rowKey={(record) => record.id}
          params={params}
          pagination={paginationProps}
          toolBarRender={() => {
            return [
              <a
                href={'https://api.fans365.net/twitter/oauth2?userId=' + currentUser?.id}
                target="_bank"
                key="oauth2"
              >
                <PlusOutlined /> <FormattedMessage id="pages.author" />
              </a>,
            ];
          }}
          onChange={(pagination, filters: any, sorter: any) => {
            console.log(pagination);
            if (sorter) {
              sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
              const goodsTypeParams: BindParams = {
                sorter: sorter.order,
                filter: sorter.field,
              };
              setParams(goodsTypeParams);
            }
          }}
          request={getBindMyList}
          columns={columns}
        />
      </PageContainer>

      <UpdateModal
        done={done}
        visible={visible}
        current={currentRow}
        onDone={handleDone}
        onSubmit={handleSubmit}
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
          <ProDescriptions<BindItem>
            column={1}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<BindItem>[]}
          />
        )}
      </Drawer>
    </div>
  );
};
export default Bind;
