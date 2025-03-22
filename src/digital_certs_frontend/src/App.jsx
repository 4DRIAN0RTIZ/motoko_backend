import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { digital_certs_backend } from "declarations/digital_certs_backend";
import CertificadoBootcamp from "./Certificate";
import { createRoot } from "react-dom";
import "./index.scss";

const App = () => {
  // useState para almacenar los detalles del certificado
  return (
    <Router>
      <header className="navbar">
        <h1>📜 Certificados Digitales</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/emitir">Emitir</Link>
          <Link to="/actualizar">Actualizar</Link>
          <Link to="/obtener">Obtener</Link>
          <Link to="/verificar">Verificar</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emitir" element={<EmitirCertificado />} />
          <Route path="/actualizar" element={<ActualizarCertificado />} />
          <Route path="/obtener" element={<ObtenerCertificado />} />
          <Route path="/verificar" element={<VerificarCertificado />} />
        </Routes>
      </main>
    </Router>
  );
};

const Home = () => (
  <div className="home">
    <h2>Bienvenido al Gestor de Certificados Digitales</h2>
    <p>Administra, emite y verifica certificados de manera segura.</p>
    <div className="grid">
      <Link to="/emitir" className="card">
        📜 Emitir Certificado
      </Link>
      <Link to="/actualizar" className="card">
        ✏️ Actualizar Certificado
      </Link>
      <Link to="/obtener" className="card">
        🔍 Obtener Certificado
      </Link>
      <Link to="/verificar" className="card">
        ✔️ Verificar Certificado
      </Link>
    </div>
  </div>
);

const EmitirCertificado = () => {
  const [desarrollador, setDesarrollador] = React.useState("");
  const [logro, setLogro] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");

  const handleEmitir = async (e) => {
    e.preventDefault();
    try {
      const resultado = await digital_certs_backend.emitirCertificado(
        desarrollador,
        logro
      );
      setMensaje("✅ " + resultado);
      setDesarrollador("");
      setLogro("");
    } catch (error) {
      setMensaje("❌ Error al emitir: " + error.message);
    }
  };

  return (
    <div className="card">
      <h2>📜 Emitir Certificado</h2>
      <form onSubmit={handleEmitir}>
        <input
          value={desarrollador}
          onChange={(e) => setDesarrollador(e.target.value)}
          placeholder="Desarrollador"
          required
        />
        <input
          value={logro}
          onChange={(e) => setLogro(e.target.value)}
          placeholder="Logro"
          required
        />
        <button type="submit">Generar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

const ActualizarCertificado = () => {
  const [id, setId] = React.useState("");
  const [desarrollador, setDesarrollador] = React.useState("");
  const [logro, setLogro] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");

  const handleActualizar = async (e) => {
    e.preventDefault();
    const parsedId = parseInt(id, 10);
    console.log(parsedId);
    console.log("Tipo de ID: " + typeof parsedId);

    if (isNaN(parsedId) || parsedId < 0 || parsedId > 255) {
      setMensaje("❌ ID inválido. Debe ser número entre 0 y 255");
      return;
    }

    try {
      const resultado = await digital_certs_backend.actualizarCertificado(
        parsedId,
        desarrollador,
        logro
      );
      setMensaje("✅ " + resultado);
      setId("");
      setDesarrollador("");
      setLogro("");
    } catch (error) {
      setMensaje("❌ Error al actualizar: " + error.message);
    }
  };

  return (
    <div className="card">
      <h2>✏️ Actualizar Certificado</h2>
      <form onSubmit={handleActualizar}>
        <input
          type="text"
          min="0"
          max="255"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID del certificado"
          required
        />
        <input
          value={desarrollador}
          onChange={(e) => setDesarrollador(e.target.value)}
          placeholder="Desarrollador"
          required
        />
        <input
          value={logro}
          onChange={(e) => setLogro(e.target.value)}
          placeholder="Logro"
          required
        />
        <button type="submit">Actualizar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

const ObtenerCertificado = () => {
  const [id, setId] = React.useState("");
  const [certificado, setCertificado] = React.useState(null);
  const [mensaje, setMensaje] = React.useState("");

  const handleObtener = async (e) => {
    e.preventDefault();
    try {
      const resultado = await digital_certs_backend.obtenerCertificado(id);
      if (resultado && resultado.length > 0) {
        setCertificado(resultado[0]);
        setMensaje("");
      } else {
        setCertificado(null);
        setMensaje("❌ Certificado no encontrado");
      }
    } catch (error) {
      setMensaje("❌ Error al obtener: " + error.message);
    }
  };

  return (
    <div className="card">
      <h2>🔍 Obtener Certificado</h2>
      <form onSubmit={handleObtener}>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID del certificado"
          required
        />
        <button type="submit">Buscar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      {certificado && (
        <div className="cert-details">
          <h3>Detalles del Certificado</h3>
          <p>
            <strong>ID:</strong> {certificado.id}
          </p>
          <p>
            <strong>Desarrollador:</strong> {certificado.desarrollador}
          </p>
          <p>
            <strong>Logro:</strong> {certificado.logro}
          </p>
          <p>
            <strong>Fecha:</strong>
            {`${certificado.fecha.day}/${certificado.fecha.month}/${certificado.fecha.year}`}
          </p>
          <p>
            <strong>Firma:</strong> <code>{certificado.firma}</code>
          </p>
        </div>
      )}
    </div>
  );
};

const VerificarCertificado = () => {
  const [id, setId] = React.useState("");
  const [firma, setFirma] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");
  const [certData, setCertData] = React.useState(null);
  const certificateRef = React.useRef(null);

  // Función para descargar el certificado como imagen PNG
  const downloadAsPNG = async () => {
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.padding = "20px";
    tempDiv.style.backgroundColor = "white";
    document.body.appendChild(tempDiv);

    const root = createRoot(tempDiv);
    root.render(
      <CertificadoBootcamp
        fecha={certData.fecha}
        programa={certData.programa}
        emisor={certData.emisor}
        nombre={certData.nombre}
      />
    );

    await new Promise((resolve) => setTimeout(resolve, 50));

    const canvas = await html2canvas(tempDiv);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "certificado.png";
    link.href = imgData;
    link.click();

    root.unmount();
    document.body.removeChild(tempDiv);
  };

  const handleVerificar = async (e) => {
    e.preventDefault();
    const parsedId = parseInt(id, 10);
    const textId = id;

    if (isNaN(parsedId)) {
      setMensaje("❌ ID debe ser un número");
      return;
    }

    try {
      const resultado = await digital_certs_backend.verificarCertificado(
        parsedId,
        firma
      );
      setMensaje("✅ " + resultado);
      // Obtener el certificado verificado mediante la función obtenerCertificado se pasa como texto
      const certificado = await digital_certs_backend.obtenerCertificado(
        textId
      );
      const certDetalles = {
        fecha: `${certificado[0].fecha.day}/${certificado[0].fecha.month}/${certificado[0].fecha.year}`,
        programa: certificado[0].logro,
        emisor: `${certificado[0].emitidoPor}`,
        nombre: certificado[0].desarrollador,
      };
      setCertData(certDetalles);
    } catch (error) {
      setMensaje("❌ Error al verificar: " + error.message);
      setCertData(null);
    }
  };

  return (
    <div className="card">
      <h2>✔️ Verificar Certificado</h2>
      <form onSubmit={handleVerificar}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID del certificado"
          required
        />
        <input
          value={firma}
          onChange={(e) => setFirma(e.target.value)}
          placeholder="Firma del certificado"
          required
        />
        <button type="submit">Verificar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      {certData && (
        <>
          {/* Botones de descarga */}
          <div style={{ marginTop: "10px" }}>
            <button onClick={downloadAsPNG}>Descargar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
