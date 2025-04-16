import { getJstString } from "./date";

export const loggerOptions = {
  formatters: {
    level: (label: string) => {
      return { level: label };
    },
    bindings: () => {
      return {};
    },
  },
  timestamp: () => {
    // 参考
    // https://github.com/pinojs/pino/blob/main/docs/api.md#timestamp-boolean--function
    return `,"datetime":"${getJstString()}"`;
  },
};
