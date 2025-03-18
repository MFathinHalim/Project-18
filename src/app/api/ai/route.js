function decodeBase64UrlSafe(encoded) {
  let base64 = encoded
    .replace(/-/g, "+")  // Kembalikan "-" ke "+"
    .replace(/_/g, "/"); // Kembalikan "_" ke "/"

  // Tambahkan padding "=" jika panjangnya tidak kelipatan 4
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }

  return decodeURIComponent(atob(base64));
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let prompt = searchParams.get("prompt") || "default";
  prompt = decodeBase64UrlSafe(prompt)
  const apiurl = `https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(
"Buatkan pesan ucapan sesuai permintaan user. Jika user mention nama seseorang maka JANGAN LUPA sebutlah nama itu dengan lengkap. Gunakan bahasa yang santai, boleh pakai sedikit bahasa gen z indonesia biar terasa lebih natural, tapi tetap sopan. Tulis pesannya seperti dari seseorang yang akrab dengan penerima, tanpa harus menyebut nama langsung. Jangan pakai tanda seru, cukup titik saja. Awali dengan kalimat yang lebih sopan atau langsung ke inti pesan. Gunakan emoji kalau cocok. Jangan pake woi atau eh sama sekali. Berikut permintaan user: " + prompt
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