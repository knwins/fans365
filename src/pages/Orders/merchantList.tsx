import {
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProProvider,
  ProTable,
} from '@ant-design/pro-components';

import { FormattedMessage, useIntl } from '@umijs/max';
import { Avatar, Badge, Button, Card, Divider, Drawer, Form, List, message } from 'antd';
import type { FC } from 'react';
import React, { useContext, useState } from 'react';
import { useRequest } from 'umi';
import { queryCurrent } from '../Account/service';
import { getGoodsTypeList } from '../GoodsType/service';
import type { TSTaskParams } from '../TSTask/data';
import { addTSTask } from '../TSTask/service';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type { OrdersItem, OrdersParams, TweetItem, TweetParams } from './data.d';
import { ordersDisplay, tweetList } from './service';
import styles from './style.less';

export type PageParams = {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
};

export function formatMoney(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  return `${val}`
    .replace(/\B(?=(\d{3})+(?!\d))/g, '')
    .replace(/^(-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');
}

const CardInfo: React.FC<{
  price: React.ReactNode;
  tstaskCount: React.ReactNode;
  days: React.ReactNode;
}> = ({ price, tstaskCount, days }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>
        <FormattedMessage id="pages.orders.price" />
        <small>
          (<FormattedMessage id="pages.money" />)
        </small>
      </p>
      <p>{price}</p>
    </div>
    <div>
      <p>
        <FormattedMessage id="pages.orders.blanceCount" />
        <small>
          (<FormattedMessage id="pages.people" />)
        </small>
      </p>
      <p>{tstaskCount}</p>
    </div>

    <div>
      <p>
        <FormattedMessage id="pages.orders.days.label" />
        <small>
          (<FormattedMessage id="pages.day" />)
        </small>
      </p>
      <p>{days}</p>
    </div>
  </div>
);

export const Applications: FC<Record<string, any>> = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<OrdersItem>();

  //读取用户
  const { data: currentUser, loading: loadingUser } = useRequest(() => {
    return queryCurrent();
  });

  //读取分类数据
  const { data: goodsTypes } = useRequest(() => {
    return getGoodsTypeList({
      current: 1,
      pageSize: 100,
    });
  });

  const goodsTypesData = goodsTypes || [];
  const getTagSelectOption = () => {
    if (goodsTypesData) {
      return goodsTypesData.map((item) => (
        <TagSelect.Option value={item.id} key={item.id}>
          {item.name}
        </TagSelect.Option>
      ));
    }
    return;
  };

  //end

  //国际化
  const intl = useIntl();

  const { data, loading, run } = useRequest((values?: any) => {
    const goodsTypeIds = values ? values.goodsTypeId + '' : '';
    const pageParams: PageParams = {
      current: 1,
      pageSize: 20,
    };
    const options: OrdersParams = {
      goodsTypeIds: goodsTypeIds,
    };
    return ordersDisplay({
      ...pageParams,
      ...options,
    });
  });

  const addTSTasks = async (fields: any, current?: TSTaskParams) => {
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
      );
      const { status, info } = await addTSTask({
        ...current,
        ...fields,
      });
      loadingHiddle();
      if (status) {
        message.success(info);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  const list = data || [];

  const columns: ProColumns<TweetItem>[] = [
    {
      title: <FormattedMessage id="pages.tweet.content" />,
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch: true,
      ellipsis: true,
      width: '80%',
    },

    {
      title: <FormattedMessage id="pages.tweet.useCount" />,
      dataIndex: 'useCount',
      valueType: 'digit',
      tooltip: <FormattedMessage id="pages.tweet.useCount.tip2" />,
      hideInSearch: true,
      ellipsis: true,
      width: '20%',
    },
  ];

  const proDescriptionsItem: ProDescriptionsItemProps<OrdersItem, 'price' | 'day' | 'people'>[] = [
    {
      title: <FormattedMessage id="pages.orders.link" />,
      dataIndex: 'link',
      valueType: 'text',
      ellipsis: true,
    },

    {
      title: <FormattedMessage id="pages.orders.type" />,
      dataIndex: ['goods', 'name'],
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.orders.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },

    {
      title: <FormattedMessage id="pages.orders.price" />,
      dataIndex: ['goods', 'price'],
      valueType: 'price',
    },

    {
      title: <FormattedMessage id="pages.orders.days.label" />,
      dataIndex: ['goods', 'days'],
      valueType: 'day',
    },

    {
      title: <FormattedMessage id="pages.orders.quantity" />,
      dataIndex: 'quantity',
      valueType: 'people',
    },

    {
      title: <FormattedMessage id="pages.orders.finishedQty" />,
      dataIndex: 'finishedQty',
      valueType: 'people',
    },

    {
      title: <FormattedMessage id="pages.orders.tstaskCount" />,
      dataIndex: 'tstaskCount',
      valueType: 'people',
    },
  ];

  const params: TweetParams = {
    ordersId: currentRow?.id,
  };
  const ivalues = useContext(ProProvider);
  return (
    <div className={styles.filterCardList}>
      <Card bordered={false}>
        <Form
          onValuesChange={(_, values: any) => {
            run(values);
          }}
        >
          <StandardFormRow
            title={intl.formatMessage({
              id: 'pages.orders.type',
            })}
            block
            style={{ paddingBottom: 12 }}
          >
            <Form.Item name="goodsTypeId">
              <TagSelect expandable hideCheckAll={true}>
                {getTagSelectOption()}
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
        </Form>
      </Card>

      <br />
      <List<OrdersItem>
        rowKey="id"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        loading={loading}
        dataSource={list}
        renderItem={(item) => {
          if (!loadingUser && item.user.id == currentUser?.id) {
            return (
              <>
                <List.Item key={item.id}>
                  <Badge.Ribbon
                    text={intl.formatMessage({
                      id: 'pages.orders.myPublished',
                    })}
                    color="green"
                  >
                    <Card
                      hoverable
                      bodyStyle={{ paddingBottom: 20, marginTop: 40 }}
                      actions={[
                        <Button
                          key="detail"
                          type="default"
                          size="small"
                          onClick={() => {
                            setCurrentRow(item);
                            setShowDetail(true);
                          }}
                        >
                          <FormattedMessage id="pages.detail" />
                        </Button>,

                        <Button
                          key="rushing"
                          type="primary"
                          size="small"
                          onClick={() => {
                            addTSTasks(item);
                          }}
                        >
                          <FormattedMessage id="pages.rushing" />
                        </Button>,
                        <Button
                          key="toLink"
                          type="link"
                          href={item.link}
                          target="_bank"
                          size="small"
                        >
                          <FormattedMessage id="pages.link" />
                        </Button>,
                      ]}
                    >
                      <Card.Meta
                        avatar={<Avatar src={item.goods?.logo} shape="square" size="large" />}
                        title={item.goods?.name}
                        description={item.link}
                      />

                      <div className={styles.cardItemContent}>
                        <CardInfo
                          price={formatMoney((item.goods.price / 1000) * 0.7)}
                          tstaskCount={item.quantity - item.finishedQty}
                          days={item.goods.days}
                        />
                      </div>
                    </Card>
                  </Badge.Ribbon>
                </List.Item>
              </>
            );
          } else {
            return (
              <>
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    bodyStyle={{ paddingBottom: 20 }}
                    actions={[
                      <Button
                        key="detail"
                        type="default"
                        size="small"
                        onClick={() => {
                          setCurrentRow(item);
                          setShowDetail(true);
                        }}
                      >
                        <FormattedMessage id="pages.detail" />
                      </Button>,

                      <Button
                        key="rushing"
                        type="primary"
                        size="small"
                        onClick={() => {
                          addTSTasks(item);
                        }}
                      >
                        <FormattedMessage id="pages.rushing" />
                      </Button>,
                      <Button key="toLink" type="link" href={item.link} target="_bank" size="small">
                        <FormattedMessage id="pages.link" />
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      avatar={<Avatar src={item.goods?.logo} shape="square" size="large" />}
                      title={item.goods?.name}
                      description={item.link}
                    />

                    <div className={styles.cardItemContent}>
                      <CardInfo
                        price={formatMoney((item.goods.price / 1000) * 0.7)}
                        tstaskCount={item.quantity - item.finishedQty}
                        days={item.goods.days}
                      />
                    </div>
                  </Card>
                </List.Item>
              </>
            );
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
          <>
            <ProProvider.Provider
              value={{
                ...ivalues,
                valueTypeMap: {
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
              <ProDescriptions<OrdersItem, 'price' | 'day' | 'people'>
                column={1}
                title={intl.formatMessage({
                  id: 'pages.detail',
                })}
                request={async () => ({
                  data: currentRow || {},
                })}
                params={{
                  id: currentRow?.id,
                }}
                columns={proDescriptionsItem}
              />
            </ProProvider.Provider>
            <Divider />
            {currentRow.goodsTypeId == '4' ||
            currentRow.goodsTypeId == '15' ||
            currentRow.goodsTypeId == '16' ||
            currentRow.goodsTypeId == '17' ? (
              <ProTable<TweetItem, TweetParams>
                headerTitle={intl.formatMessage({
                  id: 'pages.orders.tweet.title',
                })}
                search={false}
                options={false}
                className="tweet_table"
                params={params}
                rowKey={(record) => record.id}
                request={tweetList}
                columns={columns}
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

export default Applications;
