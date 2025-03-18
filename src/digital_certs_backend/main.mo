import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import SHA256 "mo:sha2/Sha256";
import Nat8 "mo:base/Nat8";
import Char "mo:base/Char";

actor Certificacion {
    
    type Certificado = {
        id: Text;
        desarrollador: Text;
        logro: Text;
        fecha: Text;
        emitidoPor: Principal;
        firma: Text;
    };

    let certificados = HashMap.HashMap<Text, Certificado>(10, Text.equal, Text.hash);
    
    public shared ({caller}) func emitirCertificado(
        id: Text,
        desarrollador: Text,
        logro: Text,
        fecha: Text
    ) : async Text {
        let certificado: Certificado = {
            id = id;
            desarrollador = desarrollador;
            logro = logro;
            fecha = fecha;
            emitidoPor = caller;
            firma = await generarHash(id, desarrollador, logro);
        };
        certificados.put(id, certificado);
        return "Certificado emitido con éxito: " # id;
    };

    public func actualizarCertificado(
        id: Text,
        desarrollador: Text,
        logro: Text,
        fecha: Text
    ) : async Text {
        switch (certificados.get(id)) {
            case (?certificado) {
                let nuevoCertificado: Certificado = {
                    id = id;
                    desarrollador = desarrollador;
                    logro = logro;
                    fecha = fecha;
                    emitidoPor = certificado.emitidoPor;
                    firma = await generarHash(id, desarrollador, logro);
                };
                certificados.put(id, nuevoCertificado);
                return "Certificado actualizado con éxito: " # id;
            };
            case (null) {
                return "Certificado no encontrado";
            };
        };
    };

    func compararFirma(firma1: Text, firma2: Text) : Bool {
        return firma1 == firma2;
    };

    public query func existeCertificado(id: Text) : async Bool {
        switch (certificados.get(id)) {
            case (?_) { true };
            case (null) { false };
        }
    };

    public query func obtenerCertificado(id: Text) : async ?Certificado {
        return certificados.get(id);
    };

    public query func verificarCertificado(id: Text, firma: Text) : async Text {
        switch (certificados.get(id)) {
            case (?certificado) {
                if (not compararFirma(certificado.firma, firma)) {
                    return "Firma inválida";
                };
                return "Certificado encontrado: " # certificado.desarrollador # " - " # certificado.logro;
            };
            case (null) {
                return "Certificado no encontrado";
            };
        };
    };

    public query func generarHash(id: Text, desarrollador: Text, logro: Text) : async Text {
        let concatenado = id # desarrollador # logro;

        let bytes = Text.encodeUtf8(concatenado);

        let hash = SHA256.fromBlob(#sha256, bytes);

        let hashText = blobToHex(hash);
        return hashText;
    };

    private func blobToHex(b : Blob) : Text {
        var hex = "";
        for (byte in b.vals()) {
            hex := hex # byteToHex(byte);
        };
        hex;
    };

    private func byteToHex(b : Nat8) : Text {
        let chars: [Char] = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        let high = Nat8.toNat(b >> 4);
        let low = Nat8.toNat(b & 0x0F);
        Char.toText(chars[high]) # Char.toText(chars[low]);
    };
}
