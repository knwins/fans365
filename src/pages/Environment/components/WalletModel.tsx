import { PlusOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  ModalForm,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Form, message, Space } from 'antd';


import React, { useRef, useState } from 'react';
import type { EnvironmentItem, WalletItem, WalletParams } from '../data';
import { getWalletList, removeWallet, updateWallet } from '../service';
import styles from '../style.less';



type WalletModelProps = {
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



const WalletModal: React.FC<WalletModelProps> = (props) => {
  // export default () => {
  //接收到数据
  const { done, visible, current, onDone, children } = props;
  const formRef = useRef<ProFormInstance>();
  //国际化
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<WalletItem[]>([]);
  const [form] = Form.useForm();
  if (!visible) {
    return null;
  }
  const params: WalletParams = {
    environmentId: current?.id,
    sorter: 'DESC',
    filter: 'createtime',
  };

  const columns: ProColumns<WalletItem>[] = [
    {
      title: <FormattedMessage id="pages.wallet.network" />,
      dataIndex: 'network',
      valueType: 'select',
      valueEnum: {
        ETH: {
          text: "ETH",
        },
        BSC: {
          text: "BSC",
        },
        SUI: {
          text: "SUI",
        },
        ATOM: {
          text: "ATOM",
        },
        StarkNet: {
          text: "StarkNet",
        },
        APT: {
          text: "APT",
        },
      },
    },

    {
      title: <FormattedMessage id="pages.wallet.address" />,
      dataIndex: 'address',
    },

    {
      title: <FormattedMessage id="pages.wallet.mnemonic" />,
      dataIndex: 'mnemonic',
      valueType: 'textarea',
    },

    {
      title: <FormattedMessage id="pages.wallet.privatekey" />,
      dataIndex: 'privatekey',
      valueType: 'textarea',
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
    <ModalForm<EnvironmentItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.environment.wallet.title',
      })}
      formRef={formRef}
      className={styles.standardListForm}
      width="70%"
      submitter={false}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      <EditableProTable<WalletItem, WalletParams>
        rowKey="id"
        actionRef={actionRef}
        maxLength={5}
        // 关闭默认的新建按钮
        recordCreatorProps={false}
        columns={columns}
        params={params}
        request={getWalletList}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          form,
          editableKeys,
          onSave: async (rowKey, data) => {


            if (data.network == undefined) {
              message.error(intl.formatMessage({
                id: 'pages.wallet.network.required',
              }));
              return;
            }


            data.environmentId = current?.id;
            await updateWallet(data);
            await waitTime(2000);
            actionRef.current?.reloadAndRest?.();
          },
          onDelete: async (rowKey, data) => {
            await removeWallet(data);
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

export default WalletModal;
