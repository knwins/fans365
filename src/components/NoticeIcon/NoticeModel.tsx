import { ModalForm } from '@ant-design/pro-components';
import React from 'react';

export type NoticeFormProps = {
  done: boolean;
  visible: boolean;
  current: Partial<API.NoticeIconItem>;
  onCancel: (flag?: boolean, formVals?: API.NoticeIconItem) => void;
  onDone: () => void;
};

const NoticeForm: React.FC<NoticeFormProps> = (props) => {
  const { visible, current, done, onDone, children } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<API.NoticeIconItem>
      visible={visible}
      title={current.title}
      width={640}
      submitter={false}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '172px 0' } : {},
      }}
    >
     {current.description}
    </ModalForm>
  );
};

export default NoticeForm;
