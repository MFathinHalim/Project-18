export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const prompt = searchParams.get("prompt") || "default";
  
    const apiurl = `https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(
        "Buatkan teks motivasi yang singkat dan menggemaskan dalam 5 kalimat pendek. Gunakan gaya penulisan seperti ini: 'Hey kamu. Aku mau kasih tahu sesuatu. Kamu itu hebat. Jangan menyerah ya. Tetap semangat setiap hari!'. Jangan gunakan tanda baca selain titik. Jawab hanya dengan teks yang diminta, tanpa tambahan lainnya. Buatlah tentang " + prompt
      )}`;
        
    try {
      const response = await fetch(apiurl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data.answer); // Debugging
  
      return new Response(JSON.stringify(data), { // Perbaikan: Harus diubah ke JSON.stringify()
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Bypass CORS
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } catch (error) {
      console.error("Error fetching API:", error);
      return new Response(JSON.stringify({ error: "Gagal mengambil data" }), { status: 500 });
    }
  }
  