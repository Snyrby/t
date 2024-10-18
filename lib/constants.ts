export const FinanceBarLinks = [
  { href: "/", key: "Target Circle", text: "Target Circle" },
  { href: "/", key: "Target Circle Card", text: "Target Circle Card" },
  { href: "/", key: "Target Circle 360", text: "Target Circle 360" },
  { href: "/", key: "Registry", text: "Registry" },
  { href: "/", key: "Weekly Ad", text: "Weekly Ad" },
  { href: "/", key: "Find Stores", text: "Find Stores" },
];

export const NavBarLinks = [
  {
    key: "Categories",
    text: "Categories",
    children: [
      { href: "/", text: "Back to School" },
      { href: "/", text: "College" },
      {
        href: "/",
        text: "Grocery",
        index: 5,
        imageURL: "/target_grocery.avif",
      },
      {
        href: "/",
        text: "Clothing, Shoes & Accessories",
        index: 3,
        imageURL: "/target_clothes.avif",
      },
      { href: "/", text: "Home", index: 1, imageURL: "/target_home.jpeg" },
      { href: "/", text: "Outdoor Living & Garden" },
      {
        href: "/",
        text: "Furniture",
        index: 6,
        imageURL: "/target_furniture.avif",
      },
      { href: "/", text: "Kitchen & Dining" },
      {
        href: "/",
        text: "Electronics",
        index: 8,
        imageURL: "/target_electronics.avif",
      },
      { href: "/", text: "Video Games" },
      { href: "/", text: "Toys", index: 2, imageURL: "/target_toys.avif" },
      { href: "/", text: "Sports & Outdoors" },
      { href: "/", text: "Movies, Music & Books" },
      { href: "/", text: "Baby", index: 7, imageURL: "/target_baby.avif" },
      { href: "/", text: "Household Essentials" },
      { href: "/", text: "Beauty", index: 4, imageURL: "/target_beauty.avif" },
      { href: "/", text: "Ulta Beauty at Target" },
      { href: "/", text: "Personal Care" },
      { href: "/", text: "Health" },
      { href: "/", text: "Pets" },
      { href: "/", text: "School & Office Supplies" },
      { href: "/", text: "Arts, Crafts & Sewing" },
      { href: "/", text: "Party Supplies" },
      { href: "/", text: "Luggage" },
      { href: "/", text: "Halloween" },
      { href: "/", text: "Gift Ideas" },
      { href: "/", text: "Gift Cards" },
      { href: "/", text: "Character Shop" },
      { href: "/", text: "Bullseye's Playground" },
      { href: "/", text: "Clearance" },
    ],
  },
  {
    key: "Deals",
    text: "Deals",
    children: [
      { href: "/", text: "Top Deals", imageURL: "/target_top_deals.svg" },
      {
        href: "/",
        text: "Target Circle Deals",
        imageURL: "/target_circle_deals.svg",
      },
      { href: "/", text: "Weekly Ad", imageURL: "/target_weekly_ad.svg" },
      { href: "/", text: "Clearance", imageURL: "/target_clearance.svg" },
    ],
  },
  {
    key: "New & featured",
    text: "New & featured",
    children: [
      {
        href: "/",
        text: "Target New Arrivals",
        imageURL: "/target_new_arrivals.avif",
      },
      { href: "/", text: "Target Finds", imageURL: "/target_finds.avif" },
      { href: "/", text: "#TargetStyle", imageURL: "/target_style.avif" },
      {
        href: "/",
        text: "Black Beyond Measure",
        imageURL: "/target_black_beyond_measure.jpg",
      },
      { href: "/", text: "Más Que", imageURL: "/target_mas_que.jpg" },
      {
        href: "/",
        text: "Women-Owned Brands at Target",
        imageURL: "/target_women_owned.avif",
      },
      {
        href: "/",
        text: "Asian-Owned Brands at Target",
        imageURL: "/target_asian_owned.avif",
      },
      { href: "/", text: "LGBTQIA+ Shop", imageURL: "/target_lgbtqia+.avif" },
    ],
  },
  {
    key: "Pickup & delivery",
    text: "Pickup & delivery",
    children: [
      {
        href: "/",
        text: "Shop Order Pickup",
        title: "Pickup",
        mobileText: "Order ahead & pickup in-store",
        imageURL: "/target_pickup.svg",
      },
      {
        href: "/",
        text: "Shop Same Day Delivery",
        title: "Delivery",
        mobileText: "Brought to your door by Shipt",
        imageURL: "/target_delivery.svg",
      },
    ],
  },
];

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const mobileNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
export const nameMinLength = 2;
export const nameMaxLength = 40;
export const mobileNumberLength = 14;
export const passwordMinLength = 8;
export const passwordMaxLength = 20;
export const lowercaseRegex = /[a-z]/;
export const uppercaseRegex = /[A-Z]/;
export const numberRegex = /[0-9]/;
export const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?]+/;

export const authFooterLinks = [
  { href: "/", text: "Terms" },
  { href: "/", text: "CA Supply Chain" },
  { href: "/", text: "Privacy" },
  { href: "/", text: "CA Privacy Rights" },
  { href: "/", text: "Survey" },
  { href: "/", text: "Your Privacy Choices" },
  { href: "/", text: "Interest Based Ads" },
  { href: "/", text: "Health Privacy Policy" },
  { href: "/", text: "TM & © 2024 Target Brands, Inc." },
];
