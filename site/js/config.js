/* ==========================================================================
   Dhanalaxmi Bridal Studio — central business configuration
   Edit the values below. Nothing else needs to change for routine updates.
   ========================================================================== */
window.SITE_CONFIG = {
  businessName: "Dhanalaxmi Bridal Studio",

  // WhatsApp: international format, digits only (no +, spaces or dashes).
  whatsappNumber: "919791230730",
  whatsappDisplay: "97912 30730",

  // Opening hours — PROVISIONAL demo value. Change here (EN + TA) before launch.
  // The visible text lives in js/i18n.js under the keys hours.val
  // (search for "hours.val").

  addressLine: "Sankarankovil, Tamil Nadu, India",       // add the exact street address once confirmed
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dhanalaxmi%20Bridal%20Studio%20Sankarankovil",

  // Social links
  facebook: "https://www.facebook.com",
  instagram: {
    main:      "https://www.instagram.com/sankarankovilmakeupartistdhana/",
    mehendi:   "https://www.instagram.com/sankarankovil_mehendi_by_dhana/",
    nails:     "https://www.instagram.com/dhanalaxmi_nail_artistry/",
    jewellery: "https://www.instagram.com/sankarankovil_rental_jewellery/",
    bangles:   "https://www.instagram.com/sparklenest_by_dhanalaxmi/"
  },

  // Instagram Reels
  reels: [
    {
      id: "reel-1",
      url: "https://www.instagram.com/reel/DUqEUdmk2kF/?mdxt=MWdpOHk1MGJpYWoyZw==",
      thumbnail: "assets/images/bridal-01-lg.webp",
      tag: "Bridal Elegance ✨",
      handle: "@sankarankovilmakeupartistdhana"
    },
    {
      id: "reel-2",
      url: "https://www.instagram.com/reel/DUVetaAkx8j/?rpxt=bGU3NzA3OGd3Y3Q3",
      thumbnail: "assets/images/bridal-closeup-01-lg.webp",
      tag: "Reception Glam 💫",
      handle: "@sankarankovilmakeupartistdhana"
    },
    {
      id: "reel-3",
      url: "https://www.instagram.com/reel/DS0MIXgjVUh/?psln=MTZid3poN25kaXFjNw==",
      thumbnail: "assets/images/mehendi-hands-lg.webp",
      tag: "Mehendi Artistry 🌿",
      handle: "@sankarankovil_mehendi_by_dhana"
    },
    {
      id: "reel-4",
      url: "https://www.instagram.com/reel/DSnDRrAE9c0/?exln=MWpmMXhsMmhldnZydg==",
      thumbnail: "assets/images/bridal-full-02-lg.webp",
      tag: "Muhurtham Look 💛",
      handle: "@sankarankovilmakeupartistdhana"
    },
    {
      id: "reel-5",
      url: "https://www.instagram.com/sankarankovilmakeupartistdhana/p/DezFeB1TX7N/",
      thumbnail: "assets/images/hair-braid-lg.webp",
      tag: "Hair & Flower Art 🌸",
      handle: "@sankarankovilmakeupartistdhana"
    }
  ],

  // Services shown in the enquiry form drop-down (names come from i18n: svc.<id>.name)
  serviceIds: ["bridal", "occasion", "hair", "saree", "nails", "mehendi", "jewellery", "bangles"]
};
