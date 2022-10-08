import { ProProvider } from '@ant-design/pro-components';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer } from 'antd';
import React, { useContext, useRef, useState } from 'react';
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
      width: '120px',
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
  ];

  const proDescriptions: ProDescriptionsItemProps<
    GoodsItem,
    'description' | 'price' | 'day' | 'people'
  >[] = [
    {
      title: <FormattedMessage id="pages.goods.name" />,
      dataIndex: 'name',
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.goods.price" />,
      dataIndex: 'price',
      valueType: 'money',
    },
    {
      title: <FormattedMessage id="pages.goods.minNumber" />,
      dataIndex: 'minNumber',
      valueType: 'people',
    },
    {
      title: <FormattedMessage id="pages.goods.maxNumber" />,
      valueType: 'people',
      dataIndex: 'maxNumber',
    },
    {
      title: <FormattedMessage id="pages.goods.days" />,
      valueType: 'day',
      dataIndex: 'days',
    },
    {
      title: <FormattedMessage id="pages.goods.typeName" />,
      dataIndex: ['goodsType', 'name'],
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.goods.status" />,
      dataIndex: 'status',
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
      valueType: 'description',
    },
  ];
  const ivalues = useContext(ProProvider);

  return (
    <div>
      <PageContainer>
        <ProTable<GoodsItem, GoodsParams>
          headerTitle=""
          actionRef={actionRef}
          pagination={paginationProps}
          rowKey={(record) => record.id}
          params={params}
          search={false}
          toolBarRender={false}
          request={queryGoodsList}
          columns={columns}
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
        <ProProvider.Provider
          value={{
            ...ivalues,
            valueTypeMap: {
              description: {
                render: (text) => (
                  <div dangerouslySetInnerHTML={{ __html: text }} key="description"></div>
                ),
              },
              people: {
                render: (text) => (
                  <span>
                    {text}
                    <FormattedMessage id="pages.people" />
                  </span>
                ),
              },
              day: {
                render: (text) => (
                  <span>
                    {text}
                    <FormattedMessage id="pages.day" />
                  </span>
                ),
              },
              price: {
                render: (text) => <span>{'¥' + Number((text / 1000) * 0.7).toFixed(3)}</span>,
              },
            },
          }}
        >
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
              <ProDescriptions<GoodsItem, 'description' | 'price' | 'day' | 'people'>
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
                columns={proDescriptions}
              />
            )}
          </Drawer>
        </ProProvider.Provider>
      </PageContainer>
    </div>
  );
};

export default GoodsList;
