import { MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/config/site";

// Bouton flottant WhatsApp, discret et accessible.
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec FABIOLE METAL sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.8)] transition-transform duration-200 hover:scale-105"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
