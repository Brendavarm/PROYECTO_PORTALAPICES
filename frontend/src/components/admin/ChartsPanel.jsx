import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#94a3b8', font: { family: 'Inter' } },
    },
  },
  scales: {
    x: {
      ticks: { color: '#94a3b8' },
      grid: { color: 'rgba(212,175,55,0.1)' },
    },
    y: {
      ticks: { color: '#94a3b8' },
      grid: { color: 'rgba(212,175,55,0.1)' },
    },
  },
};

const goldPalette = [
  '#d4af37',
  '#f4d03f',
  '#1e3a5f',
  '#2563eb',
  '#22c55e',
  '#f8fafc',
  '#a855f7',
  '#ef4444',
];

export default function ChartsPanel({ stats }) {
  if (!stats) return null;

  const seleccionData = {
    labels: stats.seleccionesPopulares?.map((s) => s.name) || [],
    datasets: [
      {
        label: 'Pedidos',
        data: stats.seleccionesPopulares?.map((s) => s.value) || [],
        backgroundColor: goldPalette,
        borderRadius: 8,
      },
    ],
  };

  const colorData = {
    labels: stats.coloresPopulares?.map((c) => c.name) || [],
    datasets: [
      {
        data: stats.coloresPopulares?.map((c) => c.value) || [],
        backgroundColor: goldPalette,
        borderWidth: 0,
      },
    ],
  };

  const carreraData = {
    labels: stats.carrerasPopulares?.map((c) => c.name) || [],
    datasets: [
      {
        label: 'Pedidos por carrera',
        data: stats.carrerasPopulares?.map((c) => c.value) || [],
        backgroundColor: 'rgba(212, 175, 55, 0.7)',
        borderColor: '#d4af37',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="admin-charts-grid">
      <div className="admin-chart-card">
        <h3 className="admin-chart-card__title">Selecciones más elegidas</h3>
        <div className="h-64">
          <Bar data={seleccionData} options={chartOptions} />
        </div>
      </div>
      <div className="admin-chart-card">
        <h3 className="admin-chart-card__title">Colores más populares</h3>
        <div className="mx-auto h-64 max-w-xs">
          <Doughnut
            data={colorData}
            options={{
              ...chartOptions,
              scales: undefined,
            }}
          />
        </div>
      </div>
      <div className="admin-chart-card admin-chart-card--wide">
        <h3 className="admin-chart-card__title">Carreras con más pedidos</h3>
        <div className="h-64">
          <Bar data={carreraData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
