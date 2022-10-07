import { ModalForm, ProFormRadio } from '@ant-design/pro-form';
import { Button, Result } from 'antd';
import type { FC } from 'react';
import type { TSTaskItem } from '../data';
import styles from '../style.less';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<TSTaskItem> | undefined;
  onDone: () => void;
  onSubmit: (values: TSTaskItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<TSTaskItem>
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
          　
          <ProFormRadio.Group
            name="status"
            label="状态"
            options={[
              {
                value: 'Waiting',
                label: '等候',
              },
              {
                value: 'Success',
                label: '成功',
              },
              {
                value: 'Faild',
                label: '失败',
              },
              {
                value: 'Error',
                label: '错误',
              },
            ]}
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

export default OperationModal;
