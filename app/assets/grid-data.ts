export interface MicrogridInfo {
  microgridName: string
  description: string
  type: string
  operator: string
  state: string
  LGA: string
  geopoliticalZone: string
  capacity: string
  size: string
  powerSources: string
  commissioningDates: string
  position: { lat: string; lng: string }
  source: string
}

export type MicrogridData = {
  category:
    | 'Existing Microgrids'
    | 'Developing Microgrids'
    | 'Potential Microgrids'
    | 'Failed Microgrids'
  data: MicrogridInfo[]
}[]

export interface MicrogridServiceProvidersInfo {
  name: string
  description: string
  location: string
}

export type MicrogridServiceProviders = {
  category: 'Microgrid Developers' | 'Solar Suppliers & Distributors'
  data: MicrogridServiceProvidersInfo[]
}[]

export const microgridData: MicrogridData = [
  {
    category: 'Existing Microgrids',
    data: [
      {
        microgridName: 'Ikot Solar Mini-grid',
        description: '10kW solar PV system powering a rural community',
        type: 'Solar PV',
        operator: 'Green Energy Ltd',
        state: 'Akwa Ibom',
        LGA: 'Ikot Ekpene',
        geopoliticalZone: 'South South',
        capacity: '10kW',
        size: '1 hectare',
        powerSources: 'Solar',
        commissioningDates: '2022-06-15',
        position: { lat: '5.1811', lng: '7.7142' },
        source: 'REAN Database',
      },
      {
        microgridName: 'Kaduna Hybrid Plant',
        description: 'Hybrid microgrid serving small industries',
        type: 'Hybrid (Solar/Diesel)',
        operator: 'EnergyMix Solutions',
        state: 'Kaduna',
        LGA: 'Chikun',
        geopoliticalZone: 'North West',
        capacity: '50kW',
        size: '2 hectares',
        powerSources: 'Solar, Diesel',
        commissioningDates: '2021-03-10',
        position: { lat: '10.5267', lng: '7.4381' },
        source: 'World Bank Report',
      },
      {
        microgridName: 'Badagry Solar Project',
        description: 'Community solar power for homes and SMEs',
        type: 'Solar PV',
        operator: 'NigerSun Power Co.',
        state: 'Lagos',
        LGA: 'Badagry',
        geopoliticalZone: 'South West',
        capacity: '25kW',
        size: '0.8 hectare',
        powerSources: 'Solar',
        commissioningDates: '2023-11-01',
        position: { lat: '6.4158', lng: '2.8860' },
        source: 'NERC Registry',
      },
    ],
  },

  {
    category: 'Developing Microgrids',
    data: [
      {
        microgridName: 'Ogbomosho Wind-Solar Mix',
        description: 'Pilot hybrid system for testing rural electrification',
        type: 'Hybrid (Wind/Solar)',
        operator: 'InnovateGrid Tech',
        state: 'Oyo',
        LGA: 'Ogbomosho North',
        geopoliticalZone: 'South West',
        capacity: '40kW',
        size: '1.5 hectares',
        powerSources: 'Wind, Solar',
        commissioningDates: '2025-02-10 (Expected)',
        position: { lat: '8.1302', lng: '4.2459' },
        source: 'Company Brochure',
      },
      {
        microgridName: 'Nsukka Battery-Backed Grid',
        description: 'Solar PV grid with lithium storage for school and clinic',
        type: 'Solar + Battery Storage',
        operator: 'VoltAfrica Limited',
        state: 'Enugu',
        LGA: 'Nsukka',
        geopoliticalZone: 'South East',
        capacity: '15kW',
        size: '0.5 hectare',
        powerSources: 'Solar, Battery',
        commissioningDates: '2025-06-20 (Expected)',
        position: { lat: '6.8644', lng: '7.3958' },
        source: 'Feasibility Study',
      },
      {
        microgridName: 'Makurdi Agri-Power Grid',
        description: 'Powering irrigation systems with solar energy',
        type: 'Solar PV (Agricultural Use)',
        operator: 'FarmPower Nigeria',
        state: 'Benue',
        LGA: 'Makurdi',
        geopoliticalZone: 'North Central',
        capacity: '20kW',
        size: '3 hectares',
        powerSources: 'Solar',
        commissioningDates: '2025-08-01 (Expected)',
        position: { lat: '7.7275', lng: '8.5368' },
        source: 'USAID Pilot Reports',
      },
    ],
  },

  {
    category: 'Potential Microgrids',
    data: [
      {
        microgridName: 'Brass Island Renewable Plan',
        description: 'Feasibility stage for solar and tidal energy microgrid',
        type: 'Hybrid (Solar/Tidal)',
        operator: 'Clean Coast Energy',
        state: 'Bayelsa',
        LGA: 'Brass',
        geopoliticalZone: 'South South',
        capacity: '100kW (Planned)',
        size: '4 hectares',
        powerSources: 'Solar, Tidal',
        commissioningDates: '2026-12-01 (Planned)',
        position: { lat: '4.3132', lng: '6.2334' },
        source: 'FGN RE Roadmap',
      },
      {
        microgridName: 'Sokoto Desert Power',
        description: 'Desert-based solar farm feasibility ongoing',
        type: 'Solar PV',
        operator: 'DesertTech Nigeria',
        state: 'Sokoto',
        LGA: 'Wamakko',
        geopoliticalZone: 'North West',
        capacity: '500kW (Projected)',
        size: '10 hectares',
        powerSources: 'Solar',
        commissioningDates: '2027-05-01 (Target)',
        position: { lat: '13.0595', lng: '5.2247' },
        source: 'REAN Prospects Report',
      },
      {
        microgridName: 'Bauchi Community Energy',
        description: 'Local cooperative aims to build own solar system',
        type: 'Community Solar',
        operator: 'Bauchi Co-op Power Group',
        state: 'Bauchi',
        LGA: 'Bauchi',
        geopoliticalZone: 'North East',
        capacity: '12kW',
        size: '0.6 hectare',
        powerSources: 'Solar',
        commissioningDates: '2026-03-15 (Anticipated)',
        position: { lat: '10.3158', lng: '9.8442' },
        source: 'Community Petition',
      },
    ],
  },

  {
    category: 'Failed Microgrids',
    data: [
      {
        microgridName: 'Kano Diesel Hub',
        description: 'High fuel costs and maintenance failure led to shutdown',
        type: 'Diesel',
        operator: 'Private Individual',
        state: 'Kano',
        LGA: 'Kumbotso',
        geopoliticalZone: 'North West',
        capacity: '30kW',
        size: '1 hectare',
        powerSources: 'Diesel',
        commissioningDates: '2019-01-01',
        position: { lat: '11.8771', lng: '8.4729' },
        source: 'NERC Archive',
      },
      {
        microgridName: 'Ijebu Off-grid Trial',
        description: 'Abandoned due to theft and vandalism',
        type: 'Solar PV',
        operator: 'Energy NGO',
        state: 'Ogun',
        LGA: 'Ijebu North',
        geopoliticalZone: 'South West',
        capacity: '5kW',
        size: '0.3 hectare',
        powerSources: 'Solar',
        commissioningDates: '2020-04-22',
        position: { lat: '6.9273', lng: '3.9996' },
        source: 'Local Govt Report',
      },
      {
        microgridName: 'Ebonyi Small Grid',
        description: 'Technological fault with inverter system',
        type: 'Solar PV',
        operator: 'Startup',
        state: 'Ebonyi',
        LGA: 'Abakaliki',
        geopoliticalZone: 'South East',
        capacity: '8kW',
        size: '0.4 hectare',
        powerSources: 'Solar',
        commissioningDates: '2021-09-10',
        position: { lat: '6.3249', lng: '8.1137' },
        source: 'Audit Findings',
      },
    ],
  },
]

export const microgridServiceProviders: MicrogridServiceProviders = [
  {
    category: 'Microgrid Developers',
    data: [
      {
        name: 'EcoGrid Innovations',
        description:
          'Leading Nigerian microgrid developer with 15+ deployments across 6 states.',
        location: 'Abuja, FCT',
      },
      {
        name: 'NextVolt Energy',
        description: 'Specializes in rural hybrid and solar PV microgrids.',
        location: 'Port Harcourt, Rivers',
      },
      {
        name: 'BrightSun Developments',
        description:
          'Focused on solar-powered education and healthcare infrastructure.',
        location: 'Ibadan, Oyo',
      },
    ],
  },

  {
    category: 'Solar Suppliers & Distributors',
    data: [
      {
        name: 'SolarNation Distributors',
        description:
          'Distributor of tier-1 solar panels, batteries, and inverters across West Africa.',
        location: 'Lagos Island, Lagos',
      },
      {
        name: 'GreenConnect Tech',
        description:
          'Provides solar kits and installation services for rural electrification.',
        location: 'Jos, Plateau',
      },
      {
        name: 'VoltX Solar Supplies',
        description: 'Importer and wholesaler of solar technology components.',
        location: 'Kano City, Kano',
      },
    ],
  },
]
