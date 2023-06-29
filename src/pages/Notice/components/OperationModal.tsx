import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../style.less';
type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<API.NoticeItem> | undefined;
  onDone: () => void;
  onSubmit: (values: API.NoticeItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();
  const [value, setValue] = useState('');

  const description = (desc: any) => {
    return <ReactQuill
     theme="snow" 
    defaultValue={desc}  onChange={setValue}
     
    />;
  };

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<API.NoticeItem>
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
        values.description = value;
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
          name="title"
          label={intl.formatMessage({
            id: 'pages.notice.title.label',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.notice.title.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.notice.title.placeholder',
          })}
        />

        <ProFormSelect
          name="type"
          width="md"
          label={intl.formatMessage({
            id: 'pages.notice.type.label',
          })}
          options={[
            { label: 'notification', value: 'notification' },
            { label: 'message', value: 'message' },
          ]}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.notice.type.required',
              }),
            },
          ]}
        />

        {/* <ProFormTextArea
          name="description"
          label={intl.formatMessage({
            id: 'pages.notice.description',
          })}
          rules={[
            {
              message: intl.formatMessage({
                id: 'pages.notice.description.required',
              }),
              min: 5,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.notice.description.placeholder',
          })}
        /> */}
       
        <p>{intl.formatMessage({
            id: 'pages.notice.description.label',
          })}</p>
       
        {description(current?.description)}

        <ProFormDigit name="id" hidden />
      </>
    </ModalForm>
  );
};

export default OperationModal;
