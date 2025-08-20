// src/pages/guides/FaqPage.tsx
import clsx from 'clsx';
import { memo, useCallback, useEffect, useState } from 'react';

import PageHeader from '@/components/PageHeader';
import { Spoiler } from '@/components/Spoiler';
import { useTheme } from '@/hooks/useTheme';

interface FaqItem {
  id: string;
  question: string;
  content: React.ReactNode;
}

// Sample FAQ data - replace with real content
const FAQ_DATA: FaqItem[] = [
  {
    id: 'what-is-reborn',
    question: 'What is Reborn: An Idle Roguelike RPG?',
    content: (
      <>
        <p>
          Reborn is an incremental idle game where you fight monsters, die, and
          come back stronger. The core gameplay revolves around the cycle of
          death and rebirth.
        </p>
        <p>
          FAQ content will be expanded here with rich formatting, images, and
          detailed explanations.
        </p>
      </>
    ),
  },
  {
    id: 'reawaken-mechanic',
    question: 'How does the Reawaken mechanic work?',
    content: (
      <>
        <p>
          When you die in Reborn, you don&apos;t simply restart - you Reawaken
          with permanent bonuses that make your next life more powerful.
        </p>
        <p>
          More detailed content about the reawaken system will be added here.
        </p>
      </>
    ),
  },
  {
    id: 'village-npcs',
    question: 'What can I do with Village NPCs and Services?',
    content: (
      <>
        <p>
          The village is your central hub, containing various NPCs who provide
          essential services.
        </p>
        <p>Detailed NPC guide content will be expanded here.</p>
      </>
    ),
  },
  {
    id: 'farming-system',
    question: 'How does the Farming & Crops system work?',
    content: (
      <>
        <p>
          Farming provides a steady source of ingredients for potion brewing and
          a way to earn passive income.
        </p>
        <p>Complete farming guide will be detailed here.</p>
      </>
    ),
  },
  {
    id: 'smithing-basics',
    question: 'How do I get started with Smithing?',
    content: (
      <>
        <p>
          Smithing involves mining ores, smelting them into bars, and crafting
          equipment.
        </p>
        <p>Start with copper and work your way up to more valuable metals.</p>
      </>
    ),
  },
  {
    id: 'potion-brewing',
    question: 'How does Potion Brewing work?',
    content: (
      <>
        <p>
          Potions provide temporary bonuses to help with combat and progression.
        </p>
        <p>
          Each potion requires specific ingredients grown on your farm or found
          as loot.
        </p>
      </>
    ),
  },
  {
    id: 'combat-progression',
    question: 'How do I progress through different monsters?',
    content: (
      <>
        <p>
          Start with weaker enemies and gradually work your way up as you get
          stronger equipment.
        </p>
        <p>
          Each monster type drops different loot and provides varying experience
          amounts.
        </p>
      </>
    ),
  },
  {
    id: 'currency-system',
    question: 'What currency does the game use?',
    content: (
      <>
        <p>The game uses a currency displayed with the cents symbol (¢).</p>
        <p>
          You earn money by selling items, completing quests, and defeating
          monsters.
        </p>
      </>
    ),
  },
  {
    id: 'house-upgrades',
    question: 'How do I upgrade my house to a castle?',
    content: (
      <>
        <p>
          House upgrades expand your farming capabilities and unlock new
          features.
        </p>
        <p>
          The castle is the ultimate housing upgrade with maximum farming
          potential.
        </p>
      </>
    ),
  },
  {
    id: 'quest-system',
    question: 'How do quests work?',
    content: (
      <>
        <p>
          NPCs in <Spoiler>the village</Spoiler> offer various quests that
          provide experience and rewards.
        </p>
        <p>Complete quests to unlock new content and gain valuable items.</p>
      </>
    ),
  },
  {
    id: 'equipment-upgrades',
    question: 'How do I upgrade my equipment?',
    content: (
      <>
        <p>
          Better equipment can be crafted, purchased, or found as monster drops.
        </p>
        <p>
          Higher tier equipment requires better materials and more advanced
          crafting skills.
        </p>
      </>
    ),
  },
  {
    id: 'skill-progression',
    question: 'How do skills level up?',
    content: (
      <>
        <p>
          Skills improve through use - fight to improve combat skills, farm to
          improve farming, etc.
        </p>
        <p>
          Higher skill levels unlock new abilities and more efficient actions.
        </p>
      </>
    ),
  },
];

const SidebarToc = memo(({ faqs }: { faqs: FaqItem[] }) => {
  const theme = useTheme();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Account for header
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
      }
    },
    []
  );

  return (
    <div className={clsx('sticky top-4 h-fit rounded-lg p-4', theme.card())}>
      <nav className="space-y-4">
        {faqs.map(faq => (
          <a
            key={faq.id}
            href={`#${faq.id}`}
            onClick={e => handleClick(e, faq.id)}
            className={clsx('block duration-200 text-sm', theme.text.secondary)}
          >
            {faq.question}
          </a>
        ))}
      </nav>
    </div>
  );
});

SidebarToc.displayName = 'SidebarToc';

const FaqSection = memo(
  ({ faq, isHighlighted }: { faq: FaqItem; isHighlighted: boolean }) => {
    const theme = useTheme();
    const [copyFeedback, setCopyFeedback] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleLinkClick = useCallback(
      async (e: React.MouseEvent) => {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${faq.id}`;

        try {
          await navigator.clipboard.writeText(url);
          setCopyFeedback(true);
          setTimeout(() => setCopyFeedback(false), 2000);
        } catch {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopyFeedback(true);
          setTimeout(() => setCopyFeedback(false), 2000);
        }
      },
      [faq.id]
    );

    return (
      <section
        id={faq.id}
        className={clsx('rounded-lg p-6 mb-6 scroll-mt-20', theme.card())}
      >
        <h2
          className={clsx(
            'text-xl md:text-2xl font-bold mb-4 flex items-center justify-between',
            isHighlighted ? theme.text.accent : theme.text.primary
          )}
        >
          <span>{faq.question}</span>
          <div className="flex items-center space-x-2">
            {copyFeedback && (
              <span className={clsx('text-sm font-normal', theme.text.accent)}>
                Copied!
              </span>
            )}
            <a
              href={`#${faq.id}`}
              onClick={handleLinkClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={clsx(
                'p-1 rounded inline-block',
                isHovered ? theme.text.accent : theme.text.muted
              )}
              title="Link to this question"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </div>
        </h2>
        <div
          className={clsx(
            theme.text.secondary,
            '[&>p]:mb-4 [&>p:last-child]:mb-0'
          )}
        >
          {faq.content}
        </div>
      </section>
    );
  }
);

FaqSection.displayName = 'FaqSection';

const FaqPage = () => {
  const [highlightedSection, setHighlightedSection] = useState('');

  // Handle URL fragment changes and highlighting
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      if (hash && FAQ_DATA.some(faq => faq.id === hash)) {
        setHighlightedSection(hash);
        // Scroll to the element with proper offset
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offset = 100; // Account for header and some padding
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth',
            });
          }
        }, 100);
      } else {
        setHighlightedSection('');
      }
    };

    // Check initial hash on load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div>
      <PageHeader
        title="Frequently Asked Questions"
        description="Common questions and answers about Reborn gameplay, mechanics, and strategies."
      />

      {/* Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar TOC */}
        <div className="lg:col-span-1">
          <SidebarToc faqs={FAQ_DATA} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {FAQ_DATA.map(faq => (
            <FaqSection
              key={faq.id}
              faq={faq}
              isHighlighted={highlightedSection === faq.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Add display name for better debugging
FaqPage.displayName = 'FaqPage';

export default FaqPage;
