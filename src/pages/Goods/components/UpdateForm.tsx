import type { GoodsTypeItem } from '@/pages/GoodsType/data';
import {
  ProFormDigit,
  ProFormMoney,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal } from 'antd';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import type { GoodsItem } from '../data';

export type FormValueType = {
  goodsTypeId?: string;
} & Partial<GoodsItem>;

export type UpdateFormProps = {
  updateModalVisible: boolean;
  toDatas: Partial<GoodsTypeItem[]> | undefined;
  current: Partial<GoodsItem>;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<true>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [value, setValue] = useState('');

  const description = (desc: any) => {
    return (
      <ReactQuill
        theme="snow"
        defaultValue={desc}
        onChange={setValue}
      />
    );
  };

  //获取传递来的分类数据并处理
  const { toDatas, current, onSubmit } = props;
  const dataListOptions = {};
  if (toDatas) {
    toDatas.map((item) => {
      if (item) {
        dataListOptions[item.id] = {
          text: item.name,
          value: item.id,
        };
      }
    });
  }

  //国际化
  const intl = useIntl();

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
        current: 1,
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.edit',
            })}
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={async (values) => {
        values.description = value;
        onSubmit(values);
      }}

    >
      <StepsForm.StepForm
        initialValues={current}
        title={intl.formatMessage({
          id: 'pages.goods.steps.1',
        })}
      >
        <ProFormSelect
          name="goodsTypeId"
          initialValue={props.current.goodsType?.id + ''}
          width="md"
          label={intl.formatMessage({
            id: 'pages.goods.typeName.label',
          })}
          valueEnum={dataListOptions}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.goods.typeName.required" />,
            },
          ]}
        />

        <ProFormRadio.Group
          name="status"
          label={intl.formatMessage({
            id: 'pages.goods.status.label',
          })}
          options={[
            {
              value: 'On',
              label: <FormattedMessage id="pages.goods.status.on" />,
            },
            {
              value: 'Off',
              label: <FormattedMessage id="pages.goods.status.off" />,
            },
          ]}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.goods.status.required" />,
            },
          ]}
        />
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={current}
        title={intl.formatMessage({
          id: 'pages.goods.steps.2',
        })}
      >
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.goods.name.label',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.goods.name.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.goods.name.required" />,
            },
          ]}
        />

        <p>
          {intl.formatMessage({
            id: 'pages.notice.description.label',
          })}
        </p>

        {description(current?.description)}
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={current}
        title={intl.formatMessage({
          id: 'pages.goods.steps.3',
        })}
      >

        <ProFormMoney
          name="price"
          label={intl.formatMessage({
            id: 'pages.goods.price.label',
          })}
          width="md"
          locale="zh-Hans-CN"
          min={0}
          customSymbol="💰"
          fieldProps={{ precision: 6 }}
          placeholder={intl.formatMessage({
            id: 'pages.goods.price.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.goods.price.required" />,
            },
          ]}
        />

        <ProFormSelect
          name="level"
          width="xs"
          label={intl.formatMessage({
            id: 'pages.goods.type.level.label',
          })}
          options={[
            { label: 'VIP0', value: 'VIP0' },
            { label: 'VIP500', value: 'VIP500' },
            { label: 'VIP1000', value: 'VIP1000' },
            { label: 'VIP5000', value: 'VIP5000' },
            { label: 'VIP8000', value: 'VIP8000' },
            { label: 'VIP10000', value: 'VIP10000' },
            { label: 'VIP30000', value: 'VIP30000' },
            { label: 'VIP50000', value: 'VIP50000' },
          ]}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.goods.type.level.required',
              }),
            },
          ]}
        />
        <ProFormDigit
          name="minNumber"
          label={intl.formatMessage({
            id: 'pages.goods.minNumber.label',
          })}
          width="md"
          min={1}
          max={10000}
          fieldProps={{ precision: 0 }}
          placeholder={intl.formatMessage({
            id: 'pages.goods.minNumber.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.goods.minNumber.required" />,
            },
          ]}
        />
        <ProFormDigit
          name="maxNumber"
          label={intl.formatMessage({
            id: 'pages.goods.maxNumber.label',
          })}
          width="md"
          min={1}
          max={10000}
          fieldProps={{ precision: 0 }}
          placeholder={intl.formatMessage({
            id: 'pages.goods.maxNumber.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.goods.maxNumber.required" />,
            },
          ]}
        />
        <ProFormDigit
          name="days"
          label={intl.formatMessage({
            id: 'pages.goods.days.label',
          })}
          width="md"
          min={1}
          max={10000}
          fieldProps={{ precision: 0 }}
          placeholder={intl.formatMessage({
            id: 'pages.goods.days.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.goods.days.required" />,
            },
          ]}
        />
        <ProFormDigit
          name="sort"
          label={intl.formatMessage({
            id: 'pages.sort.label',
          })}
          width="md"
          min={1}
          max={5000}
          fieldProps={{ precision: 0 }}
          placeholder={intl.formatMessage({
            id: 'pages.sort.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.sort.required" />,
            },
          ]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
