export type Project = {
  key: 'pos' | 'crm' | 'koins' | 'nutrea';
  seal: string;
  category: string;
  name: string;
  summary: string;
  tags: readonly string[];
  features: readonly string[];
  stack: readonly string[];
};

export const PROJECTS: readonly Project[] = [
  {
    key: 'pos',
    seal: '一',
    category: 'Punto de venta',
    name: 'KoiPOS',
    summary:
      'Punto de venta para kioscos con varias sucursales. El pedido se toma en el kiosco, la caja se abre y se cierra con conteo físico, y el inventario descuenta insumos según las recetas de cada producto.',
    tags: [
      'Kiosco y pedidos',
      'Caja y cortes',
      'Inventario por sucursal',
      'Recetas e insumos',
      'Reportes y CSV',
      'Facturación FEL',
    ],
    features: [
      'Kiosco con catálogo, modificadores y pedidos por delivery.',
      'Pedidos activos: pendiente, en preparación, entregado.',
      'Caja con apertura, cierre por conteo físico e historial de cortes.',
      'Inventario por sucursal, compras menores, mermas y auditoría.',
      'Reportes de ventas y finanzas, exportables a CSV.',
      'Exportación de facturación electrónica FEL.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    key: 'crm',
    seal: '二',
    category: 'CRM y ventas',
    name: 'KoiCRM',
    summary:
      'CRM de marca blanca para varias empresas. Cada una trabaja con su propio embudo de ventas, catálogos y campos personalizados, y sus datos quedan aislados del resto.',
    tags: [
      'Embudo configurable',
      'Clientes y seguimientos',
      'Calendario',
      'Cotizaciones y pagos',
      'Estadísticas por asesor',
      'Marca propia',
    ],
    features: [
      'Embudo visual por etapas, con valores y alertas de seguimiento.',
      'Ficha de cliente con sus oportunidades.',
      'Calendario de seguimientos por asesor.',
      'Cotizaciones y pagos ligados a cada oportunidad.',
      'Estadísticas: resumen, embudo, equipo, canal y productos.',
      'Logo, colores y nombre propios por empresa; roles y permisos.',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL con RLS', 'Auth.js', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    key: 'koins',
    seal: '三',
    category: 'Producto propio',
    name: 'Koins',
    summary:
      'El club de fans de tu negocio. Tarjeta de sellos o de puntos sin app ni cuenta: el cliente escanea un QR y deja su teléfono, y el personal registra cada visita desde el mostrador.',
    tags: [
      'Sellos o puntos',
      'QR en mesa y mostrador',
      'Sin app ni cuenta',
      'Deshacer visita',
      'Panel semanal',
      'Informe del lunes',
    ],
    features: [
      'Tarjeta de sellos, o de puntos según el monto en quetzales.',
      'El cliente se une con un QR, sin código ni cuenta.',
      'El personal sella con PIN y puede deshacer durante diez minutos.',
      'Panel con clientes que vuelven, visitas por día y premios canjeados.',
      'Informe del lunes descargable como imagen.',
      'Registra el origen de cada cliente: mostrador, póster o mesa.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase'],
  },
  {
    key: 'nutrea',
    seal: '四',
    category: 'Clínica de nutrición',
    name: 'Nutrea',
    summary:
      'Sistema para clínicas de nutrición. Reúne en un solo lugar el expediente de cada paciente, sus citas, las consultas con mediciones y plan nutricional, y los ingresos y egresos de la clínica.',
    tags: [
      'Expediente del paciente',
      'Agenda de citas',
      'Consultas y mediciones',
      'Calculadora nutricional',
      'Finanzas',
      'Analíticas y reportes',
    ],
    features: [
      'Expediente con datos personales, estilo de vida y perfil clínico.',
      'Calendario de citas con estados, incluida la inasistencia.',
      'Consultas con antropometría, notas clínicas y plan nutricional en PDF.',
      'Calculadora de IMC, gasto energético y macronutrientes.',
      'Registro de ingresos y egresos ligados a consultas y planes.',
      'Analíticas, reportes exportables y equipo con roles y marca propia.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Auth.js', 'Tailwind CSS', 'Recharts'],
  },
];

export const LAYERS = [
  {
    n: '01',
    seal: '一',
    title: 'Estrategia',
    body: 'Entender cómo opera tu negocio antes de decidir qué construir.',
  },
  {
    n: '02',
    seal: '二',
    title: 'Diseño',
    body: 'Pantallas pensadas para quien las usa ocho horas al día.',
  },
  {
    n: '03',
    seal: '三',
    title: 'Desarrollo',
    body: 'Código a la medida y la nube donde va a correr.',
  },
  {
    n: '04',
    seal: '四',
    title: 'Entrega por rondas',
    body: 'Recibes un preview funcionando. Lo pruebas, lo apruebas y sigue la próxima.',
  },
] as const;

export const SERVICES = [
  {
    title: 'Sistemas a la medida',
    body: 'Software construido para cómo trabaja tu negocio: puntos de venta, CRM, plataformas internas.',
  },
  {
    title: 'Automatización',
    body: 'Conectar herramientas y quitar trabajo repetitivo de la operación diaria.',
  },
  {
    title: 'Asistentes de IA',
    body: 'Asistentes que responden y agendan en los canales donde ya están tus clientes.',
  },
] as const;
