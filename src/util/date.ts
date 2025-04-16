import dayjs, { extend, locale } from "dayjs";
import type { ManipulateType, OpUnitType, QUnitType } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ja";

extend(utc);
extend(timezone);
extend(isBetweenPlugin);
dayjs.tz.setDefault("Asia/Tokyo");
locale("ja");

type DateParamType = string | number | Date;

type FormatDateParam = {
  date?: DateParamType;
  format: string;
};

/**
 * 指定の書式にフォーマットする
 *
 * @param param 日時、フォーマット
 * @returns フォーマットされた文字列
 */
export function formatDate({ date, format }: FormatDateParam): string {
  if (!dayjs(date).isValid()) {
    throw Error(`invalid format: ${date}`);
  }
  return dayjs(date).format(format);
}

/**
 * ISO 8601規格のJST文字列取得
 *
 * @param date TZなしの文字列を渡した場合、時間は変更されず、+09:00が文字列で追加される
 */
export function getJstString(date?: DateParamType): string {
  return formatDate({ date, format: "YYYY-MM-DDTHH:mm:ss.SSSZ" });
}

/**
 * 対象日時が比較基準の日時より前かどうかを返す
 *
 * @param target 対象日時(例:end)
 * @param comparison 比較基準となる日時(例:start)
 * @returns 判定結果(target < comparisonの場合はtrue)
 */
export function isBefore(
  target: DateParamType,
  comparison: DateParamType
): boolean {
  return dayjs(target).isBefore(comparison, "second");
}

/**
 * 対象日時が比較基準の日時より後かどうかを返す
 *
 * @param target 対象日時(例:end)
 * @param comparison 比較基準となる日時(例:start)
 * @returns 判定結果(target > comparisonの場合はtrue)
 */
export function isAfter(
  target: DateParamType,
  comparison: DateParamType
): boolean {
  return dayjs(target).isAfter(comparison, "second");
}

/**
 * 指定した時間を加算する関数
 * @param target 元になる時間
 * @param value 加算する値
 * @param unit 単位
 * @returns 加算後の時間
 */
export function add(
  target: DateParamType,
  value: number,
  unit?: ManipulateType
): string {
  return dayjs(target).add(value, unit).format();
}

/**
 * 指定した時間を減算する関数
 * @param target 元になる時間
 * @param value 減算する値
 * @param unit 単位
 * @returns 減算後の時間
 */
export function subtract(
  target: DateParamType,
  value: number,
  unit?: ManipulateType
): string {
  return dayjs(target).subtract(value, unit).format();
}

/**
 * 対象日時と比較対象の日時の差分を返す
 *
 * @param target 対象日時(例:end)
 * @param comparison 比較基準となる日時(例:start)
 * @returns 対象日時と比較対象の日時の差分
 */
export function diff(
  target: DateParamType,
  comparison: DateParamType,
  unit?: QUnitType | OpUnitType
) {
  return dayjs(target).diff(comparison, unit);
}
