import { IMG } from '../images.js'

// Bookable options shared by the hero booking bar and the
// reservation form, so a hero selection can prefill the form.
export const RESERVATION_OPTIONS = [
  'Hanji Object Making',
  'Ceramic Texture Session',
  'Mother-of-Pearl Detail',
  'Knot & Textile Moment',
  'Private group session',
]

// Fallback data used when Supabase is not configured (or a fetch fails),
// so the landing page always renders. Shape matches the DB `programs` table.
export const DEFAULT_PROGRAMS = [
  {
    title: 'Hanji Object Making',
    material: 'Hanji',
    img: IMG.progHanji,
    desc: 'Create a small object using the texture and softness of Korean paper.',
    duration: '2 hr',
    price: '₩68,000',
    level: 'All levels',
    featured: true,
  },
  {
    title: 'Ceramic Texture Session',
    material: 'Ceramic',
    img: IMG.progCeramic,
    desc: 'Experience the calm form and surface of Korean clay by hand.',
    duration: '2.5 hr',
    price: '₩82,000',
    level: 'All levels',
  },
  {
    title: 'Mother-of-Pearl Detail',
    material: 'Mother-of-Pearl',
    img: IMG.progPearl,
    desc: 'Work with subtle light, pattern, and traditional Korean decorative material.',
    duration: '3 hr',
    price: '₩95,000',
    level: 'Beginner friendly',
  },
  {
    title: 'Knot & Textile Moment',
    material: 'Knot & Textile',
    img: IMG.progKnot,
    desc: 'Make a small ornament using Korean knots and soft textile details.',
    duration: '1.5 hr',
    price: '₩54,000',
    level: 'All levels',
  },
]

// Map a Supabase `programs` row to the shape the card component expects.
export function mapProgramRow(row) {
  return {
    title: row.title,
    material: row.material,
    img: row.image_url,
    desc: row.description,
    duration: row.duration,
    price: row.price,
    level: row.level,
    featured: row.featured,
  }
}
