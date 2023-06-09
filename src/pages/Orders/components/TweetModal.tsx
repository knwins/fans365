import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  ModalForm,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Form, Space } from 'antd';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import type { OrdersItem, TweetItem, TweetParams } from '../data';
import { tweetList, updateTweet } from '../service';
import styles from '../style.less';

type TweetModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<OrdersItem> | undefined;
  onDone: () => void;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const columns: ProColumns<TweetItem>[] = [
  {
    title: <FormattedMessage id="pages.tweet.content" />,
    dataIndex: 'content',
    formItemProps: {
      rules: [
        {
          required: true,
          message: <FormattedMessage id="pages.tweet.content.required" />,
        },
      ],
    },
  },
  {
    title: <FormattedMessage id="pages.tweet.useCount" />,
    dataIndex: 'useCount',
    tooltip:<FormattedMessage id="pages.tweet.useCount.tip1" />,
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message: <FormattedMessage id="pages.tweet.useCount.required" />,
        },
      ],
    },
    width: '100px',
  },


  {
    title: <FormattedMessage id="pages.option" />,
    valueType: 'option',
    width: '120px',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        <FormattedMessage id="pages.edit" />
      </a>,
      <EditableProTable.RecordCreator
        key="copy"
        record={{
          ...record,
          id: (Math.random() * 1000000).toFixed(0),
        }}
      >
        <a>
          <FormattedMessage id="pages.copy" />
        </a>
      </EditableProTable.RecordCreator>,
    ],
  },
];

const TweetModal: FC<TweetModalProps> = (props) => {
  // export default () => {
  //接收到数据
  const { done, visible, current, onDone, children } = props;
  const formRef = useRef<ProFormInstance>();
  //国际化
  const intl = useIntl();

  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<TweetItem[]>([]);
  const [form] = Form.useForm();
  if (!visible) {
    return null;
  }
  const params: TweetParams = {
    ordersId: current?.id,
  };
  return (
    <ModalForm<OrdersItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.tweet.model.title',
      })}
      formRef={formRef}
      className={styles.standardListForm}
      width="60%"
      submitter={false}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      <EditableProTable<TweetItem, TweetParams>
        rowKey="id"
        actionRef={actionRef}
        headerTitle={
          current?.goods?.name +
          intl.formatMessage({
            id: 'pages.tweet.buy',
          }) +
          '(' +
          current?.quantity +
          intl.formatMessage({
            id: 'pages.people',
          }) +
          ')'
        }
        maxLength={5}
        // 关闭默认的新建按钮
        recordCreatorProps={false}
        columns={columns}
        params={params}
        request={tweetList}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          form,
          editableKeys,
          onSave: async (rowKey, data) => {
            data.ordersId = current?.id;
            await updateTweet(data);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            actionRef.current?.addEditRecord?.({
              id: (Math.random() * 1000000).toFixed(0),
              title: <FormattedMessage id="pages.new" />,
            });
          }}
          icon={<PlusOutlined />}
        >
          <FormattedMessage id="pages.new" />
        </Button>
      </Space>
    </ModalForm>
  );
};

export default TweetModal;
