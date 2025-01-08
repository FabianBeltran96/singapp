import type { ServicesResponse } from '../types/service';

export const mockServicesResponse: ServicesResponse = {
  status: 200,
  message: "Servicios consultados exitósamente",
  data: [
    {
      id: 12,
      titulo: "Service Beier Group",
      descripcion: "Qui in optio eius nesciunt totam fugit. Vitae autem perferendis odit quos ea deserunt. Eligendi vel excepturi consectetur excepturi autem vel.",
      fecha_evento: "1994-10-21",
      hora_evento: "21:27",
      estado: "finalizado",
      direccion: "46091 Mann Drive\nEast Queenfort, CT 64234-8881",
      precio: "230000.00",
      id_cliente: 3,
      id_user_asignado: 5,
      created_at: "2024-12-15T21:22:49.000000Z",
      updated_at: "2024-12-15T21:46:04.000000Z",
      deleted_at: null,
      fecha_hora_evento: "1994-10-21 21:27",
      cliente: {
        id: 3,
        identificacion: "63284322",
        nombre: "Haag Inc",
        descripcion: null,
        direccion: "6695 Jeff Pass\nLake Lonieton, NH 59690-0890",
        created_at: "2024-12-15T21:22:49.000000Z",
        updated_at: "2024-12-15T21:22:49.000000Z",
        deleted_at: null
      },
      trabajador: {
        id: 5,
        identificacion: "37501561",
        nombres: "Mallie Mosciski",
        apellidos: "Jerad Schoen",
        celular: "3028011388",
        foto_perfil: null,
        id_rol: 2,
        created_at: "2024-12-15T21:22:49.000000Z",
        updated_at: "2024-12-15T21:22:49.000000Z",
        deleted_at: null,
        nombre_apellido: "Mallie Jerad",
        estado: "activo",
        rol: {
          id: 2,
          nombre: "Trabajador",
          descripcion: "Raso",
          created_at: null,
          updated_at: null
        }
      },
      soporte: {
        id: 1,
        firma: "data:image/png;base64,TODO_EL_BASE64",
        observacion: null,
        id_servicio: 12,
        created_at: "2024-12-15T21:46:04.000000Z",
        updated_at: "2024-12-15T21:46:04.000000Z"
      }
    },
    // Más servicios de ejemplo
    {
      id: 13,
      titulo: "Service Tech Solutions",
      descripcion: "Servicio de mantenimiento preventivo y correctivo de equipos industriales.",
      fecha_evento: "2024-03-15",
      hora_evento: "14:30",
      estado: "pendiente",
      direccion: "123 Tech Street\nIndustrial Zone, NY 10001",
      precio: "450000.00",
      id_cliente: 4,
      id_user_asignado: 6,
      created_at: "2024-03-10T10:00:00.000000Z",
      updated_at: "2024-03-10T10:00:00.000000Z",
      deleted_at: null,
      fecha_hora_evento: "2024-03-15 14:30",
      cliente: {
        id: 4,
        identificacion: "89765432",
        nombre: "Tech Industries Inc",
        descripcion: null,
        direccion: "123 Tech Street\nIndustrial Zone, NY 10001",
        created_at: "2024-03-10T10:00:00.000000Z",
        updated_at: "2024-03-10T10:00:00.000000Z",
        deleted_at: null
      },
      trabajador: {
        id: 6,
        identificacion: "45678912",
        nombres: "John",
        apellidos: "Smith",
        celular: "3015557788",
        foto_perfil: null,
        id_rol: 2,
        created_at: "2024-03-10T10:00:00.000000Z",
        updated_at: "2024-03-10T10:00:00.000000Z",
        deleted_at: null,
        nombre_apellido: "John Smith",
        estado: "activo",
        rol: {
          id: 2,
          nombre: "Trabajador",
          descripcion: "Técnico Especializado",
          created_at: null,
          updated_at: null
        }
      }
    }
  ],
  error: null
}; 