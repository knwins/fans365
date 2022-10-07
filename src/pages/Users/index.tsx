import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useIntl } from '@umijs/max';
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

  /** 国际化配置 */

  /**
   * 更新节点
   *
   * @param fields
   */

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleUpdate = async (fields: UserParams, currentRow?: UserItem) => {
    const loadingShow = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingShow();
    try {
      const result = await updateUsers({
        ...currentRow,
        ...fields,
      });
      if (result.status) {
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );
        return true;
      } else {
        message.success(result.info);
        return false;
      }
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
        const loadingShow = message.loading(
          intl.formatMessage({
            id: 'pages.tip.loading',
          }),
        );
        loadingShow();

        if (!selectedRows) return true;
        try {
          await removeUsers({
            id: selectedRows.id,
          });
          message.success(
            intl.formatMessage({
              id: 'pages.tip.success',
            }),
          );
          if (actionRef.current) {
            actionRef.current.reload();
          }

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
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<UserItem>[] = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      hideInSearch: true,
      valueType: 'image',
      align: 'center',
      width: '60',
    },
    {
      title: '用户名',
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
      title: 'signature',
      dataIndex: 'signature',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: 'group',
      dataIndex: 'group',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: '简介',
      dataIndex: 'description',
      width: 'md',
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: false,
    },

    {
      title: '操作',
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
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleRemove(record);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          删除
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
