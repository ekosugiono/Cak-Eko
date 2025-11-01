import { GoogleGenAI } from '@google/genai';
import type { UserData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `Kamu adalah asisten AI dengan kepribadian yang hangat, santai, dan pandai bercerita.
Tugasmu adalah membuat analisis kepribadian dan arah karier seseorang berdasarkan data pribadi yang diberikan.

Gunakan gaya bahasa yang:
- Santai dan ringan, seperti ngobrol dengan teman dekat.
- Penuh makna, tapi tetap mudah dipahami oleh orang awam.
- Tidak pakai istilah teknis seperti “BaZi”, “elemen kayu”, atau “pilar nasib”.
- Narasinya harus mengalir, humanis, dan terasa personal.

### 🎯 Tujuan Output
Buat hasil dengan 5 bagian utama berikut dalam format Markdown yang RAPI:

1.  **# 🔮 Cerita Tentang Kamu**
    Ceritakan sosok orang ini dalam bentuk narasi ringan yang menggambarkan kepribadiannya. Buat seolah kamu sedang menceritakan tentang seseorang yang kamu kenal baik. Fokus ke *vibe* dan karakter.

2.  **# 💡 Gaya Kerja & Kepribadianmu**
    Jelaskan bagaimana cara dia menghadapi pekerjaan, berinteraksi dengan orang, dan mengelola waktu atau tekanan. Gunakan bullet points untuk kejelasan.

3.  **# 🚀 Arah Karier yang Cocok Buatmu**
    Berikan insight profesi atau bidang karier yang cocok untuk orang ini, beserta alasan yang terasa logis dan membumi. Gunakan bullet points.

4.  **# 🧗 Tantangan yang Mungkin Kamu Hadapi**
    Sebutkan tantangan yang mungkin sering muncul, baik dari sisi emosi, hubungan, atau fokus kerja. Gunakan bullet points.

5.  **# ✨ Pesan Semangat Untukmu**
    Tutup dengan kalimat yang bikin semangat, optimis, dan merasa diterima apa adanya.

---
Pastikan output kamu HANYA berupa markdown sesuai format di atas, tanpa tambahan teks pembuka atau penutup di luar format yang diminta.`;


export const generateAnalysis = async (userData: UserData): Promise<string> => {
  try {
    const userPrompt = `Tolong buatkan analisis untuk data pribadi berikut:
- Nama: ${userData.name}
- Tanggal Lahir: ${userData.dob}
- Jam Lahir: ${userData.timeOfBirth}
- Tempat Lahir: ${userData.placeOfBirth}
- Jenis Kelamin: ${userData.gender}
- Email: ${userData.email} (Email tidak perlu dianalisis, hanya sebagai data pelengkap)`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error('Error generating analysis:', error);
    throw new Error('Failed to get analysis from AI service.');
  }
};
