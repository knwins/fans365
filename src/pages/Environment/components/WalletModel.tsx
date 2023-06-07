import { PlusOutlined, } from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  ModalForm,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Form, message, Space, Typography } from 'antd';
const { Paragraph } = Typography;

import React, { useRef, useState } from 'react';
import type { EnvironmentItem, WalletItem, WalletParams, WalletTokenItem, WalletTokenParams, WalletTokenTransferItem } from '../data';
import { addWalletToken, createWallet, getWalletList, getWalletTokenList, refreshWalletToken, removeWallet, removeWalletToken, transferWalletToken, updateWallet } from '../service';
import styles from '../style.less';
import WalletTokenModel from './WalletTokenModel';
import WalletTokenTransferModel from './WalletTokenTransferModel';


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
  const actionRefToken = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<WalletItem[]>([]);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<WalletItem>();
  const [tokenUI, setTokenUI] = useState<boolean>(false);

  const [currentRowToken, setCurrentRowToken] = useState<WalletTokenItem>();

  const [transferStatusUI, setTransferStatusUI] = useState<boolean>(false);



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
        EthereumFormat: {
          text: "EthereumFormat",
        },
        SuiFormat: {
          text: "SuiFormat",
        },
        AtomFormat: {
          text: "AtomFormat",
        },

        APTFormat: {
          text: "APTFormat",
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
      render: (text, record, _, action) => {
        if (record.address) {
          return [
            <Paragraph copyable>{record.address}</Paragraph>
          ]
        }
        return "-";
      },
    },

    {
      title: <FormattedMessage id="pages.wallet.mnemonic" />,
      dataIndex: 'mnemonic',
      valueType: 'textarea',
      render: (text, record, _, action) => {
        if (record.mnemonic) {
          return [
            <Paragraph copyable>{record.mnemonic}</Paragraph>
          ]
        }
        return "-";
      },
    },

    {
      title: <FormattedMessage id="pages.wallet.privatekey" />,
      dataIndex: 'privatekey',
      valueType: 'textarea',
      render: (text, record, _, action) => {
        if (record.privatekey) {
          return [
            <Paragraph copyable>{record.privatekey}</Paragraph>
          ]
        }
        return "-";
      },
    },

    {
      title: <FormattedMessage id="pages.wallet.publickey" />,
      dataIndex: 'publickey',
      valueType: 'text',
      hideInTable: true,
      render: (text, record, _, action) => {
        if (record.publickey) {
          return [
            <Paragraph copyable>{record.publickey}</Paragraph>
          ]
        }
        return "-";
      },
    },


    {
      title: <FormattedMessage id="pages.option" />,
      valueType: 'option',
      width: '160px',
      hideInDescriptions: true,
      align: 'center',
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


  //------------------------------------walletToken-----------------------



  /**
  * 添加
  *
  * @param fields
  */

  const handleSubmit = async (fields: WalletTokenItem) => {
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),0
      );
      //walletId
      fields.walletId = currentRow?.id;
      const { status, info } = await addWalletToken({ ...fields });
      loadingHiddle();
      if (status) {
        message.success(info);
        if (actionRefToken.current) {
          actionRefToken.current.reload();
        }
        handleDone();
        return;
      }
      return;
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );
      handleDone();
      return;
    }
  };

  /**
* 添加
*
* @param fields
*/

  const handleTransferSubmit = async (fields: WalletTokenTransferItem) => {
    try {
      const loadingShow= message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        },),0
      );
      const { status, info } = await transferWalletToken({ ...fields });
      loadingShow();
      if (status) {
        message.success(info);
        if (actionRefToken.current) {
          actionRefToken.current.reload(); 
        }
        handleDone();
      }
      return;

    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );
      handleDone();
      return;
    }
  };

  const walletTokenColumns: ProColumns<WalletTokenItem>[] = [

    {
      title: <FormattedMessage id="pages.wallet.token.updatetime" />,
      dataIndex: 'updatetime',
      valueType: 'dateTime',
      width: '150px',
      fieldProps: { size: 'small' },
    },

    {
      title: <FormattedMessage id="pages.wallet.token.network" />,
      dataIndex: 'network',
      valueType: 'text',
      align: 'center'
    },

    {
      title: <FormattedMessage id="pages.wallet.token.balance" />,
      dataIndex: 'balance',
      valueType: 'text',
      align: 'center',
      render: (text, record, _, action) => {
        if (record.balance) {
          return [
            <Paragraph> {record.balance} <small>{record.symbol}</small></Paragraph>
          ]
        }
        return "-";
      },

    },

    {
      title: <FormattedMessage id="pages.option" />,
      valueType: 'option',
      width: '160px',
      align: 'center',
      render: (text, record, _, action) => [
        <a
          key="refresh"
          onClick={async () => {
            const { status, info } = await refreshWalletToken(record);
            if (status) {
              message.success(info);
              if (actionRefToken.current) {
                actionRefToken.current.reload();
              }
            }
            return;
          }}
        >
          <FormattedMessage id="pages.refresh" />
        </a>,

        <a
          key="refresh"
          onClick={async () => { 
            setTransferStatusUI(true);
            setCurrentRowToken(record);
            return;
          }}
        >
          <FormattedMessage id="pages.withdraw" />
        </a>,


        <a
          key="delete"
          onClick={async () => {
            const { status, info } = await removeWalletToken(record);
            if (status) {
              message.success(info);
              if (actionRefToken.current) {
                actionRefToken.current.reload();
              }
            }
            return;
          }}
        >
          <FormattedMessage id="pages.delete" />
        </a>,
      ],
    },
  ];

  const walletTokenParams: WalletTokenParams = {
    walletId: currentRow?.id,
  };


  const handleDone = () => {
    setTokenUI(false);
    setTransferStatusUI(false);
  };

  //------------------------------------walletToken end-----------------------

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
          //onCancel: () => onDone(),
          onCancel: () => { 
            setEditableRowKeys([]); // 把 EditableProTable 组件中 setEditableRowKeys(可编辑行的key)的值清空
            onDone();
          },
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

            {currentRow ? (
              <ProTable<WalletTokenItem, WalletTokenParams>
                headerTitle={intl.formatMessage({
                  id: 'pages.wallet.token.title',
                })}
                search={false}
                options={false}
                actionRef={actionRefToken}
                params={walletTokenParams}
                rowKey={(record) => record.id}
                request={getWalletTokenList}
                columns={walletTokenColumns}
              />
            ) : (
              ''
            )}

            <Space>
              <Button
                type="primary"
                onClick={() => {
                  setTokenUI(true);
                }}
                icon={<PlusOutlined />}
              >
                <FormattedMessage id="pages.wallet.token.contract.new" />
              </Button>


            </Space>

          </>
        )}
      </Drawer>

      <WalletTokenModel
        done={done}
        visible={tokenUI}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />

      <WalletTokenTransferModel
        done={done}
        visible={transferStatusUI}
        current={currentRowToken}
        onDone={handleDone}
        onSubmit={handleTransferSubmit}
      />
    </>
  );
};

export default WalletModal;
