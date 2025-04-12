import { useState } from "react";

export default function AdDopamineApp() {
  const [form, setForm] = useState({
    product: "",
    link: "",
    priceOriginal: "",
    pricePromo: "",
    paymentType: "",
    country: "",
    language: "",
    audience: "",
    niche: "",
  });

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    setLoading(true);

    const finalPrompt = `You are a senior digital campaign strategist and dopamine engineer. Generate a complete Google Ads campaign for the following affiliate product:

Product: ${form.product}
Affiliate Link: ${form.link}
Price: ${form.priceOriginal} with discount → ${form.pricePromo}
Payment Type: ${form.paymentType}
Country: ${form.country}
Language: ${form.language}
Audience: ${form.audience}
Niche: ${form.niche}

Generate:
1. 3 sets of ads with 15 headlines and 4 descriptions each
2. 1 dopamine-optimized set
3. Advanced Google Ads assets (sitelinks, callouts, snippet)
4. Positive and negative keywords
5. HTML button with tracking event
6. Campaign checklist
7. Performance tracking table

Avoid terms banned by Google Ads like “scientifically proven” or “treatment”. This is a supplement, not a medicine.`;

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a campaign specialist." },
            { role: "user", content: finalPrompt },
          ],
        }),
      });

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "No content returned.";
      setPrompt(content);
    } catch (error) {
      setPrompt("Error fetching response from OpenAI API.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>AdDopamine – AI Campaign Generator</h1>

      <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
        <input placeholder="Product Name" onChange={e => handleChange("product", e.target.value)} />
        <input placeholder="Affiliate Link" onChange={e => handleChange("link", e.target.value)} />
        <input placeholder="Original Price" onChange={e => handleChange("priceOriginal", e.target.value)} />
        <input placeholder="Promotional Price" onChange={e => handleChange("pricePromo", e.target.value)} />
        <input placeholder="Payment Type (e.g. COD)" onChange={e => handleChange("paymentType", e.target.value)} />
        <input placeholder="Country" onChange={e => handleChange("country", e.target.value)} />
        <input placeholder="Language" onChange={e => handleChange("language", e.target.value)} />
        <input placeholder="Audience (e.g. women 35+...)" onChange={e => handleChange("audience", e.target.value)} />
        <input placeholder="Niche (e.g. Health, Beauty...)" onChange={e => handleChange("niche", e.target.value)} />
        <button onClick={generatePrompt}>{loading ? "Generating..." : "Generate Campaign with AI"}</button>
      </div>

      {prompt && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Your Campaign Prompt</h2>
          <textarea rows="20" value={prompt} readOnly style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}
