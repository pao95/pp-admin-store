export const ROLES = {
  ADMIN: "admin",
};

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

export const PERMISSIONS = {
  STORE_VIEW: "store:view",
  STORE_CREATE: "store:create",
  STORE_EDIT: "store:edit",
  USERS_VIEW: "users:view",
  USERS_CREATE: "users:create",
  USERS_EDIT: "users:edit",
  DOCUMENTATION_CREATE: "documentation:create",
  DOCUMENTATION_EDIT: "documentation:edit",
  DOCUMENTATION_VIEW: "documentation:view",
  REPORTS_VIEW: "reports:view",
  SETTLEMENT_VIEW: "settlement:view",
  SETTLEMENT_CREATE: "settlement:create",
  SETTLEMENT_EDIT: "settlement:edit",
} as const;

export type PermissionType = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export type PermissionsObject = {
  [K in PermissionType]?: boolean;
};
