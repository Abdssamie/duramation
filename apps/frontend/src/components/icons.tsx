import {
  IconAlertTriangle,
  IconArrowRight,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCommand,
  IconCreditCard,
  IconFile,
  IconFileText,
  IconHelpCircle,
  IconPhoto,
  IconDeviceLaptop,
  IconLayoutDashboard,
  IconLoader2,
  IconLogin,
  IconProps,
  IconShoppingBag,
  IconMoon,
  IconDotsVertical,
  IconPizza,
  IconPlus,
  IconSettings,
  IconSun,
  IconTrash,
  IconBrandTwitter,
  IconUser,
  IconUserCircle,
  IconUserEdit,
  IconUserX,
  IconX,
  IconLayoutKanban,
  IconBrandGithub,
  IconArrowLeft,
  IconKey
} from '@tabler/icons-react';
import { AutomationIcon } from './icons/automation-icon';
import { IconBrandGoogle, IconBrandSlack } from '@tabler/icons-react';
import Image from 'next/image';

import type { ImageProps } from 'next/image';

export type Icon = React.ComponentType<IconProps>;

interface HubspotIconProps
  extends Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> {
  size?: number;
}

export const HubspotIcon: React.FC<HubspotIconProps> = ({
  ...props
}) => (
  <Image
    src='/assets/hubspot.png'
    alt='Hubspot'
    width={24}
    height={24}
    {...props}
  />
);

export const Icons = {
  automation: AutomationIcon,
  dashboard: IconLayoutDashboard,
  logo: IconCommand,
  login: IconLogin,
  close: IconX,
  product: IconShoppingBag,
  spinner: IconLoader2,
  kanban: IconLayoutKanban,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  trash: IconTrash,
  employee: IconUserX,
  post: IconFileText,
  page: IconFile,
  userPen: IconUserEdit,
  user2: IconUserCircle,
  media: IconPhoto,
  settings: IconSettings,
  billing: IconCreditCard,
  ellipsis: IconDotsVertical,
  add: IconPlus,
  warning: IconAlertTriangle,
  user: IconUser,
  arrowRight: IconArrowRight,
  ArrowLeft: IconArrowLeft,
  help: IconHelpCircle,
  pizza: IconPizza,
  sun: IconSun,
  moon: IconMoon,
  laptop: IconDeviceLaptop,
  github: IconBrandGithub,
  twitter: IconBrandTwitter,
  check: IconCheck,
  marketplace: IconShoppingBag,
  google: IconBrandGoogle,
  slack: IconBrandSlack,
  hubspot: HubspotIcon,
  key: IconKey
};
