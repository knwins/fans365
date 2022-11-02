import {
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';




import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message, Space, Tag } from 'antd';
import 'antd/dist/antd.css';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import OperationModel from './components/OperationModel';
import EnvironmentLogModel from './components/EnvironmentLogModel';
import AccountModel from './components/AccountModel';
import WalletModel from './components/WalletModel';

import type { EnvironmentItem, EnvironmentParams, EnvironmentLogItem, EnvironmentLogParams } from './data';
import { addEnvironment, environmentList, environmentLogList, updateEnvironment } from './service';
import styles from './style.less';
import { useRequest } from 'umi';
import { getAccountTypeList } from '../AccountType/service';

import { createFromIconfontCN, WalletFilled, MailFilled, TwitterOutlined, PhoneOutlined, GoogleOutlined } from '@ant-design/icons';
const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3745975_od931newm2.js', // 在 iconfont.cn 上生成
});

export type PageParams = {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
};

export const EnvironmentList: FC = () => {
  const [done, setDone] = useState<boolean>(false);

  /**分布添加窗口的弹窗 */
  const [operationModelVisible, handleOperationModelVisible] = useState<boolean>(false);
  const [environmentLogModelVisible, handleEnvironmentLogModelVisible] = useState<boolean>(false);

  //账户
  const [accoutsModelVisible, handleAccountsModelVisible] = useState<boolean>(false);

  //钱包
  const [walletModelVisible, handleWalletModelVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<Partial<EnvironmentParams> | undefined>(undefined);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<EnvironmentItem>();



  //国际化
  const intl = useIntl();



  //读取分类数据
  const { data: accountTypes } = useRequest(() => {
    return getAccountTypeList({
      current: 1,
      pageSize: 100,
    });
  });
  //end

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    //current: 1,
  };

  const handleSubmit = async (fields: EnvironmentItem) => {
    const action = fields?.id ? 'update' : 'add';
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
      );

      if (action == 'add') {
        const { status, info } = await addEnvironment({ ...fields });
        loadingHiddle();
        if (status) {
          message.success(info);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reloadAndRest?.();
          }
          return true;
        }


      } else if (action == 'update') {
        const { status, info } = await updateEnvironment({ ...fields });
        loadingHiddle();
        if (status) {
          message.success(info);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reloadAndRest?.();
          }
          return true;
        }

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
    handleOperationModelVisible(false);
    handleEnvironmentLogModelVisible(false);
    handleAccountsModelVisible(false);
    handleWalletModelVisible(false);
  };

  const columns: ProColumns<EnvironmentItem>[] = [



    {
      title: <FormattedMessage id="pages.environment.name" />,
      dataIndex: 'name',
      valueType: 'text',
      hideInDescriptions: true,
      hideInSearch: true,
      width: '80px',
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
      title: <FormattedMessage id="pages.environment.accounts" />,
      dataIndex: 'accounts',
      align: 'left',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => (
        <Space size={[12, 12]} wrap>

          {
            record.accountsLabels?.map(({ name, color, icon }) => (
              <Tag key={name} color={color}
                icon={icon == "Twitter" ? <TwitterOutlined /> : icon == "Discord" ? <Icon type='icon-discord' />: icon == "Google" ? <GoogleOutlined /> : icon == "Mail" ? <MailFilled /> : <PhoneOutlined />}>
                {name}
              </Tag>
            ))
          }
        </Space>
      ),


    },
    {
      title: <FormattedMessage id="pages.environment.wallets" />,
      dataIndex: 'wallets',
      fieldProps: { size: 'small' },
      ellipsis: true,
      hideInSearch: true,
      align: 'left',
      render: (_, record) => (
        <Space size={[8, 2]} wrap>

          {
            record.walletLabels?.map(({ name, color, icon }) => (
              <Tag color={color} key={name} icon={<WalletFilled />}>
                {name}
              </Tag>
            ))
          }
        </Space>
      ),
    },



    {
      title: <FormattedMessage id="pages.environment.runsoft" />,
      dataIndex: 'runsoft',
      valueType: 'text',
      hideInSearch: true,
      width: '100px',
      ellipsis: true,
    },

    {
      title: <FormattedMessage id="pages.environment.status" />,
      dataIndex: 'status',
      valueType: 'select',
      hideInSearch: false,
      align: 'center',
      width: '80px',
      valueEnum: {
        Normal: {
          text: intl.formatMessage({
            id: 'pages.environment.status.normal',
          }),
        },
        Abnormality: {
          text: intl.formatMessage({
            id: 'pages.environment.status.abnormality',
          }),
        },

      },
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      width: '260px',
      align: 'center',
      render: (_, record) => {
        return [


          <a
            key="addAccounts"
            onClick={(e) => {
              e.preventDefault();
              setCurrentRow(record);
              handleAccountsModelVisible(true);
            }}
          >
            <FormattedMessage id="pages.add.accounts" />
          </a>,

          <a
            key="addWallet"
            onClick={(e) => {
              e.preventDefault();
              setCurrentRow(record);
              handleWalletModelVisible(true);
            }}
          >
            <FormattedMessage id="pages.add.wallet" />
          </a>,

          <a
            key="addLog"
            onClick={(e) => {
              e.preventDefault();
              setCurrentRow(record);
              handleEnvironmentLogModelVisible(true);
            }}
          >
            <FormattedMessage id="pages.add.logs" />
          </a>,

          <a
            key="edit"
            onClick={(e) => {
              e.preventDefault();
              setCurrentRow(record);
              handleOperationModelVisible(true);
            }}
          >
            <FormattedMessage id="pages.edit" />
          </a>,
        ];
      },
    },
  ];

  const proDescriptionsItem: ProDescriptionsItemProps<EnvironmentItem>[] = [
    {
      title: <FormattedMessage id="pages.environment.name" />,
      dataIndex: 'name',
      valueType: 'text',
      ellipsis: true,
      hideInDescriptions: true,
    },

    {
      title: <FormattedMessage id="pages.environment.runsoft" />,
      dataIndex: 'runsoft',
      valueType: 'text',
    },


    {
      title: <FormattedMessage id="pages.environment.accounts" />,
      dataIndex: 'accounts',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) => (
        <Space size={[12, 12]} wrap>

          {
            record.accountsLabels?.map(({ name, color, icon }) => (
              <Tag key={name} color={color}
                icon={icon == "Twitter" ? <TwitterOutlined /> : icon == "Discord" ? <Icon type='icon-discord' />: icon == "Google" ? <GoogleOutlined /> : icon == "Mail" ? <MailFilled /> : <PhoneOutlined />}>
                {name}
              </Tag>
            ))
          }
        </Space>
      ),
    },
    {
      title: <FormattedMessage id="pages.environment.wallets" />,
      dataIndex: 'wallets',
      fieldProps: { size: 'small' },
      ellipsis: false,
      copyable: true,
      hideInSearch: true,
      render: (_, record) => (
        <Space size={[12, 12]} wrap>

          {
            record.walletLabels?.map(({ name, color, icon }) => (
              <Tag color={color} key={name} icon={<WalletFilled />}>
                {name}
              </Tag>
            ))
          }
        </Space>
      ),
    },

    {
      title: <FormattedMessage id="pages.environment.status" />,
      dataIndex: 'status',
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.environment.createtime" />,
      dataIndex: 'createtime',
      valueType: 'dateTime',
    },
  ];

  const tcolumns: ProColumns<EnvironmentLogItem>[] = [

    {
      title: <FormattedMessage id="pages.environment.log.createtime" />,
      dataIndex: 'createtime',
      valueType: 'dateTime',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: <FormattedMessage id="pages.environment.log.content" />,
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch: true,
      ellipsis: true,
      width: '80%',
    },


  ];

  const tparams: EnvironmentLogParams = {
    environmentId: currentRow?.id,
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <ProTable<EnvironmentItem, EnvironmentParams>
            headerTitle=""
            actionRef={actionRef}
            pagination={paginationProps}
            rowKey={(record) => record.id}
            params={params}
            search={{
              labelWidth: 80,
            }}
            toolBarRender={() => [
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  handleOperationModelVisible(true);
                }}
              >
                <PlusOutlined /> <FormattedMessage id="pages.new" />
              </Button>,
            ]}
            request={environmentList}
            columns={columns}
            onChange={(pagination, filters: any, sorter: any) => {
              console.log(pagination);
              if (sorter) {
                sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
                const goodsParams: EnvironmentParams = {
                  sorter: sorter.order,
                  filter: sorter.field,
                };
                setParams(goodsParams);
              }
            }}
          />
        </div>
      </PageContainer>

      <OperationModel
        done={done}
        current={currentRow}
        visible={operationModelVisible}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleSubmit(value as EnvironmentItem);
          if (success) {
            handleOperationModelVisible(false);
          }
        }}
      />

      <AccountModel
        done={done}
        current={currentRow}
        accountTypes={accountTypes}
        visible={accoutsModelVisible}
        onDone={handleDone}
      />


      <WalletModel
        done={done}
        current={currentRow}
        visible={walletModelVisible}
        onDone={handleDone}
      />

      <EnvironmentLogModel
        done={done}
        current={currentRow}
        visible={environmentLogModelVisible}
        onDone={handleDone}
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
          <>

            <ProDescriptions<EnvironmentItem>
              column={1}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.id,
              }}
              columns={proDescriptionsItem}
            />


            {currentRow ? (
              <ProTable<EnvironmentLogItem, EnvironmentLogParams>
                headerTitle={intl.formatMessage({
                  id: 'pages.environment.log.title',
                })}
                search={false}
                options={false}
                className="environmentLog_table"
                params={tparams}
                rowKey={(record) => record.id}
                request={environmentLogList}
                columns={tcolumns}
              />
            ) : (
              ''
            )}
          </>
        )}
      </Drawer>
    </div>
  );
};

export default EnvironmentList;
