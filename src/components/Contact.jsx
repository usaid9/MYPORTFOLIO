import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact({ dark }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", message: "" });

  const send = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_4gr777s", 
      "template_n9p7sfn",
      {
        email: form.email,
        name: form.name,
        message: form.message,
        to_email: "usaidmoiza@gmail.com",
      },
      "eLQrblyXK1Lv5vy59"
    )
    .then(() => setSent(true))
    .catch((error) => console.error("Email send failed: ", error));
  };

  const inputClass = `w-full p-3 rounded-xl border bg-transparent ${dark ? 'border-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-400 text-gray-900 placeholder-gray-600'}`;

  return (
    <section id="contact" className={`max-w-6xl mx-auto px-6 py-20 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <h2 className="text-3xl font-semibold mb-6">Contact</h2>

      <form onSubmit={send} className={`max-w-xl space-y-4 ${dark ? 'bg-gray-900' : 'bg-gray-200'} p-6 rounded-2xl`}>
        <input
          required
          type="email"
          placeholder="Your Email"
          className={inputClass}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="Your Name"
          className={inputClass}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          required
          placeholder="Your Message"
          className={inputClass}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-xl">
          Send
        </button>
        {sent && <p className="text-green-500">Message sent ✔</p>}
      </form>
    </section>
  );
}
