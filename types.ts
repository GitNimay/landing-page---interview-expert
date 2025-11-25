import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}