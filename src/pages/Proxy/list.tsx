import { PlusOutlined } from '@ant-design/icons';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import { getProxyList } from '../Proxy/service';
import OperationModal from './components/OperationModel';
import type { ProxyItem, ProxyParams } from './data';
import { addProxy, removeProxy, updateProxy } from './service';

const Proxy: React.FC = () => {
  const [done, setDone] = useState<boolean>(false);

  //edit/add
  const [visible, setVisible] = useState<boolean>(false);
  //show
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Partial<ProxyItem> | undefined>(undefined);
  const [params, setParams] = useState<Partial<ProxyParams> | undefined>(undefined);

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

  const handleSubmit = async (fields: ProxyItem) => {
    try {
      const action = fields?.id ? 'update' : 'add';
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
      );

      if (action == 'add') {
        const { status, info } = await addProxy({ ...fields });
        loadingHiddle();
        if (status) {
          message.success(info);
          setVisible(false);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reloadAndRest?.();
          }
          return;
        }
        return;
      } else if (action == 'update') {
        const { status, info } = await updateProxy({ ...fields });
        loadingHiddle();
        if (status) {
          message.success(info);
          setVisible(false);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reloadAndRest?.();
          }
          return;
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
   * 删除节点
   *
   * @param selectedRows
   */

  const handleRemove = async (selectedRows: ProxyItem) => {
    if (!selectedRows) return true;
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
      );
      const { status, info } = await removeProxy({
        id: selectedRows.id,
      });
      loadingHiddle();
      if (status) {
        message.success(info);
        setVisible(false);
        setCurrentRow(undefined);
        if (actionRef.current) {
          actionRef.current.reloadAndRest?.();
        }
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

  const columns: ProColumns<ProxyItem>[] = [


    {
      title: <FormattedMessage id="pages.proxy.createtime" />,
      dataIndex: 'createtime',
      valueType: 'dateTime',
      hideInSearch: true,
      align: 'center',
    },
 
    {
      title: <FormattedMessage id="pages.proxy.ip" />,
      dataIndex: 'ip',
      hideInSearch: true,
      valueType: 'text',
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
      title: <FormattedMessage id="pages.proxy.port" />,
      dataIndex: 'port',
      hideInSearch: true,
      valueType: 'text',
      width: '120',
    },

    {
      title: <FormattedMessage id="pages.proxy.username" />,
      dataIndex: 'username',
      hideInSearch: true,
      valueType: 'text',
      width: '120',
    },

    {
      title: <FormattedMessage id="pages.proxy.password" />,
      dataIndex: 'password',
      hideInSearch: true,
      valueType: 'text',
      width: '120',
    },


    {
      title: <FormattedMessage id="pages.proxy.provider" />,
      dataIndex: 'provider',
      hideInSearch: true,
      valueType: 'text',
      width: '120',
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions:true,
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
        <ProTable<ProxyItem, ProxyParams>
          headerTitle=""
          actionRef={actionRef}
          rowKey={(record) => record.id}
          search={false}
          params={params}
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
          onChange={(filters: any, sorter: any) => {
            if (sorter) {
              sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
              const accountTypeParams: ProxyParams = {
                sorter: sorter.order,
                filter: sorter.field,
              };
              setParams(accountTypeParams);
            }
          }}
          request={getProxyList}
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
          <ProDescriptions<ProxyItem>
            column={1}
            title={currentRow?.ip}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ProxyItem>[]}
          />
        )}
      </Drawer>
    </div>
  );
};
export default Proxy;
