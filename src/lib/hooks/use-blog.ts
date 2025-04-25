import { useMemo } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  views: number;
  image: string;
  category: string;
}

// Blog posts data with full content
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI in Consumer Electronics',
    excerpt: 'Exploring how artificial intelligence is revolutionizing our everyday devices and what to expect in the coming years.',
    content: `
      <p>Artificial Intelligence is rapidly transforming the consumer electronics landscape, ushering in a new era of smart, adaptive devices that learn from and respond to user behavior. This evolution represents a significant shift in how we interact with our everyday devices.</p>

      <h2>The Current State of AI in Electronics</h2>
      <p>Today's consumer electronics are increasingly equipped with AI capabilities that enable features like:</p>
      <ul>
        <li>Predictive maintenance and performance optimization</li>
        <li>Personalized user experiences and recommendations</li>
        <li>Advanced voice and gesture recognition</li>
        <li>Automated energy management</li>
      </ul>

      <h2>Future Implications</h2>
      <p>The integration of AI in consumer electronics is expected to accelerate, leading to:</p>
      <ul>
        <li>More intuitive and responsive devices</li>
        <li>Enhanced privacy and security features</li>
        <li>Improved energy efficiency</li>
        <li>Seamless integration between different devices and platforms</li>
      </ul>

      <h2>Challenges and Considerations</h2>
      <p>As AI becomes more prevalent in consumer electronics, several important considerations emerge:</p>
      <ul>
        <li>Privacy and data security</li>
        <li>Ethical AI development and implementation</li>
        <li>Environmental impact and sustainability</li>
        <li>Accessibility and user education</li>
      </ul>
    `,
    author: 'Cameron',
    date: '2024-02-01',
    views: 738,
    image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070',
    category: 'Electronics Devices',
  },
  {
    id: 2,
    title: 'Best Gaming Laptops of 2024',
    excerpt: 'A comprehensive guide to the most powerful and value-for-money gaming laptops available in the market.',
    content: `
      <p>Gaming laptops have evolved significantly in recent years, offering desktop-level performance in increasingly portable form factors. This guide explores the top gaming laptops of 2024, considering factors like performance, build quality, and value for money.</p>

      <h2>Top Premium Gaming Laptops</h2>
      <p>For those seeking the ultimate gaming experience:</p>
      <ul>
        <li>Latest generation processors and GPUs</li>
        <li>High refresh rate displays</li>
        <li>Advanced cooling systems</li>
        <li>Premium build quality</li>
      </ul>

      <h2>Mid-Range Options</h2>
      <p>Excellent performance without breaking the bank:</p>
      <ul>
        <li>Great value for money</li>
        <li>Balanced specifications</li>
        <li>Good build quality</li>
        <li>Decent battery life</li>
      </ul>

      <h2>Budget Gaming Laptops</h2>
      <p>Affordable options for casual gamers:</p>
      <ul>
        <li>Entry-level dedicated GPUs</li>
        <li>Sufficient performance for most games</li>
        <li>Basic but functional features</li>
        <li>Good upgrade potential</li>
      </ul>
    `,
    author: 'Floyd Miles',
    date: '2024-01-28',
    views: 826,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070',
    category: 'Computer & Laptop',
  },
  {
    id: 3,
    title: 'Top 5 Wireless Headphones for Audiophiles',
    excerpt: 'Discover the perfect blend of sound quality, comfort, and convenience in these premium wireless headphones.',
    content: `
      <p>For audiophiles seeking the perfect wireless headphones, the balance between sound quality, comfort, and convenience is crucial. Here's our comprehensive review of the top 5 wireless headphones that deliver exceptional audio performance.</p>

      <h2>What Makes a Great Wireless Headphone?</h2>
      <ul>
        <li>Superior sound quality with balanced frequency response</li>
        <li>Comfortable fit for extended listening sessions</li>
        <li>Long battery life and quick charging capabilities</li>
        <li>Effective noise cancellation technology</li>
      </ul>

      <h2>Our Top Picks</h2>
      <p>After extensive testing, these headphones stood out for their exceptional performance:</p>
      <ul>
        <li>Best Overall: Sony WH-1000XM5</li>
        <li>Best for Apple Users: AirPods Max</li>
        <li>Best Value: Sennheiser Momentum 4</li>
        <li>Best for Gaming: SteelSeries Arctis Nova Pro</li>
        <li>Best Budget Option: Audio-Technica ATH-M50xBT2</li>
      </ul>
    `,
    author: 'Sarah Chen',
    date: '2024-01-25',
    views: 654,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070',
    category: 'Headphone',
  },
  {
    id: 4,
    title: 'Ultimate Guide to Mobile Photography',
    excerpt: 'Transform your smartphone photography with these professional tips and essential accessories.',
    content: `
      <p>Mobile photography has evolved tremendously, with smartphones now capable of producing professional-quality images. This guide will help you master mobile photography and make the most of your smartphone's camera.</p>

      <h2>Essential Photography Tips</h2>
      <ul>
        <li>Understanding your phone's camera capabilities</li>
        <li>Composition techniques for mobile photography</li>
        <li>Lighting tips for better photos</li>
        <li>Advanced camera settings explained</li>
      </ul>

      <h2>Must-Have Accessories</h2>
      <p>Enhance your mobile photography with these essential tools:</p>
      <ul>
        <li>External lenses for different perspectives</li>
        <li>Portable lighting solutions</li>
        <li>Stabilization tools and gimbals</li>
        <li>Professional editing apps</li>
      </ul>
    `,
    author: 'Marcus Kim',
    date: '2024-01-22',
    views: 592,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2073',
    category: 'Mobile Accessories',
  },
  {
    id: 5,
    title: 'Next-Gen Gaming Consoles Comparison',
    excerpt: 'An in-depth analysis of the latest gaming consoles and which one is right for you.',
    content: `
      <p>The latest generation of gaming consoles offers unprecedented power and features. This comparison will help you choose the perfect gaming console for your needs.</p>

      <h2>PlayStation 5</h2>
      <ul>
        <li>Revolutionary DualSense controller</li>
        <li>Impressive exclusive game lineup</li>
        <li>Advanced SSD technology</li>
        <li>Ray tracing capabilities</li>
      </ul>

      <h2>Xbox Series X</h2>
      <ul>
        <li>Superior raw performance</li>
        <li>Game Pass subscription value</li>
        <li>Backward compatibility</li>
        <li>Quick Resume feature</li>
      </ul>
    `,
    author: 'Alex Rivera',
    date: '2024-01-19',
    views: 945,
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072',
    category: 'Gaming Console',
  },
  {
    id: 6,
    title: 'Essential PC Building Guide 2024',
    excerpt: 'Step-by-step instructions for building your dream gaming PC with the latest components.',
    content: `
      <p>Building your own PC is a rewarding experience that can save money and provide exactly the performance you need. Follow this guide to create your perfect custom PC.</p>

      <h2>Component Selection</h2>
      <ul>
        <li>Choosing the right processor</li>
        <li>Graphics card considerations</li>
        <li>Memory and storage options</li>
        <li>Power supply calculations</li>
      </ul>

      <h2>Assembly Tips</h2>
      <p>Key steps for a successful build:</p>
      <ul>
        <li>Proper component installation</li>
        <li>Cable management techniques</li>
        <li>BIOS configuration</li>
        <li>System testing</li>
      </ul>
    `,
    author: 'David Park',
    date: '2024-01-15',
    views: 783,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=2070',
    category: 'Computer Accessories',
  },
  {
    id: 7,
    title: 'Smart Home Automation Essentials',
    excerpt: 'Everything you need to know about setting up a modern, connected smart home.',
    content: `
      <p>Create a truly automated home with the latest smart devices and systems. This guide covers everything from basic setup to advanced automation scenarios.</p>

      <h2>Getting Started</h2>
      <ul>
        <li>Choosing a smart home ecosystem</li>
        <li>Essential smart devices</li>
        <li>Network requirements</li>
        <li>Security considerations</li>
      </ul>

      <h2>Advanced Automation</h2>
      <p>Take your smart home to the next level:</p>
      <ul>
        <li>Creating custom routines</li>
        <li>Voice control integration</li>
        <li>Energy management</li>
        <li>Remote monitoring</li>
      </ul>
    `,
    author: 'Emma Watson',
    date: '2024-01-12',
    views: 671,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070',
    category: 'Electronics Devices',
  },
  {
    id: 8,
    title: 'Professional Photography Equipment Guide',
    excerpt: 'Expert recommendations for cameras, lenses, and accessories for professional photography.',
    content: `
      <p>Whether you're starting your photography journey or upgrading your gear, this guide will help you make informed decisions about professional photography equipment.</p>

      <h2>Camera Bodies</h2>
      <ul>
        <li>Full-frame vs crop sensor</li>
        <li>Mirrorless vs DSLR</li>
        <li>Resolution considerations</li>
        <li>Video capabilities</li>
      </ul>

      <h2>Essential Lenses</h2>
      <p>Must-have lenses for different types of photography:</p>
      <ul>
        <li>Portrait lenses</li>
        <li>Landscape lenses</li>
        <li>Macro photography</li>
        <li>Action and sports</li>
      </ul>
    `,
    author: 'Michael Chen',
    date: '2024-01-09',
    views: 834,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2073',
    category: 'Camera & Photo',
  },
  {
    id: 9,
    title: 'Best Budget Smartphones of 2024',
    excerpt: 'Affordable smartphones that offer premium features without breaking the bank.',
    content: `
      <p>You don't need to spend a fortune to get a great smartphone. Here are our top picks for budget-friendly phones that deliver excellent value.</p>

      <h2>What to Look For</h2>
      <ul>
        <li>Performance benchmarks</li>
        <li>Camera quality</li>
        <li>Battery life</li>
        <li>Build quality</li>
      </ul>

      <h2>Top Recommendations</h2>
      <p>Our favorite budget smartphones:</p>
      <ul>
        <li>Best Overall Value</li>
        <li>Best Camera Under $300</li>
        <li>Best Battery Life</li>
        <li>Best Gaming Performance</li>
      </ul>
    `,
    author: 'Lisa Johnson',
    date: '2024-01-06',
    views: 921,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080',
    category: 'SmartPhone',
  },
  {
    id: 10,
    title: 'Ultimate Guide to PC Peripherals',
    excerpt: 'Choosing the right keyboard, mouse, monitor, and other accessories for your setup.',
    content: `
      <p>The right peripherals can dramatically improve your computing experience. This guide helps you choose the perfect accessories for your needs.</p>

      <h2>Monitors</h2>
      <ul>
        <li>Resolution and refresh rate</li>
        <li>Panel types explained</li>
        <li>Color accuracy</li>
        <li>Multi-monitor setups</li>
      </ul>

      <h2>Input Devices</h2>
      <p>Choosing the right keyboard and mouse:</p>
      <ul>
        <li>Mechanical vs membrane keyboards</li>
        <li>Gaming mice features</li>
        <li>Ergonomic considerations</li>
        <li>Wireless vs wired</li>
      </ul>
    `,
    author: 'Chris Thompson',
    date: '2024-01-03',
    views: 567,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=2028',
    category: 'Computer Accessories',
  },
];

export function useBlog() {
  const getBlogPost = (id: number) => {
    return blogPosts.find(post => post.id === id);
  };

  const getAllBlogPosts = () => {
    return blogPosts;
  };

  return {
    getBlogPost,
    getAllBlogPosts,
  };
}