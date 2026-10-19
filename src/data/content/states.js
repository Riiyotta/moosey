/**
 * US state taxonomy (50 states + DC) used by the resources model (specs/content.md §0.1).
 * Factual names / USPS codes only. `slug` matches the leaf slug prefix `{state}-...`.
 */
const RAW = [
  ['alabama', 'Alabama', 'AL'], ['alaska', 'Alaska', 'AK'], ['arizona', 'Arizona', 'AZ'], ['arkansas', 'Arkansas', 'AR'],
  ['california', 'California', 'CA'], ['colorado', 'Colorado', 'CO'], ['connecticut', 'Connecticut', 'CT'],
  ['delaware', 'Delaware', 'DE'], ['district-of-columbia', 'District of Columbia', 'DC'], ['florida', 'Florida', 'FL'],
  ['georgia', 'Georgia', 'GA'], ['hawaii', 'Hawaii', 'HI'], ['idaho', 'Idaho', 'ID'], ['illinois', 'Illinois', 'IL'],
  ['indiana', 'Indiana', 'IN'], ['iowa', 'Iowa', 'IA'], ['kansas', 'Kansas', 'KS'], ['kentucky', 'Kentucky', 'KY'],
  ['louisiana', 'Louisiana', 'LA'], ['maine', 'Maine', 'ME'], ['maryland', 'Maryland', 'MD'],
  ['massachusetts', 'Massachusetts', 'MA'], ['michigan', 'Michigan', 'MI'], ['minnesota', 'Minnesota', 'MN'],
  ['mississippi', 'Mississippi', 'MS'], ['missouri', 'Missouri', 'MO'], ['montana', 'Montana', 'MT'],
  ['nebraska', 'Nebraska', 'NE'], ['nevada', 'Nevada', 'NV'], ['new-hampshire', 'New Hampshire', 'NH'],
  ['new-jersey', 'New Jersey', 'NJ'], ['new-mexico', 'New Mexico', 'NM'], ['new-york', 'New York', 'NY'],
  ['north-carolina', 'North Carolina', 'NC'], ['north-dakota', 'North Dakota', 'ND'], ['ohio', 'Ohio', 'OH'],
  ['oklahoma', 'Oklahoma', 'OK'], ['oregon', 'Oregon', 'OR'], ['pennsylvania', 'Pennsylvania', 'PA'],
  ['rhode-island', 'Rhode Island', 'RI'], ['south-carolina', 'South Carolina', 'SC'], ['south-dakota', 'South Dakota', 'SD'],
  ['tennessee', 'Tennessee', 'TN'], ['texas', 'Texas', 'TX'], ['utah', 'Utah', 'UT'], ['vermont', 'Vermont', 'VT'],
  ['virginia', 'Virginia', 'VA'], ['washington', 'Washington', 'WA'], ['west-virginia', 'West Virginia', 'WV'],
  ['wisconsin', 'Wisconsin', 'WI'], ['wyoming', 'Wyoming', 'WY'],
]

export const STATES = RAW.map(([slug, name, abbr]) => ({ slug, name, abbr }))
export const stateBySlug = Object.fromEntries(STATES.map((s) => [s.slug, s]))
