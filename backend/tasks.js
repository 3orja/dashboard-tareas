// Almacenamiento de datos en memoria
let tasks = [
  { 
    id: 1, 
    title: 'Implementar frontend', 
    description: 'Crear la interfaz de usuario para el dashboard de tareas', 
    completed: true,
    priority: 'high',
    dueDate: '2025-06-10'
  },
  { 
    id: 2, 
    title: 'Implementar backend', 
    description: 'Desarrollar la API REST para el dashboard', 
    completed: false,
    priority: 'high',
    dueDate: '2025-06-15'
  },
  { 
    id: 3, 
    title: 'Configurar Docker', 
    description: 'Preparar la configuración de Docker para desarrollo y producción', 
    completed: false,
    priority: 'medium',
    dueDate: '2025-06-20'
  }
];

// Contador para asignar IDs únicos a nuevas tareas
let nextId = 4;

// Funciones para manipular las tareas
module.exports = {
  // Obtener todas las tareas
  getTasks: () => {
    return tasks;
  },

  // Obtener una tarea por ID
  getTask: (id) => {
    return tasks.find(task => task.id === parseInt(id));
  },

  // Crear una nueva tarea
  createTask: (taskData) => {
    const newTask = {
      id: nextId++,
      title: taskData.title,
      description: taskData.description || '',
      completed: taskData.completed || false,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return newTask;
  },

  // Actualizar una tarea existente
  updateTask: (id, taskData) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) return null;

    const updatedTask = {
      ...tasks[taskIndex],
      ...taskData,
      id: parseInt(id) // Asegurarnos que el ID permanece igual
    };
    
    tasks[taskIndex] = updatedTask;
    return updatedTask;
  },

  // Eliminar una tarea
  deleteTask: (id) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) return false;
    
    tasks.splice(taskIndex, 1);
    return true;
  },

  // La función original para ejecutar tareas
  runTask: (id) => {
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
      return { success: false, message: 'Task not found' };
    }
    
    // Aquí podrías implementar la lógica para "ejecutar" una tarea
    return { success: true, message: `Task ${id} executed successfully` };
  }
};

