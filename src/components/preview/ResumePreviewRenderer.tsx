import React from 'react';
import { ResumeData } from '@/types/resume';
import { AtsClassic } from './ats/AtsClassic';
import { AtsModern } from './ats/AtsModern';
import { ModernSidebar } from './creative/ModernSidebar';
import { MinimalistGrid } from './creative/MinimalistGrid';
import { CreativeEditorial } from './creative/CreativeEditorial';
import { CreativeDarkTech } from './creative/CreativeDarkTech';
import { CreativeTimeline } from './creative/CreativeTimeline';
import { CreativeNordic } from './creative/CreativeNordic';
import { StandardLetter } from './cover-letter/StandardLetter';

interface Props {
  data: ResumeData;
}

export const ResumePreviewRenderer: React.FC<Props> = ({ data }) => {
  switch (data.templateId) {
    case 'ats-classic':
      return <AtsClassic data={data} />;
    case 'ats-modern':
      return <AtsModern data={data} />;
    case 'creative-sidebar':
      return <ModernSidebar data={data} />;
    case 'creative-grid':
      return <MinimalistGrid data={data} />;
    case 'creative-editorial':
      return <CreativeEditorial data={data} />;
    case 'creative-dark':
      return <CreativeDarkTech data={data} />;
    case 'creative-timeline':
      return <CreativeTimeline data={data} />;
    case 'creative-nordic':
      return <CreativeNordic data={data} />;
    case 'cover-letter':
      return <StandardLetter data={data} />;
    default:
      if (data.category === 'COVER_LETTER') {
        return <StandardLetter data={data} />;
      }
      return <AtsModern data={data} />;
  }
};
