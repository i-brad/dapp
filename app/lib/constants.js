'use client';

import { DocumentText, Home2, Messages } from "iconsax-react";
import { AirdropIcon, LockIcon2, Shuttle, Shuttle2, StakeIcon } from "@/app/components/IconComponent";

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
    icon: <LockIcon2 size={16} />,
    isDropdownMenu: false,
  },
  {
    label: 'Airdrop',
    href: '/airdrop',
    icon: <AirdropIcon/>,
    isDropdownMenu: false,
  },
  {
    label: 'Stake',
    href: '/stake',
    icon: <StakeIcon />,
    isDropdownMenu: false,
  },
];

export const bottomMenuLinks = [
  {
    label: 'Docs',
    href: '/docs',
    icon: <DocumentText size={16} />,
    isDropdownMenu: false,
  },
  {
    label: 'Support',
    href: '/support',
    icon: <Messages size={16} />,
    isDropdownMenu: false,
  },
];


export const forProjectOwners =[
  {
    id: 1,
    icon: '',    
    title: 'Fair Lunchpad',
    subtitle: 'Easily and customize how you want to raise for your project.'
  },
  {
    id: 2,
    icon: '',    
    title: 'Marketing',
    subtitle: 'We provide marketing support tailored to your project needs.'
  },
  {
    id: 3,
    icon: '',    
    title: 'Locking',
    subtitle: 'Lock your team tokens to grow investors confidence.'
  },
  {
    id: 4,
    icon: '',    
    title: 'Staking',
    subtitle: 'Create a staking campaign with yields to hold selling pressure.'
  },
  {
    id: 5,
    icon: '',    
    title: 'Referral',
    subtitle: 'With our referral system you can make your presale viral.'
  },
  {
    id: 6,
    icon: '',    
    title: 'Security',
    subtitle: 'Your tokens and funds are safe. Our  contracts are audited by the best.'
  },
]

export const forInvestors =[
  {
    id: 1,
    icon: '',    
    title: 'Join Community',
    subtitle: 'Join our community on telegram and twitter to find out when new project is listed on Thrustpad before the public.'
  },
  {
    id: 2,
    icon: '',    
    title: 'Review Project',
    subtitle: 'DYOR, Go through project information, token locks, team, KYC and Audit details to make informed investment decisions'
  },
  {
    id: 3,
    icon: '',    
    title: 'Invest with Confidence',
    subtitle: 'You can invest in projects with great fundamentals during the sale or sell back before the sale ends with minimal fees on our launchpad.'
  }
]