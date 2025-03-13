/**
 * Representa a un mercader.
 */
interface IMercader {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
}

/**
 * Implementación de la clase Mercader.
 */
class Mercader implements IMercader {
  constructor(
    public id: string,
    public nombre: string,
    public tipo: string,
    public ubicacion: string
  ) {}
}
