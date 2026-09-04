const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const { Client } = require('pg')

const envPath = path.join(__dirname, '..', '.env')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')

  const client = new Client({ connectionString: url })
  await client.connect()
  const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8')
  await client.query(schema)

  const email = (process.env.ADMIN_EMAIL || 'admin@astranova.co.tz').toLowerCase()
  const name = process.env.ADMIN_NAME || 'Astra Admin'
  const password = process.env.ADMIN_PASSWORD
  if (!password) throw new Error('ADMIN_PASSWORD is not set')

  const hash = await bcrypt.hash(password, 12)
  await client.query(
    `insert into admin_users (email, name, password_hash, role)
     values ($1, $2, $3, 'Administrator')
     on conflict (email) do update set
       name = excluded.name,
       password_hash = excluded.password_hash,
       role = excluded.role`,
    [email, name, hash],
  )

  console.log(`Schema applied. Admin user ready: ${email}`)

  await client.query(
    `insert into company_settings (
       id, phone_display, phone_tel, email_info, email_operations,
       address_line1, address_line2, hours_weekday, hours_saturday
     ) values (1, $1, $2, $3, $4, $5, $6, $7, $8)
     on conflict (id) do nothing`,
    [
      '+255 765 808 899',
      '+255765808899',
      'info@astranova.co.tz',
      'operations@astranova.co.tz',
      'P.O. Box 8676,',
      'Dar es Salaam, Tanzania',
      'Mon – Fri: 08:00 AM – 05:00 PM (EAT)',
      'Saturday: 09:00 AM – 01:00 PM (EAT)',
    ],
  )

  const services = [
    {
      slug: 'road-freight',
      title: 'Road Freight',
      summary:
        'Reliable road transportation for commercial and industrial cargo across Tanzania and the wider East and Southern African region.',
      body: `We provide reliable road transportation for commercial and industrial cargo across Tanzania and the wider East and Southern African region. Our road freight solutions are structured around the specific requirements of each shipment, including cargo type, destination, timing and route.

From standard commercial loads to heavy and specialized cargo, we focus on safe handling, proper trip planning and dependable delivery. Our objective is straightforward: to get cargo where it needs to be, in good condition and within the agreed timeframe.`,
      image: '/assets/quote_truck.png',
      icon: 'truck',
      order: 1,
    },
    {
      slug: 'cross-border-cargo',
      title: 'Cross-Border Cargo Movement',
      summary:
        'Coordinated cargo movements along regional trade corridors, with documentation and border processes handled as part of the journey.',
      body: `Moving cargo across borders requires more than a truck and a destination. It involves careful coordination, accurate documentation, border procedures and close communication between everyone involved in the shipment.

Astra Nova supports cross-border cargo movements along regional trade corridors, coordinating the different stages of transportation to help minimize unnecessary delays and keep shipments progressing. We work with relevant transport and logistics partners to ensure that cargo moves efficiently from origin to destination.

Our regional focus enables us to support businesses moving goods between Tanzania and markets across East and Southern Africa.`,
      image: '/assets/border_crossing_tanzania.png',
      icon: 'globe',
      order: 2,
    },
    {
      slug: 'logistics-coordination',
      title: 'Logistics Coordination & Planning',
      summary:
        'Routing, scheduling, documentation and communication brought together so shipments stay visible and on track.',
      body: `Effective logistics starts long before a vehicle leaves the yard. We provide logistics coordination and planning services that bring together transportation, routing, scheduling, documentation and communication into one organized process.

We help clients plan the movement of their cargo based on the nature of the shipment, required delivery timelines and route conditions. Where several parties are involved, we coordinate the different activities to ensure that everyone is working toward the same delivery objective.

Our role is to make the logistics process easier for our clients, giving them better visibility and a dependable point of coordination throughout the movement.`,
      image: '/assets/astra_nova_worker.png',
      icon: 'clipboard',
      order: 3,
    },
    {
      slug: 'mining-supply',
      title: 'Mining Supply Solutions',
      summary:
        'Sourcing and supplying mining equipment, gear and materials — and moving them to remote and cross-border sites.',
      body: `We provide supply support to the mining sector, with a focus on sourcing and supplying quality mining-related equipment, gear and operational materials.

Understanding that mining operations depend on the availability of the right equipment and supplies, we work with clients to identify their requirements and source suitable products from reliable suppliers. Our solutions can support mining contractors, operators and other businesses involved in the sector.

Beyond supply, our logistics capabilities allow us to support the movement of mining equipment and materials to their required destinations, including remote and cross-border locations where careful planning is essential.`,
      image: '/assets/mining_truck_excavator.png',
      icon: 'hardhat',
      order: 4,
    },
  ]

  for (const service of services) {
    await client.query(
      `insert into services (slug, title, summary, body, image_url, icon_key, sort_order)
       values ($1, $2, $3, $4, $5, $6, $7)
       on conflict (slug) do nothing`,
      [service.slug, service.title, service.summary, service.body, service.image, service.icon, service.order],
    )
  }

  const { rows: jobCount } = await client.query('select count(*)::int as n from job_openings')
  if (jobCount[0].n === 0) {
    const jobs = [
      [
        'Logistics Coordinator',
        'Operations',
        'Coordinate shipments, documentation and partner communication so cargo stays on schedule across regional corridors.',
      ],
      [
        'Transport Planner',
        'Operations',
        'Plan routes, timing and vehicle allocation for commercial, industrial and cross-border movements.',
      ],
      [
        'Fleet Maintenance Supervisor',
        'Fleet & Maintenance',
        'Oversee vehicle readiness, servicing schedules and workshop coordination so the fleet stays reliable.',
      ],
      [
        'Business Development Executive',
        'Business Development',
        'Build client relationships, understand cargo requirements and grow Astra Nova’s regional logistics work.',
      ],
    ]
    for (const [i, job] of jobs.entries()) {
      await client.query(
        `insert into job_openings (title, department, location, description, sort_order)
         values ($1, $2, 'Dar es Salaam, Tanzania', $3, $4)`,
        [job[0], job[1], job[2], i + 1],
      )
    }
  }

  const socials = [
    ['facebook', 1],
    ['instagram', 2],
    ['linkedin', 3],
    ['x', 4],
    ['tiktok', 5],
  ]
  for (const [network, order] of socials) {
    await client.query(
      `insert into social_links (network, url, sort_order)
       values ($1, '', $2)
       on conflict (network) do nothing`,
      [network, order],
    )
  }

  console.log('Website content seeded (jobs, contact, services, socials).')
  await client.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
