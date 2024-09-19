
import { AccountTypeItem } from '../AccountType/data';
import { ProxyItem } from '../Proxy/data';
import type { UserItem } from '../User/data';


export type EnvironmentItem = {
  id: string;
  name: string;
  runsoft: string;
  status: string;
  accountsList: string;
  createTime: Date;
  proxy: ProxyItem;
  user: UserItem;
  accountsLabels?: TagItem[];
  walletLabels?: TagItem[];

  sortAction?: string;
};

export type EnvironmentPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type EnvironmentListData = {
  list: EnvironmentListItem[];
  pagination: Partial<EnvironmentPagination>;
};

export type EnvironmentParams = {
  key?: string;
  status?: string;
  name?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};



//EnvironmentLog
export type EnvironmentLogItem = {
  id: string;
  createTime?: Date;
  environmentId?: string;
  content: string;
};

export type EnvironmentLogPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type EnvironmentLogParams = {
  environmentId?: string;
  filter?: string;
  sorter?: string;
};


//Accounts
export type AccountsItem = {
  id: string;
  username: string;
  password?: string;
  telephone?: string;
  email?: string;
  status?: string;
  lang?: string;
  accountType?: AccountTypeItem;
  accountTypeName?: string;
  environmentId?: string;
};

export type AccountsPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type AccountsData = {
  list: AccountsItem[];
  pagination: Partial<AccountsPagination>;
};

export type AccountsParams = {
  key?: string;
  environmentId?: string;
  filter?: string;
  sorter?: string;
};

export type TagItem = {
  name: string;
  color: string;
  icon?: string;
}




//Wallet

export type WalletItem = {
  id: string;
  name?: string;
  address?: string;
  mnemonic?: string;
  privatekey?: string;
  publickey?: string;
  addressFormat?: string;
  createTime?: Date;
  autoTx?: string;
  gasFeeTotal?:string;
  txTotal?:string;
  environmentId?: string;
  lang?: string;
};

export type WalletPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type WalletData = {
  list: WalletItem[];
  pagination: Partial<WalletPagination>;
};

export type WalletParams = {
  environmentId?: string;
  filter?: string;
  sorter?: string;
};


//WalletLog
export type WalletLogItem = {
  id: string;
  createTime?: Date;
  walletId?: string;
  content: string;
  walletTXType: WalletTXTypeItem;
};

export type WalletTXTypeItem = {
  id: string;
  name?: string;
};
 

export type WalletLogPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type WalletLogParams = {
  walletId?: string;
  filter?: string;
  sorter?: string;
};


//WalletToken

export type WalletTokenItem = {
  id: string;
  symbol?: string;
  contract?: string;
  balance?: number;
  network?: string;
  updateTime?: Date;
  walletId?: string;
  lang?: string;
};

export type WalletTokenPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type WalletTokenData = {
  list: WalletTokenItem[];
  pagination: Partial<WalletTokenPagination>;
};

export type WalletTokenParams = {
  walletId?: string;
  filter?: string;
  sorter?: string;
};


export type WalletTokenTransferItem = {
  value?: number;
  receive:string;
  slippage?:string;
  walletTokenId?: string;
  lang?: string;
};





