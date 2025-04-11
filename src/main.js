import { useState } from 'react';

export default function AdDopamineApp() {
  const [form, setForm] = useState({
    product: '', link: '', priceOriginal: '', pricePromo: '',
    paymentType: '', country: '', language: '', audience: '', niche: ''
  });
  const [prompt, setPrompt] = useState('');
  const generatePrompt = () => {
    const p = `You are a senior digital campaign strategist and dopamine engineer. Generate a complete Google Ads campaign for the following affiliate product:\n\nProduct: ${form.product}\nAffiliate Link: ${form.link}\nPrice: ${form.priceOriginal} with discount → ${form.pricePromo}\nPayment Type: ${form.paymentType}\nCountry: ${form.country}\nLanguage: ${form.language}\nAudience: ${form.audience}\nNiche: ${form.niche}\n\nGenerate:\n1. 3 sets of ads with 15 headlines and 4 descriptions each\n2. 1 dopamine-optimized set\n3. Advanced Google Ads assets (sitelinks, callouts, snippet)\n4. Positive and negative keywords\n5. HTML button with tracking event\n6. Campaign checklist\n7. Performance tracking table\n\nAvoid terms banned by Google Ads like “scientifically proven” or “treatment”. This is a supplement, not a medicine.`;
    setPrompt(p);
  };
  const handleChange = (field, value) => setForm({ ...form, [field]: value });
  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>AdDopamine – AI Campaign Generator</h1>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        <input placeholder='Product Name' onChange={e => handleChange('product', e.target.value)} />
        <input placeholder='Affiliate Link' onChange={e => handleChange('link', e.target.value)} />
        <input placeholder='Original Price' onChange={e => handleChange('priceOriginal', e.target.value)} />
        <input placeholder='Promotional Price' onChange={e => handleChange('pricePromo', e.target.value)} />
        <input placeholder='Payment Type (e.g. COD)' onChange={e => handleChange('paymentType', e.target.value)} />
        <input placeholder='Country' onChange={e => handleChange('country', e.target.value)} />
        <input placeholder='Language' onChange={e => handleChange('language', e.target.value)} />
        <input placeholder='Audience (e.g. women 35+...)' onChange={e => handleChange('audience', e.target.value)} />
        <input placeholder='Niche (e.g. Health, Beauty...)' onChange={e => handleChange('niche', e.target.value)} />
        <button onClick={generatePrompt}>Generate Campaign Prompt</button>
      </div>
      {prompt && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Your Campaign Prompt</h2>
          <textarea rows='20' value={prompt} readOnly style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}