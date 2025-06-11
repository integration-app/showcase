import { GithubIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const REPO_BASE_URL =
  'https://github.com/integration-app/showcase/tree/main/src';

export const OpenGhButton = ({
  metaUrl,
  className,
}: {
  metaUrl: string;
  className?: string;
}) => {
  const filePath = metaUrl.split('/src')[1];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          size='icon-sm'
          asChild
          disabled={!filePath}
          className={className}
        >
          <a href={encodeURI(`${REPO_BASE_URL}${filePath}`)} target='_blank'>
            <GithubIcon />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Open on GitHub</TooltipContent>
    </Tooltip>
  );
};
