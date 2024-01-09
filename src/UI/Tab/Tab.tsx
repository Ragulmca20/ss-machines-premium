import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface TabData {
  label: string;
  content: React.ReactNode;
}

interface TabComponentProps {
  tabs: TabData[];
  activeTabIndex: number;
  handleTabChange: (params:any,newIndex:number) => void;
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs, activeTabIndex, handleTabChange }) => {
  return (
    <div style={{ marginTop: '10px', minHeight:"70%", minWidth:"70%",  }}>
      <Tabs value={activeTabIndex} onChange={handleTabChange} centered>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <div style={{ marginTop: '10px' }}>
        {tabs[activeTabIndex].content}
      </div>
    </div>
  );
};

export default TabComponent;
