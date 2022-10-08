import { PlusOutlined } from '@ant-design/icons';
import { ProProvider } from '@ant-design/pro-components';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Drawer, message, Modal } from 'antd';
import React, { useContext, useRef, useState } from 'react';
import { getGoodsTypeList } from '../GoodsType/service';
import CreateForm from './components/CreateForm';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { GoodsItem, GoodsParams } from './data';

import { addGoods, queryGoodsList, removeGoods, updateGoods } from './service';

const GoodsList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
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

  /**
   * 添加节点 {intl.formatMessage({
            id: 'pages.goods.steps.1',
          })}
   *
   * @param fields
   */

  const handleAdd = async (fields: FormValueType) => {
    const loadingShow = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingShow();
    try {
      if (fields.goodsTypeId == undefined) {
        message.error(
          intl.formatMessage({
            id: 'pages.goods.typeName.required',
          }),
        );
        return false;
      }
      const result = await addGoods({
        ...fields,
      });
      if (result.status) {
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );
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
  /**
   * 更新节点
   *
   * @param fields
   */

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleUpdate = async (fields: FormValueType, currentRow?: GoodsItem) => {
    const loadingShow = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingShow();
    try {
      if (fields.goodsTypeId == undefined) {
        message.error(
          intl.formatMessage({
            id: 'pages.goods.typeName.required',
          }),
        );
        return false;
      }

      const result = await updateGoods({
        ...currentRow,
        ...fields,
      });

      if (result.status) {
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );

        if (actionRef.current) {
          actionRef.current.reload();
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

    return false;
  };
  /**
   * 删除节点
   *
   * @param selectedRows
   */

  const handleRemove = (selectedRows: GoodsItem) => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'pages.tip.title',
      }),
      content: intl.formatMessage({
        id: 'pages.tip.content',
      }),
      okText: intl.formatMessage({
        id: 'pages.tip.ok',
      }),
      cancelText: intl.formatMessage({
        id: 'pages.tip.cancel',
      }),
      onOk: async () => {
        const loadingShow = message.loading(
          intl.formatMessage({
            id: 'pages.tip.loading',
          }),
        );
        loadingShow();
        if (!selectedRows) return true;
        try {
          await removeGoods({
            id: selectedRows.id,
          });
          message.success(
            intl.formatMessage({
              id: 'pages.tip.success',
            }),
          );
          if (actionRef.current) {
            actionRef.current.reload();
          }

          return true;
        } catch (error) {
          message.error(
            intl.formatMessage({
              id: 'pages.tip.error',
            }),
          );
          return false;
        }
      },
    });
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
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

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
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
          search={{
            labelWidth: 80,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.new" />
            </Button>,
          ]}
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

        <CreateForm
          modalVisible={createModalVisible}
          toDatas={listData}
          onCancel={() => {
            handleModalVisible(false);
            setCurrentRow(undefined);
          }}
          onSubmit={async (value) => {
            const success = await handleAdd(value as GoodsItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />

        <UpdateForm
          updateModalVisible={updateModalVisible}
          current={currentRow || {}}
          toDatas={listData}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
          }}
          onSubmit={async (value) => {
            const success = await handleUpdate(value, currentRow);
            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
                return true;
              }
            }
            return true;
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
