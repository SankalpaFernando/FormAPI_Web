const zones = [
  { name: 'America/New_York', abbr: 'est' },
    { name: 'America/Chicago', abbr: 'cst' },
    { name: 'America/Denver', abbr: 'mst' },
    { name: 'America/Los_Angeles', abbr: 'pst' },
    { name: 'America/Anchorage', abbr: 'akst' },
    { name: 'Pacific/Honolulu', abbr: 'hst' },
    { name: 'GMT', abbr: 'gmt' },
    { name: 'Europe/Berlin', abbr: 'cet' },
    { name: 'Europe/Bucharest', abbr: 'eet' },
    { name: 'Europe/Lisbon', abbr: 'west' },
    { name: 'Africa/Harare', abbr: 'cat' },
    { name: 'Africa/Nairobi', abbr: 'eat' },
    { name: 'Europe/Moscow', abbr: 'msk' },
    { name: 'Asia/Kolkata', abbr: 'ist' },
    { name: 'Asia/Shanghai', abbr: 'cst_china' },
    { name: 'Asia/Tokyo', abbr: 'jst' },
    { name: 'Asia/Seoul', abbr: 'kst' },
    { name: 'Asia/Makassar', abbr: 'ist_indonesia' },
    { name: 'Australia/Perth', abbr: 'awst' },
    { name: 'Australia/Darwin', abbr: 'acst' },
    { name: 'Australia/Sydney', abbr: 'aest' },
    { name: 'Pacific/Auckland', abbr: 'nzst' },
    { name: 'Pacific/Fiji', abbr: 'fjt' },
    { name: 'America/Argentina/Buenos_Aires', abbr: 'art' },
    { name: 'America/La_Paz', abbr: 'bot' },
    { name: 'America/Sao_Paulo', abbr: 'brt' },
    { name: 'America/Santiago', abbr: 'clt' },
]
  
  // Now you can use the 'timeZones' array in your application as needed.

const getZone = (abbr) => {
  const zone = zones.find((zone) => zone.abbr === abbr);
  console.log(abbr);
  console.log(zone);
  return zone ? zone.name : "";
};

const getAbbr = (name) => {
  const zone = zones.find((zone) => zone.name === name);
  return zone ? zone.abbr : "";
};

const getZones = () => {
  return zones;
}

export { getZone, getAbbr, getZones };