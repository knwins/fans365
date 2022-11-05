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
import type { EnvironmentItem, EnvironmentLogItem, EnvironmentLogParams } from '../data';
import { environmentLogList, removeEnvironmentLog, updateEnvironmentLog } from '../service';
import styles from '../style.less';

type EnvironmentLogModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<EnvironmentItem> | undefined;
  onDone: () => void;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const columns: ProColumns<EnvironmentLogItem>[] = [
  {
    title: <FormattedMessage id="pages.environment.log.content" />,
    dataIndex: 'content',
    valueType: 'textarea',
    formItemProps: {
      rules: [
        {
          required: true,
          message: <FormattedMessage id="pages.environmentLog.content.required" />,
        },
      ],
    },
  },
  {

    dataIndex: 'id',
    valueType: 'text',
    hideInTable: true,

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

const EnvironmentLogModal: FC<EnvironmentLogModalProps> = (props) => {
  // export default () => {
  //接收到数据
  const { done, visible, current, onDone, children } = props;
  const formRef = useRef<ProFormInstance>();
  //国际化
  const intl = useIntl();

  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<EnvironmentLogItem[]>([]);
  const [form] = Form.useForm();


  if (!visible) {
    return null;
  }



  const params: EnvironmentLogParams = {
    environmentId: current?.id,
    sorter: 'DESC',
    filter:'createtime',
  };
 
  

 
  return (
    <ModalForm<EnvironmentItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.environment.log.title',
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
      <EditableProTable<EnvironmentLogItem, EnvironmentLogParams>
        rowKey="id"
        actionRef={actionRef}
        maxLength={5}
        // 关闭默认的新建按钮
        recordCreatorProps={false}
        columns={columns}
        
        params={params}
        request={environmentLogList}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          form,
          editableKeys,
          onSave: async (rowKey, data) => {
            data.environmentId = current?.id;
            await updateEnvironmentLog(data);
            await waitTime(2000);
            actionRef.current?.reloadAndRest?.();
          },
          onDelete: async (rowKey, data) => {
            await removeEnvironmentLog(data,params);
            actionRef.current?.reloadAndRest?.();
          },
          deletePopconfirmMessage: <FormattedMessage id="pages.row.delete" />,
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel, dom.delete],
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

export default EnvironmentLogModal;
