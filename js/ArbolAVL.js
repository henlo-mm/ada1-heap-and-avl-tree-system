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

    obtenerAltura(nodo) {
        return nodo ? nodo.altura : 0;
    }

    obtenerBalance(nodo) {
        return nodo ? this.obtenerAltura(nodo.izquierda) - this.obtenerAltura(nodo.derecha) : 0;
    }

    actualizarAltura(nodo) {
        if (nodo) {
            nodo.altura = 1 + Math.max(
                this.obtenerAltura(nodo.izquierda), 
                this.obtenerAltura(nodo.derecha)
            );
        }
    }

    rotarDerecha(y) {
        const x = y.izquierda;
        const T2 = x.derecha;

        x.derecha = y;
        y.izquierda = T2;

        this.actualizarAltura(y);
        this.actualizarAltura(x);

        return x;
    }

    rotarIzquierda(x) {
        const y = x.derecha;
        const T2 = y.izquierda;

        y.izquierda = x;
        x.derecha = T2;

        this.actualizarAltura(x);
        this.actualizarAltura(y);

        return y;
    }

    insertar(tarea) {
        this.raiz = this.insertarNodo(this.raiz, tarea);
    }

    insertarNodo(nodo, tarea) {
        if (!nodo) return new NodoAVL(tarea);

        if (tarea.id < nodo.tarea.id) {
            nodo.izquierda = this.insertarNodo(nodo.izquierda, tarea);
        } else if (tarea.id > nodo.tarea.id) {
            nodo.derecha = this.insertarNodo(nodo.derecha, tarea);
        } else {
            return nodo;
        }

        this.actualizarAltura(nodo);
        return this.balancear(nodo);
    }

    balancear(nodo) {
        const balance = this.obtenerBalance(nodo);

        if (balance > 1 && this.obtenerBalance(nodo.izquierda) >= 0) {
            return this.rotarDerecha(nodo);
        }

        if (balance > 1 && this.obtenerBalance(nodo.izquierda) < 0) {
            nodo.izquierda = this.rotarIzquierda(nodo.izquierda);
            return this.rotarDerecha(nodo);
        }

        if (balance < -1 && this.obtenerBalance(nodo.derecha) <= 0) {
            return this.rotarIzquierda(nodo);
        }

        if (balance < -1 && this.obtenerBalance(nodo.derecha) > 0) {
            nodo.derecha = this.rotarDerecha(nodo.derecha);
            return this.rotarIzquierda(nodo);
        }

        return nodo;
    }

    buscar(id) {
        return this.buscarNodo(this.raiz, id);
    }

    buscarNodo(nodo, id) {
        if (!nodo) return null;
        
        if (id === nodo.tarea.id) return nodo.tarea;
        if (id < nodo.tarea.id) return this.buscarNodo(nodo.izquierda, id);
        return this.buscarNodo(nodo.derecha, id);
    }
}