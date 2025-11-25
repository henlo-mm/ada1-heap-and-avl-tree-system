# Sistema de Gestión de Tareas con Estructuras de Datos Avanzadas

## Descripción del Proyecto
Este proyecto es una aplicación web para la gestión de tareas que implementa dos estructuras de datos fundamentales para garantizar la eficiencia:
1. [cite_start]**Colas de Prioridad con Montículos (Max-Heap):** Para gestionar tareas asegurando que las de prioridad "Alta" sean atendidas primero[cite: 1].
2. [cite_start]**Árboles AVL:** Para la indexación de tareas mediante un ID único, permitiendo búsquedas, inserciones y eliminaciones en tiempo logarítmico $O(\log n)$[cite: 15].

## Requisitos Técnicos
* Lenguaje: JavaScript (ES6+)
* Interfaz: HTML5 / CSS3 (No requiere instalación de librerías externas)
* Navegador: Chrome, Firefox, Edge o Safari actualizado.

## Estructura de Archivos
* `index.html`: Contiene la interfaz gráfica (GUI) y la lógica de integración.
* Contiene las clases `Tarea`, `MaxHeap`, `AVLTree` y `TaskManager`.

## [cite_start]Cómo Ejecutar el Programa [cite: 58]
1.  Descargue el archivo `index.html` proporcionado.
2.  (Si separó el código JS) Asegúrese de que `script.js` esté en la misma carpeta.
3.  Haga doble clic en el archivo `index.html` para abrirlo en su navegador web predeterminado.
4.  **No se requiere servidor local**: Al ser JavaScript puro del lado del cliente (Front-end), funciona directamente desde el archivo.

## Guía de Uso
1.  **Agregar Tarea:** Ingrese un ID (numérico), descripción, seleccione la prioridad (Alta, Media, Baja) y una fecha. Haga clic en "Agregar Tarea".
2.  **Visualización:** Observe la lista a la derecha. Notará que independientemente del orden de inserción, las tareas de prioridad "Alta" siempre aparecerán arriba (gestionado por el Heap).
3.  **Buscar Tarea:** En el panel izquierdo, ingrese un ID y pulse "Buscar". El sistema consultará el Árbol AVL para devolver el resultado instantáneamente.
4.  **Completar Tarea:** Haga clic en "Completar" en cualquier tarea. Esto eliminará el elemento tanto del Montículo (reorganizando la prioridad) como del Árbol AVL (rebalanceando el árbol).

## Créditos
Proyecto ADA1 - Diciembre 5 de 2025.