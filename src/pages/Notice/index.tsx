import {
  addNotice,
  getNoticeList,
  removeNotice,
  updateNotice,
} from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import OperationModal from './components/OperationModal';

const Notice: React.FC = () => {
  const [done, setDone] = useState<boolean>(false);

  //edit/add
  const [visible, setVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Partial<API.NoticeItem> | undefined>(undefined);

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  /**
   * 添加节点
   *
   * @param fields
   */

  const handleSubmit = async (fields: API.NoticeItem) => {
    try {
      const action = fields?.id ? 'update' : 'add';
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),0
      );

      if (action == 'add') {
        await addNotice({ ...fields });

        loadingHiddle();
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );
        setVisible(false);
        setCurrentRow(undefined);
        if (actionRef.current) {
          actionRef.current.reloadAndRest?.();
        }

        return;
      } else if (action == 'update') {
        await updateNotice({ ...fields });
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );
        setVisible(false);
        setCurrentRow(undefined);
        if (actionRef.current) {
          actionRef.current.reloadAndRest?.();
        }

        return;
      }
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
   * 删除
   *
   * @param selectedRows
   */

  const handleRemove = async (selectedRows: API.NoticeItem) => {
    if (!selectedRows) return true;
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),0
      );
      const { status, info } = await removeNotice({
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

  const columns: ProColumns<API.NoticeItem>[] = [
    {
      title: <FormattedMessage id="pages.notice.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      align: 'center',
      width: '100px',
    },

    {
      title: <FormattedMessage id="pages.notice.avatar" />,
      dataIndex: 'avatar',
      valueType: 'image',
      align: 'center',
      width: '80px',
    },

    {
      title: <FormattedMessage id="pages.notice.type" />,
      dataIndex: 'type',
      valueType: 'text',
      width: '100px',
    },
    {
      title: <FormattedMessage id="pages.notice.title" />,
      dataIndex: 'title',
      valueType: 'text',
      width: '360px',
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      width: '120px',
      align: 'center',
      render: (_, record) => [
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
      ],
    },
  ];

  return (
    <div>
      <PageContainer>
        <ProTable<API.NoticeItem>
          headerTitle=""
          actionRef={actionRef}
          rowKey={(record) => record.id}
          search={false}
          pagination={paginationProps}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setVisible(true);
                setCurrentRow(undefined);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.new" />
            </Button>,
          ]}
          request={getNoticeList}
          columns={columns}
        />
      </PageContainer>

      <OperationModal
        done={done}
        visible={visible}
        current={currentRow}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
export default Notice;
