import { useState } from 'react';
import { Link } from 'react-router-dom';
import FeatureIcon from '../ui/FeatureIcon';
import { adminLogin, setAdminToken } from '../../services/api';

function validatePassword(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Escribe tu contraseña para continuar.';
  }
  if (trimmed.length < 4) {
    return 'La contraseña debe tener al menos 4 caracteres.';
  }
  return null;
}

function getLoginErrorMessage(err) {
  if (!err.response) {
    return 'No pudimos conectar con el servidor. Comprueba tu internet y que la aplicación esté encendida, luego vuelve a intentar.';
  }

  const { status, data } = err.response;
  const serverMsg = typeof data?.error === 'string' ? data.error : null;

  if (serverMsg) {
    return serverMsg;
  }

  switch (status) {
    case 400:
      return 'Escribe tu contraseña para continuar.';
    case 401:
      return 'La contraseña no es correcta. Revísala e inténtalo otra vez.';
    case 503:
      return 'El inicio de sesión no está disponible ahora. Pide ayuda a quien configuró GoalDesk.';
    case 500:
      return 'Ocurrió un error en el servidor. Espera un momento e inténtalo de nuevo.';
    default:
      return 'No pudimos iniciar sesión. Inténtalo otra vez en unos segundos.';
  }
}

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldError, setFieldError] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (fieldError) {
      setFieldError(validatePassword(e.target.value));
    }
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePassword(password);
    if (validationError) {
      setFieldError(validationError);
      setError(null);
      return;
    }

    setFieldError(null);
    setLoading(true);
    setError(null);
    try {
      const { data } = await adminLogin(password.trim());
      setAdminToken(data.token);
      onSuccess();
    } catch (err) {
      setError(getLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const displayError = fieldError || error;

  return (
    <div className="admin-login">
      <div className="admin-login__glow" aria-hidden />
      <div className="admin-login__inner">
        <Link to="/" className="admin-login__back">
          ← Volver al inicio
        </Link>

        <form onSubmit={handleSubmit} className="admin-login__card" noValidate>
          <div className="admin-login__header">
            <div className="admin-login__badge">
              <FeatureIcon name="shield" className="h-8 w-8" />
            </div>
            <h1 className="admin-login__title">Iniciar sesión</h1>
            <p className="admin-login__subtitle">
              Usa la contraseña de tu emprendimiento para entrar y gestionar pedidos.
            </p>
          </div>

          <div className="admin-login__field">
            <label className="field-label" htmlFor="admin-pass">
              Contraseña
            </label>
            <div className="password-field">
              <input
                id="admin-pass"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => {
                  if (password) {
                    setFieldError(validatePassword(password));
                  }
                }}
                className={`input-field admin-login__input${
                  displayError ? ' input-field--error' : ''
                }`}
                placeholder="Tu contraseña"
                autoComplete="current-password"
                aria-invalid={displayError ? 'true' : 'false'}
                aria-describedby={displayError ? 'admin-login-error' : undefined}
              />
              <button
                type="button"
                className="password-field__toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
                aria-pressed={showPassword}
              >
                <FeatureIcon
                  name={showPassword ? 'eyeOff' : 'eye'}
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>

          {displayError && (
            <p
              id="admin-login-error"
              className="alert alert--error admin-login__alert"
              role="alert"
            >
              {displayError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary admin-login__submit w-full"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          <p className="admin-login__footer">
            GoalDesk Smart 2026 · UNIFRANZ
          </p>
        </form>
      </div>
    </div>
  );
}
