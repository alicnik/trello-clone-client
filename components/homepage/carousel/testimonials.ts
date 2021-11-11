export interface Testimonial {
  text: string;
  attribution: string;
  industry: string;
  logoSrc: string;
  altText: string;
}

export const testimonials: Testimonial[] = [
  {
    text: 'Everyone loves it; it has democratized our finance function. In some ways Trello shattered hierarchy and brought us together.',
    attribution: 'Bharath Sundar - Finance, eBay',
    industry: 'eCommerce',
    logoSrc: '/images/logos/ebay.svg',
    altText: 'eBay logo',
  },
  {
    text: 'Very simple to use, great automation and keeps me on track with all I need to do. I also like that it can be shared with others.',
    attribution: 'Kerry Parker-Evans - IT Project Manager, Egencia',
    industry: 'Travel',
    logoSrc: '/images/logos/egencia.svg',
    altText: 'Egencia logo',
  },
  {
    text: 'Trello makes it easy to keep everyone on the same page. As changes happen, the real-time updates with email notifications have been key.',
    attribution: 'Hayden Dotson - Sales Manager, Detroit Red Wings',
    industry: 'Sport',
    logoSrc: '/images/logos/red-wings.svg',
    altText: 'Detroit Red Wings logo',
  },
  {
    text: "Now that we've switched to a remote environment, with the use of Trello, we can now limit the number of meetings we have regarding specific projects and turn to Trello for updates instead.",
    attribution: 'Hayley Ennes - HR Manager, Sprout Social',
    industry: 'Marketing',
    logoSrc: '/images/logos/sprout-social.svg',
    altText: 'Sprout Social logo',
  },
];
