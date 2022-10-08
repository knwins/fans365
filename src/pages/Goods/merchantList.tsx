import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import { useRequest } from 'umi';
import { getGoodsTypeList } from '../GoodsType/service';
import type { GoodsItem, GoodsParams } from './data';

import { queryGoodsList } from './service';

const GoodsList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<GoodsItem>();
  const [params, setParams] = useState<Partial<GoodsParams> | undefined>(undefined);

  //国际化
  const intl = useIntl();
  //读取分类数据
  const { data } = useRequest(() => {
    return getGoodsTypeList({
      current: 1,
      pageSize: 100,
    });
  });

  const dataListOptions = {};

  const listData = data || [];
  if (listData) {
    listData.map((item) => {
      dataListOptions[item.id] = {
        text: item.name,
      };
    });
  }
  //end

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<GoodsItem>[] = [
    {
      title: <FormattedMessage id="pages.goods.logo" />,
      width: '80px',
      dataIndex: 'logo',
      valueType: 'avatar',
      align: 'center',
      hideInSearch: true,
      hideInDescriptions: true,
    },

    {
      title: <FormattedMessage id="pages.goods.name" />,
      dataIndex: 'name',
      width: 'md',
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
      title: <FormattedMessage id="pages.goods.price" />,
      width: 'xs',
      dataIndex: 'price',
      valueType: 'money',
      hideInSearch: true,
      fieldProps: { precision: 6 },
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.goods.minNumber" />,
      width: 'xs',
      dataIndex: 'minNumber',
      hideInSearch: true,
      renderText: (val: string) => `${val}`,
    },
    {
      title: <FormattedMessage id="pages.goods.maxNumber" />,
      width: 'xs',
      dataIndex: 'maxNumber',
      hideInSearch: true,
      renderText: (val: string) => `${val}`,
    },

    {
      dataIndex: 'goodsTypeId',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueEnum: dataListOptions,
      valueType: 'select',
    },

    {
      title: <FormattedMessage id="pages.goods.typeName" />,
      dataIndex: ['goodsType', 'name'],
      hideInForm: true,
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.goods.status" />,
      width: 'xs',
      dataIndex: 'status',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      valueEnum: {
        0: {
          text: <FormattedMessage id="pages.goods.status.on" />,
          status: 'On',
        },
        1: {
          text: <FormattedMessage id="pages.goods.status.off" />,
          status: 'Off',
        },
      },
    },

    {
      title: <FormattedMessage id="pages.description" />,
      dataIndex: 'description',
      width: 'md',
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: false,
      valueType: 'textarea',
    },
  ];
  return (
    <div>
      <PageContainer>
        <ProTable<GoodsItem, GoodsParams>
          actionRef={actionRef}
          pagination={paginationProps}
          rowKey={(record) => record.id}
          params={params}
          request={queryGoodsList}
          columns={columns}
          search={false}
          toolBarRender={false}
          onChange={(pagination, filters: any, sorter: any) => {
            console.log(pagination);
            if (sorter) {
              sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
              const goodsParams: GoodsParams = {
                sorter: sorter.order,
                filter: sorter.field,
              };
              setParams(goodsParams);
            }
          }}
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
            <ProDescriptions<GoodsItem>
              column={1}
              title={intl.formatMessage({
                id: 'pages.goods.detail',
              })}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.id,
              }}
              columns={columns as ProDescriptionsItemProps<GoodsItem>[]}
            />
          )}
        </Drawer>
      </PageContainer>
    </div>
  );
};

export default GoodsList;
