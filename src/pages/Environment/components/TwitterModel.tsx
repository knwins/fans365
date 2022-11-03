import { BindParams } from '@/pages/Bind/data';
import { getBindMyList } from '@/pages/Bind/service';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormDigit
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import { useRef } from 'react';
import { EnvironmentItem } from '../data';
import styles from '../style.less';

export type PageParams = {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
};

type TwitterModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<EnvironmentItem> | undefined;
  onDone: () => void;
  onSubmit: (values:any) => void;
};

const TwitterModel: FC<TwitterModelProps> = (props) => {

  const { done, visible,current, onDone, onSubmit, children } = props;
  const formRef = useRef<ProFormInstance>();

  //国际化
  const intl = useIntl();


  const handleBindList = async (key?: any) => {
    if (key === '') {
      return;
    }

    const pageParams: PageParams = {
      current: 1,
      pageSize: 50,
    };
    const options: BindParams = {
      username: key,
    };
    const { data: listData } = await getBindMyList({
      ...pageParams,
      ...options,
    });
    const listOptions = [];
    const list = listData || [];

    if (list) {
      for (let i = 0; i < list.length; i += 1) {
        const item = list[i];
        if (item) {
          listOptions.push({
            label: item.username,
            value: item.id,
          });
        }
      }
    }
    return listOptions;
  };


  if (!visible) {
    return null;
  }


  return (
    <ModalForm<EnvironmentItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.import',
      })}
      initialValues={current}
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

      <ProFormText
        name="key"
        label={intl.formatMessage({
          id: 'pages.bind.username.search.label',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.bind.username.search.placeholder',
        })}
        width="md"
      />

      <ProFormSelect
        name="bindId"
        width="lg"
        label={intl.formatMessage({
          id: 'pages.bind.username.search.select.label',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.bind.username.search.select.required',
            }),
          },
        ]}
        dependencies={['key']}
        request={async (params) => {
          return handleBindList(params.key);
        }}
      />
      <ProFormDigit name="environmentId" 
      initialValue={current?.id}
      hidden />
    </ModalForm>
  );
};

export default TwitterModel;
