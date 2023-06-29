
import { AccountTypeItem } from '@/pages/AccountType/data';
import { PlusOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  ModalForm,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Form, message, Space ,Typography} from 'antd';
const { Paragraph } = Typography;
import type { FC } from 'react';
import TwitterModel from './TwitterModel';
import React, { useRef, useState } from 'react';
import type { EnvironmentItem, AccountsItem, AccountsParams } from '../data';
import { getAccountsList, importTwittert, removeAccounts, updateAccounts } from '../service';
import styles from '../style.less';



type AccountModalProps = {
  done: boolean;
  visible: boolean;
  accountTypes: Partial<AccountTypeItem[]> | undefined;
  current: Partial<EnvironmentItem> | undefined;
  onDone: () => void ;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};



const AccountsModal: FC<AccountModalProps> = (props) => {



  const [twitterModelVisible, handleTwitterModelVisible] = useState<boolean>(false);

  //接收到数据
  const { done, visible, current, accountTypes, onDone, children } = props;

  const formRef = useRef<ProFormInstance>();
  //国际化
  const intl = useIntl();
  const dataListOptions = {};
  const listData = accountTypes || [];
  if (listData) {
    listData.map((item) => {
      if (item) {
        dataListOptions[item?.name] = {
          text: item?.name,
        };
      }

    });
  }

  const handleDone = () => {
    handleTwitterModelVisible(false);
  };


  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<AccountsItem[]>([]);
  const [form] = Form.useForm();
  if (!visible) {
    return null;
  }
  const params: AccountsParams = {
    environmentId: current?.id,
    sorter: 'DESC',
    filter:'id',
  };

  const columns: ProColumns<AccountsItem>[] = [
    {
      title: <FormattedMessage id="pages.accounts.typeName" />,
      dataIndex: "accountTypeName",
      valueType: 'select',
      valueEnum: dataListOptions,
      render: (_, row) => row?.accountType?.name
    },
    {
      title: <FormattedMessage id="pages.accounts.username" />,
      dataIndex: 'username',
      render: (text, record, _, action) => {
        if (record.username) {
          return [
            <Paragraph copyable>{record.username}</Paragraph>
          ]
        }
        return "-";
      },
    },

    {
      title: <FormattedMessage id="pages.accounts.password" />,
      dataIndex: 'password',
      render: (text, record, _, action) => {
        if (record.password) {
          return [
            <Paragraph copyable>{record.password}</Paragraph>
          ]
        }
        return "-";
      },
    },

    {
      title: <FormattedMessage id="pages.accounts.telephone" />,
      dataIndex: 'telephone',
      render: (text, record, _, action) => {
        if (record.telephone) {
          return [
            <Paragraph copyable>{record.telephone}</Paragraph>
          ]
        }
        return "-";
      },
    },

    {
      title: <FormattedMessage id="pages.accounts.email" />,
      dataIndex: 'email',
      valueType: 'text',
      render: (text, record, _, action) => {
        if (record.email) {
          return [
            <Paragraph copyable>{record.email}</Paragraph>
          ]
        }
        return "-";
      },
    },
    {
      title: <FormattedMessage id="pages.accounts.status" />,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        Normal: {
          text: <FormattedMessage id="pages.accounts.status.normal" />,
        },
        Abnormality: {
          text: <FormattedMessage id="pages.accounts.status.abnormality" />,
        },
        Use: {
          text: <FormattedMessage id="pages.accounts.status.use" />,
        },
        Lock: {
          text: <FormattedMessage id="pages.accounts.status.lock" />,
        },
      },
    },

    {
      title: <FormattedMessage id="pages.option" />,
      valueType: 'option',
      width: '160px',
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

  return (
    <>
      <ModalForm<EnvironmentItem>
        visible={visible}
        title={intl.formatMessage({
          id: 'pages.environment.accounts.title',
        })}
        formRef={formRef}
        className={styles.standardListForm}
        width="70%"
        submitter={false}
        trigger={<>{children}</>}
        modalProps={{
          onCancel: () => { 
            setEditableRowKeys([]); // 把 EditableProTable 组件中 setEditableRowKeys(可编辑行的key)的值清空
            onDone();
          },
          destroyOnClose: true,
          bodyStyle: done ? { padding: '72px 0' } : {},
        }}
      >
        <EditableProTable<AccountsItem, AccountsParams>
          rowKey="id"
          actionRef={actionRef}
          maxLength={5}
          // 关闭默认的新建按钮
          recordCreatorProps={false}
          columns={columns}
          params={params}
          request={getAccountsList}
          value={dataSource}
          onChange={setDataSource}
          editable={{
            form,
            editableKeys,
            onSave: async (rowKey, data) => {
              if (data.accountTypeName == undefined) {
                message.error(intl.formatMessage({
                  id: 'pages.accounts.typeName.required',
                }));
                return;
              }
              data.environmentId = current?.id;
              await updateAccounts(data);
              await waitTime(2000);
              actionRef.current?.reloadAndRest?.();
            },
            onDelete: async (rowKey, data) => {
              data.accountType = undefined;
              await removeAccounts(data);
              actionRef.current?.reloadAndRest?.();
            },
            deletePopconfirmMessage: <FormattedMessage id="pages.row.delete" />,
            onChange: setEditableRowKeys,
            actionRender: (row, config, doms) => [doms.save, doms.cancel, doms.delete],
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

          <Button
            type="primary"
            onClick={() => {
              handleTwitterModelVisible(true);
            }}
            icon={<VerticalAlignBottomOutlined />}
          >
            <FormattedMessage id="pages.import" />
          </Button>

        </Space>
      </ModalForm>

      <TwitterModel
        done={done}
        onDone={handleDone}
        current={current}
        visible={twitterModelVisible}
        onSubmit={async (value) => {
          const success = await importTwittert(value);
          if (success) {
            handleTwitterModelVisible(false);
            actionRef.current?.reloadAndRest?.();
          }
        }}
      />
    </>
  );
};

export default AccountsModal;
