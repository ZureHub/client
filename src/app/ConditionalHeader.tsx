'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components';
import { Flex } from '@/once-ui/components';

export function ConditionalHeader() {
  const pathname = usePathname();
  
  if (pathname === '/login') {
    return <Flex fillWidth minHeight="16"></Flex>;
  }
  
  return (
    <>
      <Flex fillWidth minHeight="16"></Flex>
      <Header />
    </>
  );
}