import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import SHA256 "mo:sha2/Sha256";
import Nat8 "mo:base/Nat8";
import Char "mo:base/Char";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";

actor Certificacion {
    
    type Certificado = {
        id: Nat8;
        desarrollador: Text;
        logro: Text;
        fecha: Text;
        emitidoPor: Principal;
        firma: Text;
    };

    let certificados = HashMap.HashMap<Nat8, Certificado>(
        10, 
        Nat8.equal, 
        func (k : Nat8) { Hash.hash(Nat8.toNat(k)) }
    );
    stable var nextId : Nat8 = 1;
    
    public shared ({caller}) func emitirCertificado(
        desarrollador: Text,
        logro: Text,
        fecha: Text
    ) : async Text {
        let newId = siguienteId();
        let firma = generarHash(Nat8.toText(newId), desarrollador, logro);
        let certificado: Certificado = {
            id = newId;
            desarrollador = desarrollador;
            logro = logro;
            fecha = fecha;
            emitidoPor = caller;
            firma = firma;
        };
        certificados.put(newId, certificado);
        return "Certificado emitido con éxito: " # Nat8.toText(newId);
    };

    func siguienteId() : Nat8 {
        let id = nextId;
        nextId += 1;
        id;
    };

    public shared ({caller}) func actualizarCertificado(
        id: Nat8,
        desarrollador: Text,
        logro: Text,
        fecha: Text
    ) : async Text {
        switch (certificados.get(id)) {
            case (?certificado) {
                let nuevaFirma = generarHash(Nat8.toText(id), desarrollador, logro);
                let nuevoCertificado: Certificado = {
                    id = id;
                    desarrollador = desarrollador;
                    logro = logro;
                    fecha = fecha;
                    emitidoPor = certificado.emitidoPor;
                    firma = nuevaFirma;
                };
                certificados.put(id, nuevoCertificado);
                return "Certificado actualizado con éxito: " # Nat8.toText(id);
            };
            case (null) {
                return "Certificado no encontrado";
            };
        };
    };

    public query func existeCertificado(id: Text) : async Bool {
        switch (textToNat8(id)) {
            case (?idNat8) { certificados.get(idNat8) != null };
            case (null) { false };
        };
    };

    public query func obtenerCertificado(id: Text) : async ?Certificado {
        switch (textToNat8(id)) {
            case (?idNat8) { certificados.get(idNat8) };
            case (null) { null };
        };
    };

    public query func verificarCertificado(id: Text, firma: Text) : async Text {
        switch (textToNat8(id)) {
            case (?idNat8) {
                switch (certificados.get(idNat8)) {
                    case (?certificado) {
                        if (certificado.firma == firma) {
                            "Certificado válido: " # certificado.desarrollador # " - " # certificado.logro
                        } else {
                            "Firma inválida"
                        }
                    };
                    case null { "Certificado no encontrado" };
                }
            };
            case null { "ID inválido" };
        }
    };

    func generarHash(id: Text, desarrollador: Text, logro: Text) : Text {
        let concatenado = id # desarrollador # logro;
        let bytes = Text.encodeUtf8(concatenado);
        let hash = SHA256.fromBlob(#sha256, bytes);
        blobToHex(hash);
    };

    func textToNat8(t : Text) : ?Nat8 {
        var n : Nat8 = 0;
        for (c in t.chars()) {
            let charVal = Nat32.toNat(Char.toNat32(c) - 48);
            if (charVal > 9) return null;
            n := n * 10 + Nat8.fromNat(charVal);
        };
        ?n;
    };

    func blobToHex(b : Blob) : Text {
        var hex = "";
        for (byte in b.vals()) {
            hex := hex # byteToHex(byte);
        };
        hex;
    };

    func byteToHex(b : Nat8) : Text {
        let chars = Text.toArray("0123456789abcdef");
        let high = (b >> 4) & 0x0F;
        let low = b & 0x0F;
        Char.toText(chars[Nat8.toNat(high)]) # Char.toText(chars[Nat8.toNat(low)]);
    };
};
