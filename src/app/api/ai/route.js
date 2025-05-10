import ControllerCard from "@/controllers/post";

const postController = ControllerCard.getInstance();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid"); // Ambil UID dari query parameter
  if (!uid) {
    return new Response(JSON.stringify({ error: "UID is required" }), { status: 400 });
  }

  try {
    // Cari data berdasarkan UID menggunakan controller
    const posts = await postController.get({ uid });

    if (posts.length === 0) {
      return new Response(JSON.stringify({ error: "Data not found" }), { status: 404 });
    }

    const post = posts[0]; // Ambil data pertama dari hasil pencarian
    const prompt = post.prompt; // Ambil prompt dari hasil pencarian

    // Definisikan array mode
    const modes = [
      "formal",
      "nonformal  Gunakan bahasa yang santai, boleh pakai sedikit bahasa gen z indonesia biar terasa lebih natural, tapi tetap sopan.",
      "romantis Gunakan bahasa yang santai, boleh pakai sedikit bahasa gen z indonesia biar terasa lebih natural, tapi tetap sopan.",
      "sahabat  Gunakan bahasa yang santai, boleh pakai sedikit bahasa gen z indonesia biar terasa lebih natural, tapi tetap sopan.",
      "undangan",
    ];
    const mode = modes[post.mode] || "default"; 

    const apiurl = `https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(
      `Buatkan pesan ucapan sesuai permintaan user. Jangan pakai tanda seru, cukup titik saja. Awali dengan kalimat yang lebih sopan atau langsung ke inti pesan. Gunakan emoji kalau cocok. buat agar memiliki style gaya bicara ke ${mode} yang ditujukan ke ${
        post.gender === 1 ? "perempuan" : "laki laki"
      }. sebut lengkap nama Tujuan usernya ${post.user.tujuan} yang dikirimkan oleh ${
        post.user.pengirim
      } Permintaan user: ${prompt}. 
      Informasi tambahan: Mode - ${mode}, Tujuan - ${post.user.tujuan}, Pengirim - ${post.user.pengirim}.`
    )}`;

    const response = await fetch(apiurl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    // Return data dari API dan post
    return new Response(
      JSON.stringify({
        apiResponse: data,
        post: post,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Bypass CORS
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching API:", error);
    return new Response(JSON.stringify({ error: "Gagal mengambil data" }), { status: 500 });
  }
}