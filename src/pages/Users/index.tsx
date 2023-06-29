import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import type { UserItem, UserParams } from './data';
import { queryUsersList, removeUsers, updateUsers } from './service';

const UsersList: React.FC = () => {
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<UserItem | undefined>(undefined);
  const [params, setParams] = useState<Partial<UserParams> | undefined>(undefined);

  const [done, setDone] = useState<boolean>(false);

  //国际化
  const intl = useIntl();

  const handleDone = () => {
    setDone(false);
    handleUpdateModalVisible(false);
  };
  
  /**
   * 更新节点
   *
   * @param fields
   */

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleUpdate = async (fields: UserParams, currentRow?: UserItem) => {
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),0
      );
      const { status, info } = await updateUsers({
        ...currentRow,
        ...fields,
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

    return false;
  };
  /**
   * 删除节点
   *
   * @param selectedRows
   */

  const handleRemove = (selectedRows: UserItem) => {
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
          const loadingHiddle = message.loading(
            intl.formatMessage({
              id: 'pages.tip.loading',
            }),
          );
          const { status, info } = await removeUsers({
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
      },
    });
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<UserItem>[] = [
    {
      title: <FormattedMessage id='pages.user.avatar'/>,
      dataIndex: 'avatar',
      hideInSearch: true,
      valueType: 'image',
      align: 'center',
      width: '60',
    },
    {
      title:<FormattedMessage id='pages.user.username'/>,
      dataIndex: 'username',
      width: 'md',
      hideInDescriptions: true,
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
      title: <FormattedMessage id='pages.user.signature'/>,
      dataIndex: 'signature',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id='pages.user.group'/>,
      dataIndex: 'group',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },
    {
      title: <FormattedMessage id='pages.user.phone'/>,
      dataIndex: 'phone',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id='pages.user.description'/>,
      dataIndex: 'description',
      width: 'md',
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: false,
    },

    {
      title: <FormattedMessage id='pages.option'/>,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id='pages.edit'/>
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleRemove(record);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <FormattedMessage id='pages.delete'/>
        </a>,
      ],
    },
  ];

  return (
    <div>
      <PageContainer>
        <ProTable<UserItem, UserParams>
          headerTitle=""
          actionRef={actionRef}
          pagination={paginationProps}
          rowKey={(record) => record.id}
          params={params}
          search={{
            labelWidth: 80,
          }}
          toolBarRender={() => []}
          request={queryUsersList}
          columns={columns}
          onChange={(pagination, filters: any, sorter: any) => {
            if (sorter) {
              sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
              const userParams: UserParams = {
                sorter: sorter.order,
                filter: sorter.field,
              };
              setParams(userParams);
            }
          }}
        />

        <UpdateForm
          visible={updateModalVisible}
          done={done}
          onDone={handleDone}
          current={currentRow}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
          }}
          onSubmit={async (value) => {
            const success = await handleUpdate(value, currentRow);
            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
                return true;
              }
            }
            return true;
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
            <ProDescriptions<UserItem>
              column={1}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.id,
              }}
              columns={columns as ProDescriptionsItemProps<UserItem>[]}
            />
          )}
        </Drawer>
      </PageContainer>
    </div>
  );
};

export default UsersList;
