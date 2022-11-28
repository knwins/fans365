import type { GoodsItem, GoodsParams } from '@/pages/Goods/data';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormDigit,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';

import type { FC } from 'react';
import { useRef, useState } from 'react';
import { useRequest } from 'umi';
import { getGoods, queryGoodsList } from '../../Goods/service';
import { getGoodsTypeList } from '../../GoodsType/service';
import type { OrdersItem } from '../data.d';
import styles from '../style.less';

export type pageParams = {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
};

type CreateModalProps = {
  done: boolean;
  visible: boolean;
  onDone: () => void;
  onSubmit: (values: OrdersItem) => void;
};

const CreateModal: FC<CreateModalProps> = (props) => {
  const { done, visible, onDone, onSubmit, children } = props;
  const [goods, setGoods] = useState<GoodsItem>();
  const formRef = useRef<ProFormInstance>();

  //国际化
  const intl = useIntl();

  const { data: goodsTypeListData } = useRequest(() => {
    return getGoodsTypeList({
      current: 1,
    });
  });

  const dataList = goodsTypeListData || [];
  const dataListOptions = [];
  if (dataList) {
    for (let i = 0; i < dataList.length; i += 1) {
      const item = dataList[i];
      if (item) {
        dataListOptions.push({
          label: item.name,
          value: item.id,
        });
      }
    }
  }

  if (!visible) {
    return null;
  }
  const handleGoods = async (goodsId?: string) => {
    const { data: goodsData } = await getGoods({
      id: goodsId,
    });
    setGoods(goodsData);
  };

  const handleFee = async (quantity?: any) => {
    if (goods) {
      formRef?.current?.setFieldsValue({
        fee: quantity * (goods.price / 1000),
      });
    }
  };

  const handleGoodsList = async (selectGoodsTypeId?: string) => {
    const goodsParams: pageParams = {
      current: 1,
      pageSize: 100,
    };
    const options: GoodsParams = {
      goodsTypeId: selectGoodsTypeId,
    };

    const { data: goodsListData } = await queryGoodsList({
      ...goodsParams,
      ...options,
    });
    const goodsListOptions = [];
    const goodsList = goodsListData || [];

    if (goodsList) {
      for (let i = 0; i < goodsList.length; i += 1) {
        const item = goodsList[i];
        if (item) {
          goodsListOptions.push({
            label: item.name,
            value: item.id,
          });
        }
      }
    }
    return goodsListOptions;
  };

  return (
    <ModalForm<OrdersItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.new',
      })}
      formRef={formRef}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >

      <ProFormSelect
        name="goodsTypeId"
        label={intl.formatMessage({
          id: 'pages.goods.typeName.label',
        })}
        width="md"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.goods.typeName.required',
            }),
          },
        ]}
        options={dataListOptions}
      /**fieldProps={{
            optionItemRender(item) {
              return item.label + ' - ' + item.value;
            },
          }}*/
      />
      <ProFormSelect
        name="goodsId"
        width="lg"
        label={intl.formatMessage({
          id: 'pages.goods.name.label',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.goods.name.required',
            }),
          },
        ]}
        dependencies={['goodsTypeId']}
        request={async (params) => {
          return handleGoodsList(params.goodsTypeId);
        }}
        fieldProps={{
          onChange(value) {
            return handleGoods(value);
          },
        }}
      />

      <ProFormSelect
        name="runBindStatus"
        width="lg"
        label={intl.formatMessage({
          id: 'pages.goods.runBindStatus.label',
        })}
        options={[
          { label: 'Abnormality', value: 'Abnormality' },
          { label: 'Use', value: 'Use' },
        ]}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.orders.runBindStatus.required',
            }),
          },
        ]}
      />

      <ProFormText
        name="link"
        width="lg"
        label={intl.formatMessage({
          id: 'pages.orders.link.label',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.orders.link.required',
            }),
          },
        ]}
      />
      <ProFormDigit
        name="quantity"
        width="md"
        label={intl.formatMessage({
          id: 'pages.orders.quantity.label',
        })}
        min={goods?.minNumber}
        max={goods?.maxNumber}
        tooltip={`Min:${goods?.minNumber}~Max:${goods?.maxNumber}`}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.orders.quantity.required',
            }),
          },
        ]}
        fieldProps={{
          onChange(value) {
            return handleFee(value);
          },
        }}
      />
      <ProFormMoney name="fee" width="md" label={
        intl.formatMessage({
          id: 'pages.orders.fee.label',
        })
      } readonly />
      {/* <ProFormTextArea
        name="description"
        width="lg"
        label={intl.formatMessage({
          id: 'pages.orders.description.label',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.orders.description.placeholder',
        })}
      /> */}
    </ModalForm>
  );
};

export default CreateModal;
