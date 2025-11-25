class NodoAVL {
    constructor(tarea) {
        this.tarea = tarea;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 1;
    }
}

class ArbolAVL {
    constructor() {
        this.raiz = null;
    }

    // O(1) - Obtener altura
    obtenerAltura(nodo) {
        return nodo ? nodo.altura : 0;
    }

    // O(1) - Obtener factor de balance
    obtenerBalance(nodo) {
        return nodo ? this.obtenerAltura(nodo.izquierda) - this.obtenerAltura(nodo.derecha) : 0;
    }

    // O(1) - Actualizar altura
    actualizarAltura(nodo) {
        if (nodo) {
            nodo.altura = 1 + Math.max(this.obtenerAltura(nodo.izquierda), this.obtenerAltura(nodo.derecha));
        }
    }

    // O(1) - Rotación derecha
    rotarDerecha(y) {
        const x = y.izquierda;
        const T2 = x.derecha;

        x.derecha = y;
        y.izquierda = T2;

        this.actualizarAltura(y);
        this.actualizarAltura(x);

        return x;
    }

    // O(1) - Rotación izquierda
    rotarIzquierda(x) {
        const y = x.derecha;
        const T2 = y.izquierda;

        y.izquierda = x;
        x.derecha = T2;

        this.actualizarAltura(x);
        this.actualizarAltura(y);

        return y;
    }

    // O(log n) - Insertar tarea
    insertar(tarea) {
        this.raiz = this._insertarNodo(this.raiz, tarea);
    }

    _insertarNodo(nodo, tarea) {
        if (!nodo) return new NodoAVL(tarea);

        if (tarea.id < nodo.tarea.id) {
            nodo.izquierda = this._insertarNodo(nodo.izquierda, tarea);
        } else if (tarea.id > nodo.tarea.id) {
            nodo.derecha = this._insertarNodo(nodo.derecha, tarea);
        } else {
            return nodo; // ID duplicado
        }

        this.actualizarAltura(nodo);
        return this._balancear(nodo);
    }

    // O(1) - Balancear nodo
    _balancear(nodo) {
        const balance = this.obtenerBalance(nodo);

        // Caso Izquierda-Izquierda
        if (balance > 1 && this.obtenerBalance(nodo.izquierda) >= 0) {
            return this.rotarDerecha(nodo);
        }

        // Caso Izquierda-Derecha
        if (balance > 1 && this.obtenerBalance(nodo.izquierda) < 0) {
            nodo.izquierda = this.rotarIzquierda(nodo.izquierda);
            return this.rotarDerecha(nodo);
        }

        // Caso Derecha-Derecha
        if (balance < -1 && this.obtenerBalance(nodo.derecha) <= 0) {
            return this.rotarIzquierda(nodo);
        }

        // Caso Derecha-Izquierda
        if (balance < -1 && this.obtenerBalance(nodo.derecha) > 0) {
            nodo.derecha = this.rotarDerecha(nodo.derecha);
            return this.rotarIzquierda(nodo);
        }

        return nodo;
    }

    // O(log n) - Buscar por ID
    buscar(id) {
        return this._buscarNodo(this.raiz, id);
    }

    _buscarNodo(nodo, id) {
        if (!nodo) return null;
        
        if (id === nodo.tarea.id) return nodo.tarea;
        if (id < nodo.tarea.id) return this._buscarNodo(nodo.izquierda, id);
        return this._buscarNodo(nodo.derecha, id);
    }
}