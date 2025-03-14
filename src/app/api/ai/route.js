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
  console.log(prompt)
  const apiurl = `https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(
      "buatkan pesan ucapan yang diminta user, bahasanya jangan yg baku-baku yak, pakein slang kalau perlu, biar kelihatan seperti buatan manusia, buat pesan lu seolah-olah kayak pesan dari seseorang yang ditujukan ke orang spesifik, selagi ga disebutin nama, gunakan kata 'Gw' atau 'Kamu' juga gapapa, cukup balas dengan pesan ucapannya aja, pakai emoji kalau perlu. JANGAN PAKE TANDA SERU CUKUP GANTI TITIK AJA. awalnya jangan pake woi, lebih sopan sedikit. bikin Hey, Eh, Halo, Hi nya random " + prompt
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
