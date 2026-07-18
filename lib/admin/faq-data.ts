import type { HelpContent } from '@/lib/help/types';

/**
 * Centro de conocimiento — Crow Admin (CRM).
 * Agrega pasos o FAQs aquí; el drawer los muestra automáticamente.
 */
export const adminHelpContent: HelpContent = {
  title: 'Ayuda y Centro de Conocimiento',
  subtitle: 'Guías rápidas para operar Crow día a día.',
  stepsHeading: 'Primeros pasos',
  steps: [
    {
      id: 'activar-socios',
      title: '1. Activar socios',
      description:
        'Ve a Socios, busca al miembro y marca su membresía como activa o registra el pago. Así deja de aparecer “Por activar” y puede entrenar.',
    },
    {
      id: 'publicar-clase',
      title: '2. Publicar clase',
      description:
        'En Clases (Agenda) crea o edita el horario, coach y cupo. Publica para que aparezca en el Portal del Socio como clase del día.',
    },
    {
      id: 'vender-producto',
      title: '3. Vender producto',
      description:
        'En Tienda revisa stock y precio. Al vender, descuenta inventario desde el panel; el ticket queda listo para caja.',
    },
  ],
  faqHeading: 'Preguntas frecuentes',
  faqs: [
    {
      id: 'por-activar',
      question: "¿Por qué el socio aparece 'Por activar'?",
      answer:
        'Significa que se registró o renovó, pero el pago aún no está confirmado en el sistema. Abre su ficha en Socios, confirma el pago (o actívalo manualmente en demo) y el estado cambia a Activo.',
    },
    {
      id: 'cobrar-reto',
      question: '¿Cómo cobrar un reto?',
      answer:
        'Los retos se publican para el Portal. El socio acepta y paga desde la app (/app/pagar). En Admin verás la inscripción cuando el pago se confirme. En demo, el pago simulado marca el reto como activo al instante.',
    },
    {
      id: 'clase-portal',
      question: '¿Cómo se ve la clase en el Portal del Socio?',
      answer:
        'La clase publicada para hoy (horario + WOD/rutina) alimenta “Clase del día” en Crow App. Si no hay clase del día, revisa Agenda y Rutinas.',
    },
    {
      id: 'renovar-membresia',
      question: '¿Cómo renueva un socio su membresía?',
      answer:
        'Puede pagar desde el Portal (Pagar ahora) o tú registras el pago en Socios. La fecha de vencimiento se actualiza y el estado pasa a Activo.',
    },
    {
      id: 'datos-demo',
      question: '¿Los datos del panel son reales?',
      answer:
        'En esta propuesta el CRM usa datos locales de simulación (localStorage). Puedes crear, editar y borrar con libertad; no afecta sistemas externos hasta conectar backend.',
    },
  ],
  footerNote: '¿Necesitas algo más? Edita lib/admin/faq-data.ts para sumar guías y FAQs.',
};
