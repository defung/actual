// @ts-strict-ignore
import { ImportTransactionsOpts } from '@actual-app/api';

import type { ImportTransactionsResult } from '../server/accounts/app';
import {
  APIAccountEntity,
  APICategoryEntity,
  APICategoryGroupEntity,
  APIFileEntity,
  APIPayeeEntity, APIScheduleCreateEntity,
  APIScheduleEntity, APIScheduleUpdateEntity,
} from '../server/api-models';
import { BudgetFileHandlers } from '../server/budgetfiles/app';
import { type batchUpdateTransactions } from '../server/transactions';

import {
  ImportTransactionEntity,
  NewRuleEntity,
  RuleEntity,
  TransactionEntity,
} from './models';

export interface ApiHandlers {
  'api/batch-budget-start': () => Promise<unknown>;

  'api/batch-budget-end': () => Promise<unknown>;

  'api/load-budget': (
    ...args: Parameters<BudgetFileHandlers['load-budget']>
  ) => Promise<void>;

  'api/download-budget': (arg: {
    syncId: string;
    password?: string;
  }) => Promise<void>;

  'api/get-budgets': () => Promise<APIFileEntity[]>;

  'api/start-import': (arg: { budgetName: string }) => Promise<void>;

  'api/finish-import': () => Promise<void>;

  'api/abort-import': () => Promise<void>;

  'api/query': (arg: { query }) => Promise<unknown>;

  'api/budget-months': () => Promise<string[]>;

  'api/budget-month': (arg: { month }) => Promise<{
    month: string;
    incomeAvailable: number;
    lastMonthOverspent: number;
    forNextMonth: number;
    totalBudgeted: number;
    toBudget: number;

    fromLastMonth: number;
    totalIncome: number;
    totalSpent: number;
    totalBalance: number;
    categoryGroups: Record<string, unknown>[];
  }>;

  'api/budget-set-amount': (arg: {
    month: string;
    categoryId: string;
    amount: number;
  }) => Promise<void>;

  'api/budget-set-carryover': (arg: {
    month: string;
    categoryId: string;
    flag: boolean;
  }) => Promise<void>;

  'api/budget-hold-for-next-month': (arg: {
    month: string;
    amount: number;
  }) => Promise<boolean>;

  'api/budget-reset-hold': (arg: { month: string }) => Promise<void>;

  'api/transactions-export': (arg: {
    transactions;
    categoryGroups;
    payees;
    accounts;
  }) => Promise<unknown>;

  'api/transactions-import': (arg: {
    accountId;
    transactions: ImportTransactionEntity[];
    isPreview?;
    opts?: ImportTransactionsOpts;
  }) => Promise<ImportTransactionsResult>;

  'api/transactions-add': (arg: {
    accountId;
    transactions;
    runTransfers?: boolean;
    learnCategories?: boolean;
  }) => Promise<'ok'>;

  'api/transactions-get': (arg: {
    accountId?: string;
    startDate?: string;
    endDate?: string;
  }) => Promise<TransactionEntity[]>;

  'api/transaction-update': (arg: {
    id;
    fields;
  }) => Promise<Awaited<ReturnType<typeof batchUpdateTransactions>>['updated']>;

  'api/transaction-delete': (arg: {
    id;
  }) => Promise<Awaited<ReturnType<typeof batchUpdateTransactions>>['deleted']>;

  'api/sync': () => Promise<void>;

  'api/bank-sync': (arg?: { accountId: string }) => Promise<void>;

  'api/accounts-get': () => Promise<APIAccountEntity[]>;

  'api/account-create': (arg: { account; initialBalance? }) => Promise<string>;

  'api/account-update': (arg: { id; fields }) => Promise<void>;

  'api/account-close': (arg: {
    id;
    transferAccountId;
    transferCategoryId;
  }) => Promise<unknown>;

  'api/account-reopen': (arg: { id }) => Promise<unknown>;

  'api/account-delete': (arg: { id }) => Promise<unknown>;

  'api/account-balance': (arg: {
    id: string;
    cutoff?: Date;
  }) => Promise<number>;

  'api/categories-get': (arg: {
    grouped;
  }) => Promise<Array<APICategoryGroupEntity | APICategoryEntity>>;

  'api/category-groups-get': () => Promise<APICategoryGroupEntity[]>;

  'api/category-group-create': (arg: { group }) => Promise<string>;

  'api/category-group-update': (arg: { id; fields }) => Promise<unknown>;

  'api/category-group-delete': (arg: {
    id;
    transferCategoryId;
  }) => Promise<unknown>;

  'api/category-create': (arg: { category }) => Promise<string>;

  'api/category-update': (arg: { id; fields }) => Promise<unknown>;

  'api/category-delete': (arg: {
    id;
    transferCategoryId?;
  }) => Promise<{ error?: string }>;

  'api/payees-get': () => Promise<APIPayeeEntity[]>;

  'api/common-payees-get': () => Promise<APIPayeeEntity[]>;

  'api/payee-create': (arg: { payee }) => Promise<string>;

  'api/payee-update': (arg: { id; fields }) => Promise<unknown>;

  'api/payee-delete': (arg: { id }) => Promise<unknown>;

  'api/payees-merge': (arg: {
    targetId: string;
    mergeIds: string[];
  }) => Promise<void>;

  'api/rules-get': () => Promise<RuleEntity[]>;

  'api/payee-rules-get': (arg: { id: string }) => Promise<RuleEntity[]>;

  'api/rule-create': (arg: { rule: NewRuleEntity }) => Promise<RuleEntity>;

  'api/rule-update': (arg: { rule: RuleEntity }) => Promise<RuleEntity>;

  'api/rule-delete': (id: string) => Promise<boolean>;

  'api/schedules-get': (arg: { id?: APIScheduleEntity['id'] }) => Promise<APIScheduleEntity[]>;

  'api/schedule-create': (arg: { create: APIScheduleCreateEntity }) => Promise<APIScheduleEntity['id']>;

  'api/schedule-update': (arg: {
    id: APIScheduleEntity['id'];
    fields: APIScheduleUpdateEntity;
    options?: { resetNextDate?: boolean };
  }) => Promise<APIScheduleEntity['id']>;

  'api/schedule-delete': (arg: { id: APIScheduleEntity['id'] }) => Promise<void>;

  'api/schedule-skip-next-date': (arg: { id: APIScheduleEntity['id'] }) => Promise<void>;

  'api/schedule-post-transaction': (arg: { id: APIScheduleEntity['id'] }) => Promise<void>;

  'api/schedule-force-run-service': (arg: { syncSuccess: boolean }) => Promise<void>;

  'api/schedule-discover': () => Promise<APIScheduleEntity[]>;

  'api/schedule-get-upcoming-dates': (arg: {
    id: APIScheduleEntity['id'];
    count: number;
  }) => Promise<string[]>;
}
