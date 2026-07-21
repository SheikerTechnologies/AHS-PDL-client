/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Agent } from './types';

export interface ClientMeta {
  name: string;
  bengName: string;
  filename: string;
}

export const CLIENT_METADATA: ClientMeta[] = [
  { name: "People's Republic of Bangladesh", bengName: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার", filename: "bangladesh-govt.png" },
  { name: "Rajdhani Unnayan Kartripakkha", bengName: "রাজধানী উন্নয়ন কর্তৃপক্ষ (রাজউক)", filename: "rajuk.png" },
  { name: "Bangladesh Navy", bengName: "বাংলাদেশ নৌবাহিনী", filename: "bangladesh-navy.png" },
  { name: "Bangladesh Coast Guard", bengName: "বাংলাদেশ কোস্ট গার্ড", filename: "coast-guard.png" },
  { name: "Civil Aviation Authority of Bangladesh", bengName: "সিভিল এভিয়েশন অথরিটি, বাংলাদেশ", filename: "CAAB.png" },
  { name: "Chittagong Port Authority", bengName: "চট্টগ্রাম বন্দর কর্তৃপক্ষ", filename: "chittagong-port.png" },
  { name: "Mongla Port Authority", bengName: "মংলা বন্দর কর্তৃপক্ষ", filename: "mongla-port.png" },
  { name: "Bangladesh Inland Water Transport Authority", bengName: "বাংলাদেশ অভ্যন্তরীণ নৌ-পরিবহন কর্তৃপক্ষ", filename: "biwta.png" },
  { name: "Bangladesh Agricultural Development Corporation", bengName: "বাংলাদেশ কৃষি উন্নয়ন কর্পোরেশন", filename: "badc.png" },
  { name: "Public Works Department", bengName: "গণপূর্ত অধিদপ্তর (পিডব্লিউডি)", filename: "pwd.png" },
  { name: "Military Engineer Services", bengName: "মিলিটারি ইঞ্জিনিয়ার সার্ভিসেস (এমইএস)", filename: "mes.png" },
  { name: "Directorate General Defence Purchase", bengName: "প্রতিরক্ষা ক্রয় মহাপরিদপ্তর (ডিজিডিপি)", filename: "dgdp.png" },
  { name: "Dhaka Cantonment Board", bengName: "ঢাকা ক্যান্টনমেন্ট বোর্ড", filename: "dhaka-cantonment-board.png" },
  { name: "Department of Public Health Engineering", bengName: "জনস্বাস্থ্য প্রকৌশল অধিদপ্তর", filename: "dphe.png" },
];

export const AGENTS: Agent[] = [
  {
    name: 'Yalda Sheri',
    role: 'Senior Luxury Consultant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    phone: '01625-555700',
    email: 'ahspropertiesdevelopmentltd@gmail.com',
    specialty: 'Exclusive Estates & Investment Portfolios',
  },
  {
    name: 'Junaid Nuzeebun',
    role: 'Founder & Principal Broker',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    phone: '01725-555700',
    email: 'ahspropertiesdevelopmentltd@gmail.com',
    specialty: 'Off-Market & High-Net-Worth Advisory',
  },
];

