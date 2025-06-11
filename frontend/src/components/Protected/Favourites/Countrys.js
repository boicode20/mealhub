const areaToISO = {
  American: 'US',
  British: 'GB',
  Canadian: 'CA',
  Chinese: 'CN',
  Dutch: 'NL',
  Egyptian: 'EG',
  Filipino: 'PH',
  French: 'FR',
  Greek: 'GR',
  Indian: 'IN',
  Irish: 'IE',
  Italian: 'IT',
  Jamaican: 'JM',
  Japanese: 'JP',
  Kenyan: 'KE',
  Malaysian: 'MY',
  Mexican: 'MX',
  Moroccan: 'MA',
  Polish: 'PL',
  Portuguese: 'PT',
  Russian: 'RU',
  Spanish: 'ES',
  Thai: 'TH',
  Tunisian: 'TN',
  Turkish: 'TR',
  Vietnamese: 'VN',
};

export const getFlagUrl = (area) =>{
  const iso = areaToISO[area];
  return iso ? `https://flagsapi.com/${iso}/flat/64.png` : '';
}
