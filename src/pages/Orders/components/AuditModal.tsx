import { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import type { OrdersItem } from '../data.d';
import styles from '../style.less';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<OrdersItem> | undefined;
  onDone: () => void;
  onSubmit: (values: OrdersItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<OrdersItem>
      visible={visible}
      title={
        done
          ? null
          : `${
              current
                ? intl.formatMessage({
                    id: 'pages.audit',
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
      <ProFormText
        name="link"
        label={intl.formatMessage({
          id: 'pages.orders.link.label',
        })}
        width="lg"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.orders.link.required',
            }),
          },
        ]}
      />
      <ProFormRadio.Group
        name="status"
        label={intl.formatMessage({
          id: 'pages.orders.status.label',
        })}
        options={[
          {
            value: 'Waiting',
            label: intl.formatMessage({
              id: 'pages.orders.status.waiting',
            }),
          },
          {
            value: 'Progress',
            label: intl.formatMessage({
              id: 'pages.orders.status.progress',
            }),
          },

          {
            value: 'PartiallyCompleted',
            label: intl.formatMessage({
              id: 'pages.orders.status.partiallyCompleted',
            }),
          },
          {
            value: 'Completed',
            label: intl.formatMessage({
              id: 'pages.orders.status.completed',
            }),
          },

          {
            value: 'Canceled',
            label: intl.formatMessage({
              id: 'pages.orders.status.canceled',
            }),
          },
        ]}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.orders.status.required',
            }),
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        width="lg"
        label={intl.formatMessage({
          id: 'pages.description.label',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.description.placeholder',
        })}
      />
      　
    </ModalForm>
  );
};

export default OperationModal;
