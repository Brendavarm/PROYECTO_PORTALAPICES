import { useMemo, useState } from 'react';
import {
  MUNDIAL_META,
  SELECCIONES_POR_CONFEDERACION,
  getSeleccionMundial2026,
  seleccionCoincideBusqueda,
} from '../data/mundial2026';

export default function SeleccionPicker({ id = 'seleccion', value, onChange }) {
  const [busqueda, setBusqueda] = useState('');
  const seleccionada = getSeleccionMundial2026(value);

  const gruposFiltrados = useMemo(() => {
    const q = busqueda.trim();
    return SELECCIONES_POR_CONFEDERACION.map((grupo) => ({
      ...grupo,
      teams: grupo.teams.filter((t) => seleccionCoincideBusqueda(t, q)),
    })).filter((g) => g.teams.length > 0);
  }, [busqueda]);

  const sinResultados = busqueda.trim() && gruposFiltrados.length === 0;

  return (
    <div className="seleccion-picker">
      <label className="sr-only" htmlFor={`${id}-buscar`}>
        Buscar selección
      </label>
      <input
        id={`${id}-buscar`}
        type="search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por país o apodo (ej. Albiceleste, Tri…)"
        className="input-field"
        autoComplete="off"
      />

      <label className="sr-only" htmlFor={id}>
        Selección del Mundial 2026
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select-field mt-2"
      >
        {sinResultados ? (
          <option value={value}>Sin coincidencias — limpia la búsqueda</option>
        ) : (
          gruposFiltrados.map((grupo) => (
            <optgroup key={grupo.id} label={grupo.name}>
              {grupo.teams.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.optionLabel}
                </option>
              ))}
            </optgroup>
          ))
        )}
      </select>

      {seleccionada && (
        <div className="seleccion-picker__preview" aria-live="polite">
          <span className="seleccion-picker__flag" aria-hidden>
            {seleccionada.flag}
          </span>
          <div className="seleccion-picker__text">
            <p className="seleccion-picker__name">{seleccionada.name}</p>
            {seleccionada.apodo && (
              <p className="seleccion-picker__apodo">{seleccionada.apodo}</p>
            )}
            <p className="seleccion-picker__hint">
              Nombre oficial para tu pedido · {MUNDIAL_META.totalTeams} selecciones
              clasificadas
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
