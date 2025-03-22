import React from "react";

const CertificadoBootcamp = ({ fecha, programa, emisor, nombre }) => {
  return (
    <div style={styles.contenedor}>
      <div style={styles.marcoDecorativo}>
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logo}>🎓</div>
          </div>
          <h1 style={styles.titulo}>Certificado de Finalización</h1>
          <div style={styles.lineaDecorativa}></div>
        </div>

        <div style={styles.contenido}>
          <p style={styles.textoIntro}>Este certificado reconoce que</p>
          <h2 style={styles.nombre}>{nombre}</h2>
          <p style={styles.textoDescripcion}>
            Ha completado exitosamente el programa de formación
          </p>
          <div style={styles.programaContainer}>
            <h3 style={styles.programa}>{programa}</h3>
          </div>

          <div style={styles.gridInfo}>
            <div style={styles.gridItem}>
              <p style={styles.etiqueta}>Emitido por</p>
              <h4 style={styles.emisor}>{emisor}</h4>
            </div>
            <div style={styles.gridItem}>
              <p style={styles.etiqueta}>Fecha de emisión</p>
              <p style={styles.fecha}>{fecha}</p>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <div style={styles.selloContainer}>
            <div style={styles.sello}>✓</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  contenedor: {
    backgroundColor: "#f8f9fa",
    padding: "2rem",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  marcoDecorativo: {
    backgroundColor: "white",
    width: "800px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    padding: "2.5rem",
    backgroundColor: "#2a2a72",
    background: "linear-gradient(135deg, #2a2a72 0%, #009ffd 100%)",
    color: "white",
    textAlign: "center",
  },
  logoContainer: {
    marginBottom: "1rem",
  },
  logo: {
    fontSize: "3rem",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
  },
  titulo: {
    fontSize: "2rem",
    fontWeight: "600",
    margin: "0.5rem 0",
    letterSpacing: "1px",
  },
  lineaDecorativa: {
    width: "60px",
    height: "3px",
    backgroundColor: "rgba(255,255,255,0.5)",
    margin: "1.5rem auto",
    borderRadius: "2px",
  },
  contenido: {
    padding: "3rem 4rem",
    textAlign: "center",
    position: "relative",
  },
  textoIntro: {
    fontSize: "1.1rem",
    color: "#666",
    marginBottom: "0.5rem",
  },
  nombre: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#2a2a72",
    margin: "1.5rem 0",
    padding: "1rem 0",
    borderBottom: "2px solid #eee",
  },
  textoDescripcion: {
    fontSize: "1.1rem",
    color: "#444",
    margin: "1.5rem 0",
  },
  programaContainer: {
    backgroundColor: "#f8f9fa",
    padding: "1.5rem",
    borderRadius: "10px",
    margin: "2rem 0",
    border: "1px solid #eee",
  },
  programa: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#009ffd",
    margin: "0",
  },
  gridInfo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    marginTop: "3rem",
  },
  gridItem: {
    textAlign: "center",
    padding: "1rem",
  },
  etiqueta: {
    fontSize: "0.9rem",
    color: "#888",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  emisor: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#333",
    margin: "0",
  },
  fecha: {
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "#2a2a72",
    margin: "0",
  },
  footer: {
    padding: "2rem",
    borderTop: "1px solid #eee",
  },
  selloContainer: {
    textAlign: "center",
  },
  sello: {
    display: "inline-block",
    fontSize: "2.5rem",
    color: "#2a2a72",
    padding: "1rem",
    border: "2px solid #2a2a72",
    borderRadius: "50%",
    width: "80px",
    height: "80px",
    lineHeight: "75px",
  },
};

export default CertificadoBootcamp;
