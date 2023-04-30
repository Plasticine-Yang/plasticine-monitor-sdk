export type DeepPartial<T extends Record<PropertyKey, any>> = T extends Record<PropertyKey, any>
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type DeepRequired<T extends Record<PropertyKey, any>> = T extends Record<PropertyKey, any>
  ? {
      [P in keyof T]-?: DeepPartial<T[P]>
    }
  : T
