import { PlusOutlined } from '@ant-design/icons';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import { getGoodsTypeList } from '../GoodsType/service';
import OperationModal from './components/OperationModal';
import type { GoodsTypeItem, GoodsTypeParams } from './data';
import { addGoodsType, removeGoodsType, updateGoodsType } from './service';

const GoodsType: React.FC = () => {
  const [done, setDone] = useState<boolean>(false);

  //edit/add
  const [visible, setVisible] = useState<boolean>(false);
  //show
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Partial<GoodsTypeItem> | undefined>(undefined);
  const [params, setParams] = useState<Partial<GoodsTypeParams> | undefined>(undefined);

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

  const handleSubmit = async (fields: GoodsTypeItem) => {
    try {
      const action = fields?.id ? 'update' : 'add';
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
      );

      if (action == 'add') {
        const { status, info } = await addGoodsType({ ...fields });
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
        const { status, info } = await updateGoodsType({ ...fields });
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

  const handleRemove = async (selectedRows: GoodsTypeItem) => {
    if (!selectedRows) return true;
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
      );
      const { status, info } = await removeGoodsType({
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

  const columns: ProColumns<GoodsTypeItem>[] = [
    {
      title: 'Logo',
      width: '80px',
      dataIndex: 'logo',
      valueType: 'avatar',
      hideInSearch: true,
      align: 'center',
      hideInDescriptions: true,
    },
    {
      title: <FormattedMessage id="pages.goods.type.name" />,
      dataIndex: 'name',
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
      title: <FormattedMessage id="pages.goods.type.runner" />,
      dataIndex: 'runner',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.goods.type.action" />,
      dataIndex: 'action',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.sort" />,
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      sorter: true,
    },

    {
      title: <FormattedMessage id="pages.description" />,
      dataIndex: 'description',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea',
      width: '60',
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
        <ProTable<GoodsTypeItem, GoodsTypeParams>
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
              const goodsTypeParams: GoodsTypeParams = {
                sorter: sorter.order,
                filter: sorter.field,
              };
              setParams(goodsTypeParams);
            }
          }}
          request={getGoodsTypeList}
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
          <ProDescriptions<GoodsTypeItem>
            column={1}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<GoodsTypeItem>[]}
          />
        )}
      </Drawer>
    </div>
  );
};
export default GoodsType;
