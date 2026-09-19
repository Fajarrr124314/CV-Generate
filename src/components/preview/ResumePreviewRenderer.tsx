import React from 'react';
import { ResumeData } from '@/types/resume';
import { AtsClassic } from './ats/AtsClassic';
import { AtsModern } from './ats/AtsModern';
import { AtsMinimal } from './ats/AtsMinimal';
import { AtsPhoto } from './ats/AtsPhoto';
import { ModernSidebar } from './creative/ModernSidebar';
import { MinimalistGrid } from './creative/MinimalistGrid';
import { CreativeEditorial } from './creative/CreativeEditorial';
import { CreativeDarkTech } from './creative/CreativeDarkTech';
import { CreativeTimeline } from './creative/CreativeTimeline';
import { CreativeNordic } from './creative/CreativeNordic';
import { CorporateBlue } from './creative/CorporateBlue';
import { EmeraldExecutive } from './creative/EmeraldExecutive';
import { BurgundyChic } from './creative/BurgundyChic';
import { CharcoalSplit } from './creative/CharcoalSplit';
import { WarmAmber } from './creative/WarmAmber';
import { SlimLeftRail } from './creative/SlimLeftRail';
import { TopInfobar } from './creative/TopInfobar';
import { ModernBadgeCard } from './creative/ModernBadgeCard';
import { SwissTypographic } from './creative/SwissTypographic';
import { TerracottaStudio } from './creative/TerracottaStudio';
import { StandardLetter } from './cover-letter/StandardLetter';
import { ModernLetter } from './cover-letter/ModernLetter';

interface Props {
  data: ResumeData;
}

export const ResumePreviewRenderer: React.FC<Props> = ({ data }) => {
  switch (data.templateId) {
    // ATS Templates
    case 'ats-classic':
      return <AtsClassic data={data} />;
    case 'ats-modern':
      return <AtsModern data={data} />;
    case 'ats-minimal':
      return <AtsMinimal data={data} />;
    case 'ats-photo':
      return <AtsPhoto data={data} />;

    // Creative Templates
    case 'creative-sidebar':
      return <ModernSidebar data={data} />;
    case 'creative-corporate-blue':
      return <CorporateBlue data={data} />;
    case 'creative-emerald-executive':
      return <EmeraldExecutive data={data} />;
    case 'creative-burgundy-chic':
      return <BurgundyChic data={data} />;
    case 'creative-charcoal-split':
      return <CharcoalSplit data={data} />;
    case 'creative-amber-warm':
      return <WarmAmber data={data} />;
    case 'creative-left-rail':
      return <SlimLeftRail data={data} />;
    case 'creative-infobar':
      return <TopInfobar data={data} />;
    case 'creative-modern-badge':
      return <ModernBadgeCard data={data} />;
    case 'creative-swiss-clean':
      return <SwissTypographic data={data} />;
    case 'creative-coral-studio':
      return <TerracottaStudio data={data} />;
    case 'creative-nordic':
      return <CreativeNordic data={data} />;
    case 'creative-editorial':
      return <CreativeEditorial data={data} />;
    case 'creative-dark':
      return <CreativeDarkTech data={data} />;
    case 'creative-timeline':
      return <CreativeTimeline data={data} />;
    case 'creative-grid':
      return <MinimalistGrid data={data} />;

    // Cover Letter Templates
    case 'cover-letter':
      return <StandardLetter data={data} />;
    case 'cover-letter-modern':
      return <ModernLetter data={data} />;

    default:
      if (data.category === 'COVER_LETTER') {
        return <StandardLetter data={data} />;
      }
      return <AtsModern data={data} />;
  }
};
