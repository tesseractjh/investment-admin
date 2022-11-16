export const ACCOUNTS_COLUMNS = {
  user_name: '고객명',
  broker_name: '증권사',
  number: '계좌번호',
  status: '계좌상태',
  name: '계좌명',
  assets: '평가금액',
  payments: '입금금액',
  is_active: '계좌활성화여부',
  created_at: '계좌개설일',
} as const;

export const ACCOUNT_STATE = { 9999: '관리자확인필요', 1: '입금대기', 2: '운용중', 3: '투자중지', 4: '해지' } as const;
