import { PlusOutlined,  } from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  ModalForm,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormInstance,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Form, message, Space ,Typography} from 'antd';
const { Paragraph } = Typography;

import React, { useRef, useState } from 'react';
import type { EnvironmentItem, WalletItem, WalletParams } from '../data';
import { createWallet, getWalletList, removeWallet, updateWallet } from '../service';
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

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<WalletItem>();


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
      title: <FormattedMessage id="pages.wallet.address" />,
      valueType: 'text',
      dataIndex: 'address',
      render: (text, record, _, action) =>{
        if(record.address){
          return [
            <Paragraph copyable>{record.address}</Paragraph>
          ]
        }
        return "-";
      } ,
    },

    {
      title: <FormattedMessage id="pages.wallet.mnemonic" />,
      dataIndex: 'mnemonic',
      valueType: 'textarea',
      render: (text, record, _, action) =>{
        if(record.mnemonic){
          return [
            <Paragraph copyable>{record.mnemonic}</Paragraph>
          ]
        }
        return "-";
      } ,
    },

    {
      title: <FormattedMessage id="pages.wallet.privatekey" />,
      dataIndex: 'privatekey',
      valueType: 'textarea',
      render: (text, record, _, action) =>{
        if(record.privatekey){
          return [
            <Paragraph copyable>{record.privatekey}</Paragraph>
          ]
        }
        return "-";
      } ,
    },

    {
      title: <FormattedMessage id="pages.wallet.publickey" />,
      dataIndex: 'publickey',
      valueType: 'text',
      hideInTable: true,
      render: (text, record, _, action) =>{
        if(record.publickey){
          return [
            <Paragraph copyable>{record.publickey}</Paragraph>
          ]
        }
        return "-";
      } ,
    },

     
    {
      title: <FormattedMessage id="pages.option" />,
      valueType: 'option',
      width: '160px',
      hideInDescriptions: true,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record?.id);
          }}
        >
          <FormattedMessage id="pages.edit" />
        </a>,
      ],
    },
  ];

  return (
    <>

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

          <Button
            type="primary"
            onClick={async () => {
              const walletItem: WalletItem = {
                environmentId: current?.id,
                id: "0",
              };
              await createWallet(walletItem);
              actionRef.current?.reloadAndRest?.();
            }}
            icon={<PlusOutlined />}
          >
            <FormattedMessage id="pages.create.eth.wallet" />
          </Button>
        </Space>


      </ModalForm>
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

            <ProDescriptions<WalletItem>
              column={1}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.id,
              }}

              columns={columns as ProDescriptionsItemProps<WalletItem>[]}
            />
          </>
        )}
      </Drawer></>




  );
};

export default WalletModal;
