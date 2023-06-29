declare namespace API {
  type CurrentUser = {
    id: string;
    username: string;
    avatar: string;
    notice: NoticeType[];
    signature: string;
    group: string;
    tags: TagType[];
    notifyCount: number;
    unreadCount: number;
    country: string;
    province: GeographicType;
    city: GeographicType;
    address: string;
    phone: string;
  };

  type LoginResult = {
    currentAuthority?: string;
    status?: boolean;
    info?: string;
    token: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    username?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    lang?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };



  /** Notice */
  
  type NoticeList = {
    data?: NoticeItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  };

  type NoticeItemType = 'notification' | 'message' | 'event';

  type NoticeItem = {
    id?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    createTime?: string;
    extra?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type NoticeParams = {
    filter?: Record<string, any[]>;
    sorter?: Record<string, any>;
  };
  
}

