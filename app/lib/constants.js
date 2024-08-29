'use client';

import { Coin, Coin1, Crown, Crown1, DocumentText, DollarCircle, Home2, Messages } from "iconsax-react";
import { AirdropIcon, CarbonReview, LockIcon2, Locking, PeopleCommunity, Shuttle, Shuttle2, StakeIcon } from "@/app/components/IconComponent";
import { DataTableReference } from "@carbon/icons-react";
import { Icon } from "@iconify/react";

export const topMenuLinks = [
  {
    label: 'Home',
    href: '/',
    icon: <Home2 size={16} />,
    isDropdownMenu: false,
  },
  {
    label: 'Fair Launch',
    href: '/fair-launch',
    icon: <Shuttle2 size={16} />,
    isDropdownMenu: false,
  },
  {
    label: 'Lock',
    href: '/lock',
    icon: <LockIcon2 size={16}/>,
    isDropdownMenu: false,
  },
  {
    label: 'Airdrop',
    href: '/airdrop',
    icon: <AirdropIcon />,
    // icon: <Icon icon="fluent-mdl2:parachute" width={16} height={16} />,
    isDropdownMenu: false,
  },
  {
    label: 'Stake',
    href: '/stake',
    icon: <Coin1 size={16} />,
    isDropdownMenu: false,
  },
  {
    label: 'New Token',
    href: '/token',
    icon: <Coin size={16} />,
    isDropdownMenu: false,
  },
];

export const bottomMenuLinks = [
    {
        label: "Docs",
        href: "https://thrustpad.gitbook.io/docs",
        icon: <DocumentText size={16} />,
        isDropdownMenu: false,
    },
    {
        label: "Support",
        href: "https://thrustpad.gitbook.io/docs",
        icon: <Messages size={16} />,
        isDropdownMenu: false,
    },
];


export const forProjectOwners =[
  {
    id: 1,
    icon: <Shuttle2 size={32}/>,    
    title: 'Fair Lunchpad',
    subtitle: 'Easily and customize how you want to raise for your project.'
  },
  {
    id: 2,
    icon: <Crown1 size={32} />,    
    title: 'Marketing',
    subtitle: 'We provide marketing support tailored to your project needs.'
  },
  {
    id: 3,
    icon:  <Locking size={32} />,    
    title: 'Locking',
    subtitle: 'Lock your team tokens to grow investors confidence.'
  },
  {
    id: 4,
    icon: <DataTableReference size={32}/>,    
    title: 'Staking',
    subtitle: 'Create a staking campaign with yields to hold selling pressure.'
  },
  {
    id: 5,
    icon:  <DataTableReference size={32}/>,    
    title: 'Referral',
    subtitle: 'With our referral system you can make your presale viral.'
  },
  {
    id: 6,
    icon:  <Icon icon="material-symbols-light:security" width={32} height={32} />,    
    title: 'Security',
    subtitle: 'Your tokens and funds are safe. Our  contracts are audited by the best.'
  },
]

export const forInvestors =[
  {
    id: 1,
    icon: <PeopleCommunity />,    
    title: 'Join Community',
    subtitle: 'Join our community on telegram and twitter to find out when new project is listed on Thrustpad before the public.'
  },
  {
    id: 2,
    icon: <CarbonReview size={32}/>,    
    title: 'Review Project',
    subtitle: 'DYOR, Go through project information, token locks, team, KYC and Audit details to make informed investment decisions'
  },
  {
    id: 3,
    icon: <DollarCircle size={32} />,    
    title: 'Invest with Confidence',
    subtitle: 'You can invest in projects with great fundamentals during the sale or sell back before the sale ends with minimal fees on our launchpad.'
  }
]
