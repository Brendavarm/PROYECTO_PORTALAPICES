export const ADMIN_SECTIONS = [
  {
    id: 'dashboard',
    label: 'Resumen',
    description: 'Vista general de pedidos, clientes e ingresos.',
    icon: 'chart',
  },
  {
    id: 'pedidos',
    label: 'Pedidos',
    description: 'Lista de pedidos y cambio de estado de cada uno.',
    icon: 'box',
  },
  {
    id: 'usuarios',
    label: 'Clientes',
    description: 'Personas registradas y su historial de compras.',
    icon: 'users',
  },
  {
    id: 'ingresos',
    label: 'Dinero',
    description: 'Ingresos estimados y ventas ya entregadas.',
    icon: 'money',
  },
];

export const PEDIDO_ESTADOS = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'imprimiendo', label: 'En producción' },
  { value: 'entregado', label: 'Entregado' },
];

export function getEstadoLabel(value) {
  return PEDIDO_ESTADOS.find((e) => e.value === value)?.label ?? value;
}
