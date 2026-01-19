export interface Artisan {
  id: string;
  name: string;
  story: string;
  photo: string;
  location: string;
  badges: ('Trusted' | 'Verificado' | 'Sostenible' | 'Maestro')[];
  rating: number;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  description: string; // Detailed bio
}

export interface Variation {
  name: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Textiles' | 'Cerámica' | 'Café' | 'Joyería' | 'Madera';
  artisanId: string;
  stock: number;
  description: string;
  productStory: string; // The specific story of this item
  variations?: Variation[];
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'Pendiente' | 'Listo para envío' | 'Entregado';
  date: string;
  items: number;
}

export const artisans: Artisan[] = [
  {
    id: 'a1',
    name: 'María Guamán',
    story: 'Heredera de una tradición de tres generaciones en el tejido de lana de oveja en Saraguro.',
    photo: '/placeholder-artisan-1.jpg',
    location: 'Saraguro, Loja',
    badges: ['Trusted', 'Verificado', 'Maestro'],
    rating: 4.9,
    contact: {
      phone: '+593 99 123 4567',
      email: 'maria.guaman@artesanias.ec'
    },
    description: 'María lleva tejiendo desde los 12 años. Su taller en el centro de Saraguro es un punto de encuentro para mujeres de la comunidad que buscan preservar las técnicas ancestrales del telar de cintura.'
  },
  {
    id: 'a2',
    name: 'Carlos Jaramillo',
    story: 'Maestro ceramista especializado en técnicas precolombinas adaptadas al diseño moderno.',
    photo: '/placeholder-artisan-2.jpg',
    location: 'Malacatos, Loja',
    badges: ['Verificado', 'Sostenible'],
    rating: 4.7,
    contact: {
      phone: '+593 98 765 4321',
      email: 'carlos.barro@loja.ec',
      website: 'www.barromalacatos.com'
    },
    description: 'Carlos utiliza arcilla extraída localmente y pigmentos naturales. Su enfoque es la sostenibilidad, reciclando el agua utilizada en el proceso y utilizando hornos de bajo consumo.'
  },
  {
    id: 'a3',
    name: 'Finca El Bosque',
    story: 'Café de altura cultivado a 1800msnm. Proceso artesanal desde la cosecha hasta el tostado.',
    photo: '/placeholder-artisan-3.jpg',
    location: 'Vilcabamba, Loja',
    badges: ['Trusted', 'Sostenible', 'Verificado'],
    rating: 5.0,
    contact: {
      phone: '+593 99 999 0000',
      email: 'ventas@fincaelbosque.loja'
    },
    description: 'Ubicados en el valle de la longevidad, Finca El Bosque produce uno de los cafés más premiados de la región sur. Cada grano es seleccionado a mano para garantizar una taza perfecta.'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Poncho Saraguro Tradicional',
    price: 85.00,
    image: '/placeholder-poncho.jpg',
    category: 'Textiles',
    artisanId: 'a1',
    stock: 5,
    description: 'Poncho de lana de oveja virgen, teñido con nogal y tejido en telar de cintura. Resistente al frío y a la lluvia ligera.',
    productStory: 'Este diseño representa los surcos de la tierra lista para la siembra. Tomó 2 semanas completarlo.',
    variations: [
      { name: 'Negro Clásico', stock: 2 },
      { name: 'Azul Añil', stock: 3 }
    ]
  },
  {
    id: 'p2',
    name: 'Juego de Tazas "Amanecer"',
    price: 45.00,
    image: '/placeholder-cups.jpg',
    category: 'Cerámica',
    artisanId: 'a2',
    stock: 12,
    description: 'Set de 4 tazas de cerámica gres esmaltada a mano. Aptas para microondas y lavavajillas.',
    productStory: 'Inspiradas en los colores del amanecer sobre el valle de Malacatos. Cada taza tiene una variación única en el esmaltado.',
    variations: [
      { name: 'Tonos Tierra', stock: 8 },
      { name: 'Azul Cobalto', stock: 4 }
    ]
  },
  {
    id: 'p3',
    name: 'Café de Especialidad 400g',
    price: 12.50,
    image: '/placeholder-coffee.jpg',
    category: 'Café',
    artisanId: 'a3',
    stock: 50,
    description: 'Café arábica de altura, tueste medio. Notas a chocolate, panela y cítricos.',
    productStory: 'Cosechado en luna llena según la creencia local para asegurar la mayor concentración de azúcares en el grano.',
    variations: [
      { name: 'Grano Entero', stock: 30 },
      { name: 'Molido Fino', stock: 15 },
      { name: 'Molido Medio', stock: 5 }
    ]
  },
  {
    id: 'p4',
    name: 'Bolso Tejido a Mano',
    price: 35.00,
    image: '/placeholder-bag.jpg',
    category: 'Textiles',
    artisanId: 'a1',
    stock: 8,
    description: 'Bolso resistente y espacioso, ideal para el uso diario. Asas reforzadas de cuero.',
    productStory: 'El patrón zig-zag simboliza los caminos de las montañas andinas que conectan nuestras comunidades.',
    variations: [
      { name: 'Multicolor', stock: 5 },
      { name: 'Beige Natural', stock: 3 }
    ]
  },
  {
    id: 'p5',
    name: 'Florero de Barro Negro',
    price: 28.00,
    image: '/placeholder-vase.jpg',
    category: 'Cerámica',
    artisanId: 'a2',
    stock: 3,
    description: 'Florero decorativo bruñido con piedra de río para obtener un brillo natural sin esmaltes tóxicos.',
    productStory: 'Quema en horno de leña reductora, una técnica olvidada que hemos rescatado para lograr el color negro intenso.',
    variations: [
      { name: 'Liso', stock: 1 },
      { name: 'Tallado', stock: 2 }
    ]
  }
];

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'Ana Pérez', total: 45.00, status: 'Pendiente', date: '2026-01-04', items: 1 },
  { id: 'ORD-002', customer: 'Luis Torres', total: 12.50, status: 'Listo para envío', date: '2026-01-03', items: 1 },
  { id: 'ORD-003', customer: 'Elena Vaca', total: 120.00, status: 'Entregado', date: '2025-12-28', items: 3 },
];
