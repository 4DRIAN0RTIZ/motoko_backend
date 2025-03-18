import React, { useState } from "react";
import { digital_certs_backend } from "declarations/digital_certs_backend";

function App() {
  const [emitData, setEmitData] = useState({
    desarrollador: "",
    logro: "",
    fecha: "",
  });
  const [updateData, setUpdateData] = useState({
    id: "",
    desarrollador: "",
    logro: "",
    fecha: "",
  });
  const [getData, setGetData] = useState({ id: "" });
  const [verifyData, setVerifyData] = useState({ id: "", firma: "" });

  const [emitResponse, setEmitResponse] = useState("");
  const [actualizarResponse, setActualizarResponse] = useState("");
  const [obtenerCert, setObtenerCert] = useState(null);
  const [verificarResponse, setVerificarResponse] = useState("");

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
    },
    section: {
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "30px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "15px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      width: "100%",
      boxSizing: "border-box",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    response: {
      padding: "15px",
      borderRadius: "4px",
      marginTop: "10px",
    },
    success: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    error: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
  };

  const handleEmitir = async (e) => {
    e.preventDefault();
    try {
      const result = await digital_certs_backend.emitirCertificado(
        emitData.desarrollador,
        emitData.logro,
        emitData.fecha
      );
      setEmitResponse({ type: "success", message: result });
      setEmitData({ desarrollador: "", logro: "", fecha: "" });
    } catch (err) {
      setEmitResponse({
        type: "error",
        message: "Error: " + err.message,
      });
    }
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    const id = parseInt(updateData.id, 10);

    if (isNaN(id) || id < 0 || id > 255) {
      setActualizarResponse({
        type: "error",
        message: "ID inválido. Debe ser número entre 0 y 255",
      });
      return;
    }

    try {
      const result = await digital_certs_backend.actualizarCertificado(
        id,
        updateData.desarrollador,
        updateData.logro,
        updateData.fecha
      );
      setActualizarResponse({ type: "success", message: result });
      setUpdateData({ id: "", desarrollador: "", logro: "", fecha: "" });
    } catch (err) {
      setActualizarResponse({
        type: "error",
        message: "Error: " + err.message,
      });
    }
  };

  const handleObtener = async (e) => {
    e.preventDefault();
    try {
      const result = await digital_certs_backend.obtenerCertificado(getData.id);
      let cert;

      if (result && result.length > 0) {
        cert = result[0];
      }

      setObtenerCert(cert);
    } catch (err) {
      setObtenerCert(null);
    }
  };

  const handleVerificar = async (e) => {
    e.preventDefault();
    try {
      const result = await digital_certs_backend.verificarCertificado(
        verifyData.id,
        verifyData.firma
      );
      setVerificarResponse({ type: "success", message: result });
    } catch (err) {
      setVerificarResponse({
        type: "error",
        message: "Error: " + err.message,
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "40px" }}>
        Gestor de Certificados Digitales
      </h1>

      {/* Sección Emitir */}
      <section style={styles.section}>
        <h2>📄 Emitir Certificado</h2>
        <form onSubmit={handleEmitir} style={styles.formGrid}>
          <div>
            <label>Desarrollador:</label>
            <input
              style={styles.input}
              value={emitData.desarrollador}
              onChange={(e) =>
                setEmitData({ ...emitData, desarrollador: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Logro:</label>
            <input
              style={styles.input}
              value={emitData.logro}
              onChange={(e) =>
                setEmitData({ ...emitData, logro: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Fecha:</label>
            <input
              style={styles.input}
              value={emitData.fecha}
              onChange={(e) =>
                setEmitData({ ...emitData, fecha: e.target.value })
              }
              required
            />
          </div>
          <button
            style={{ ...styles.button, gridColumn: "1 / -1" }}
            type="submit"
          >
            Generar Certificado
          </button>
        </form>
        {emitResponse && (
          <div style={{ ...styles.response, ...styles[emitResponse.type] }}>
            {emitResponse.message}
          </div>
        )}
      </section>

      {/* Sección Actualizar */}
      <section style={styles.section}>
        <h2>🔄 Actualizar Certificado</h2>
        <form onSubmit={handleActualizar} style={styles.formGrid}>
          <div>
            <label>ID (0-255):</label>
            <input
              style={styles.input}
              type="number"
              min="0"
              max="255"
              value={updateData.id}
              onChange={(e) =>
                setUpdateData({ ...updateData, id: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Desarrollador:</label>
            <input
              style={styles.input}
              value={updateData.desarrollador}
              onChange={(e) =>
                setUpdateData({ ...updateData, desarrollador: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Logro:</label>
            <input
              style={styles.input}
              value={updateData.logro}
              onChange={(e) =>
                setUpdateData({ ...updateData, logro: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Fecha:</label>
            <input
              style={styles.input}
              value={updateData.fecha}
              onChange={(e) =>
                setUpdateData({ ...updateData, fecha: e.target.value })
              }
              required
            />
          </div>
          <button
            style={{ ...styles.button, gridColumn: "1 / -1" }}
            type="submit"
          >
            Actualizar Certificado
          </button>
        </form>
        {actualizarResponse && (
          <div
            style={{ ...styles.response, ...styles[actualizarResponse.type] }}
          >
            {actualizarResponse.message}
          </div>
        )}
      </section>

      {/* Sección Obtener */}
      <section style={styles.section}>
        <h2>🔍 Obtener Certificados</h2>
        <form onSubmit={handleObtener} style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <input
              style={styles.input}
              placeholder="Ingrese ID numérico del certificado"
              value={getData.id}
              onChange={(e) => setGetData({ ...getData, id: e.target.value })}
              required
            />
          </div>
          <button style={styles.button} type="submit">
            Buscar
          </button>
        </form>
        {obtenerCert ? (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "6px",
            }}
          >
            <h3>Detalles del Certificado</h3>
            <p>
              <strong>ID:</strong> {obtenerCert.id}
            </p>
            <p>
              <strong>Desarrollador:</strong> {obtenerCert.desarrollador}
            </p>
            <p>
              <strong>Logro:</strong> {obtenerCert.logro}
            </p>
            <p>
              <strong>Fecha:</strong> {obtenerCert.fecha}
            </p>
            <p>
              <strong>Firma:</strong> <code>{obtenerCert.firma}</code>
            </p>
          </div>
        ) : (
          <div style={{ marginTop: "10px", color: "#666" }}>
            {getData.id && "Certificado nao encontrado"}
          </div>
        )}
      </section>

      {/* Sección Verificar */}
      <section style={styles.section}>
        <h2>✅ Verificar Certificado</h2>
        <form onSubmit={handleVerificar} style={styles.formGrid}>
          <div>
            <label>ID:</label>
            <input
              style={styles.input}
              placeholder="Número entre 0-255"
              value={verifyData.id}
              onChange={(e) =>
                setVerifyData({ ...verifyData, id: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Firma:</label>
            <input
              style={styles.input}
              value={verifyData.firma}
              onChange={(e) =>
                setVerifyData({ ...verifyData, firma: e.target.value })
              }
              required
            />
          </div>
          <button
            style={{ ...styles.button, gridColumn: "1 / -1" }}
            type="submit"
          >
            Verificar Autenticidad
          </button>
        </form>
        {verificarResponse && (
          <div
            style={{ ...styles.response, ...styles[verificarResponse.type] }}
          >
            {verificarResponse.message}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
