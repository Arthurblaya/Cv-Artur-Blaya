import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { SideIndexComponent } from './components/side-index/side-index.component';

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

type SkillGroup = {
  title: string;
  items: string[];
};

export type SectionLink = {
  id: string;
  label: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SideIndexComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements AfterViewInit {
  protected isIndexOpen = true;
  protected activeSectionId = 'top';
  protected isMobileLayout = false;

  protected readonly sectionLinks: SectionLink[] = [
    { id: 'top', label: 'Artur Blaya' },
    { id: 'profile', label: 'Profile' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'interests', label: 'Interests' }
  ];

  protected readonly contactLinks = [
    { label: 'Email', href: 'mailto:arturblaya@gmail.com', value: 'arturblaya@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Arthurblaya/Arthurblaya', value: 'Arthurblaya' },
    { label: 'Location', href: 'https://maps.google.com/?q=Barcelona,Spain', value: 'Barcelona, Spain' }
  ];

  protected readonly experience: Experience[] = [
    {
      company: 'Telefónica Tech',
      role: 'Software Engineer / Software Architect',
      period: 'Oct 2025 - Present',
      location: 'Remote',
      summary:
        'Designing microservices and modular monoliths for industrial and automotive clients with a strong emphasis on scalable backend systems.',
      highlights: [
        '.NET and C# services built around DDD, CQRS, Saga and Clean Architecture.',
        'Synchronous and asynchronous integrations with RabbitMQ, Redis, PostgreSQL, Oracle, Entity Framework and Dapper.',
        'Architecture consulting for distributed systems under production constraints.'
      ]
    },
    {
      company: 'UPC Manresa - EPSEM',
      role: 'University Professor',
      period: 'Sep 2025 - Feb 2026',
      location: 'Barcelona, Spain',
      summary:
        'Taught Complementary Technologies II, combining engineering fundamentals with hands-on technical mentoring.',
      highlights: [
        'Lectures and lab work on PCB design and Linux-based systems administration.',
        'Clear technical communication for complex concepts and practical workflows.'
      ]
    },
    {
      company: 'GreenPowerMonitor',
      role: 'Software Engineer',
      period: 'Feb 2024 - Oct 2025',
      location: 'Remote - International team',
      summary:
        'Built cloud applications for renewable energy plants across wind, solar and hydro domains.',
      highlights: [
        'Worked on containerised microservices with Docker and Kubernetes.',
        'Designed event-driven flows using RabbitMQ, Redis, MongoDB and ClickHouse.',
        'Debugged production issues across service communication, queueing and data performance.',
        'Mentored a junior developer and contributed to architecture decisions in Revenue and KPI modules.'
      ]
    },
    {
      company: 'UVE',
      role: 'Software Engineer',
      period: 'Mar 2023 - Feb 2024',
      location: 'On-site',
      summary:
        'Delivered backend systems for major food industry clients inside a Scrum team focused on maintainability.',
      highlights: [
        '.NET Core services with MySQL, Entity Framework and Dapper.',
        'Strong emphasis on clean architecture and clear domain boundaries.'
      ]
    },
    {
      company: 'Data Crafts',
      role: 'Fullstack Developer',
      period: 'Mar 2022 - Feb 2023',
      location: 'Remote - Part-time',
      summary:
        'Worked in an early-stage startup building a SaaS analytics platform connected to Adobe Analytics and Google Analytics.',
      highlights: [
        'React, Next.js, Express, MongoDB and TypeScript across the full stack.',
        'Practical product delivery in a small team with direct ownership.'
      ]
    }
  ];

  protected readonly skillGroups: SkillGroup[] = [
    {
      title: 'Backend',
      items: ['.NET', 'C#', 'TypeScript', 'Node.js', 'Express', 'REST APIs', 'GraphQL', 'Entity Framework', 'Dapper']
    },
    {
      title: 'Architecture',
      items: ['DDD', 'CQRS', 'Clean Architecture', 'Event-driven systems', 'Microservices', 'Modular monoliths']
    },
    {
      title: 'Cloud and Containers',
      items: ['Docker', 'Docker Compose', 'Kubernetes', 'Container-based architectures', 'Linux systems']
    },
    {
      title: 'Data and Messaging',
      items: ['RabbitMQ', 'Redis', 'MongoDB', 'ClickHouse', 'PostgreSQL', 'MySQL', 'Oracle']
    },
    {
      title: 'Infrastructure',
      items: ['Distributed systems troubleshooting', 'TCP/IP', 'DNS', 'HTTP', 'CI/CD concepts', 'Bash', 'Python basics']
    },
    {
      title: 'AI and Developer Tooling',
      items: [
        'Feature-driven development',
        'LLM-assisted engineering',
        'OpenAI Codex',
        'Claude Code',
        'OpenCode',
        'Custom skills and workflows'
      ]
    }
  ];

  protected readonly interests = [
    'Software architecture',
    'Distributed systems',
    'DevOps practices',
    'Infrastructure automation',
    'Fitness',
    'Hiking',
    'Travelling',
    'Economics'
  ];

  protected toggleIndex(): void {
    this.isIndexOpen = !this.isIndexOpen;
  }

  public ngAfterViewInit(): void {
    this.syncResponsiveIndexState();
    this.updateActiveSection();
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.updateActiveSection();
  }

  @HostListener('window:resize')
  protected onWindowResize(): void {
    this.syncResponsiveIndexState();
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = this.sectionLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    let currentSection: HTMLElement | undefined;

    for (let index = sections.length - 1; index >= 0; index -= 1) {
      const section = sections[index];
      if (section.getBoundingClientRect().top <= 160) {
        currentSection = section;
        break;
      }
    }

    this.activeSectionId = currentSection?.id ?? 'top';
  }

  private syncResponsiveIndexState(): void {
    const nextIsMobileLayout = window.innerWidth <= 900;

    if (nextIsMobileLayout !== this.isMobileLayout) {
      this.isMobileLayout = nextIsMobileLayout;
      this.isIndexOpen = !nextIsMobileLayout;
    }
  }
}
