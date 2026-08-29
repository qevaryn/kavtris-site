export const customerRoles = [
  'PROPRIETARIO',
  'ADMINISTRADOR',
  'COLABORADOR'
] as const;

export type CustomerRole = (typeof customerRoles)[number];

export const customerPermissions = [
  'company:read',
  'company:update',
  'membership:read'
] as const;

export type CustomerPermission = (typeof customerPermissions)[number];

const permissionsByRole = {
  PROPRIETARIO: customerPermissions,
  ADMINISTRADOR: customerPermissions,
  COLABORADOR: ['company:read', 'membership:read']
} as const satisfies Record<CustomerRole, readonly CustomerPermission[]>;

export function isCustomerRole(value: unknown): value is CustomerRole {
  return typeof value === 'string' && customerRoles.includes(value as CustomerRole);
}

export function hasCustomerPermission(
  role: CustomerRole,
  permission: CustomerPermission
): boolean {
  return permissionsByRole[role].includes(permission as never);
}
