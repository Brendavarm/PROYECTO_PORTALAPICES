import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/admin/StatCard';
import ChartsPanel from '../components/admin/ChartsPanel';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';
import {
  ADMIN_SECTIONS,
  PEDIDO_ESTADOS,
  getEstadoLabel,
} from '../components/admin/adminConfig';
import {
  getStats,
  getPedidos,
  getUsuarios,
  updatePedidoEstado,
  getAdminToken,
  clearAdminToken,
} from '../services/api';
import { formatBs } from '../utils/currency';
import { PRODUCTO_BASE } from '../data/constants';
import { etiquetaExtras, parseExtras } from '../utils/producto';
import { resumenPedidoAdmin } from '../utils/adminPedido';

function getLoadErrorMessage(err) {
  if (err.response?.status === 401) {
    return 'Tu sesión terminó. Cierra esta pestaña e inicia sesión otra vez con tu contraseña.';
  }
  if (!err.response) {
    return 'No hay conexión con el servidor. Comprueba que el backend esté encendido y pulsa «Actualizar datos».';
  }
  return 'No pudimos cargar la información. Espera un momento y vuelve a intentar.';
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() => !!getAdminToken());

  const setSession = (value) => {
    setAuthenticated(value);
  };

  const [stats, setStats] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tab, setTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  const activeSection = useMemo(
    () => ADMIN_SECTIONS.find((s) => s.id === tab) ?? ADMIN_SECTIONS[0],
    [tab]
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setActionMessage(null);
    try {
      const [statsRes, pedidosRes, usuariosRes] = await Promise.all([
        getStats(),
        getPedidos(),
        getUsuarios(),
      ]);
      setStats(statsRes.data);
      setPedidos(pedidosRes.data);
      setUsuarios(usuariosRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        clearAdminToken();
        setSession(false);
      }
      setError(getLoadErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadData();
  }, [authenticated, loadData]);

  const handleEstadoChange = async (id, estado) => {
    setActionMessage(null);
    try {
      await updatePedidoEstado(id, estado);
      setActionMessage(`Pedido #${id} marcado como «${getEstadoLabel(estado)}».`);
      loadData();
    } catch (err) {
      if (err.response?.status === 401) {
        clearAdminToken();
        setSession(false);
      } else {
        setActionMessage(
          'No se pudo guardar el cambio. Comprueba tu conexión e inténtalo otra vez.'
        );
      }
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setSession(false);
    setStats(null);
    setPedidos([]);
    setUsuarios([]);
    setTab('dashboard');
  };

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setSession(true)} />;
  }

  return (
    <AdminLayout
      activeTab={tab}
      onTabChange={setTab}
      onRefresh={loadData}
      onLogout={handleLogout}
      refreshing={loading}
    >
      <div className="admin-shell__container">
        <header className="admin-page__intro">
          <div>
            <h1 className="admin-page__title">{activeSection.label}</h1>
            <p className="admin-page__desc">{activeSection.description}</p>
          </div>
        </header>

        {loading && (
          <p className="admin-page__status">Cargando información…</p>
        )}

        {error && (
          <div className="alert alert--error admin-page__alert" role="alert">
            {error}
            <p className="admin-page__alert-hint">
              Si es la primera vez, en la carpeta del proyecto ejecuta el backend y
              la base de datos (seed). Luego pulsa «Actualizar datos».
            </p>
          </div>
        )}

        {actionMessage && !error && (
          <p className="alert admin-page__success" role="status">
            {actionMessage}
          </p>
        )}

        {!loading && !error && stats && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-page__content"
          >
            {tab === 'dashboard' && (
              <>
                <div className="admin-product-banner card card-body mb-6">
                  <span className="chip chip--gold w-fit text-[10px]">Producto único</span>
                  <h3 className="heading-md mt-3">
                    {stats.productoUnico?.nombre ?? PRODUCTO_BASE.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {PRODUCTO_BASE.desc} Precio base{' '}
                    <strong className="text-[var(--color-gold)]">
                      {formatBs(stats.productoUnico?.precioBase ?? PRODUCTO_BASE.price)}
                    </strong>
                    ; los pedidos suman extras plus encima.
                  </p>
                </div>
                <div className="admin-grid admin-grid--stats">
                  <StatCard
                    variant="admin"
                    title="Pedidos en total"
                    value={stats.totalPedidos}
                    icon="box"
                  />
                  <StatCard
                    variant="admin"
                    title="Ingresos estimados"
                    value={formatBs(stats.ingresosEstimados)}
                    subtitle="Suma de todos los pedidos registrados"
                    icon="money"
                  />
                  <StatCard
                    variant="admin"
                    title="Ya entregados"
                    value={stats.ventasTotales}
                    subtitle="Pedidos con estado entregado"
                    icon="check"
                  />
                  <StatCard
                    variant="admin"
                    title="Clientes registrados"
                    value={stats.totalUsuarios}
                    icon="users"
                  />
                </div>
                <div className="admin-panel admin-panel--charts">
                  <ChartsPanel stats={stats} />
                </div>
              </>
            )}

            {tab === 'pedidos' && (
              <div className="admin-panel">
                <p className="admin-panel__hint">
                  Todos los pedidos son el mismo portalapicero (base{' '}
                  {formatBs(PRODUCTO_BASE.price)}). Elige el estado según fabricación o entrega.
                </p>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>N.º</th>
                        <th>Cliente</th>
                        <th>Nombre grabado</th>
                        <th>Selección</th>
                        <th>Color</th>
                        <th>Producto</th>
                        <th>Extras plus</th>
                        <th>Precio</th>
                        <th>Estado del pedido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidos.map((p) => {
                        const pers = p.personalizacion;
                        const resumen = resumenPedidoAdmin(pers, p.precio);
                        return (
                          <tr key={p.id}>
                            <td>#{p.id}</td>
                            <td>{p.usuario?.nombre ?? '—'}</td>
                            <td className="max-w-[120px] truncate" title={pers?.texto_personalizado}>
                              {pers?.texto_personalizado?.trim() || '—'}
                            </td>
                            <td>{pers?.seleccion_favorita || '—'}</td>
                            <td className="capitalize">{pers?.color || '—'}</td>
                            <td className="text-xs whitespace-nowrap">
                              <span className="chip chip--muted text-[10px]">Portalapicero</span>
                            </td>
                            <td className="text-xs max-w-[220px]">
                              <span className={resumen.legacy ? 'text-amber-400/90' : ''}>
                                {resumen.extrasLabel}
                              </span>
                            </td>
                            <td className="admin-table__money">
                              <span className="block">{formatBs(p.precio)}</span>
                              <span className="block text-[10px] font-normal text-muted mt-0.5">
                                {resumen.precioLinea}
                              </span>
                            </td>
                            <td>
                              <label className="sr-only" htmlFor={`estado-${p.id}`}>
                                Estado del pedido {p.id}
                              </label>
                              <select
                                id={`estado-${p.id}`}
                                value={p.estado}
                                onChange={(e) =>
                                  handleEstadoChange(p.id, e.target.value)
                                }
                                className="admin-select"
                              >
                                {PEDIDO_ESTADOS.map((s) => (
                                  <option key={s.value} value={s.value}>
                                    {s.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'usuarios' && (
              <div className="admin-panel admin-panel--stack">
                {usuarios.length === 0 ? (
                  <p className="admin-page__empty">
                    Aún no hay clientes registrados. Cuando alguien personalice y pida,
                    aparecerá aquí.
                  </p>
                ) : (
                  usuarios.map((u) => (
                    <article key={u.id} className="admin-client-card">
                      <div className="admin-client-card__head">
                        <div>
                          <h3 className="admin-client-card__name">{u.nombre}</h3>
                          <p className="admin-client-card__email">{u.correo}</p>
                        </div>
                        <span className="admin-client-card__tag">{u.carrera}</span>
                      </div>
                      <div className="admin-client-card__meta">
                        <span>
                          Pedidos: {u._count?.pedidos ?? u.pedidos?.length ?? 0}
                        </span>
                        <span>
                          Diseños guardados:{' '}
                          {u._count?.personalizaciones ??
                            u.personalizaciones?.length ??
                            0}
                        </span>
                        <span>
                          Registro:{' '}
                          {new Date(u.fecha_registro).toLocaleDateString('es-BO')}
                        </span>
                      </div>

                      {u.personalizaciones?.length > 0 && (
                        <div className="admin-client-card__section">
                          <h4>Diseños que eligió</h4>
                          <ul>
                            {u.personalizaciones.map((pers) => (
                              <li key={pers.id}>
                                <span>
                                  {pers.texto_personalizado?.trim()
                                    ? `"${pers.texto_personalizado.trim()}" · `
                                    : ''}
                                  {pers.color} · {pers.seleccion_favorita} ·{' '}
                                  {etiquetaExtras(parseExtras(pers.extras))}
                                </span>
                                <span className="admin-client-card__date">
                                  {new Date(pers.fecha).toLocaleDateString('es-BO')}
                                  {pers.pedido
                                    ? ` · Pedido #${pers.pedido.id} (${getEstadoLabel(pers.pedido.estado)})`
                                    : ''}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {u.pedidos?.length > 0 && (
                        <div className="admin-client-card__section">
                          <h4>Sus pedidos</h4>
                          <ul>
                            {u.pedidos.map((ped) => (
                              <li key={ped.id}>
                                <span>
                                  Pedido #{ped.id} — {formatBs(ped.precio)}
                                  {ped.personalizacion
                                    ? ` · ${etiquetaExtras(parseExtras(ped.personalizacion.extras))}`
                                    : ''}
                                </span>
                                <span className="admin-client-card__estado">
                                  {getEstadoLabel(ped.estado)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  ))
                )}
              </div>
            )}

            {tab === 'ingresos' && (
              <div className="admin-grid admin-grid--money">
                <div className="admin-money-hero">
                  <p className="admin-money-hero__label">Ingresos totales estimados</p>
                  <p className="admin-money-hero__value">
                    {formatBs(stats.ingresosEstimados)}
                  </p>
                  <p className="admin-money-hero__hint">
                    Suma de todos los pedidos, sin importar si ya se entregaron.
                  </p>
                </div>
                <div className="admin-panel admin-panel--money-detail">
                  <h3 className="admin-panel__title">Detalle del negocio</h3>
                  <dl className="admin-dl">
                    <div>
                      <dt>Cantidad de pedidos</dt>
                      <dd>{stats.totalPedidos}</dd>
                    </div>
                    <div>
                      <dt>Pedidos ya entregados</dt>
                      <dd className="admin-dl__ok">{stats.ventasTotales}</dd>
                    </div>
                    <div>
                      <dt>Promedio por pedido</dt>
                      <dd className="admin-dl__gold">
                        {stats.totalPedidos
                          ? formatBs(stats.ingresosEstimados / stats.totalPedidos)
                          : formatBs(0)}
                      </dd>
                    </div>
                  </dl>
                  <h4 className="admin-panel__subtitle">Pedidos según su estado</h4>
                  <div className="admin-chips">
                    {stats.pedidosPorEstado?.map((e) => (
                      <span key={e.name} className="admin-chip">
                        {getEstadoLabel(e.name)}:{' '}
                        <strong>{e.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}
