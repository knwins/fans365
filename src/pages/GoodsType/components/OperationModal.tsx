import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import type { GoodsTypeItem } from '../data.d';
import styles from '../style.less';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<GoodsTypeItem> | undefined;
  onDone: () => void;
  onSubmit: (values: GoodsTypeItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<GoodsTypeItem>
      visible={visible}
      title={
        done
          ? null
          : `${
              current
                ? intl.formatMessage({
                    id: 'pages.edit',
                  })
                : intl.formatMessage({
                    id: 'pages.new',
                  })
            }`
      }
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
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
      <>
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.goods.type.name.label',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.goods.type.name.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.goods.type.name.placeholder',
          })}
        />
        <ProFormText
          name="logo"
          label={intl.formatMessage({
            id: 'pages.goods.type.logo.label',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.goods.type.logo.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.goods.type.logo.placeholder',
          })}
        />
        <ProFormText
          name="runner"
          label={intl.formatMessage({
            id: 'pages.goods.type.runner.label',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.goods.type.runner.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.goods.type.runner.placeholder',
          })}
        />
        <ProFormText
          name="action"
          label={intl.formatMessage({
            id: 'pages.goods.type.action.label',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.goods.type.action.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.goods.type.action.placeholder',
          })}
        />
        <ProFormSelect
          name="level"
          width="xs"
          label={intl.formatMessage({
            id: 'pages.goods.type.level.label',
          })}
          options={[
            { label: 'VIP0', value: 'VIP0' },
            { label: 'VIP1', value: 'VIP1' },
            { label: 'VIP2', value: 'VIP2' },
            { label: 'VIP3', value: 'VIP3' },
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
          name="sort"
          label={intl.formatMessage({
            id: 'pages.sort',
          })}
          width="xs"
          fieldProps={{ precision: 0 }}
          placeholder={intl.formatMessage({
            id: 'pages.sort.placeholder',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.sort.required',
              }),
            },
          ]}
        />
        <ProFormTextArea
          name="description"
          label={intl.formatMessage({
            id: 'pages.description',
          })}
          rules={[
            {
              message: intl.formatMessage({
                id: 'pages.description.required',
              }),
              min: 5,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.description.placeholder',
          })}
        />
        <ProFormDigit name="id" hidden />
      </>
    </ModalForm>
  );
};

export default OperationModal;
