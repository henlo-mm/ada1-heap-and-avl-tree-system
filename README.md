# Sistema de Gestión de Tareas con Heap y Árbol AVL

Sistema web para gestionar tareas utilizando estructuras de datos avanzadas: **Max Heap** para priorización y **Árbol AVL** para búsqueda eficiente.

## Descripción

Aplicación que implementa una cola de prioridad mediante un Max Heap y permite búsqueda rápida de tareas por ID usando un Árbol AVL balanceado. Las tareas se ordenan automáticamente por prioridad (Alta > Media > Baja).

## Estructura del Proyecto

```
proyectoADA1/
├── index.html              # Interfaz principal
├── css/
│   └── styles.css         # Estilos
└── js/
    ├── Task.js            # Clase Tarea
    ├── MaxHeap.js         # Implementación Max Heap
    ├── AVLTree.js         # Implementación Árbol AVL
    ├── TaskManager.js     # Gestor de tareas
    └── main.js            # Lógica de la interfaz
```

## Funcionalidades

### 1. Agregar Tarea
- **Complejidad**: O(log n)
- Inserta una nueva tarea en el Max Heap y el Árbol AVL
- Valida que el ID sea único
- Campos: ID, Descripción, Prioridad, Fecha de Vencimiento

### 2. Buscar por ID
- **Complejidad**: O(log n)
- Búsqueda eficiente usando el Árbol AVL balanceado
- Muestra toda la información de la tarea encontrada

### 3. Cola de Prioridad
- **Complejidad**: O(log n) por inserción
- Visualiza tareas ordenadas automáticamente por prioridad
- Max Heap mantiene la tarea de mayor prioridad en la raíz

### 4. Marcar como Completada
- **Complejidad**: O(n) para buscar + O(log n) para reajustar
- Elimina la tarea del heap (se reajusta automáticamente)
- La tarea permanece en el AVL marcada como completada

## Complejidad Algorítmica

| Operación | Complejidad | Descripción |
|-----------|-------------|-------------|
| Agregar tarea | O(log n) | Inserción en heap + AVL |
| Buscar tarea | O(log n) | Búsqueda en árbol balanceado |
| Completar tarea | O(n) | Búsqueda + eliminación del heap |
| Visualizar heap | O(1) | Acceso al array interno |

## Instalación y Uso

1. **Clonar o descargar** el proyecto

2. **Abrir** `index.html` en un navegador moderno

3. **Agregar una tarea**:
   - Ingresar ID único (número)
   - Escribir descripción
   - Seleccionar prioridad
   - Elegir fecha de vencimiento
   - Click en "Agregar Tarea"

4. **Buscar tarea**:
   - Ingresar ID en el campo de búsqueda
   - Click en "Buscar"

5. **Completar tarea**:
   - Click en el botón "Completar" de cualquier tarea en la cola

## Tecnologías

- **HTML5**: Estructura de la interfaz
- **CSS3**: Estilos modernos (variables CSS, gradientes, animaciones)
- **JavaScript ES6**: Lógica de la aplicación (clases, arrow functions)