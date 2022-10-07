import { getNoticeList, removeNotice, updateNotice } from '@/services/ant-design-pro/api';
import { useIntl, useRequest } from '@umijs/max';
import { message, Tag } from 'antd';
import { groupBy } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './index.less';
import NoticeIcon from './NoticeIcon';
import NoticeForm from './NoticeModel';

export type GlobalHeaderRightProps = {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
};

const getNoticeData = (notices: API.NoticeIconItem[]): Record<string, API.NoticeIconItem[]> => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.createTime) {
      newNotice.createTime = moment(notice.createTime as string).fromNow();
    }

    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }

    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag
          color={color}
          style={{
            marginRight: 0,
          }}
        >
          {newNotice.extra}
        </Tag>
      ) as any;
    }

    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData: Record<string, API.NoticeIconItem[]>) => {
  const unreadMsg: Record<string, number> = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.read).length;
    }
  });
  return unreadMsg;
};

const NoticeIconView: React.FC = () => {
  const [notices, setNotices] = useState<API.NoticeIconItem[]>([]);

  const [iVisible, setiVisible] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Partial<API.NoticeIconItem> | undefined>(undefined);


  const handleDone = () => {
    setDone(false);
    setiVisible(false);
  };

  /** 国际化配置 */
  const intl = useIntl();
  const { data } = useRequest(getNoticeList);
  useEffect(() => {
    setNotices(data || []);
  }, [data]);

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const changeReadState = async (id: string) => {
    try {
      //显示公告

      setNotices(
        notices.map((item) => {
          const notice = { ...item };
          if (notice.id === id) {
            if (item.type == 'notification') {
              setiVisible(true);
              setCurrentRow(notice);
              return notice;
            }
            notice.read = true;
            //更新服务器数据
            updateNotice(notice);
          }

          return notice;
        }),
      );
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );

      return;
    }
  };

  const clearReadState = async (title: string, key: string) => {
    try {
      //公告不允许删除
      if (key == 'notification') {
        message.error(
          intl.formatMessage({
            id: 'pages.notice.notification.required',
          }),
        );
        return;
      }
      notices.map((item) => {
        const notice = { ...item };
        if (notice.type === key) {
          notice.read = true;
          //更新服务器数据
          removeNotice(notice);
        }
      });
      setNotices([]);
      message.success(`${'Clear'} ${title}`);
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );

      return;
    }
  };

  return (
    <>
      <NoticeIcon
        className={styles.action}
        //count={6}
        onItemClick={(item) => {
          changeReadState(item.id!);
        }}
        onClear={(title: string, key: string) => clearReadState(title, key)}
        loading={false}
        //  viewMoreText="查看更多"
        //onViewMore={() => message.info('Click on view more')}
        clearText={intl.formatMessage({
          id: 'pages.notice.clear',
        })}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={unreadMsg.notification}
          list={noticeData.notification}
          title={intl.formatMessage({
            id: 'pages.notice.notification',
          })}
          emptyText={intl.formatMessage({
            id: 'pages.tip.error',
          })}
          //showViewMore
        />

        <NoticeIcon.Tab
          tabKey="message"
          count={unreadMsg.message}
          list={noticeData.message}
          title={intl.formatMessage({
            id: 'pages.notice.message',
          })}
          emptyText={intl.formatMessage({
            id: 'pages.tip.error',
          })}
          //showViewMore
        />
      </NoticeIcon>

      <NoticeForm
        visible={iVisible}
        done={done}
        current={currentRow || {}}
        onDone={handleDone}
        onCancel={() => {
          setiVisible(false);
        }}
      />
    </>
  );
};

export default NoticeIconView;
