// Imagery for Seoul Craft Moment.
//
// Two sources, both free to use with no API key and no request cost —
// these are plain static image URLs, not API calls:
//   • Unsplash  (no attribution required)
//   • Wikimedia Commons  (authentic Korean-craft photos; license noted per item)
//
// Wikimedia photos carry the real objects (najeon lacquer, hanji, onggi,
// celadon, norigae, bojagi) that Unsplash does not have. Items marked
// CC BY / CC BY-SA need a small visible credit — see CREDITS at the bottom.

// Unsplash helper: builds a sized, cropped JPEG URL from a photo id.
const p = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

// Wikimedia Commons thumbnail (already verified to return 200).
const wm = (path) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}`

export const IMG = {
  // Hero — pottery workshop (Unsplash)
  heroMain: p('1620140036708-455ed5c0426a', 1200), // hands carving clay
  heroSide: p('1590605095243-072811dbe64c', 800), // throwing on the wheel

  // Category thumbnails — real Korean crafts, market/shop feel
  catHanji: wm('1/18/Korean_paper-Hanji-04.jpg/960px-Korean_paper-Hanji-04.jpg'), // hanji craft shop (PD)
  catCeramic: wm('b/bf/Korean_onggi_pots.jpg/960px-Korean_onggi_pots.jpg'), // onggi jar yard (CC BY-SA 4.0)
  catPearl: wm('1/12/Lacquered_Box_Inlaid_with_Mother-of-Pearl._Horim_Museum_Sillim.jpg/960px-Lacquered_Box_Inlaid_with_Mother-of-Pearl._Horim_Museum_Sillim.jpg'), // najeon box (CC BY-SA 4.0)
  catKnot: wm('2/24/Samjak_Norigae.jpg/960px-Samjak_Norigae.jpg'), // samjak norigae knotwork (CC BY-SA 3.0)
  catTea: p('1531969179221-3946e6b5a5e7', 600), // tea ceremony pour (Unsplash)
  catScent: wm('6/63/Goryeo_celadon_12C_Korean_incense_burner_with_a_duck_lid_and_lotus.jpg/960px-Goryeo_celadon_12C_Korean_incense_burner_with_a_duck_lid_and_lotus.jpg'), // celadon incense burner (CC BY-SA 4.0)

  // Program cards — craft close-ups
  progHanji: wm('9/90/Korean_paper-Hanji-02.jpg/960px-Korean_paper-Hanji-02.jpg'), // hanji relief artwork (PD)
  progCeramic: p('1594138352322-731eff042041', 800), // white porcelain tea set (Unsplash)
  progPearl: wm('5/5f/Korean_writing_table%2C_18th_century%2C_lacquer_and_mother_of_pearl%2C_HAA.JPG/960px-Korean_writing_table%2C_18th_century%2C_lacquer_and_mother_of_pearl%2C_HAA.JPG'), // najeon writing table (CC0)
  progKnot: p('1598616068517-c75ad397a436', 800), // traditional loom weaving (Unsplash)

  // Shop / object cards — finished pieces
  objHanji: wm('d/d2/Cheongsachorong_2.jpg/960px-Cheongsachorong_2.jpg'), // cheongsachorong lantern (CC BY-SA 2.0 KR)
  objCeramic: wm('1/15/White_Porcelain_Bowl_with_crane_design._Joseon_19th_c._Horim_Museum.jpg/960px-White_Porcelain_Bowl_with_crane_design._Joseon_19th_c._Horim_Museum.jpg'), // baekja crane bowl (CC BY-SA 4.0)
  objPearl: wm('c/c6/Lacquered_Document_Box_Inlaid_with_Mother-of-Pearl._18th_c.National_Museum_of_Korea.jpg/960px-Lacquered_Document_Box_Inlaid_with_Mother-of-Pearl._18th_c.National_Museum_of_Korea.jpg'), // najeon document box (CC BY-SA 4.0)
  objTextile: wm('d/d1/Patchwork_Bojagi_%28Wrapping_Cloth%29_MET_DP158238.jpg/960px-Patchwork_Bojagi_%28Wrapping_Cloth%29_MET_DP158238.jpg'), // patchwork bojagi (CC0)
}

// CREDITS (Wikimedia Commons) — show these somewhere public (e.g. footer):
//   Hanji shop / Hanji relief — public domain
//   Onggi pots — Steve46814, CC BY-SA 4.0
//   Najeon box (Horim) / Najeon document box (Nat'l Museum) / Baekja crane bowl — CC BY-SA 4.0
//   Samjak norigae — CC BY-SA 3.0
//   Celadon incense burner — CC BY-SA 4.0
//   Cheongsachorong lantern — CC BY-SA 2.0 KR
//   Najeon writing table / Patchwork bojagi (MET) — CC0 (no credit required)
