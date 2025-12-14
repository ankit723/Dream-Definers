import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FaLinkedin, FaYoutube, FaPhone, FaFacebook, FaStar, FaPlus } from "react-icons/fa";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the favicon URL for a given website URL
 * @param url - The website URL (e.g., "https://example.com" or "https://www.example.com/path")
 * @param size - The size of the favicon (default: 64, common sizes: 16, 32, 64, 128)
 * @returns The favicon URL from Google's favicon service
 */
export function getFaviconUrl(url: string, size: number = 64): string {
  try {
    // Extract domain from URL
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    // Use Google's favicon service
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  } catch (error) {
    // If URL parsing fails, return a default favicon or handle error
    console.error('Invalid URL provided to getFaviconUrl:', url, error);
    return `https://www.google.com/s2/favicons?domain=google.com&sz=${size}`;
  }
}

export function heroImages() {
  return [
    {
      "image": "/assets/home/hero/hero-image-1.jpg",
      "alt": "Hero Image 1"
    },
    {
      "image": "/assets/home/hero/hero-image-2.jpg",
      "alt": "Hero Image 2"
    },
    {
      "image": "/assets/home/hero/hero-image-3.jpg",
      "alt": "Hero Image 3"
    },
    {
      "image": "/assets/home/hero/hero-image-4.jpg",
      "alt": "Hero Image 4"
    }
  ]
}


export function social() {
  return [
    {
      "name": "LinkedIn",
      "url": "https://www.linkedin.com/your-page",
      "icon": FaLinkedin,
      "color": "blue"
    },
    {
      "name": "Youtube",
      "url": "https://www.youtube.com/your-page",
      "icon": FaYoutube,
      "color": "red"
    },
    {
      "name": "Call",
      "url": "tel:+918144553579",
      "icon": FaPhone,
      "color": "green"
    },
    {
      "name": "Facebook",
      "url": "https://www.facebook.com/your-page",
      "icon": FaFacebook,
      "color": "blue"
    }
  ]
}

export function keyFeatures(){
  return [
    {
      "title": "4.5",
      "icon": FaStar,
      "subTitle":"Reviews"
    },
    {
      "title": "60",
      "icon": FaPlus,
      "subTitle":"College Clients"
    },
    {
      "title": "1 Lakh",
      "icon": FaPlus,
      "subTitle":"Students Trained"
    },
    {
      "title": "20",
      "icon": FaPlus,
      "subTitle":"Associated Mentors"
    },
  ]
}


export function partners(){
  return [
    {
      "name": "CGU Odisha",
      "image": "/assets/home/partners/cgu-odisha.png",
      "url": "https://cgu-odisha.ac.in/"
    },
    {
      "name": "GEC",
      "image": "/assets/home/partners/gec.png",
      "url": "https://www.gec.edu.in/"
    },
    {
      "name": "Sri Sri University",
      "image": "/assets/home/partners/srisri-university.png",
      "url": "https://srisriuniversity.edu.in/"
    },
    {
      "name": "KIIT",
      "image": "/assets/home/partners/kiit.png",
      "url": "https://kiit.ac.in/"
    },
    {
      "name": "NIT Rourkela",
      "image": "/assets/home/partners/nitrkl.png",
      "url": "https://www.nitrkl.ac.in/"
    },
    {
      "name": "Ravenshaw University",
      "image": "/assets/home/partners/ravenshaw-university.png",
      "url": "https://www.ravenshawuniversity.ac.in/"
    },
    {
      "name": "XIMB",
      "image": "/assets/home/partners/ximb.png",
      "url": "https://ximb.edu.in/"
    },
    {
      "name": "GIFT",
      "image": "/assets/home/partners/gift.png",
      "url": "https://top-autonomous-college-in-odisha.gift.edu.in/"
    },
    {
      "name": "Trident Academy",
      "image": "/assets/home/partners/trident.png",
      "url": "https://tat.trident.ac.in/"
    },
    {
      "name": "Wipro",
      "image": "/assets/home/partners/wipro.png",
      "url": "https://www.wipro.com/"
    },
    {
      "name": "Genpact",
      "image": "/assets/home/partners/genpact.png",
      "url": "https://www.genpact.com/"
    },
    {
      "name": "ESSPL",
      "image": "/assets/home/partners/esspl.png",
      "url": "https://www.esspl.com/"
    },
    {
      "name": "GIET",
      "image": "/assets/home/partners/giet.png",
      "url": "https://www.giet.edu/"
    },
    {
      "name": "Aryan",
      "image": "/assets/home/partners/aryan.png",
      "url": "https://www.aryan.ac.in/"
    },
    {
      "name": "Silicon",
      "image": "/assets/home/partners/silicon.png",
      "url": "https://silicon.ac.in/"
    },
    {
      "name": "Utkal University",
      "image": "/assets/home/partners/utkal-university.png",
      "url": "https://utkaluniversity.ac.in/departments/"
    },
    {
      "name": "Arifin",
      "image": "/assets/home/partners/arifin.png",
      "url": "https://arifin.in/"
    },
    {
      "name": "Confidence Factory",
      "image": "/assets/home/partners/confidence-factory.png",
      "url": "https://www.confidencefactory.com/"
    },
    {
      "name": "SOA",
      "image": "/assets/home/partners/soa.png",
      "url": "https://www.soa.ac.in/"
    },
    {
      "name": "2Coms",
      "image": "/assets/home/partners/2coms.png",
      "url": "https://www.2coms.com/"
    },
    {
      "name": "NMIET",
      "image": "/assets/home/partners/nmiet.png",
      "url": "https://nmiet.ac.in/"
    }
  ]
}


export function faq() {
  return [
    {
      "question": "How can students/colleges contact us for enrollment/collaboration?",
      "answer": "You can call us on 9937003373/8144553579. You can also reach us via mail with dreamdefinerstrainingacademy@gmail.com. You can also fill the consultation form that appears in the Home Page."
    },
    {
      "question": "What courses does Dream Definers Training Academy offer?",
      "answer": "Dream Definers Training Academy offers professional training in Soft Skills, Aviation and Pre-Placement Training."
    },
    {
      "question": "Who can enroll in the programs?",
      "answer": "If you are interested and willing to work on your soft skills, english language skills and enhance placement opportunities, you are in the right place."
    },
    {
      "question": "How long is the course duration?",
      "answer": "Depends on your requirements. Generally a 3 month period can be assumed."
    },
    {
      "question": "Will I receive the certificate after completing the course?",
      "answer": "Yes, you will definitely receive a completion certificate after finishing the course."
    },
    {
      "question": "Do you offer demo sessions / sample modules for colleges?",
      "answer": "Yes we create personalised demo sessions according to the need of the college and interest of students."
    }
  ]
}

export function reviews() {
  return [
    {
      "name": "Priya Sharma",
      "role": "Student, KIIT University",
      "rating": 5,
      "review": "Dream Definers Training Academy transformed my communication skills completely. The trainers are highly professional and the sessions are very interactive. I feel much more confident now in interviews and presentations."
    },
    {
      "name": "Rajesh Kumar",
      "role": "Placement Coordinator, NIT Rourkela",
      "rating": 5,
      "review": "We've been working with Dream Definers for the past 2 years. Their pre-placement training program has significantly improved our students' placement rates. The personalized approach and industry-relevant content make them stand out."
    },
    {
      "name": "Anjali Patel",
      "role": "Aviation Student",
      "rating": 5,
      "review": "The aviation training program exceeded my expectations. The instructors have real industry experience and provide practical insights. I'm now working with a leading airline, and I credit Dream Definers for my success."
    },
    {
      "name": "Dr. Suresh Mohanty",
      "role": "Principal, GEC",
      "rating": 5,
      "review": "Dream Definers has been an excellent partner for our institution. Their soft skills training has helped our students develop holistically. The trainers are dedicated and the curriculum is well-structured."
    },
    {
      "name": "Vikram Singh",
      "role": "Recent Graduate",
      "rating": 5,
      "review": "I enrolled in the pre-placement training program and it was a game-changer. The mock interviews, resume building, and communication sessions prepared me well. I got placed in my dream company!"
    },
    {
      "name": "Meera Das",
      "role": "Student, XIMB",
      "rating": 5,
      "review": "The soft skills training helped me overcome my fear of public speaking. The supportive environment and expert guidance made all the difference. Highly recommend to anyone looking to improve their professional skills."
    }
  ]
}

export function blogs() {
  return [
    {
      "title": "5 Essential Soft Skills for Career Success in 2024",
      "excerpt": "Discover the most important soft skills that employers are looking for in 2024. Learn how communication, leadership, and emotional intelligence can boost your career prospects.",
      "image": "/assets/home/blogs/soft-skills.jpg",
      "date": "March 15, 2024",
      "author": "Sonali Singh",
      "slug": "essential-soft-skills-2024"
    },
    {
      "title": "Aviation Industry: Career Opportunities and Training Requirements",
      "excerpt": "Explore the exciting career opportunities in the aviation industry and understand what training and certifications you need to start your journey in this dynamic field.",
      "image": "/assets/home/blogs/aviation-career.jpg",
      "date": "March 10, 2024",
      "author": "Randhir Garnaik",
      "slug": "aviation-career-opportunities"
    },
    {
      "title": "How to Ace Your Job Interview: A Complete Guide",
      "excerpt": "Master the art of job interviews with our comprehensive guide. Learn about common interview questions, body language tips, and how to make a lasting impression on recruiters.",
      "image": "/assets/home/blogs/interview-guide.jpg",
      "date": "March 5, 2024",
      "author": "Dream Definers Team",
      "slug": "ace-job-interview-guide"
    },
    {
      "title": "Building Confidence: Tips for Effective Public Speaking",
      "excerpt": "Overcome your fear of public speaking with proven techniques and strategies. Learn how to deliver impactful presentations and communicate with confidence in any setting.",
      "image": "/assets/home/blogs/public-speaking.jpg",
      "date": "February 28, 2024",
      "author": "Sonali Singh",
      "slug": "building-confidence-public-speaking"
    },
    {
      "title": "Pre-Placement Training: What to Expect and How to Prepare",
      "excerpt": "Get ready for your placement season with our comprehensive pre-placement training guide. Understand the selection process and learn how to stand out from the competition.",
      "image": "/assets/home/blogs/placement-training.jpg",
      "date": "February 20, 2024",
      "author": "Randhir Garnaik",
      "slug": "pre-placement-training-guide"
    },
    {
      "title": "The Importance of English Communication in Today's Workplace",
      "excerpt": "Discover why strong English communication skills are crucial for career advancement. Learn practical tips to improve your written and verbal communication abilities.",
      "image": "/assets/home/blogs/english-communication.jpg",
      "date": "February 15, 2024",
      "author": "Dream Definers Team",
      "slug": "importance-english-communication"
    }
  ]
}