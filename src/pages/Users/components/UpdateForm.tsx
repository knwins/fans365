import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, Result } from 'antd';
import type { FC } from 'react';
import type { UserItem, UserParams } from '../data';
import styles from '../style.less';

type UpdateModalProps = {
  visible: boolean;
  done: boolean;
  onDone: () => void;
  current: Partial<UserItem> | undefined;
  onCancel: (flag?: boolean, formVals?: UserParams) => void;
  onSubmit: (values: UserItem) => void;
};

const UpdateModal: FC<UpdateModalProps> = (props) => {
  const { visible, done, current, onDone, onSubmit, children } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<UserItem>
      visible={visible}
      title={done ? null : `${current ? '编辑' : '添加'}`}
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
      {!done ? (
        <>
          <ProFormText
            name="username"
            label="名称"
            width="md"
            rules={[{ required: true, message: '请输入名称' }]}
            placeholder="请输入名称"
          />
          <ProFormSelect
            name="group"
            width="md"
            label="选择角色"
            options={[
              { label: '终端用户', value: 'user' },
              { label: '合作商', value: 'merchant' },
              { label: '管理员', value: 'admin' },
            ]}
          />
          <ProFormDigit name="id" hidden />
          <ProFormTextArea
            name="description"
            label="描述"
            rules={[{ message: '请输入至少五个字符的描述！', min: 5 }]}
            placeholder="请输入至少五个字符"
          />
          　
        </>
      ) : (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};

export default UpdateModal;
