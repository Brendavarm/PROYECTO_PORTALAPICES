import AdminNav from './AdminNav';

export default function AdminLayout({
  activeTab,
  onTabChange,
  onRefresh,
  onLogout,
  refreshing,
  children,
}) {
  return (
    <div className="admin-shell">
      <AdminNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        onRefresh={onRefresh}
        onLogout={onLogout}
        refreshing={refreshing}
      />
      <div className="admin-shell__body">{children}</div>
    </div>
  );
}
