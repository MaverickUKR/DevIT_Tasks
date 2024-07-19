import { useOutletContext } from "@remix-run/react";
import type { Contact } from "./types";

interface ContactContext {
  contact: Contact;
}
export default function InfoTab() {
  const { contact } = useOutletContext<ContactContext>();
  return (
    <div>
      <h2>Информация о пользователе</h2>
      <p>
        <strong>Имя:</strong> {contact.first}
      </p>
      <p>
        <strong>Фамилия:</strong> {contact.last}
      </p>
      <p>
        <strong>Твиттер:</strong> {contact.twitter}
      </p>
      <p>
        <strong>Заметки:</strong> {contact.notes}
      </p>
    </div>
  );
}
